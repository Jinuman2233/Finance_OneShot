/**
 * Korean year-end tax settlement estimation for a SINGLE tax year.
 * No multi-year or cumulative spending logic.
 */

export interface YearEndTaxInput {
  grossSalary: number;
  creditCardSpend: number;
  debitCashSpend: number;
  pensionIrp: number;
  /** Extra IRP to simulate optimization (same tax year) */
  additionalIrp: number;
  /** Extra debit/cash spend to simulate optimization (same tax year) */
  additionalDebit: number;
}

export interface CardDeductionBreakdown {
  threshold: number;
  totalSpend: number;
  excessSpend: number;
  creditDeduction: number;
  debitDeduction: number;
  rawDeduction: number;
  maxLimit: number;
  appliedDeduction: number;
}

export interface YearEndTaxResult {
  grossSalary: number;
  threshold: number;
  card: CardDeductionBreakdown;
  /** Estimated tax saved from card income deduction */
  cardTaxSave: number;
  pensionContribution: number;
  pensionLimit: number;
  pensionRate: number;
  pensionTaxCredit: number;
  /** Current path (without additional sliders) */
  currentRefund: number;
  /** With additional IRP + debit sliders */
  maximizedRefund: number;
  refundUplift: number;
  marginalRate: number;
  current: {
    card: CardDeductionBreakdown;
    cardTaxSave: number;
    pensionTaxCredit: number;
    refund: number;
  };
  maximized: {
    card: CardDeductionBreakdown;
    cardTaxSave: number;
    pensionTaxCredit: number;
    refund: number;
    totalIrp: number;
    totalDebit: number;
  };
}

const PENSION_LIMIT = 9_000_000;
const CREDIT_RATE = 0.15;
const DEBIT_RATE = 0.3;
const THRESHOLD_RATE = 0.25;

function clampNonNeg(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Card etc. income-deduction annual ceiling (simplified, single year). */
export function cardDeductionCeiling(grossSalary: number): number {
  if (grossSalary <= 70_000_000) return 3_000_000;
  return 2_500_000;
}

/** Rough marginal rate for converting income deduction → tax save. */
export function estimateMarginalRate(grossSalary: number): number {
  if (grossSalary <= 14_000_000) return 0.06;
  if (grossSalary <= 50_000_000) return 0.15;
  if (grossSalary <= 88_000_000) return 0.24;
  if (grossSalary <= 150_000_000) return 0.35;
  return 0.38;
}

export function pensionCreditRate(grossSalary: number): number {
  return grossSalary <= 55_000_000 ? 0.165 : 0.132;
}

/**
 * Credit/debit income deduction for one tax year.
 * Excess over 25% of gross salary: credit 15%, debit/cash 30%, then ceiling.
 */
export function calcCardIncomeDeduction(
  grossSalary: number,
  creditCardSpend: number,
  debitCashSpend: number,
): CardDeductionBreakdown {
  const gross = clampNonNeg(grossSalary);
  const credit = clampNonNeg(creditCardSpend);
  const debit = clampNonNeg(debitCashSpend);
  const threshold = gross * THRESHOLD_RATE;
  const totalSpend = credit + debit;
  const maxLimit = cardDeductionCeiling(gross);

  if (totalSpend <= threshold) {
    return {
      threshold,
      totalSpend,
      excessSpend: 0,
      creditDeduction: 0,
      debitDeduction: 0,
      rawDeduction: 0,
      maxLimit,
      appliedDeduction: 0,
    };
  }

  const excessSpend = totalSpend - threshold;
  const creditShare = credit / totalSpend;
  const debitShare = debit / totalSpend;
  const creditExcess = excessSpend * creditShare;
  const debitExcess = excessSpend * debitShare;
  const creditDeduction = creditExcess * CREDIT_RATE;
  const debitDeduction = debitExcess * DEBIT_RATE;
  const rawDeduction = creditDeduction + debitDeduction;
  const appliedDeduction = Math.min(rawDeduction, maxLimit);

  return {
    threshold,
    totalSpend,
    excessSpend,
    creditDeduction,
    debitDeduction,
    rawDeduction,
    maxLimit,
    appliedDeduction,
  };
}

export function calcPensionTaxCredit(
  grossSalary: number,
  pensionIrp: number,
): { contribution: number; rate: number; credit: number; limit: number } {
  const contribution = Math.min(clampNonNeg(pensionIrp), PENSION_LIMIT);
  const rate = pensionCreditRate(grossSalary);
  return {
    contribution,
    rate,
    credit: contribution * rate,
    limit: PENSION_LIMIT,
  };
}

function scenarioRefund(
  grossSalary: number,
  credit: number,
  debit: number,
  irp: number,
) {
  const card = calcCardIncomeDeduction(grossSalary, credit, debit);
  const marginalRate = estimateMarginalRate(grossSalary);
  const cardTaxSave = card.appliedDeduction * marginalRate;
  const pension = calcPensionTaxCredit(grossSalary, irp);
  const refund = cardTaxSave + pension.credit;
  return { card, cardTaxSave, pension, refund, marginalRate };
}

/**
 * Full single-year year-end tax simulation with current vs optimized path.
 */
export function calculateYearEndTax(input: YearEndTaxInput): YearEndTaxResult {
  const gross = clampNonNeg(input.grossSalary);
  const credit = clampNonNeg(input.creditCardSpend);
  const debit = clampNonNeg(input.debitCashSpend);
  const irp = clampNonNeg(input.pensionIrp);
  const addIrp = clampNonNeg(input.additionalIrp);
  const addDebit = clampNonNeg(input.additionalDebit);

  const current = scenarioRefund(gross, credit, debit, irp);
  const maxIrp = Math.min(irp + addIrp, PENSION_LIMIT);
  const maximized = scenarioRefund(gross, credit, debit + addDebit, maxIrp);

  return {
    grossSalary: gross,
    threshold: gross * THRESHOLD_RATE,
    card: current.card,
    cardTaxSave: current.cardTaxSave,
    pensionContribution: current.pension.contribution,
    pensionLimit: PENSION_LIMIT,
    pensionRate: current.pension.rate,
    pensionTaxCredit: current.pension.credit,
    currentRefund: current.refund,
    maximizedRefund: maximized.refund,
    refundUplift: Math.max(0, maximized.refund - current.refund),
    marginalRate: current.marginalRate,
    current: {
      card: current.card,
      cardTaxSave: current.cardTaxSave,
      pensionTaxCredit: current.pension.credit,
      refund: current.refund,
    },
    maximized: {
      card: maximized.card,
      cardTaxSave: maximized.cardTaxSave,
      pensionTaxCredit: maximized.pension.credit,
      refund: maximized.refund,
      totalIrp: maxIrp,
      totalDebit: debit + addDebit,
    },
  };
}

export const YEAR_END_TAX_CONSTANTS = {
  PENSION_LIMIT,
  CREDIT_RATE,
  DEBIT_RATE,
  THRESHOLD_RATE,
} as const;

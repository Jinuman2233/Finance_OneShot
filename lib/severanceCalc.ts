/**
 * Korean statutory severance pay & retirement income tax estimation.
 * Single severance event only — no multi-year cumulative logic.
 */

export interface MonthWageInput {
  basicSalary: number;
  allowance: number;
}

export interface SeveranceCalcInput {
  joinDate: string; // YYYY-MM-DD
  leaveDate: string; // YYYY-MM-DD
  /** Last 3 months wages ending at leave date (index 0 = oldest) */
  months: [MonthWageInput, MonthWageInput, MonthWageInput];
  /** Annual return rate 0.01–0.10 */
  returnRate: number;
  /** Investment period in years 1–10 */
  investYears: number;
}

export interface SeveranceCalcResult {
  totalWorkingDays: number;
  yearsOfServiceTax: number;
  avgPeriodDays: number;
  wageTotal3Months: number;
  avgDailyWage: number;
  grossSeverance: number;
  retirementIncomeTax: number;
  localIncomeTax: number;
  totalTaxGeneral: number;
  netGeneral: number;
  /** Effective tax after 30% IRP pension reduction */
  totalTaxIrp: number;
  netIrp: number;
  taxSavings: number;
  irpFutureValue: number;
  irpInvestmentGain: number;
}

function parseYmd(ymd: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (
    dt.getUTCFullYear() !== y ||
    dt.getUTCMonth() !== mo - 1 ||
    dt.getUTCDate() !== d
  ) {
    return null;
  }
  return dt;
}

function utcDayDiffInclusive(start: Date, end: Date): number {
  const s = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const e = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  if (e < s) return 0;
  return Math.floor((e - s) / 86_400_000) + 1;
}

/** Add calendar months in UTC, clamping day-of-month for month-end. */
function addUtcMonths(date: Date, months: number): Date {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + months;
  const day = date.getUTCDate();
  const target = new Date(Date.UTC(y, m, 1));
  const lastDay = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
  ).getUTCDate();
  target.setUTCDate(Math.min(day, lastDay));
  return target;
}

/**
 * Average-wage period: the 3 calendar months ending on leaveDate (inclusive).
 * Start = leaveDate − 3 months + 1 day (leap-year safe via UTC day math).
 */
export function getAverageWagePeriod(leaveDate: Date): { start: Date; end: Date; days: number } {
  const end = leaveDate;
  const threeMonthsBefore = addUtcMonths(leaveDate, -3);
  const start = new Date(threeMonthsBefore);
  start.setUTCDate(start.getUTCDate() + 1);
  const days = utcDayDiffInclusive(start, end);
  return { start, end, days: Math.max(days, 1) };
}

/** Years of service for retirement income tax (ceil of days/365, min 1). */
function taxYearsOfService(totalWorkingDays: number): number {
  if (totalWorkingDays <= 0) return 1;
  return Math.max(1, Math.ceil(totalWorkingDays / 365));
}

/** 근속연수공제 */
function yearsOfServiceDeduction(years: number): number {
  if (years <= 5) return 1_000_000 * years;
  if (years <= 10) return 5_000_000 + 2_000_000 * (years - 5);
  if (years <= 20) return 15_000_000 + 2_500_000 * (years - 10);
  return 40_000_000 + 3_000_000 * (years - 20);
}

/** 환산급여별 공제 */
function convertedWageDeduction(convertedWage: number): number {
  if (convertedWage <= 0) return 0;
  if (convertedWage <= 8_000_000) return convertedWage;
  if (convertedWage <= 70_000_000) {
    return 8_000_000 + (convertedWage - 8_000_000) * 0.6;
  }
  if (convertedWage <= 100_000_000) {
    return 45_200_000 + (convertedWage - 70_000_000) * 0.55;
  }
  if (convertedWage <= 300_000_000) {
    return 61_700_000 + (convertedWage - 100_000_000) * 0.45;
  }
  return 151_700_000 + (convertedWage - 300_000_000) * 0.35;
}

/** Progressive tax on 환산과세표준 (누진공제 방식) */
function progressiveTax(taxBase: number): number {
  if (taxBase <= 0) return 0;
  if (taxBase <= 14_000_000) return taxBase * 0.06;
  if (taxBase <= 50_000_000) return taxBase * 0.15 - 1_260_000;
  if (taxBase <= 88_000_000) return taxBase * 0.24 - 5_760_000;
  if (taxBase <= 150_000_000) return taxBase * 0.35 - 15_440_000;
  if (taxBase <= 300_000_000) return taxBase * 0.38 - 19_940_000;
  if (taxBase <= 500_000_000) return taxBase * 0.4 - 25_940_000;
  if (taxBase <= 1_000_000_000) return taxBase * 0.42 - 35_940_000;
  return taxBase * 0.45 - 65_940_000;
}

/**
 * Estimate retirement income tax (퇴직소득세) for a single severance payout.
 */
export function estimateRetirementIncomeTax(
  grossSeverance: number,
  totalWorkingDays: number,
): { incomeTax: number; localTax: number; yearsOfService: number } {
  const years = taxYearsOfService(totalWorkingDays);
  if (grossSeverance <= 0) {
    return { incomeTax: 0, localTax: 0, yearsOfService: years };
  }

  const serviceDeduction = yearsOfServiceDeduction(years);
  const afterService = Math.max(0, grossSeverance - serviceDeduction);
  const convertedWage = (afterService * 12) / years;
  const convertedDeduction = convertedWageDeduction(convertedWage);
  const convertedTaxBase = Math.max(0, convertedWage - convertedDeduction);
  const convertedTax = progressiveTax(convertedTaxBase);
  const incomeTax = Math.max(0, (convertedTax * years) / 12);
  const localTax = incomeTax * 0.1;

  return { incomeTax, localTax, yearsOfService: years };
}

export function compoundFutureValue(
  principal: number,
  annualRate: number,
  years: number,
): number {
  if (principal <= 0 || years <= 0) return Math.max(0, principal);
  const rate = Math.min(0.1, Math.max(0.01, annualRate));
  const n = Math.min(10, Math.max(1, years));
  return principal * Math.pow(1 + rate, n);
}

export function calculateSeverance(input: SeveranceCalcInput): SeveranceCalcResult | null {
  const join = parseYmd(input.joinDate);
  const leave = parseYmd(input.leaveDate);
  if (!join || !leave || leave < join) return null;

  const totalWorkingDays = utcDayDiffInclusive(join, leave);
  if (totalWorkingDays <= 0) return null;

  const { days: avgPeriodDays } = getAverageWagePeriod(leave);
  const wageTotal3Months = input.months.reduce(
    (sum, m) => sum + Math.max(0, m.basicSalary) + Math.max(0, m.allowance),
    0,
  );
  const avgDailyWage = wageTotal3Months / avgPeriodDays;
  const grossSeverance = avgDailyWage * 30 * (totalWorkingDays / 365);

  const { incomeTax, localTax, yearsOfService } = estimateRetirementIncomeTax(
    grossSeverance,
    totalWorkingDays,
  );

  const totalTaxGeneral = incomeTax + localTax;
  const netGeneral = Math.max(0, grossSeverance - totalTaxGeneral);

  // IRP rollover: effective tax reduced by 30% when withdrawn as pension later
  const totalTaxIrp = totalTaxGeneral * 0.7;
  const netIrp = Math.max(0, grossSeverance - totalTaxIrp);
  const taxSavings = totalTaxGeneral - totalTaxIrp;

  const rate = Math.min(0.1, Math.max(0.01, input.returnRate));
  const years = Math.min(10, Math.max(1, Math.round(input.investYears)));
  const irpFutureValue = compoundFutureValue(netIrp, rate, years);
  const irpInvestmentGain = irpFutureValue - netIrp;

  return {
    totalWorkingDays,
    yearsOfServiceTax: yearsOfService,
    avgPeriodDays,
    wageTotal3Months,
    avgDailyWage,
    grossSeverance,
    retirementIncomeTax: incomeTax,
    localIncomeTax: localTax,
    totalTaxGeneral,
    netGeneral,
    totalTaxIrp,
    netIrp,
    taxSavings,
    irpFutureValue,
    irpInvestmentGain,
  };
}

export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

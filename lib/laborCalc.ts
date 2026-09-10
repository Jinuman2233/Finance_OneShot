/**
 * Korean Labor Standards Act wage premiums for a SINGLE pay period.
 * No multi-year or cumulative logic.
 */

export interface LaborCalcInput {
  hourlyWage: number;
  /** Ordinary / contracted hours in the period (week) */
  normalHours: number;
  overtimeHours: number;
  /** Hours worked between 22:00–06:00 */
  nightHours: number;
  holidayHours: number;
  /** true = 5+ employees (premium rates apply) */
  isFiveOrMore: boolean;
}

export interface LaborCalcResult {
  hourlyWage: number;
  isFiveOrMore: boolean;
  normalHours: number;
  overtimeHours: number;
  nightHours: number;
  holidayHours: number;
  totalHours: number;
  overtimeRate: number;
  nightRate: number;
  holidayRateUnder8: number;
  holidayRateOver8: number;
  basePay: number;
  overtimePay: number;
  nightPay: number;
  holidayPay: number;
  weeklyHolidayEligible: boolean;
  weeklyHolidayPay: number;
  premiumTotal: number;
  grandTotal: number;
}

const WEEKLY_HOLIDAY_THRESHOLD = 15;
const STANDARD_WEEKLY_HOURS = 40;
const WEEKLY_HOLIDAY_HOURS = 8;

function n(v: number): number {
  return Number.isFinite(v) && v > 0 ? v : 0;
}

/**
 * Weekly holiday allowance (주휴수당) for one week/period.
 * Eligible when ordinary hours >= 15.
 * Amount ≈ hourlyWage × 8 × (min(normalHours, 40) / 40)
 */
export function calcWeeklyHolidayPay(
  hourlyWage: number,
  normalHours: number,
): { eligible: boolean; amount: number } {
  const wage = n(hourlyWage);
  const hours = n(normalHours);
  if (hours < WEEKLY_HOLIDAY_THRESHOLD || wage <= 0) {
    return { eligible: false, amount: 0 };
  }
  const ratio = Math.min(hours, STANDARD_WEEKLY_HOURS) / STANDARD_WEEKLY_HOURS;
  return { eligible: true, amount: wage * WEEKLY_HOLIDAY_HOURS * ratio };
}

/**
 * Holiday work pay for one period.
 * 5+: first 8h × 1.5, excess × 2.0; under 5: × 1.0
 */
export function calcHolidayPay(
  hourlyWage: number,
  holidayHours: number,
  isFiveOrMore: boolean,
): number {
  const wage = n(hourlyWage);
  const hours = n(holidayHours);
  if (hours <= 0 || wage <= 0) return 0;

  if (!isFiveOrMore) {
    return hours * wage * 1.0;
  }

  const under8 = Math.min(hours, 8);
  const over8 = Math.max(0, hours - 8);
  return under8 * wage * 1.5 + over8 * wage * 2.0;
}

/**
 * Single-period overtime / night / holiday / weekly-holiday wage estimate.
 */
export function calculateLaborPay(input: LaborCalcInput): LaborCalcResult {
  const hourlyWage = n(input.hourlyWage);
  const normalHours = n(input.normalHours);
  const overtimeHours = n(input.overtimeHours);
  const nightHours = n(input.nightHours);
  const holidayHours = n(input.holidayHours);
  const isFiveOrMore = Boolean(input.isFiveOrMore);

  const overtimeRate = isFiveOrMore ? 1.5 : 1.0;
  const nightRate = isFiveOrMore ? 1.5 : 1.0;
  const holidayRateUnder8 = isFiveOrMore ? 1.5 : 1.0;
  const holidayRateOver8 = isFiveOrMore ? 2.0 : 1.0;

  const basePay = normalHours * hourlyWage;
  const overtimePay = overtimeHours * hourlyWage * overtimeRate;
  const nightPay = nightHours * hourlyWage * nightRate;
  const holidayPay = calcHolidayPay(hourlyWage, holidayHours, isFiveOrMore);

  const weekly = calcWeeklyHolidayPay(hourlyWage, normalHours);

  const premiumTotal = overtimePay + nightPay + holidayPay + weekly.amount;
  const grandTotal = basePay + premiumTotal;
  const totalHours =
    normalHours + overtimeHours + nightHours + holidayHours;

  return {
    hourlyWage,
    isFiveOrMore,
    normalHours,
    overtimeHours,
    nightHours,
    holidayHours,
    totalHours,
    overtimeRate,
    nightRate,
    holidayRateUnder8,
    holidayRateOver8,
    basePay,
    overtimePay,
    nightPay,
    holidayPay,
    weeklyHolidayEligible: weekly.eligible,
    weeklyHolidayPay: weekly.amount,
    premiumTotal,
    grandTotal,
  };
}

export const LABOR_CONSTANTS = {
  WEEKLY_HOLIDAY_THRESHOLD,
  STANDARD_WEEKLY_HOURS,
  WEEKLY_HOLIDAY_HOURS,
} as const;

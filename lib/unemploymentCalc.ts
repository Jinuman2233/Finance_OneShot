/**
 * Korean employment-insurance job-seeking benefit (구직급여) for a SINGLE unemployment event.
 * No multi-year cumulative logic.
 */

export type AgeGroup = "under50" | "over50OrDisabled";

export interface UnemploymentCalcInput {
  ageGroup: AgeGroup;
  /** Total insured period in months */
  insuredMonths: number;
  /** 1일 평균임금 (KRW) */
  averageDailyWage: number;
}

export interface UnemploymentCalcResult {
  ageGroup: AgeGroup;
  insuredMonths: number;
  averageDailyWage: number;
  rawDailyBenefit: number;
  dailyBenefit: number;
  upperLimit: number;
  lowerLimit: number;
  benefitDays: number;
  totalBenefit: number;
  clampedBy: "none" | "upper" | "lower";
}

/** 2025 최저시급 기준 하한 산정용 (참고) */
export const MIN_HOURLY_WAGE = 10_030;
/** 구직급여 상한액 (원/일) */
export const DAILY_BENEFIT_UPPER = 66_000;
/** 하한액 = 최저시급 × 8시간 × 80% */
export const DAILY_BENEFIT_LOWER = MIN_HOURLY_WAGE * 8 * 0.8;

function clampNonNeg(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * 소정급여일수 (120–270) by age group and insured period.
 */
export function getBenefitDays(
  ageGroup: AgeGroup,
  insuredMonths: number,
): number {
  const months = clampNonNeg(insuredMonths);
  const senior = ageGroup === "over50OrDisabled";

  if (months < 12) return 120;
  if (months < 36) return senior ? 180 : 150;
  if (months < 60) return senior ? 210 : 180;
  if (months < 120) return senior ? 240 : 210;
  return senior ? 270 : 240;
}

/**
 * 구직급여 일액: 평균임금의 60%, then clamp to [lower, upper].
 */
export function calcDailyBenefit(averageDailyWage: number): {
  raw: number;
  daily: number;
  clampedBy: "none" | "upper" | "lower";
} {
  const wage = clampNonNeg(averageDailyWage);
  const raw = wage * 0.6;
  if (raw > DAILY_BENEFIT_UPPER) {
    return { raw, daily: DAILY_BENEFIT_UPPER, clampedBy: "upper" };
  }
  if (raw < DAILY_BENEFIT_LOWER) {
    return { raw, daily: DAILY_BENEFIT_LOWER, clampedBy: "lower" };
  }
  return { raw, daily: raw, clampedBy: "none" };
}

export function calculateUnemploymentBenefit(
  input: UnemploymentCalcInput,
): UnemploymentCalcResult {
  const insuredMonths = clampNonNeg(input.insuredMonths);
  const averageDailyWage = clampNonNeg(input.averageDailyWage);
  const benefitDays = getBenefitDays(input.ageGroup, insuredMonths);
  const { raw, daily, clampedBy } = calcDailyBenefit(averageDailyWage);

  return {
    ageGroup: input.ageGroup,
    insuredMonths,
    averageDailyWage,
    rawDailyBenefit: raw,
    dailyBenefit: daily,
    upperLimit: DAILY_BENEFIT_UPPER,
    lowerLimit: DAILY_BENEFIT_LOWER,
    benefitDays,
    totalBenefit: daily * benefitDays,
    clampedBy,
  };
}

export interface EligibilityAnswers {
  worked180Days: boolean | null;
  involuntaryExit: boolean | null;
  ableToWork: boolean | null;
}

/** Unlock calculator when all core eligibility answers are Yes. */
export function isEligible(answers: EligibilityAnswers): boolean {
  return (
    answers.worked180Days === true &&
    answers.involuntaryExit === true &&
    answers.ableToWork === true
  );
}

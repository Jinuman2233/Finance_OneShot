"use client";

import { formatWon } from "@/lib/formatUtils";
import type { AgeGroup } from "@/lib/unemploymentCalc";
import {
  DAILY_BENEFIT_LOWER,
  DAILY_BENEFIT_UPPER,
} from "@/lib/unemploymentCalc";

export interface BenefitFormValues {
  ageGroup: AgeGroup;
  insuredYears: number;
  insuredMonthsExtra: number;
  averageDailyWage: number;
}

interface BenefitCalculatorFormProps {
  values: BenefitFormValues;
  onChange: (values: BenefitFormValues) => void;
  locked: boolean;
}

export default function BenefitCalculatorForm({
  values,
  onChange,
  locked,
}: BenefitCalculatorFormProps) {
  const update = (patch: Partial<BenefitFormValues>) => {
    onChange({ ...values, ...patch });
  };

  return (
    <section
      className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 transition ${
        locked ? "opacity-55" : ""
      }`}
      aria-disabled={locked}
    >
      <h2 className="text-lg font-semibold text-zinc-900">2. 급여 정보 입력</h2>
      <p className="mt-1 text-sm text-zinc-500">
        {locked
          ? "자격 확인을 완료하면 입력할 수 있습니다."
          : "연령·가입기간·1일 평균임금으로 구직급여를 추정합니다."}
      </p>

      <fieldset disabled={locked} className="mt-5 space-y-5 disabled:pointer-events-none">
        <div>
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            연령·장애 여부
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => update({ ageGroup: "under50" })}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                values.ageGroup === "under50"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-zinc-200 bg-zinc-50 text-zinc-600"
              }`}
            >
              50세 미만
            </button>
            <button
              type="button"
              onClick={() => update({ ageGroup: "over50OrDisabled" })}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                values.ageGroup === "over50OrDisabled"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-zinc-200 bg-zinc-50 text-zinc-600"
              }`}
            >
              50세 이상 또는 장애인
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-700">
              고용보험 가입 기간 (년)
            </span>
            <input
              type="number"
              min={0}
              max={40}
              value={values.insuredYears}
              onChange={(e) =>
                update({
                  insuredYears: Math.max(0, Number(e.target.value) || 0),
                })
              }
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-semibold text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-700">
              추가 개월
            </span>
            <input
              type="number"
              min={0}
              max={11}
              value={values.insuredMonthsExtra}
              onChange={(e) =>
                update({
                  insuredMonthsExtra: Math.min(
                    11,
                    Math.max(0, Number(e.target.value) || 0),
                  ),
                })
              }
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-semibold text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-700">
            <span>1일 평균임금 (원)</span>
            <span className="text-indigo-600">
              {formatWon(values.averageDailyWage)}원
            </span>
          </span>
          <input
            type="number"
            min={0}
            step={1000}
            value={values.averageDailyWage || ""}
            onChange={(e) =>
              update({
                averageDailyWage: Math.max(0, Number(e.target.value) || 0),
              })
            }
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-semibold text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="120000"
          />
          <p className="mt-1.5 text-xs text-zinc-400">
            일액 = 평균임금×60% · 상한 {formatWon(DAILY_BENEFIT_UPPER)}원 · 하한{" "}
            {formatWon(DAILY_BENEFIT_LOWER)}원
          </p>
        </label>
      </fieldset>
    </section>
  );
}

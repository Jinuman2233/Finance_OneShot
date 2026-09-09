"use client";

import type { MonthWageInput, SeveranceCalcInput } from "@/lib/severanceCalc";

export interface SeveranceFormValues {
  joinDate: string;
  leaveDate: string;
  months: [MonthWageInput, MonthWageInput, MonthWageInput];
  returnRatePct: number;
  investYears: number;
}

interface SeveranceInputFormProps {
  values: SeveranceFormValues;
  onChange: (values: SeveranceFormValues) => void;
}

const monthLabels = ["3개월 전", "2개월 전", "최근 1개월"] as const;

function num(raw: string): number {
  const n = Number(raw.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function SeveranceInputForm({
  values,
  onChange,
}: SeveranceInputFormProps) {
  const update = (patch: Partial<SeveranceFormValues>) => {
    onChange({ ...values, ...patch });
  };

  const updateMonth = (
    index: 0 | 1 | 2,
    field: keyof MonthWageInput,
    value: number,
  ) => {
    const months = values.months.map((m, i) =>
      i === index ? { ...m, [field]: value } : m,
    ) as SeveranceCalcInput["months"];
    update({ months });
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">퇴직 정보 입력</h2>
      <p className="mt-1 text-sm text-zinc-500">
        입·퇴사일과 퇴직 직전 3개월 임금으로 법정 퇴직금을 산정합니다.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            입사일
          </span>
          <input
            type="date"
            value={values.joinDate}
            onChange={(e) => update({ joinDate: e.target.value })}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            퇴사일
          </span>
          <input
            type="date"
            value={values.leaveDate}
            onChange={(e) => update({ leaveDate: e.target.value })}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </label>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-800">
          퇴직 직전 3개월 임금
        </h3>
        {monthLabels.map((label, i) => {
          const idx = i as 0 | 1 | 2;
          const month = values.months[idx];
          return (
            <div
              key={label}
              className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {label}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-zinc-700">
                    기본급 (원)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={month.basicSalary || ""}
                    onChange={(e) =>
                      updateMonth(idx, "basicSalary", num(e.target.value))
                    }
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    placeholder="3,000,000"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-zinc-700">
                    기타 수당 (원)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={month.allowance || ""}
                    onChange={(e) =>
                      updateMonth(idx, "allowance", num(e.target.value))
                    }
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    placeholder="200,000"
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-zinc-100 pt-5">
        <h3 className="text-sm font-semibold text-zinc-800">
          IRP 투자 가정 (복리)
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-700">
              <span>예상 연 수익률</span>
              <span className="text-indigo-600">{values.returnRatePct}%</span>
            </span>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={values.returnRatePct}
              onChange={(e) =>
                update({ returnRatePct: Number(e.target.value) })
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-indigo-600"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-400">
              <span>1%</span>
              <span>10%</span>
            </div>
          </label>
          <label className="block">
            <span className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-700">
              <span>운용 기간</span>
              <span className="text-emerald-600">{values.investYears}년</span>
            </span>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={values.investYears}
              onChange={(e) =>
                update({ investYears: Number(e.target.value) })
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-emerald-600"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-400">
              <span>1년</span>
              <span>10년</span>
            </div>
          </label>
        </div>
      </div>
    </section>
  );
}

"use client";

import { formatWon } from "@/lib/formatUtils";

export interface OvertimeFormValues {
  hourlyWage: number;
  normalHours: number;
  overtimeHours: number;
  nightHours: number;
  holidayHours: number;
  isFiveOrMore: boolean;
}

interface OvertimeInputFormProps {
  values: OvertimeFormValues;
  onChange: (values: OvertimeFormValues) => void;
}

export default function OvertimeInputForm({
  values,
  onChange,
}: OvertimeInputFormProps) {
  const update = (patch: Partial<OvertimeFormValues>) => {
    onChange({ ...values, ...patch });
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">근무·시급 입력</h2>
      <p className="mt-1 text-sm text-zinc-500">
        한 지급 주기(예: 1주) 기준으로 입력하세요.
      </p>

      <div className="mt-5">
        <span className="mb-2 block text-sm font-medium text-zinc-700">
          사업장 규모
        </span>
        <div
          className="grid grid-cols-2 rounded-xl bg-zinc-100 p-1"
          role="group"
          aria-label="사업장 5인 이상 여부"
        >
          <button
            type="button"
            onClick={() => update({ isFiveOrMore: true })}
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              values.isFiveOrMore
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            5인 이상
          </button>
          <button
            type="button"
            onClick={() => update({ isFiveOrMore: false })}
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              !values.isFiveOrMore
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            5인 미만
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          {values.isFiveOrMore
            ? "연장·야간·휴일 가산(1.5배~2.0배)이 적용됩니다."
            : "가산수당 없이 통상시급(1.0배)으로 산정합니다."}
        </p>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-700">
          <span>시급 (원)</span>
          <span className="text-indigo-600">{formatWon(values.hourlyWage)}원</span>
        </span>
        <input
          type="number"
          min={0}
          step={100}
          value={values.hourlyWage || ""}
          onChange={(e) =>
            update({ hourlyWage: Math.max(0, Number(e.target.value) || 0) })
          }
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-semibold text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          placeholder="10000"
        />
      </label>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            소정근로시간 (시간)
          </span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={values.normalHours || ""}
            onChange={(e) =>
              update({ normalHours: Math.max(0, Number(e.target.value) || 0) })
            }
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-1 text-xs text-zinc-400">주휴수당 산정 기준</p>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            연장근로 (시간)
          </span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={values.overtimeHours || ""}
            onChange={(e) =>
              update({
                overtimeHours: Math.max(0, Number(e.target.value) || 0),
              })
            }
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-1 text-xs text-zinc-400">일 8시간·주 40시간 초과분</p>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            야간근로 22–06시 (시간)
          </span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={values.nightHours || ""}
            onChange={(e) =>
              update({ nightHours: Math.max(0, Number(e.target.value) || 0) })
            }
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-1 text-xs text-zinc-400">야간 구간에 해당하는 시간</p>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            휴일근로 (시간)
          </span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={values.holidayHours || ""}
            onChange={(e) =>
              update({
                holidayHours: Math.max(0, Number(e.target.value) || 0),
              })
            }
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-1 text-xs text-zinc-400">5인 이상: 8시간 초과 시 2.0배</p>
        </label>
      </div>
    </section>
  );
}

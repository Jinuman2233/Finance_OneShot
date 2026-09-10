"use client";

import { formatTableNumber } from "@/lib/formatUtils";
import type { UnemploymentCalcResult } from "@/lib/unemploymentCalc";

interface TimelineResultProps {
  result: UnemploymentCalcResult | null;
  locked: boolean;
}

const MAX_DAYS = 270;

export default function TimelineResult({ result, locked }: TimelineResultProps) {
  if (locked || !result) {
    return (
      <section className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500">
        자격 확인과 입력을 완료하면 수급 기간·총액 타임라인이 표시됩니다.
      </section>
    );
  }

  const progress = Math.min(100, (result.benefitDays / MAX_DAYS) * 100);
  const clampLabel =
    result.clampedBy === "upper"
      ? "상한액 적용"
      : result.clampedBy === "lower"
        ? "하한액 적용"
        : "상·하한 미해당";

  const rows: { label: string; value: number }[] = [
    { label: "1일 평균임금", value: result.averageDailyWage },
    { label: "평균임금의 60% (조정 전)", value: result.rawDailyBenefit },
    { label: "구직급여 일액", value: result.dailyBenefit },
    { label: "상한액", value: result.upperLimit },
    { label: "하한액", value: result.lowerLimit },
    { label: "소정급여일수", value: result.benefitDays },
    { label: "예상 총 수급액", value: result.totalBenefit },
    { label: "가입기간(개월)", value: result.insuredMonths },
  ];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">3. 수급 타임라인</h2>
      <p className="mt-1 text-sm text-zinc-500">
        소정급여일수·일액·총액 요약 ({clampLabel})
      </p>

      <div className="mt-5 rounded-xl bg-indigo-600 px-4 py-4 text-white">
        <p className="text-xs font-medium text-indigo-100">예상 총 수급액</p>
        <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
          {formatTableNumber(result.totalBenefit)}
        </p>
        <p className="mt-1 text-sm text-indigo-100">
          일액 {formatTableNumber(result.dailyBenefit)} ×{" "}
          {formatTableNumber(result.benefitDays)}일
        </p>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
          <span>수급 기간 진행 (최대 270일 대비)</span>
          <span className="font-semibold text-indigo-600">
            {formatTableNumber(result.benefitDays)}일
          </span>
        </div>
        <div className="relative h-4 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-zinc-400">
          <span>0</span>
          <span>120</span>
          <span>180</span>
          <span>240</span>
          <span>270</span>
        </div>
      </div>

      <ol className="mt-6 space-y-3">
        {[
          { day: 0, label: "수급 개시 (대기·인정 후)" },
          {
            day: Math.round(result.benefitDays / 2),
            label: "수급 중기 (구직활동 유지)",
          },
          {
            day: result.benefitDays,
            label: "소정급여일수 종료",
          },
        ].map((step) => (
          <li key={step.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
              {Math.round(step.day)}
            </span>
            <div>
              <p className="text-sm font-medium text-zinc-800">{step.label}</p>
              <p className="text-xs text-zinc-500">
                D+{formatTableNumber(step.day)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 overflow-x-auto rounded-xl border border-zinc-100">
        <table className="w-full min-w-[280px] text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">항목</th>
              <th className="px-4 py-2.5 text-right font-medium">수치</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-zinc-100">
                <td className="px-4 py-2.5 text-zinc-700">{row.label}</td>
                <td className="px-4 py-2.5 text-right font-medium tabular-nums text-zinc-900">
                  {formatTableNumber(row.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

"use client";

import { formatTableNumber } from "@/lib/formatUtils";
import type { SeveranceCalcResult } from "@/lib/severanceCalc";

interface SeveranceResultTableProps {
  result: SeveranceCalcResult | null;
}

export default function SeveranceResultTable({
  result,
}: SeveranceResultTableProps) {
  if (!result) {
    return (
      <section className="rounded-2xl border border-dashed border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500">
        계산 결과가 여기에 표로 표시됩니다.
      </section>
    );
  }

  const rows: { label: string; value: number }[] = [
    { label: "총 재직 일수", value: result.totalWorkingDays },
    { label: "평균임금 산정 기간(일)", value: result.avgPeriodDays },
    { label: "3개월 임금 총액", value: result.wageTotal3Months },
    { label: "1일 평균임금", value: result.avgDailyWage },
    { label: "퇴직금(세전)", value: result.grossSeverance },
    { label: "퇴직소득세(추정)", value: result.retirementIncomeTax },
    { label: "지방소득세(추정)", value: result.localIncomeTax },
    { label: "총 세액(일반 수령)", value: result.totalTaxGeneral },
    { label: "세후 수령액(일반)", value: result.netGeneral },
    { label: "총 세액(IRP 연금 수령 시)", value: result.totalTaxIrp },
    { label: "세후 수령액(IRP)", value: result.netIrp },
    { label: "절세 효과(세액 30% 경감)", value: result.taxSavings },
    { label: "IRP 운용 후 평가액", value: result.irpFutureValue },
    { label: "운용 수익", value: result.irpInvestmentGain },
  ];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">상세 산출 내역</h2>
      <p className="mt-1 text-sm text-zinc-500">
        법정 퇴직금 · 퇴직소득세 추정 · IRP 비교 (소수점 둘째 자리)
      </p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-100">
        <table className="w-full min-w-[300px] text-left text-sm">
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

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        본 결과는 근로기준법상 평균임금·퇴직금 산식과 퇴직소득세 구조를 반영한
        추정치입니다. 실제 고지세액·퇴직연금 제도(DB/DC)에 따라 달라질 수
        있습니다.
      </p>
    </section>
  );
}

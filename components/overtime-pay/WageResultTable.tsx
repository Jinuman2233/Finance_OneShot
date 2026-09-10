"use client";

import { formatTableNumber } from "@/lib/formatUtils";
import type { LaborCalcResult } from "@/lib/laborCalc";

interface WageResultTableProps {
  result: LaborCalcResult;
}

export default function WageResultTable({ result }: WageResultTableProps) {
  const rows: { label: string; value: number }[] = [
    { label: "시급", value: result.hourlyWage },
    { label: "소정근로시간", value: result.normalHours },
    { label: "연장근로시간", value: result.overtimeHours },
    { label: "야간근로시간", value: result.nightHours },
    { label: "휴일근로시간", value: result.holidayHours },
    { label: "총 입력 시간", value: result.totalHours },
    { label: "연장 배율", value: result.overtimeRate },
    { label: "야간 배율", value: result.nightRate },
    { label: "휴일 8시간 이하 배율", value: result.holidayRateUnder8 },
    { label: "휴일 8시간 초과 배율", value: result.holidayRateOver8 },
    { label: "기본급(소정)", value: result.basePay },
    { label: "연장근로수당", value: result.overtimePay },
    { label: "야간근로수당", value: result.nightPay },
    { label: "휴일근로수당", value: result.holidayPay },
    {
      label: result.weeklyHolidayEligible
        ? "주휴수당"
        : "주휴수당(미해당·주 15시간 미만)",
      value: result.weeklyHolidayPay,
    },
    { label: "가산·주휴 합계", value: result.premiumTotal },
    { label: "총 예상 지급액", value: result.grandTotal },
  ];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">상세 산출 표</h2>
      <p className="mt-1 text-sm text-zinc-500">
        모든 수치는 소수점 둘째 자리까지 표시됩니다.
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
        참고용 추정치입니다. 실제 지급액은 취업규칙·근로계약·포괄임금 약정에
        따라 달라질 수 있습니다.
      </p>
    </section>
  );
}

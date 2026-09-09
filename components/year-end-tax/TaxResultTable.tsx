"use client";

import { formatTableNumber } from "@/lib/formatUtils";
import type { YearEndTaxResult } from "@/lib/yearEndTaxCalc";

interface TaxResultTableProps {
  result: YearEndTaxResult;
}

export default function TaxResultTable({ result }: TaxResultTableProps) {
  const rows: { label: string; value: number }[] = [
    { label: "총급여", value: result.grossSalary },
    { label: "최저사용금액(총급여의 25%)", value: result.threshold },
    { label: "카드·현금 총 사용액(현재)", value: result.current.card.totalSpend },
    { label: "문턱 초과 사용액(현재)", value: result.current.card.excessSpend },
    {
      label: "신용카드 소득공제액(현재)",
      value: result.current.card.creditDeduction,
    },
    {
      label: "체크·현금 소득공제액(현재)",
      value: result.current.card.debitDeduction,
    },
    {
      label: "소득공제 적용액(현재, 한도 반영)",
      value: result.current.card.appliedDeduction,
    },
    { label: "소득공제 한도", value: result.current.card.maxLimit },
    { label: "적용 한계세율(추정)", value: result.marginalRate * 100 },
    { label: "소득공제 절세액(현재)", value: result.current.cardTaxSave },
    { label: "연금·IRP 납입(현재)", value: result.pensionContribution },
    { label: "연금 세액공제율(%)", value: result.pensionRate * 100 },
    { label: "연금 세액공제(현재)", value: result.current.pensionTaxCredit },
    { label: "현재 예상 환급", value: result.currentRefund },
    {
      label: "최적화 소득공제 적용액",
      value: result.maximized.card.appliedDeduction,
    },
    {
      label: "최적화 연금 세액공제",
      value: result.maximized.pensionTaxCredit,
    },
    { label: "최적화 예상 환급", value: result.maximizedRefund },
    { label: "추가 절세 여력", value: result.refundUplift },
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
        참고용 추정치입니다. 실제 연말정산은 부양가족, 보험료, 의료비, 주택자금
        등 추가 항목과 원천징수세액에 따라 달라집니다.
      </p>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import AdUnit from "@/components/AdUnit";
import IRPComparisonChart from "@/components/severance-irp/IRPComparisonChart";
import SeveranceInputForm, {
  type SeveranceFormValues,
} from "@/components/severance-irp/SeveranceInputForm";
import SeveranceResultTable from "@/components/severance-irp/SeveranceResultTable";
import SEOArticle from "@/components/severance-irp/SEOArticle";
import { formatWon } from "@/lib/formatUtils";
import {
  calculateSeverance,
  toDateInputValue,
} from "@/lib/severanceCalc";
import { useFinanceStore } from "@/store/useFinanceStore";

function defaultForm(monthlyHint: number): SeveranceFormValues {
  const leave = new Date();
  const join = new Date();
  join.setFullYear(join.getFullYear() - 5);
  const basic = monthlyHint > 0 ? Math.round(monthlyHint) : 3_500_000;

  return {
    joinDate: toDateInputValue(join),
    leaveDate: toDateInputValue(leave),
    months: [
      { basicSalary: basic, allowance: 200_000 },
      { basicSalary: basic, allowance: 200_000 },
      { basicSalary: basic, allowance: 200_000 },
    ],
    returnRatePct: 5,
    investYears: 5,
  };
}

export default function SeveranceIrpSimulator() {
  const grossSalary = useFinanceStore((s) => s.grossSalary);
  const [values, setValues] = useState<SeveranceFormValues>(() =>
    defaultForm(grossSalary > 0 ? grossSalary / 12 : 0),
  );

  const result = useMemo(
    () =>
      calculateSeverance({
        joinDate: values.joinDate,
        leaveDate: values.leaveDate,
        months: values.months,
        returnRate: values.returnRatePct / 100,
        investYears: values.investYears,
      }),
    [values],
  );

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-8">
      <div className="min-w-0 space-y-6">
        <SeveranceInputForm values={values} onChange={setValues} />

        <AdUnit slotId="severance-mid" label="Google AdSense" />

        {result ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-900 sm:px-5">
            예상 퇴직금(세전){" "}
            <span className="font-bold">
              {formatWon(result.grossSeverance)}원
            </span>
            <span className="text-emerald-700">
              {" "}
              · IRP 절세 약 {formatWon(result.taxSavings)}원
            </span>
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            퇴사일은 입사일 이후여야 하며, 날짜와 임금을 올바르게 입력해 주세요.
          </div>
        )}

        <IRPComparisonChart result={result} />
        <SeveranceResultTable result={result} />

        <div className="border-t border-zinc-200 pt-10 pb-8">
          <SEOArticle />
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <AdUnit
            slotId="severance-sidebar"
            className="min-h-[250px]"
            label="Google AdSense"
          />
        </div>
      </aside>
    </div>
  );
}

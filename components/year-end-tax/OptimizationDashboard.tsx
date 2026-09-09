"use client";

import { TrendingUp } from "lucide-react";
import { formatWon } from "@/lib/formatUtils";
import type { YearEndTaxResult } from "@/lib/yearEndTaxCalc";
import DeductionChart from "@/components/year-end-tax/DeductionChart";

interface OptimizationDashboardProps {
  result: YearEndTaxResult;
}

export default function OptimizationDashboard({
  result,
}: OptimizationDashboardProps) {
  const progress =
    result.maximizedRefund > 0
      ? Math.min(100, (result.currentRefund / result.maximizedRefund) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              최적화 대시보드
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              당해 과세연도 예상 환급(소득공제 절세 + 세액공제)
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <TrendingUp className="h-5 w-5" aria-hidden />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-teal-50 px-4 py-3">
            <p className="text-xs font-medium text-teal-700">현재 예상 환급</p>
            <p className="mt-1 text-xl font-bold text-teal-950">
              {formatWon(result.currentRefund)}원
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 px-4 py-3">
            <p className="text-xs font-medium text-emerald-700">최적화 환급</p>
            <p className="mt-1 text-xl font-bold text-emerald-950">
              {formatWon(result.maximizedRefund)}원
            </p>
          </div>
          <div className="rounded-xl bg-emerald-100/90 px-4 py-3">
            <p className="text-xs font-medium text-emerald-800">추가 절세 여력</p>
            <p className="mt-1 text-xl font-bold text-emerald-950">
              +{formatWon(result.refundUplift)}원
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
            <span>현재 / 최적화 달성률</span>
            <span className="font-semibold text-teal-700">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <DeductionChart result={result} />
    </div>
  );
}

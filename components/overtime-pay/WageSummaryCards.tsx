"use client";

import { Clock, Moon, Sun } from "lucide-react";
import { formatWon } from "@/lib/formatUtils";
import type { LaborCalcResult } from "@/lib/laborCalc";

interface WageSummaryCardsProps {
  result: LaborCalcResult;
}

export default function WageSummaryCards({ result }: WageSummaryCardsProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">예상 지급 요약</h2>
      <p className="mt-1 text-sm text-zinc-500">
        {result.isFiveOrMore ? "5인 이상 · 가산 적용" : "5인 미만 · 가산 미적용"}
      </p>

      <div className="mt-5 rounded-xl bg-indigo-600 px-4 py-4 text-white">
        <p className="text-xs font-medium text-indigo-100">총 예상 지급액</p>
        <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {formatWon(result.grandTotal)}
          <span className="ml-1 text-sm font-medium text-indigo-100">원</span>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-zinc-50 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <Sun className="h-3.5 w-3.5" aria-hidden />
            기본급
          </div>
          <p className="mt-1 text-lg font-bold text-zinc-900">
            {formatWon(result.basePay)}원
          </p>
        </div>
        <div className="rounded-xl bg-indigo-50 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-600">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            연장·휴일
          </div>
          <p className="mt-1 text-lg font-bold text-indigo-950">
            {formatWon(result.overtimePay + result.holidayPay)}원
          </p>
        </div>
        <div className="rounded-xl bg-blue-50 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
            <Moon className="h-3.5 w-3.5" aria-hidden />
            야간·주휴
          </div>
          <p className="mt-1 text-lg font-bold text-blue-950">
            {formatWon(result.nightPay + result.weeklyHolidayPay)}원
          </p>
        </div>
      </div>

      {!result.weeklyHolidayEligible ? (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          소정근로가 주 15시간 미만이면 주휴수당 대상이 아닐 수 있습니다.
        </p>
      ) : (
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
          주휴수당 예상액 {formatWon(result.weeklyHolidayPay)}원이 포함되어
          있습니다.
        </p>
      )}
    </section>
  );
}

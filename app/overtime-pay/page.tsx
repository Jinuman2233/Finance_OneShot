import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import OvertimePaySimulator from "@/components/overtime-pay/OvertimePaySimulator";

export const metadata: Metadata = {
  title: "연장근로·주휴수당 계산기",
  description:
    "시급·연장·야간·휴일근로와 사업장 5인 이상 여부를 반영해 주휴수당과 가산수당을 한 지급 주기 기준으로 계산합니다.",
};

export default function OvertimePayPage() {
  return (
    <div className="bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-4 max-w-2xl">
          <p className="text-sm font-semibold text-indigo-600">Overtime & Shift</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            연장근로 및 주휴수당 계산기
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
            소정·연장·야간(22–06시)·휴일 근로시간과 사업장 규모를 입력하면
            가산수당과 주휴수당을 포함한 예상 지급액을 확인할 수 있습니다.
          </p>
        </div>

        <div className="mb-6">
          <AdUnit slotId="overtime-below-h1" />
        </div>

        <OvertimePaySimulator />
      </main>
    </div>
  );
}

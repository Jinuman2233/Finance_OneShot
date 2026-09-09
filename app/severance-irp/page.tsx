import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import SeveranceIrpSimulator from "@/components/severance-irp/SeveranceIrpSimulator";

export const metadata: Metadata = {
  title: "퇴직금 · IRP 절세 시뮬레이터",
  description:
    "입·퇴사일과 직전 3개월 임금으로 법정 퇴직금·퇴직소득세를 추정하고, 일반 수령과 IRP 이전·운용 수익을 비교합니다.",
};

export default function SeveranceIrpPage() {
  return (
    <div className="bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-4 max-w-2xl">
          <p className="text-sm font-semibold text-emerald-600">
            Severance & IRP
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            퇴직금 · IRP 절세 시뮬레이터
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
            1일 평균임금 기반 법정 퇴직금, 퇴직소득세 추정, IRP 이전 시 세액
            경감과 단순 복리 운용 수익을 한 화면에서 비교합니다.
          </p>
        </div>

        <div className="mb-6">
          <AdUnit slotId="severance-below-h1" />
        </div>

        <SeveranceIrpSimulator />
      </main>
    </div>
  );
}

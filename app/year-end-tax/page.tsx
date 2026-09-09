import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import YearEndTaxSimulator from "@/components/year-end-tax/YearEndTaxSimulator";

export const metadata: Metadata = {
  title: "연말정산 시뮬레이터",
  description:
    "총급여 기준 신용카드·체크카드 소득공제와 연금·IRP 세액공제를 계산하고, 당해 과세연도 예상 환급을 최적화해 보세요.",
};

export default function YearEndTaxPage() {
  return (
    <div className="bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-4 max-w-2xl">
          <p className="text-sm font-semibold text-teal-600">Year-End Tax</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            연말정산 시뮬레이터
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
            저장된 총급여로 카드 소득공제·연금 세액공제를 추정하고, 추가
            IRP·체크 사용 슬라이더로 환급 개선 폭을 확인합니다.
          </p>
        </div>

        <div className="mb-6">
          <AdUnit slotId="year-end-below-h1" />
        </div>

        <YearEndTaxSimulator />
      </main>
    </div>
  );
}

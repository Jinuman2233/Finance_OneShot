import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import UnemploymentBenefitsSimulator from "@/components/unemployment-benefits/UnemploymentBenefitsSimulator";

export const metadata: Metadata = {
  title: "실업급여(구직급여) 계산기",
  description:
    "수급 자격을 확인하고 1일 평균임금·가입기간·연령으로 구직급여 일액과 소정급여일수·총액을 추정합니다.",
};

export default function UnemploymentBenefitsPage() {
  return (
    <div className="bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-4 max-w-2xl">
          <p className="text-sm font-semibold text-indigo-600">
            Unemployment Benefits
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            실업급여(구직급여) 계산기
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
            수급 요건을 먼저 점검한 뒤, 일액(상·하한 적용)과 소정급여일수로
            예상 총액을 확인하세요.
          </p>
        </div>

        <div className="mb-6">
          <AdUnit slotId="unemployment-below-h1" />
        </div>

        <UnemploymentBenefitsSimulator />
      </main>
    </div>
  );
}

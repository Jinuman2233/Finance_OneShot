import type { Metadata } from "next";
import AdUnit from "@/components/AdUnit";
import CalculatorPanel from "@/components/CalculatorPanel";
import SEOContent from "@/components/SEOContent";

export const metadata: Metadata = {
  title: "2025년 연봉 실수령액 계산기 | 4대보험·세금·퇴직금",
  description:
    "연봉·월급 실수령액을 바로 계산하세요. 4대보험·근로소득세·지방소득세 공제와 예상 퇴직금까지 확인하고, 총급여를 연말정산 도구와 연동합니다.",
};

export default function SalaryCalculatorPage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6">
        <AdUnit slotId="salary-top" />
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 max-w-2xl">
          <p className="text-sm font-semibold text-blue-600">Salary Calculator</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            2025년 연봉 실수령액 및 퇴직금 계산기
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
            연봉 또는 월급을 입력하면 4대 보험·세금 공제 후 실수령액을 확인합니다.
            계산된 총급여는 연말정산 시뮬레이터에 자동 저장됩니다.
          </p>
        </div>

        <CalculatorPanel />

        <div className="mt-6">
          <AdUnit slotId="salary-bottom" />
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-10 pb-16">
          <SEOContent />
        </div>
      </main>
    </div>
  );
}

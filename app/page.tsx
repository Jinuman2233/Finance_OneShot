import { Calculator, Landmark, Receipt } from "lucide-react";
import AdUnit from "@/components/AdUnit";
import LandingSEOArticle from "@/components/LandingSEOArticle";
import ToolCard from "@/components/ToolCard";

const tools = [
  {
    href: "/salary-calculator",
    title: "연봉 실수령액 계산기",
    description:
      "4대보험·근로소득세·지방세를 반영해 월·연 실수령액과 예상 퇴직금을 즉시 확인하세요. 계산된 총급여는 다른 도구와 자동 연동됩니다.",
    badge: "인기",
    icon: Calculator,
    accent: "blue" as const,
  },
  {
    href: "/severance-irp",
    title: "퇴직금 · IRP 절세 시뮬레이터",
    description:
      "단일 과세연도 기준으로 예상 퇴직금과 IRP 납입 시 세액공제 효과를 시뮬레이션합니다. 이직·퇴직 전 현금흐름을 점검하세요.",
    badge: "절세",
    icon: Landmark,
    accent: "emerald" as const,
  },
  {
    href: "/year-end-tax",
    title: "연말정산 시뮬레이터",
    description:
      "총급여 기반 공제 한도와 예상 환급·추가납부를 미리 가늠합니다. 실수령액 계산기에서 저장한 총급여를 자동으로 불러옵니다.",
    badge: "연동",
    icon: Receipt,
    accent: "violet" as const,
  },
];

export default function Home() {
  return (
    <div className="bg-slate-50 text-zinc-900">
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-zinc-300/40 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold tracking-wide text-blue-600">
            Office Worker Financial Toolkit
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl sm:leading-tight">
            직장인 필수 금융 계산을
            <br className="hidden sm:block" /> 한곳에서 끝내세요
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            실수령액, 퇴직금·IRP 절세, 연말정산까지. 단일 과세연도 기준의
            신뢰할 수 있는 시뮬레이션으로 급여·절세·환급을 빠르게 점검합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#tools"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              도구 살펴보기
            </a>
            <a
              href="/salary-calculator"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
            >
              실수령액부터 계산
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section id="tools" className="scroll-mt-20">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              3가지 핵심 도구
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
              총급여를 한 번 계산하면 연말정산 시뮬레이터에 자동으로 반영됩니다.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </section>

        <div className="my-12">
          <AdUnit slotId="landing-mid" />
        </div>

        <section className="border-t border-zinc-200 pt-12 pb-4">
          <LandingSEOArticle />
        </section>
      </main>
    </div>
  );
}

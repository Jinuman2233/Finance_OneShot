import Link from "next/link";

const toolLinks = [
  { href: "/salary-calculator", label: "연봉 실수령액 계산기" },
  { href: "/severance-irp", label: "퇴직금·IRP 절세 시뮬레이터" },
  { href: "/year-end-tax", label: "연말정산 시뮬레이터" },
  { href: "/overtime-pay", label: "연장근로·주휴수당 계산기" },
  { href: "/unemployment-benefits", label: "실업급여(구직급여) 계산기" },
];

const DISCLAIMER =
  "면책 조항: 본 웹사이트(직장인 금융 툴킷)에서 제공하는 모든 계산 결과는 모의 계산으로 법적 효력을 갖지 않으며, 실제 수령액 및 지급액과 차이가 있을 수 있습니다. 정확한 산정 및 법적 판단은 노무사, 세무사 등 전문가와 상담하시기 바랍니다.";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-bold text-white">직장인 금융 툴킷</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              실수령액·퇴직금·연말정산·연장근로·실업급여를 한곳에서 점검하는
              무료 시뮬레이션 포털입니다.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">계산 도구</p>
            <ul className="mt-3 space-y-2 text-sm">
              {toolLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">법적 고지</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-400 transition hover:text-white"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 transition hover:text-white"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@salaryoneshot.com"
                  className="text-slate-400 transition hover:text-white"
                >
                  support@salaryoneshot.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-4 text-sm leading-relaxed text-slate-300">
          {DISCLAIMER}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} 직장인 금융 툴킷 · Office Finance Toolkit
        </p>
      </div>
    </footer>
  );
}

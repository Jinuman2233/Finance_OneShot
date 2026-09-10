import Link from "next/link";
import { Wallet } from "lucide-react";

const navItems = [
  { href: "/salary-calculator", label: "실수령액" },
  { href: "/overtime-pay", label: "연장·주휴" },
  { href: "/unemployment-benefits", label: "실업급여" },
  { href: "/severance-irp", label: "퇴직금·IRP" },
  { href: "/year-end-tax", label: "연말정산" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Wallet className="h-4 w-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight text-zinc-900 sm:text-base">
              Office Finance Toolkit
            </p>
            <p className="hidden text-xs text-zinc-500 sm:block">
              직장인 금융 계산 포털
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="주요 도구">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

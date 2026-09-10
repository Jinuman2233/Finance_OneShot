"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Wallet, X } from "lucide-react";

const navItems = [
  { href: "/salary-calculator", label: "실수령액" },
  { href: "/severance-irp", label: "퇴직금·IRP" },
  { href: "/year-end-tax", label: "연말정산" },
  { href: "/overtime-pay", label: "연장·주휴" },
  { href: "/unemployment-benefits", label: "실업급여" },
];

function linkClass(active: boolean) {
  return active
    ? "rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
    : "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Wallet className="h-4 w-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              직장인 금융 툴킷
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              Office Finance Toolkit
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="주요 도구"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(isActive(item.href))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden"
          aria-label="모바일 메뉴"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block ${linkClass(isActive(item.href))}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

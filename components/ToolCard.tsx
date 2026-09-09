import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

export interface ToolCardProps {
  href: string;
  title: string;
  description: string;
  badge?: string;
  icon: LucideIcon;
  accent?: "blue" | "emerald" | "violet";
}

const accentStyles = {
  blue: {
    icon: "bg-blue-600 text-white",
    badge: "bg-blue-50 text-blue-700",
    hover: "group-hover:border-blue-300 group-hover:shadow-blue-100/80",
  },
  emerald: {
    icon: "bg-emerald-600 text-white",
    badge: "bg-emerald-50 text-emerald-700",
    hover: "group-hover:border-emerald-300 group-hover:shadow-emerald-100/80",
  },
  violet: {
    icon: "bg-violet-600 text-white",
    badge: "bg-violet-50 text-violet-700",
    hover: "group-hover:border-violet-300 group-hover:shadow-violet-100/80",
  },
} as const;

export default function ToolCard({
  href,
  title,
  description,
  badge,
  icon: Icon,
  accent = "blue",
}: ToolCardProps) {
  const styles = accentStyles[accent];

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${styles.hover}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        {badge ? (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="text-lg font-bold tracking-tight text-zinc-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition group-hover:gap-2.5">
        바로가기
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </Link>
  );
}

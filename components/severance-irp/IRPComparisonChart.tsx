"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatWon } from "@/lib/formatUtils";
import type { SeveranceCalcResult } from "@/lib/severanceCalc";

interface IRPComparisonChartProps {
  result: SeveranceCalcResult | null;
}

const COLORS = ["#6366f1", "#10b981", "#059669"] as const;

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { name: string } }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-zinc-800">{item.payload.name}</p>
      <p className="text-zinc-600">{formatWon(item.value)}원</p>
    </div>
  );
}

export default function IRPComparisonChart({ result }: IRPComparisonChartProps) {
  if (!result) {
    return (
      <section className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500">
        입사·퇴사일과 3개월 임금을 입력하면 일반 수령 vs IRP 비교 차트가
        표시됩니다.
      </section>
    );
  }

  const data = [
    { name: "일반 세후", value: result.netGeneral },
    { name: "IRP 세후", value: result.netIrp },
    { name: "IRP+수익", value: result.irpFutureValue },
  ];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">
        일반 수령 vs IRP 비교
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        인디고: 일반 계좌 세후 · 에메랄드: IRP(세액 30% 경감) 및 운용 후 평가액
      </p>

      <div className="mt-4 h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickFormatter={(v: number) =>
                v >= 100_000_000
                  ? `${(v / 100_000_000).toFixed(1)}억`
                  : `${Math.round(v / 10_000)}만`
              }
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={64}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-indigo-50 px-4 py-3">
          <p className="text-xs font-medium text-indigo-600">일반 계좌 세후</p>
          <p className="mt-1 text-lg font-bold text-indigo-900">
            {formatWon(result.netGeneral)}원
          </p>
        </div>
        <div className="rounded-xl bg-emerald-50 px-4 py-3">
          <p className="text-xs font-medium text-emerald-600">IRP 세후(경감)</p>
          <p className="mt-1 text-lg font-bold text-emerald-900">
            {formatWon(result.netIrp)}원
          </p>
        </div>
        <div className="rounded-xl bg-emerald-100/80 px-4 py-3">
          <p className="text-xs font-medium text-emerald-700">IRP+운용 수익</p>
          <p className="mt-1 text-lg font-bold text-emerald-950">
            {formatWon(result.irpFutureValue)}원
          </p>
        </div>
      </div>
    </section>
  );
}

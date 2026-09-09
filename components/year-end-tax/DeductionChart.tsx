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
import type { YearEndTaxResult } from "@/lib/yearEndTaxCalc";

interface DeductionChartProps {
  result: YearEndTaxResult;
}

const COLORS = ["#0d9488", "#10b981"] as const;

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { name: string } }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-zinc-800">{payload[0].payload.name}</p>
      <p className="text-emerald-700">{formatWon(payload[0].value)}원</p>
    </div>
  );
}

export default function DeductionChart({ result }: DeductionChartProps) {
  const data = [
    { name: "현재 예상 환급", value: result.currentRefund },
    { name: "최적화 환급", value: result.maximizedRefund },
  ];

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">환급 비교 차트</h2>
      <p className="mt-1 text-sm text-zinc-500">
        현재 사용·납입 기준 vs 슬라이더 추가분 반영
      </p>

      <div className="mt-4 h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
            <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} />
            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              tickFormatter={(v: number) =>
                v >= 10_000_000
                  ? `${(v / 10_000_000).toFixed(1)}천만`
                  : `${Math.round(v / 10_000)}만`
              }
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={72}>
              {data.map((entry, i) => (
                <Cell key={entry.name} fill={COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

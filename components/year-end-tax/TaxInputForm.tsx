"use client";

import Link from "next/link";
import { formatWon } from "@/lib/formatUtils";
import { YEAR_END_TAX_CONSTANTS } from "@/lib/yearEndTaxCalc";
import { useFinanceStore } from "@/store/useFinanceStore";

export interface TaxFormValues {
  grossSalary: number;
  creditCardSpend: number;
  debitCashSpend: number;
  pensionIrp: number;
  additionalIrp: number;
  additionalDebit: number;
}

interface TaxInputFormProps {
  values: TaxFormValues;
  onChange: (values: TaxFormValues) => void;
  fromStore: boolean;
}

export default function TaxInputForm({
  values,
  onChange,
  fromStore,
}: TaxInputFormProps) {
  const setGrossSalary = useFinanceStore((s) => s.setGrossSalary);
  const irpRoom = Math.max(
    0,
    YEAR_END_TAX_CONSTANTS.PENSION_LIMIT - values.pensionIrp,
  );

  const update = (patch: Partial<TaxFormValues>) => {
    const next = { ...values, ...patch };
    if (patch.grossSalary !== undefined) {
      setGrossSalary(patch.grossSalary);
    }
    if (patch.pensionIrp !== undefined) {
      const room = Math.max(
        0,
        YEAR_END_TAX_CONSTANTS.PENSION_LIMIT - patch.pensionIrp,
      );
      next.additionalIrp = Math.min(next.additionalIrp, room);
    }
    onChange(next);
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">연말정산 입력</h2>
      <p className="mt-1 text-sm text-zinc-500">
        {fromStore
          ? "실수령액 계산기에서 저장된 총급여를 불러왔습니다."
          : "총급여를 입력하거나 실수령액 계산기에서 먼저 계산해 주세요."}
      </p>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-zinc-700">
          총급여 (원)
        </span>
        <input
          type="number"
          min={0}
          value={values.grossSalary || ""}
          onChange={(e) =>
            update({ grossSalary: Math.max(0, Number(e.target.value) || 0) })
          }
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-semibold text-zinc-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
          placeholder="50,000,000"
        />
        <p className="mt-1.5 text-xs text-zinc-500">
          현재 {formatWon(values.grossSalary)}원 · 최저사용금액(25%){" "}
          {formatWon(values.grossSalary * 0.25)}원
        </p>
      </label>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            신용카드 사용액 (원)
          </span>
          <input
            type="number"
            min={0}
            value={values.creditCardSpend || ""}
            onChange={(e) =>
              update({
                creditCardSpend: Math.max(0, Number(e.target.value) || 0),
              })
            }
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium text-zinc-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
          />
          <p className="mt-1 text-xs text-zinc-400">공제율 15% (문턱 초과분)</p>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-700">
            체크·현금 사용액 (원)
          </span>
          <input
            type="number"
            min={0}
            value={values.debitCashSpend || ""}
            onChange={(e) =>
              update({
                debitCashSpend: Math.max(0, Number(e.target.value) || 0),
              })
            }
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium text-zinc-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
          />
          <p className="mt-1 text-xs text-zinc-400">공제율 30% (문턱 초과분)</p>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-zinc-700">
          연금·IRP 납입액 (원)
        </span>
        <input
          type="number"
          min={0}
          max={YEAR_END_TAX_CONSTANTS.PENSION_LIMIT}
          value={values.pensionIrp || ""}
          onChange={(e) =>
            update({
              pensionIrp: Math.min(
                YEAR_END_TAX_CONSTANTS.PENSION_LIMIT,
                Math.max(0, Number(e.target.value) || 0),
              ),
            })
          }
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-medium text-zinc-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
        />
        <p className="mt-1 text-xs text-zinc-400">
          세액공제 한도 {formatWon(YEAR_END_TAX_CONSTANTS.PENSION_LIMIT)}원
          (합산)
        </p>
      </label>

      <div className="mt-6 space-y-5 border-t border-zinc-100 pt-5">
        <h3 className="text-sm font-semibold text-zinc-800">
          추가 납입·사용 시뮬레이션
        </h3>
        <p className="text-xs text-zinc-500">
          같은 과세연도 안에서 IRP·체크카드 사용을 늘렸을 때 환급 변화를
          확인합니다.
        </p>

        <label className="block">
          <span className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-700">
            <span>추가 IRP 납입</span>
            <span className="text-teal-600">
              {formatWon(values.additionalIrp)}원
            </span>
          </span>
          <input
            type="range"
            min={0}
            max={irpRoom || 0}
            step={100_000}
            value={Math.min(values.additionalIrp, irpRoom)}
            disabled={irpRoom <= 0}
            onChange={(e) =>
              update({ additionalIrp: Number(e.target.value) || 0 })
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-teal-600 disabled:opacity-40"
          />
          <div className="mt-1 flex justify-between text-xs text-zinc-400">
            <span>0</span>
            <span>잔여 한도 {formatWon(irpRoom)}원</span>
          </div>
        </label>

        <label className="block">
          <span className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-700">
            <span>추가 체크·현금 사용</span>
            <span className="text-emerald-600">
              {formatWon(values.additionalDebit)}원
            </span>
          </span>
          <input
            type="range"
            min={0}
            max={20_000_000}
            step={100_000}
            value={values.additionalDebit}
            onChange={(e) =>
              update({ additionalDebit: Number(e.target.value) || 0 })
            }
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-emerald-600"
          />
          <div className="mt-1 flex justify-between text-xs text-zinc-400">
            <span>0</span>
            <span>2,000만원</span>
          </div>
        </label>
      </div>

      <Link
        href="/salary-calculator"
        className="mt-5 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800"
      >
        실수령액 계산기에서 총급여 다시 산출 →
      </Link>
    </section>
  );
}

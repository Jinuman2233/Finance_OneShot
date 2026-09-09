"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AdUnit from "@/components/AdUnit";
import OptimizationDashboard from "@/components/year-end-tax/OptimizationDashboard";
import SEOArticle from "@/components/year-end-tax/SEOArticle";
import TaxInputForm, {
  type TaxFormValues,
} from "@/components/year-end-tax/TaxInputForm";
import TaxResultTable from "@/components/year-end-tax/TaxResultTable";
import { calculateYearEndTax } from "@/lib/yearEndTaxCalc";
import { useFinanceStore } from "@/store/useFinanceStore";

function buildDefaults(gross: number): TaxFormValues {
  const g = gross > 0 ? gross : 50_000_000;
  return {
    grossSalary: g,
    creditCardSpend: Math.round(g * 0.2),
    debitCashSpend: Math.round(g * 0.15),
    pensionIrp: 3_000_000,
    additionalIrp: 0,
    additionalDebit: 0,
  };
}

export default function YearEndTaxSimulator() {
  const storeGross = useFinanceStore((s) => s.grossSalary);
  const initialized = useRef(false);
  const [fromStore, setFromStore] = useState(false);
  const [values, setValues] = useState<TaxFormValues>(() => buildDefaults(0));

  useEffect(() => {
    const hasStore = storeGross > 0;
    const gross = hasStore ? storeGross : 50_000_000;
    setFromStore(hasStore);

    if (!initialized.current) {
      setValues(buildDefaults(gross));
      initialized.current = true;
      return;
    }

    if (hasStore) {
      setValues((prev) =>
        prev.grossSalary === storeGross
          ? prev
          : { ...prev, grossSalary: storeGross },
      );
    }
  }, [storeGross]);

  const result = useMemo(() => calculateYearEndTax(values), [values]);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-8">
      <div className="min-w-0 space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:items-start">
          <TaxInputForm
            values={values}
            onChange={setValues}
            fromStore={fromStore}
          />
          <OptimizationDashboard result={result} />
        </div>

        <AdUnit slotId="year-end-dashboard" label="Google AdSense" />

        <TaxResultTable result={result} />

        <div className="border-t border-zinc-200 pt-10 pb-8">
          <SEOArticle />
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <AdUnit
            slotId="year-end-sidebar"
            className="min-h-[100px]"
            label="Google AdSense"
          />
        </div>
      </aside>
    </div>
  );
}

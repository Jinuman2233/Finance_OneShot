"use client";

import { useMemo, useState } from "react";
import AdUnit from "@/components/AdUnit";
import LaborLawGuide from "@/components/overtime-pay/LaborLawGuide";
import OvertimeInputForm, {
  type OvertimeFormValues,
} from "@/components/overtime-pay/OvertimeInputForm";
import WageResultTable from "@/components/overtime-pay/WageResultTable";
import WageSummaryCards from "@/components/overtime-pay/WageSummaryCards";
import { calculateLaborPay } from "@/lib/laborCalc";

const initialValues: OvertimeFormValues = {
  hourlyWage: 10_030,
  normalHours: 40,
  overtimeHours: 5,
  nightHours: 2,
  holidayHours: 0,
  isFiveOrMore: true,
};

export default function OvertimePaySimulator() {
  const [values, setValues] = useState<OvertimeFormValues>(initialValues);

  const result = useMemo(() => calculateLaborPay(values), [values]);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-8">
      <div className="min-w-0 space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:items-start">
          <OvertimeInputForm values={values} onChange={setValues} />
          <WageSummaryCards result={result} />
        </div>

        <AdUnit slotId="overtime-mid" label="Google AdSense" />

        <WageResultTable result={result} />

        <div className="border-t border-zinc-200 pt-10 pb-8">
          <LaborLawGuide />
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <AdUnit
            slotId="overtime-sidebar"
            className="min-h-[100px]"
            label="Google AdSense"
          />
        </div>
      </aside>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import AdUnit from "@/components/AdUnit";
import BenefitCalculatorForm, {
  type BenefitFormValues,
} from "@/components/unemployment-benefits/BenefitCalculatorForm";
import EligibilityChecker from "@/components/unemployment-benefits/EligibilityChecker";
import EmploymentLawGuide from "@/components/unemployment-benefits/EmploymentLawGuide";
import TimelineResult from "@/components/unemployment-benefits/TimelineResult";
import {
  calculateUnemploymentBenefit,
  isEligible,
  type EligibilityAnswers,
} from "@/lib/unemploymentCalc";

const initialAnswers: EligibilityAnswers = {
  worked180Days: null,
  involuntaryExit: null,
  ableToWork: null,
};

const initialForm: BenefitFormValues = {
  ageGroup: "under50",
  insuredYears: 3,
  insuredMonthsExtra: 0,
  averageDailyWage: 120_000,
};

export default function UnemploymentBenefitsSimulator() {
  const [answers, setAnswers] = useState<EligibilityAnswers>(initialAnswers);
  const [form, setForm] = useState<BenefitFormValues>(initialForm);

  const eligible = isEligible(answers);
  const locked = !eligible;

  const result = useMemo(() => {
    if (locked) return null;
    const insuredMonths = form.insuredYears * 12 + form.insuredMonthsExtra;
    return calculateUnemploymentBenefit({
      ageGroup: form.ageGroup,
      insuredMonths,
      averageDailyWage: form.averageDailyWage,
    });
  }, [form, locked]);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start lg:gap-8">
      <div className="min-w-0 space-y-6">
        <EligibilityChecker
          answers={answers}
          onChange={setAnswers}
          eligible={eligible}
        />

        <AdUnit slotId="unemployment-mid" label="Google AdSense" />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:items-start">
          <BenefitCalculatorForm
            values={form}
            onChange={setForm}
            locked={locked}
          />
          <TimelineResult result={result} locked={locked} />
        </div>

        <div className="border-t border-zinc-200 pt-10 pb-8">
          <EmploymentLawGuide />
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <AdUnit
            slotId="unemployment-sidebar"
            className="min-h-[100px]"
            label="Google AdSense"
          />
        </div>
      </aside>
    </div>
  );
}

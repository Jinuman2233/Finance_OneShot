"use client";

import { useCallback, useState } from "react";
import CalculatorForm from "@/components/CalculatorForm";
import ResultChart from "@/components/ResultChart";
import { useFinanceStore } from "@/store/useFinanceStore";
import type { CalculatorResult } from "@/utils/taxLogic";

export default function CalculatorPanel() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const setGrossSalary = useFinanceStore((s) => s.setGrossSalary);

  const handleResultChange = useCallback(
    (next: CalculatorResult) => {
      setResult(next);
      if (next.annualSalary > 0) {
        setGrossSalary(next.annualSalary);
      }
    },
    [setGrossSalary],
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
      <CalculatorForm onResultChange={handleResultChange} />
      <ResultChart result={result} />
    </div>
  );
}

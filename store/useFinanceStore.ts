import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FinanceState {
  /** 총급여 (연간, 원) — 연봉 계산기에서 설정 */
  grossSalary: number;
  setGrossSalary: (amount: number) => void;
  clearGrossSalary: () => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      grossSalary: 0,
      setGrossSalary: (amount) =>
        set({ grossSalary: Math.max(0, Number.isFinite(amount) ? amount : 0) }),
      clearGrossSalary: () => set({ grossSalary: 0 }),
    }),
    {
      name: "office-finance-toolkit",
      partialize: (state) => ({ grossSalary: state.grossSalary }),
    },
  ),
);

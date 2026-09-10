"use client";

import type { EligibilityAnswers } from "@/lib/unemploymentCalc";

interface EligibilityCheckerProps {
  answers: EligibilityAnswers;
  onChange: (answers: EligibilityAnswers) => void;
  eligible: boolean;
}

const questions: {
  key: keyof EligibilityAnswers;
  label: string;
  help: string;
}[] = [
  {
    key: "worked180Days",
    label: "이직일 이전 18개월 중 유급근로일 180일 이상인가요?",
    help: "고용보험 피보험 단위기간 합산 기준(일반적인 수급 요건)",
  },
  {
    key: "involuntaryExit",
    label: "비자발적 이직이거나, 자발적 퇴사라도 정당한 사유가 있나요?",
    help: "권고사직·계약만료·폐업 등 또는 법상 인정되는 자발적 퇴사 예외",
  },
  {
    key: "ableToWork",
    label: "근로 의사와 능력이 있고 구직 활동을 할 수 있나요?",
    help: "적극적 재취업 활동이 수급 유지 조건에 포함됩니다",
  },
];

function YesNo({
  value,
  onSelect,
}: {
  value: boolean | null;
  onSelect: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onSelect(true)}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          value === true
            ? "bg-indigo-600 text-white"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
        }`}
      >
        예
      </button>
      <button
        type="button"
        onClick={() => onSelect(false)}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          value === false
            ? "bg-zinc-700 text-white"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
        }`}
      >
        아니오
      </button>
    </div>
  );
}

export default function EligibilityChecker({
  answers,
  onChange,
  eligible,
}: EligibilityCheckerProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-zinc-900">1. 수급 자격 확인</h2>
      <p className="mt-1 text-sm text-zinc-500">
        아래 질문에 모두 &quot;예&quot;이면 금액 계산기가 활성화됩니다.
      </p>

      <ul className="mt-5 space-y-5">
        {questions.map((q) => (
          <li key={q.key} className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4">
            <p className="text-sm font-medium text-zinc-800">{q.label}</p>
            <p className="mt-1 text-xs text-zinc-500">{q.help}</p>
            <div className="mt-3">
              <YesNo
                value={answers[q.key]}
                onSelect={(v) => onChange({ ...answers, [q.key]: v })}
              />
            </div>
          </li>
        ))}
      </ul>

      <div
        className={`mt-5 rounded-xl px-4 py-3 text-sm ${
          eligible
            ? "bg-emerald-50 text-emerald-800"
            : "bg-amber-50 text-amber-900"
        }`}
      >
        {eligible
          ? "기본 수급 요건을 충족하는 것으로 보입니다. 아래에서 예상 금액을 계산하세요."
          : "요건을 충족하지 않거나 미응답 항목이 있습니다. 계산기는 잠긴 상태입니다. (최종 판단은 고용센터 기준)"}
      </div>
    </section>
  );
}

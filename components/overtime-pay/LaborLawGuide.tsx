export default function LaborLawGuide() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 text-zinc-700">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          연장·야간·휴일·주휴수당 가이드
        </h2>
        <p className="leading-relaxed">
          근로기준법상 가산수당과 주휴수당은 사업장 규모와 근로시간에 따라 달라질
          수 있습니다. 아래 내용은 한 지급 주기를 기준으로 이해할 때 도움이
          됩니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">주휴수당 지급 조건</h2>
        <p className="leading-relaxed">
          주휴수당은 사용자가 근로자에게 유급 주휴일을 부여하면서 지급하는
          수당입니다. 일반적으로 1주 동안의 소정근로시간이 15시간 이상이고,
          그 주의 소정근로일을 개근한 경우 지급 대상이 됩니다. 금액은 통상적으로
          1일분 통상임금(예: 주 40시간 기준이면 8시간분)에 해당하는 수준으로
          산정합니다. 본 계산기는 소정근로시간이 15시간 이상일 때
          &quot;시급 × 8 × (소정근로 ÷ 40)&quot; 근사식으로 주휴수당을
          추정합니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          5인 이상과 5인 미만의 차이
        </h3>
        <p className="leading-relaxed">
          상시 5명 이상 사업장에서는 연장·야간·휴일 근로에 대한 가산수당
          규정이 적용되는 경우가 많습니다. 연장·야간은 통상 50% 가산(1.5배),
          휴일은 8시간 이내 1.5배·초과분 2.0배가 대표적입니다. 5인 미만
          사업장은 일부 가산 규정이 적용되지 않을 수 있어, 본 도구에서는
          해당 선택 시 1.0배(가산 없음)로 단순화해 비교할 수 있게 했습니다.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">자주 묻는 질문(FAQ)</h2>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-zinc-900">
            Q1. 야간근로와 연장근로가 겹치면 어떻게 되나요?
          </h3>
          <p className="leading-relaxed">
            A. 야간(22시–06시)과 연장이 겹치는 시간은 각각의 가산이 함께
            고려될 수 있습니다. 본 계산기는 입력 항목을 구분해 산정하므로,
            겹치는 시간은 실제 근무표에 맞게 연장·야간 칸에 각각 반영해
            주세요.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-zinc-900">
            Q2. 주 15시간 미만이면 주휴수당이 없나요?
          </h3>
          <p className="leading-relaxed">
            A. 일반적으로 1주 소정근로시간이 15시간 미만이면 주휴수당 지급
            대상에서 제외되는 것으로 해석됩니다. 단, 계약·근무 형태에 따라
            다를 수 있으니 근로계약서와 취업규칙을 확인하세요.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-zinc-900">
            Q3. 포괄임금제면 이 계산기가 무의미한가요?
          </h3>
          <p className="leading-relaxed">
            A. 포괄임금 약정이 있더라도 가산수당이 법적으로 충분히 반영됐는지
            점검할 필요가 있습니다. 본 도구는 법정 가산·주휴의 대략적 규모를
            가늠하는 참고용이며, 분쟁·체불 판단은 전문가 상담을 권장합니다.
          </p>
        </div>
      </section>

      <p className="rounded-xl bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600">
        본 가이드와 계산 결과는 일반적인 정보 제공 목적이며 법률·노무 자문을
        대체하지 않습니다.
      </p>
    </article>
  );
}

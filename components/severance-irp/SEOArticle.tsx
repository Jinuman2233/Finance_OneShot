export default function SEOArticle() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 text-zinc-700">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          퇴직금·IRP, 숫자로 이해하기
        </h2>
        <p className="leading-relaxed">
          퇴직은 한 번의 현금 이벤트이지만, 수령 방식에 따라 세금과 장기 자산
          규모가 크게 달라질 수 있습니다. 아래 개념을 알면 시뮬레이터 결과를 더
          정확히 해석할 수 있습니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">1일 평균임금 계산법</h2>
        <p className="leading-relaxed">
          근로기준법상 평균임금은 산정해야 할 사유가 발생한 날 이전 3개월 동안
          근로자에게 지급된 임금의 총액을 그 기간의 총 일수로 나눈 금액입니다.
          기본급뿐 아니라 정기·일률적으로 지급되는 수당도 포함되는 경우가
          많습니다. 본 도구는 퇴사일을 기준으로 직전 3개월 구간의 일수를
          윤년을 포함해 일자 단위로 계산한 뒤, 입력하신 3개월 기본급·수당
          합계를 그 일수로 나누어 1일 평균임금을 구합니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          법정 퇴직금 산식
        </h3>
        <p className="leading-relaxed">
          계속근로기간 1년에 대해 30일분 이상의 평균임금을 퇴직금으로 지급하는
          것이 원칙입니다. 산식으로 표현하면{" "}
          <strong className="font-semibold text-zinc-900">
            퇴직금 = 1일 평균임금 × 30 × (총 재직 일수 ÷ 365)
          </strong>
          입니다. 재직 일수는 입사일부터 퇴사일까지를 포함해 계산하며, 2월 29일이
          포함된 기간도 실제 달력 일수로 반영합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">IRP 절세 원리</h2>
        <p className="leading-relaxed">
          퇴직금을 일반 계좌로 일시 수령하면 퇴직소득세(및 지방소득세)를 해당
          시점에 납부하게 됩니다. 반면 퇴직금을 IRP 등 연금계좌로 이체(이전)하면
          과세가 이연되고, 이후 연금 형태로 수령할 때 세액이 경감되는 구조가
          적용될 수 있습니다. 본 시뮬레이터는 이해를 돕기 위해, 연금 수령 시
          실효 세액이 일반 수령 대비 약 30% 줄어드는 경우를 가정해 비교합니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          운용 수익까지 보는 이유
        </h3>
        <p className="leading-relaxed">
          IRP로 이전한 금액은 금융상품으로 운용할 수 있습니다. 연 수익률과 운용
          기간을 가정하면 세후 원금에 복리가 더해진 미래 평가액을 가늠할 수
          있습니다. 수익률·기간은 참고용 가정이며, 원금 손실 가능성과 실제
          세제·중도 인출 제한은 가입 상품과 법령을 반드시 확인하세요.
        </p>
      </section>

      <p className="rounded-xl bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600">
        본 페이지의 계산과 설명은 일반적인 정보 제공 목적이며 세무·노무 자문을
        대체하지 않습니다. 개별 퇴직·연금 이전은 회사·금융기관·세무 전문가와
        확인하시기 바랍니다.
      </p>
    </article>
  );
}

export default function LandingSEOArticle() {
  return (
    <article className="mx-auto max-w-3xl space-y-10 text-zinc-700">
      <header className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          직장인 3대 필수 금융 지식
        </h2>
        <p className="leading-relaxed">
          월급명세서의 숫자만으로는 이직 조건, 퇴직 준비, 연말정산 환급을 한눈에
          비교하기 어렵습니다. 이 포털은 단일 과세연도 기준으로 실수령액,
          퇴직금·IRP, 연말정산 한도를 연결해 직장인이 매해 점검해야 할 핵심
          의사결정을 빠르게 돕습니다. 아래 세 가지 지식을 이해하면 도구 결과를
          더 정확히 해석할 수 있습니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          1. 연봉·실수령액 구조 이해하기
        </h2>
        <p className="leading-relaxed">
          세전 연봉(또는 월급)에서 국민연금, 건강보험, 장기요양보험, 고용보험이
          먼저 공제되고, 이어서 근로소득세와 지방소득세가 원천징수됩니다. 식대
          등 비과세 항목은 과세 대상과 4대 보험 산정 기준에서 제외되므로, 같은
          총액이라도 비과세 비중에 따라 실수령액이 달라집니다. 실수령액 계산기는
          해당 과세연도의 요율과 간이세액 근사치를 반영해 월·연 실수령액을
          추정합니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          총급여를 다른 도구와 연결하는 이유
        </h3>
        <p className="leading-relaxed">
          연말정산의 소득공제·세액공제 한도, IRP 납입 여유는 대개 총급여 규모에
          민감합니다. 실수령액 계산기에서 산출한 총급여를 포털에 저장해 두면,
          연말정산 시뮬레이터에서 같은 숫자를 다시 입력하지 않고 한도 계산을
          시작할 수 있습니다. 모든 계산은 단일 과세연도만 다루며, 여러 해에
          걸친 누적 합산은 반영하지 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          2. 퇴직금과 IRP 절세 효과
        </h2>
        <p className="leading-relaxed">
          법정 퇴직금은 평균임금과 근속기간을 기준으로 산정되고, 퇴직연금
          제도(DB/DC)에 따라 적립·지급 방식이 달라집니다. IRP(개인형 퇴직연금)에
          납입하면 해당 과세연도 세액공제 혜택을 받을 수 있어, 단순 저축보다
          세후 수익률이 유리해지는 경우가 많습니다. 퇴직금·IRP 시뮬레이터는
          예상 퇴직금 규모와 당해 연도 IRP 납입에 따른 절세 효과를 함께 보여
          이직·퇴직 전 현금흐름을 점검하도록 설계되었습니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          단일 과세연도 기준으로만 보는 절세
        </h3>
        <p className="leading-relaxed">
          IRP 세액공제율과 한도는 총급여 수준과 나이 등에 따라 달라질 수
          있습니다. 본 포털은 해당 연도의 납입액·한도·예상 절세액만 계산하며,
          2개년 누적 납입이나 다년도 이월 시나리오는 제공하지 않습니다. 실제
          공제액은 연말정산 서류와 국세청 기준을 최종 확인하세요.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          3. 연말정산 공제 한도를 미리 점검하기
        </h2>
        <p className="leading-relaxed">
          연말정산은 신용카드·체크카드 사용액, 의료비, 교육비, 기부금, 주택자금,
          연금계좌 납입 등 다양한 공제 항목이 총급여와 맞물려 환급·추가납부를
          결정합니다. 연말에 몰아서 확인하면 한도를 놓치기 쉬우므로, 과세연도
          중반에도 총급여 대비 사용·납입 현황을 시뮬레이션하는 것이 유리합니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          실수령액 계산기와 연동되는 초기값
        </h3>
        <p className="leading-relaxed">
          연말정산 시뮬레이터는 포털에 저장된 총급여를 불러와 공제 한도 계산의
          출발점으로 사용합니다. 총급여가 아직 없다면 페이지에서 직접 입력할 수
          있습니다. 결과는 참고용 근사치이며, 회사 원천징수·감면 특례·중도
          입퇴사 등 개별 사정에 따라 실제 정산 결과와 차이가 날 수 있습니다.
        </p>
      </section>

      <p className="rounded-xl bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600">
        본 콘텐츠와 계산 결과는 일반적인 정보 제공 목적이며 세무·노무 자문을
        대체하지 않습니다. 중요한 결정은 세무사·노무사 또는 관할 기관 상담을
        권장합니다.
      </p>
    </article>
  );
}

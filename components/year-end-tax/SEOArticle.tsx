export default function SEOArticle() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 text-zinc-700">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          연말정산, 소득공제와 세액공제부터
        </h2>
        <p className="leading-relaxed">
          연말정산은 한 과세연도 동안 원천징수한 세금과 실제로 내야 할 세금을
          맞추는 과정입니다. 공제 종류를 구분하면 카드 사용과 연금 납입을 어디에
          집중할지 판단하기 쉬워집니다.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">소득공제 vs 세액공제</h2>
        <p className="leading-relaxed">
          소득공제는 과세표준(세금을 매기는 소득) 자체를 줄여 줍니다. 신용카드·
          체크카드·현금영수증 사용금액 소득공제가 대표적입니다. 총급여의 25%를
          넘는 사용분에 대해 카드 종류별 공제율이 적용되고, 연간 공제 한도가
          있습니다. 줄어든 과세표준에 한계세율을 곱한 만큼 세금이 줄어드는
          효과가 납니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          세액공제는 세금에서 직접 차감
        </h3>
        <p className="leading-relaxed">
          세액공제는 산출세액에서 금액을 바로 빼는 방식입니다. 연금저축·IRP
          납입액 세액공제가 여기에 해당합니다. 납입 한도(합산 최대 900만 원)와
          총급여에 따른 공제율(예: 5,500만 원 이하 16.5%, 초과 13.2%)을 적용해
          환급·추가납부에 직접 반영됩니다. 본 시뮬레이터는 소득공제 절세
          추정치와 연금 세액공제를 더해 당해 연도 예상 환급을 보여 줍니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          신용카드 황금 비율 팁
        </h2>
        <p className="leading-relaxed">
          총급여의 25%까지는 어떤 수단으로 써도 소득공제 대상이 되지 않는
          &quot;문턱&quot;입니다. 문턱을 넘긴 뒤에는 체크카드·현금영수증(30%)이
          신용카드(15%)보다 공제율이 높습니다. 따라서 일상 고정 지출로 문턱을
          채운 뒤, 초과분은 체크·현금 비중을 높이는 전략이 유리한 경우가
          많습니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          한도와 연금 납입을 함께 보기
        </h3>
        <p className="leading-relaxed">
          카드 소득공제에는 연간 한도가 있어, 사용액을 무한정 늘려도 절세가
          비례하지 않습니다. 한도에 가까워지면 IRP·연금계좌 납입으로 세액공제를
          채우는 편이 효율적일 수 있습니다. 슬라이더로 추가 체크 사용과 추가
          IRP 납입을 조절해, 같은 과세연도 안에서 환급이 얼마나 늘어나는지
          비교해 보세요.
        </p>
      </section>

      <p className="rounded-xl bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600">
        본 콘텐츠와 계산 결과는 일반적인 정보 제공 목적이며 세무 자문을
        대체하지 않습니다. 최종 신고는 국세청 자료와 전문가 확인을 권장합니다.
      </p>
    </article>
  );
}

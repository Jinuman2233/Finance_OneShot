export default function EmploymentLawGuide() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 text-zinc-700">
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
          실업급여(구직급여) 이해하기
        </h2>
        <p className="leading-relaxed">
          구직급여는 실직 후 재취업 활동을 하는 동안 생계를 지원하는 고용보험
          급여입니다. 수급 요건·일액·소정급여일수는 이직 사유와 가입 이력에 따라
          달라지며, 본 계산기는 한 번의 수급 신청(단일 사건)을 기준으로
          예상치를 보여 줍니다.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          자발적 퇴사자 실업급여 수급 예외 사유 5가지
        </h2>
        <p className="leading-relaxed">
          스스로 사직한 경우에도 고용보험법·관련 고시에서 정한 &quot;정당한
          이직 사유&quot;가 인정되면 구직급여를 받을 수 있는 경우가 있습니다.
          아래는 현장에서 자주 언급되는 대표 예외 유형입니다. 실제 인정 여부는
          고용센터의 수급자격 심사를 거쳐야 합니다.
        </p>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-900">
            1. 임금 체불·최저임금 미달
          </h3>
          <p className="leading-relaxed">
            약정 임금을 지급받지 못하거나, 최저임금에 미달하는 임금을 받은
            기간이 일정 기준을 넘는 경우 등 임금 관련 위법이 이직의 정당한
            사유로 인정될 수 있습니다. 급여명세서·체불 내역 등 증빙이
            중요합니다.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-900">
            2. 직장 내 괴롭힘·성희롱·폭행 등
          </h3>
          <p className="leading-relaxed">
            직장 내 괴롭힘, 성희롱, 폭행·협박 등으로 근로를 계속하기 어려운
            사정이 인정되면 자발적 퇴사라도 수급이 가능할 수 있습니다. 신고
            기록, 진술, 관련 조사 자료가 도움이 됩니다.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-900">
            3. 사업장 이전·통근 곤란
          </h3>
          <p className="leading-relaxed">
            사업장 이전, 전근 등으로 통근이 현저히 곤란해진 경우(거리·시간
            기준을 충족하는 때) 정당한 이직 사유로 볼 수 있습니다. 이전 전후
            주소·사업장 위치·통근 시간 자료를 준비하세요.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-900">
            4. 본인·가족 질병·부상으로 간호·요양 필요
          </h3>
          <p className="leading-relaxed">
            본인 또는 부모·배우자·자녀 등 가족의 질병·부상으로 간호나 요양이
            필요해 계속 근로가 어려운 경우, 진단서 등 의료 증빙과 함께 예외가
            검토될 수 있습니다.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-900">
            5. 임신·출산·군 입대 등 법령상 인정 사유
          </h3>
          <p className="leading-relaxed">
            임신·출산·육아, 병역 의무 이행 등 법령이 열거하는 사유로 이직한
            경우에도 요건을 충족하면 수급이 가능할 수 있습니다. 해당 사유별
            필요 서류는 관할 고용센터 안내를 확인하세요.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          일액·소정급여일수와 신청 시 유의사항
        </h2>
        <p className="leading-relaxed">
          구직급여 일액은 원칙적으로 1일 평균임금의 60%이며, 상한액·하한액
          범위에서 정해집니다. 소정급여일수는 연령(또는 장애인 여부)과
          고용보험 가입 기간에 따라 120일부터 270일까지입니다. 수급 중에는
          구직활동 의무 이행과 취업·소득 신고가 필요하며, 허위 신고 시 급여
          중단·반환 등이 있을 수 있습니다.
        </p>
        <h3 className="text-lg font-semibold text-zinc-900">
          증빙과 최종 판단
        </h3>
        <p className="leading-relaxed">
          이직확인서, 임금 체불 자료, 진단서, 통근 거리 증빙 등은 수급자격
          심사에 직접 영향을 줍니다. 본 페이지의 질문·계산은 자가 점검용
          참고치이며, 최종 수급 여부와 금액은 고용센터 결정을 따릅니다.
        </p>
      </section>

      <p className="rounded-xl bg-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600">
        본 콘텐츠와 계산 결과는 일반적인 정보 제공 목적이며 법률·고용보험 행정
        판단을 대체하지 않습니다.
      </p>
    </article>
  );
}

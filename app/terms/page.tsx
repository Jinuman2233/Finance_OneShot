import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "직장인 금융 툴킷 이용약관. 모의 계산 서비스의 이용 조건, 면책, 지적재산권 및 광고 게재를 안내합니다.",
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50">
      <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold text-blue-600 not-prose">Legal</p>
        <h1>이용약관</h1>
        <p className="lead text-slate-500">최종 업데이트: 2026년 9월 10일</p>

        <h2>1. 목적</h2>
        <p>
          본 약관은 직장인 금융 툴킷(이하 &quot;서비스&quot;)이 제공하는 웹
          기반 모의 계산 도구의 이용 조건과 운영자·이용자 간의 권리·의무를
          규정합니다.
        </p>

        <h2>2. 서비스의 성격</h2>
        <p>
          서비스는 연봉 실수령액, 퇴직금·IRP, 연말정산, 연장근로·주휴수당,
          실업급여 등에 대한 참고용 시뮬레이션을 제공합니다. 모든 결과는 모의
          계산이며 법적 효력을 갖지 않고, 실제 수령액·지급액·공제액과 다를 수
          있습니다. 정확한 산정과 법적 판단은 노무사·세무사 등 전문가 또는
          관할 기관의 안내를 따르시기 바랍니다.
        </p>

        <h2>3. 이용자의 책임</h2>
        <p>
          이용자는 입력 정보의 정확성에 대해 스스로 책임지며, 서비스 결과를
          유일한 의사결정 근거로 삼아서는 안 됩니다. 서비스를 불법·부정한
          목적이나 시스템 안정성을 해치는 방식으로 이용해서는 안 됩니다.
        </p>

        <h2>4. 광고 및 제3자 서비스</h2>
        <p>
          서비스 운영을 위해 Google AdSense, Google Analytics 등 제3자 광고·분석
          도구가 사용될 수 있습니다. 제3자 쿠키 및 유사 기술에 관한 세부 사항은
          개인정보처리방침을 참고하시기 바랍니다.
        </p>

        <h2>5. 지적재산권</h2>
        <p>
          서비스에 게시된 문구, 디자인, 코드 구조 등에 대한 권리는 관련 법령이
          정하는 범위에서 운영자에게 귀속되거나 적법한 라이선스에 따릅니다.
          무단 복제·배포를 금합니다.
        </p>

        <h2>6. 면책</h2>
        <p>
          운영자는 서비스 제공의 중단, 오류, 데이터 손실, 이용자가 서비스
          결과를 신뢰하여 발생한 손해에 대해 법령이 허용하는 최대 범위 내에서
          책임을 지지 않습니다. 천재지변, 통신 장애, 제3자 서비스 장애 등
          불가항력 사유에 대해서도 동일합니다.
        </p>

        <h2>7. 약관의 변경</h2>
        <p>
          운영자는 필요한 경우 본 약관을 개정할 수 있으며, 중요 변경 시 본
          페이지에 게시합니다. 변경 이후에도 서비스를 계속 이용하면 개정
          약관에 동의한 것으로 볼 수 있습니다.
        </p>

        <h2>8. 문의</h2>
        <p>
          이용약관 관련 문의:{" "}
          <a href="mailto:support@salaryoneshot.com">
            support@salaryoneshot.com
          </a>
        </p>

        <p className="not-prose mt-10">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← 홈으로 돌아가기
          </Link>
        </p>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "직장인 금융 툴킷 개인정보처리방침. Google AdSense 등 제3자 쿠키·광고 안내와 클라이언트 측 계산 원칙을 안내합니다.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50">
      <article className="prose prose-slate mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm font-semibold text-blue-600 not-prose">Legal</p>
        <h1>개인정보처리방침</h1>
        <p className="lead text-slate-500">최종 업데이트: 2026년 9월 10일</p>

        <h2>1. 개요</h2>
        <p>
          직장인 금융 툴킷(이하 &quot;본 서비스&quot;)은 연봉 실수령액, 퇴직금·IRP,
          연말정산, 연장근로·주휴수당, 실업급여 등 시뮬레이션 도구를 제공합니다.
          본 방침은 서비스 이용 과정에서 정보가 어떻게 처리되는지를 설명합니다.
        </p>

        <h2>2. 금융 계산 데이터의 처리</h2>
        <p>
          본 서비스의 모든 금융 계산 입력값과 결과는 사용자의 브라우저에서만
          처리됩니다(Client-side). 급여·공제·납입액 등 개인 금융 데이터는 당사
          서버로 전송되거나 저장되지 않습니다. 일부 값은 이용 편의를 위해
          브라우저 로컬 저장소에만 임시 보관될 수 있으며, 기기에서 삭제하면
          함께 제거됩니다.
        </p>

        <h2>3. 쿠키 및 제3자 광고·분석</h2>
        <p>
          본 서비스는 Google AdSense, Google Analytics 등 제3자 서비스를 사용할
          수 있습니다. Google을 포함한 제3자 공급업체는 쿠키를 사용하여 사용자의
          이전 웹사이트 방문 기록을 바탕으로 광고를 게재하거나 이용 통계를
          수집할 수 있습니다.
        </p>
        <p>
          사용자는{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google 광고 설정
          </a>
          에서 맞춤 광고를 옵트아웃할 수 있으며,{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>
          를 통해 제3자 맞춤 광고 쿠키 사용을 거부할 수 있습니다.
        </p>

        <h2>4. 자동 수집될 수 있는 정보</h2>
        <p>
          호스팅·보안 목적으로 IP 주소, 브라우저 유형, 방문 시각 등 일반적인 접속
          로그가 인프라 제공업체에 의해 생성될 수 있습니다. 이는 금융 계산
          입력값과는 별개의 웹 운영 로그입니다.
        </p>

        <h2>5. 개인정보의 제3자 제공</h2>
        <p>
          당사는 사용자가 계산기에 입력한 금융 데이터를 판매·임대하지 않습니다.
          다만 광고·분석 목적의 제3자 스크립트가 기기에서 쿠키·유사 식별자를
          처리할 수 있으며, 해당 처리에는 각 사업자의 정책을 따릅니다.
        </p>

        <h2>6. 문의</h2>
        <p>
          개인정보 관련 문의:{" "}
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

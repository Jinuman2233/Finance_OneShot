import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "Office Finance Toolkit 개인정보처리방침. Google 등 제3자 쿠키·광고 안내와 클라이언트 측 금융 계산 원칙을 안내합니다.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm font-semibold text-blue-600">Legal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
          개인정보처리방침
        </h1>
        <p className="mt-3 text-sm text-zinc-500">최종 업데이트: 2026년 9월 9일</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-700 sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">1. 개요</h2>
            <p>
              Office Finance Toolkit(이하 &quot;본 서비스&quot;)은 직장인을 위한
              실수령액·퇴직금·연말정산 시뮬레이션 도구를 제공합니다. 본
              개인정보처리방침은 서비스 이용 과정에서 정보가 어떻게 처리되는지
              설명합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">
              2. 금융 계산 데이터의 처리 (클라이언트 측)
            </h2>
            <p>
              본 서비스의 모든 금융 계산(연봉 실수령액, 퇴직금·IRP, 연말정산
              관련 입력값 및 결과)은 사용자의 브라우저에서만 수행됩니다
              (Client-side). 입력하신 급여, 공제, 납입액 등 개인 금융 데이터는
              당사 서버로 전송되거나 저장되지 않습니다.
            </p>
            <p>
              일부 화면에서는 이용 편의를 위해 브라우저의 로컬 저장소(Local
              Storage)에 총급여 등 값을 임시로 보관할 수 있습니다. 이 데이터는
              사용자 기기 안에만 존재하며, 당사가 수집·보관하지 않습니다. 기기
              또는 브라우저 저장 데이터를 삭제하면 함께 제거됩니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">
              3. 쿠키 및 제3자 광고 (Google AdSense)
            </h2>
            <p>
              본 서비스는 광고 수익을 위해 Google AdSense 등 제3자 광고 서비스를
              사용할 수 있습니다. Google을 포함한 제3자 공급업체는 쿠키를
              사용하여 사용자의 이전 웹사이트 방문 기록을 바탕으로 광고를
              게재합니다.
            </p>
            <p>
              Google의 광고 쿠키 사용을 통해 Google과 그 파트너는 사용자에게
              본인 또는 다른 사이트 방문 이력을 기반으로 한 광고를 게재할 수
              있습니다. 사용자는{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline-offset-2 hover:underline"
              >
                Google 광고 설정
              </a>
              에서 맞춤 광고를 옵트아웃할 수 있습니다. 또는{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline-offset-2 hover:underline"
              >
                aboutads.info
              </a>
              를 방문하여 제3자 공급업체의 맞춤 광고 쿠키 사용을 거부할 수
              있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">
              4. 수집하는 정보의 범위
            </h2>
            <p>
              당사는 금융 계산 입력값을 서버에 수집하지 않습니다. 다만 웹사이트
              운영을 위해 호스팅·접속 로그(예: IP, 브라우저 유형, 방문 시각)가
              인프라 제공업체에 의해 자동 생성될 수 있으며, 이는 서비스 안정성·
              보안 목적의 일반적인 웹 로그입니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">5. 면책</h2>
            <p>
              본 서비스의 계산 결과는 참고용 추정치이며, 세무·노무·법률 자문을
              대체하지 않습니다. 중요한 결정은 세무사·노무사 등 전문가 또는
              관할 기관의 안내를 따르시기 바랍니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900">6. 문의</h2>
            <p>
              개인정보처리방침에 관한 문의는 서비스 운영 채널을 통해 연락해
              주세요. 본 방침은 관련 법령 및 서비스 변경에 따라 개정될 수
              있으며, 중요 변경 시 본 페이지에 게시합니다.
            </p>
          </section>
        </div>

        <p className="mt-12">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← 홈으로 돌아가기
          </Link>
        </p>
      </main>
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f8fafc",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "직장인 금융 툴킷 | 실수령액·퇴직금 IRP·연말정산 계산기",
    template: "%s | Office Finance Toolkit",
  },
  description:
    "무료 직장인 금융 계산 포털. 연봉 실수령액, 퇴직금·IRP 절세, 연말정산 환급을 브라우저에서 즉시 시뮬레이션하세요. 개인 금융 데이터는 서버로 전송되지 않습니다.",
  keywords: [
    "연봉 실수령액 계산기",
    "월급 실수령액",
    "4대보험 계산",
    "퇴직금 계산기",
    "IRP 절세",
    "퇴직소득세",
    "연말정산 시뮬레이터",
    "신용카드 소득공제",
    "직장인 금융",
    "Office Finance Toolkit",
  ],
  authors: [{ name: "Office Finance Toolkit" }],
  creator: "Office Finance Toolkit",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "직장인 금융 툴킷 | 실수령액·퇴직금 IRP·연말정산 계산기",
    description:
      "실수령액, 퇴직금·IRP, 연말정산을 한곳에서. 계산은 브라우저에서만 수행되며 서버에 금융 데이터를 저장하지 않습니다.",
    url: siteUrl,
    siteName: "Office Finance Toolkit",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "직장인 금융 툴킷 | 실수령액·퇴직금 IRP·연말정산",
    description:
      "직장인을 위한 무료 실수령액·퇴직금·연말정산 시뮬레이션 포털",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-zinc-900">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2529486640514775"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

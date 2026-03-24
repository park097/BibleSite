import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal"
    }
  ],
  variable: "--font-pretendard",
  display: "swap"
});

export const metadata: Metadata = {
  title: "성경 암송 대회",
  description: "말씀을 마음에 새기다. 참가 신청, 시험, 랭킹, 관리자 기능을 포함한 성경 암송 대회 웹사이트"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} ${pretendard.variable} font-sans text-ink`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}


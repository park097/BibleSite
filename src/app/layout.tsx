import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "성경 암송 대회",
  description: "행사 안내, 참가 신청, 공지사항, 갤러리, 관리자 기능을 포함한 성경 암송 대회 웹사이트"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${playfair.variable} ${pretendard.className} bg-background font-sans text-ink`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

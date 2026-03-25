import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listNotices } from "@/lib/repositories";

const noticeVisuals = [
  {
    src: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
    alt: "햇살이 비치는 교회 외관"
  },
  {
    src: "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1200&q=80",
    alt: "예배당 내부와 스테인드글라스"
  },
  {
    src: "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?auto=format&fit=crop&w=1200&q=80",
    alt: "기도를 위한 교회 좌석과 창"
  }
] as const;

export default async function NoticePage() {
  const notices = await listNotices();

  return (
    <main className="page-shell pb-20">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1800&q=80"
            alt="노을빛의 교회 전경"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,24,20,0.76)_10%,rgba(25,24,20,0.36)_52%,rgba(25,24,20,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(236,148,106,0.42),transparent_24%),radial-gradient(circle_at_50%_0%,rgba(242,216,166,0.28),transparent_30%)]" />
        <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center px-4 py-20 md:px-6">
          <div className="max-w-3xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#f0dbc3]">Notices</p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-wide md:text-6xl">
              공동체 소식과 행사 안내를
              <br />
              교회 분위기 안에서 정리했습니다
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/82 md:text-base">
              준비 일정, 예배당 운영, 참가 관련 변동 사항을 한눈에 확인할 수 있도록 공지 화면을 따뜻한 교회 무드의
              비주얼 카드로 재구성했습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14 md:px-6">
        <SectionHeading
          eyebrow="Church Bulletin"
          title="공지사항"
          description="운영 안내와 현장 공지를 예배당 톤의 카드 레이아웃으로 확인할 수 있습니다."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {notices.map((notice) => (
            <Link key={notice.id} href={`/notice/${notice.id}`}>
              <Card className="h-full overflow-hidden rounded-[30px] border border-white/70 bg-white/80 p-0 transition duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={noticeVisuals[(notice.id - 1) % noticeVisuals.length].src}
                    alt={noticeVisuals[(notice.id - 1) % noticeVisuals.length].alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,68,0.06),rgba(15,42,68,0.7))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#f1ddc5]">
                      {new Date(notice.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight">{notice.title}</h3>
                  </div>
                </div>
                <div className="p-7">
                  <p className="line-clamp-4 text-sm leading-7 text-ink/72">{notice.content}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

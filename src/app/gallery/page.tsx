import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listGalleryItems } from "@/lib/repositories";

function isVideo(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

export default async function GalleryPage() {
  const gallery = await listGalleryItems();

  return (
    <main className="page-shell pb-20">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1800&q=80"
            alt="빛이 들어오는 교회 내부"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,24,34,0.76)_6%,rgba(14,24,34,0.38)_52%,rgba(14,24,34,0.74)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,184,139,0.28),transparent_18%),radial-gradient(circle_at_75%_18%,rgba(255,230,186,0.2),transparent_22%)]" />
        <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center px-4 py-20 md:px-6">
          <div className="max-w-3xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#f0dbc3]">Gallery</p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-wide md:text-6xl">
              예배와 공동체의 장면을
              <br />
              교회 감성의 아카이브로 담았습니다
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/82 md:text-base">
              갤러리도 공지와 같은 톤으로 맞춰, 사진과 영상을 단순 썸네일이 아니라 현장 분위기가 살아 있는 기록처럼
              보이도록 구성했습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14 md:px-6">
        <SectionHeading
          eyebrow="Church Archive"
          title="행사 갤러리"
          description="예배당 전경, 공동체 순간, 준비 과정을 깊이감 있는 카드와 오버레이로 정리했습니다."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gallery.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden rounded-[30px] border border-white/70 bg-white/80 p-0 shadow-soft"
            >
              <div className="relative aspect-[4/3] bg-[#d7c4a3]/35">
                {isVideo(item.imageUrl) ? (
                  <video controls className="h-full w-full object-cover">
                    <source src={item.imageUrl} />
                  </video>
                ) : (
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,25,0.02),rgba(10,17,25,0.55))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(247,190,145,0.24),transparent_20%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#f3deca]">
                    {new Date(item.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight">{item.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-7 text-ink/65">현장 기록 아카이브</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

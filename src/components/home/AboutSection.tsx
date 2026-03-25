import Image from "next/image";
import { FadeIn } from "@/components/home/FadeIn";

type AboutSectionProps = {
  overview: Array<{ label: string; value: string }>;
  features: Array<{ title: string; description: string }>;
};

const welcomeImages = [
  {
    src: "https://unsplash.com/photos/CKcUQleRveg/download?force=true&w=900",
    alt: "햇살 아래 교회 외관",
    position: "object-center"
  },
  {
    src: "https://unsplash.com/photos/Pyb5Ky_degE/download?force=true&w=900",
    alt: "노트북과 성경이 놓인 디지털 신청 환경",
    position: "object-center"
  },
  {
    src: "https://unsplash.com/photos/xW_Jr30gSVg/download?force=true&w=900",
    alt: "예배당 안 공동체 장면",
    position: "object-center"
  }
] as const;

export function AboutSection({ overview, features }: AboutSectionProps) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-accent">Welcome</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-wide text-primary md:text-5xl">
            믿음의 여정을 함께하는 따뜻한 초대
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-muted">
            공동체와 함께 말씀을 나누고, 준비와 참여의 모든 과정을 편안하게 안내하는 교회 행사 홈페이지입니다.
          </p>
        </FadeIn>

        <div className="mt-6 grid gap-4 text-center text-sm text-muted md:grid-cols-3">
          {overview.map((item) => (
            <div key={item.label} className="rounded-lg bg-secondary px-6 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">{item.label}</p>
              <p className="mt-3 text-base text-primary">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.08} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-primary/6 transition duration-300 hover:scale-105 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={welcomeImages[index].src}
                    alt={welcomeImages[index].alt}
                    fill
                    className={`${welcomeImages[index].position} object-cover transition duration-700 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,68,0.04),rgba(15,42,68,0.28))]" />
                </div>
                <div className="flex flex-1 flex-col p-6 text-center">
                  <h3 className="min-h-16 font-serif text-2xl font-semibold tracking-wide text-primary">{feature.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted">{feature.description}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/home/FadeIn";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1800&q=80"
          alt="교회 실내 이미지"
          fill
          className="object-cover blur-[1px] transition duration-700 hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-[rgba(15,42,68,0.72)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-secondary/80">Help Us Spread</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold tracking-wide text-white md:text-5xl">
            말씀의 기쁨이 더 넓게 전해지도록 함께해 주세요
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/78">
            참가자와 교회 공동체를 위한 행사 운영, 안내, 기록 아카이브를 더욱 풍성하게 만들 수 있도록 함께해 주세요.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/competition"
              variant="ghost"
              className="min-w-44 rounded-lg border-white/60 text-white hover:bg-white hover:text-primary"
            >
              Read More
            </Button>
            <Button href="/register" className="min-w-44 rounded-lg">
              Donate
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

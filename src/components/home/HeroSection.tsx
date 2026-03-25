import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/home/FadeIn";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  description: string;
};

export function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  return (
    <section className="relative flex h-[70vh] min-h-[560px] items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://unsplash.com/photos/1UvZo5u2aMc/download?force=true&w=1800"
          alt="붉은 하늘 아래 야외 교회 전경"
          fill
          priority
          className="animate-subtle-zoom object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,21,18,0.68)_10%,rgba(24,21,18,0.34)_48%,rgba(24,21,18,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(236,148,106,0.36),transparent_22%),radial-gradient(circle_at_52%_0%,rgba(242,216,166,0.18),transparent_30%)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-secondary/90">{subtitle}</p>
          <h1 className="mt-6 font-serif text-4xl font-semibold tracking-wide text-white md:text-6xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/82 md:text-base">{description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/register" className="min-w-48">참가 신청하기</Button>
            <Button href="/competition" variant="secondary" className="min-w-48 rounded-lg border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              행사 안내 보기
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

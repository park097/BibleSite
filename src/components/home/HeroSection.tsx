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
    <section className="relative min-h-[100svh] overflow-hidden border-b border-[#d8cdbf] bg-parchment text-white">
      <Image
        src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1800&q=80"
        alt="교회 예배당 이미지"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(82,62,40,0.30),rgba(78,59,38,0.55))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,169,106,0.28),transparent_44%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f4efea] to-transparent" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-6 py-32 text-center">
        <FadeIn className="max-w-4xl">
          <p className="text-xs font-light uppercase tracking-[0.5em] text-white/78">Bible Memory Festival</p>
          <h1 className="mt-8 text-5xl font-light leading-[1.04] tracking-[0.14em] text-white md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 text-lg font-light tracking-[0.18em] text-white/82 md:text-xl">{subtitle}</p>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-white/74 md:text-base">{description}</p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/competition"
              variant="secondary"
              className="min-w-44 border border-primary bg-primary px-8 py-3 text-xs font-medium uppercase tracking-[0.26em] text-ink hover:bg-primary"
            >
              대회 안내 보기
            </Button>
            <Button
              href="/register"
              variant="ghost"
              className="min-w-44 border border-white/35 bg-transparent px-8 py-3 text-xs font-medium uppercase tracking-[0.26em] text-white hover:bg-transparent"
            >
              지금 참가하기
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

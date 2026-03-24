import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/home/FadeIn";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#d8cdbf] bg-secondary py-28 text-white">
      <Image
        src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1800&q=80"
        alt="교회 스테인드글라스 이미지"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(98,76,50,0.48),rgba(98,76,50,0.56))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,169,106,0.22),transparent_42%)]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.38em] text-white/78">Prayer & Support</p>
          <h2 className="mt-6 text-4xl font-light tracking-[0.10em] text-white md:text-5xl">
            말씀을 세우는 사역에 함께해 주세요
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/78">
            참가자들이 말씀을 더 사랑하도록 돕는 교회 행사입니다. 안내를 더 읽어보거나, 운영과 시상을 위한
            후원 안내를 확인할 수 있습니다.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/competition"
              className="min-w-44 border border-primary bg-primary px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] text-ink hover:bg-primary"
            >
              Read More
            </Button>
            <Button
              href="/register"
              variant="ghost"
              className="min-w-44 border border-white/35 bg-transparent px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] text-white hover:bg-transparent"
            >
              Donate
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

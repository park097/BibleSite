import { FadeIn } from "@/components/home/FadeIn";

type AboutSectionProps = {
  overview: Array<{ label: string; value: string }>;
  features: Array<{ title: string; description: string }>;
};

export function AboutSection({ overview, features }: AboutSectionProps) {
  return (
    <section className="border-b border-[#d8cdbf] bg-parchment py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.38em] text-primary">Welcome</p>
          <h2 className="mt-6 text-4xl font-light tracking-[0.08em] text-ink md:text-5xl">
            말씀을 깊이 새기고 공동체와 함께 나누는 시간
          </h2>
          <p className="mt-8 text-sm leading-8 text-muted">
            성경 암송 대회는 세대와 부서를 넘어 함께 말씀을 기억하고 삶 속에 새기기 위한 교회 행사입니다.
            신청부터 시험, 자동 채점, 결과 확인과 랭킹까지 자연스럽게 이어지도록 구성했습니다.
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-0 border-y border-[#d8cdbf] px-6 md:grid-cols-3">
        {overview.map((item, index) => (
          <FadeIn key={item.label} delay={index * 0.08} className="border-b border-[#d8cdbf] py-10 text-center last:border-b-0 md:border-b-0 md:px-8 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[#d8cdbf]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted">{item.label}</p>
            <p className="mt-4 text-lg font-light leading-8 text-ink">{item.value}</p>
          </FadeIn>
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-10 px-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <FadeIn key={feature.title} delay={index * 0.08} className="border-t border-[#d8cdbf] pt-6 text-center">
            <p className="text-sm uppercase tracking-[0.28em] text-primary">{feature.title}</p>
            <p className="mt-4 text-sm leading-7 text-muted">{feature.description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

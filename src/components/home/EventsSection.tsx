import { FadeIn } from "@/components/home/FadeIn";

type EventItem = {
  step: string;
  date: string;
};

type EventsSectionProps = {
  items: EventItem[];
};

export function EventsSection({ items }: EventsSectionProps) {
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-accent">Next Events</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-wide text-primary md:text-5xl">주요 일정</h2>
        </FadeIn>

        <div className="mt-12 grid divide-y divide-accent/40 border-y border-accent/40 md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.slice(0, 3).map((item, index) => (
            <FadeIn key={item.step} delay={index * 0.08} className="px-6 py-8 text-center md:px-7 md:py-9">
              <p className="text-lg font-semibold uppercase tracking-[0.2em] text-primary md:text-xl">{item.date}</p>
              <p className="mt-2 font-serif text-3xl text-primary">{item.step}</p>
              <p className="mt-2 text-sm leading-6 text-muted">성경 암송 대회 {item.step} 일정 안내</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

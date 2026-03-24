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
    <section className="border-b border-[#d3c5b3] bg-secondary py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.38em] text-primary">Events</p>
          <h2 className="mt-6 text-4xl font-light tracking-[0.08em] text-ink md:text-5xl">대회 일정</h2>
        </FadeIn>

        <div className="mt-16 grid border-y border-[#d3c5b3] md:grid-cols-3">
          {items.map((item, index) => (
            <FadeIn
              key={item.step}
              delay={index * 0.08}
              className="flex flex-col items-center justify-center border-b border-[#d3c5b3] px-8 py-14 text-center last:border-b-0 md:border-b-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[#d3c5b3]"
            >
              <p className="text-4xl font-light tracking-[0.12em] text-primary md:text-5xl">{item.step}</p>
              <p className="mt-5 text-sm uppercase tracking-[0.26em] text-muted">Schedule</p>
              <p className="mt-4 text-sm leading-8 text-ink">{item.date}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

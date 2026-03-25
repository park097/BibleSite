import { HeroSection } from "@/components/home/HeroSection";
import { EventsSection } from "@/components/home/EventsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/home/CtaSection";
import { competitionInfo, homeSections } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="page-shell">
      <HeroSection
        title={competitionInfo.title}
        subtitle="Spring 2026 Bible Memory Festival"
        description={competitionInfo.description}
      />
      <EventsSection items={homeSections.schedule} />
      <AboutSection overview={homeSections.overview} features={homeSections.features} />
      <CtaSection />
    </main>
  );
}

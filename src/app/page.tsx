import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { EventsSection } from "@/components/home/EventsSection";
import { ImageGallerySection } from "@/components/home/ImageGallerySection";
import { CtaSection } from "@/components/home/CtaSection";
import { competitionInfo, homeSections } from "@/lib/data";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    alt: "성경 위의 빛"
  },
  {
    src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
    alt: "예배당 내부"
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
    alt: "기도하는 손"
  }
];

export default function HomePage() {
  return (
    <main>
      <HeroSection
        title={competitionInfo.title}
        subtitle={competitionInfo.subtitle}
        description={competitionInfo.description}
      />
      <AboutSection overview={homeSections.overview} features={homeSections.features} />
      <EventsSection items={homeSections.schedule} />
      <ImageGallerySection images={galleryImages} />
      <CtaSection />
    </main>
  );
}

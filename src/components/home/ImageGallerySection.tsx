import Image from "next/image";
import { FadeIn } from "@/components/home/FadeIn";

type ImageItem = {
  src: string;
  alt: string;
};

type ImageGallerySectionProps = {
  images: ImageItem[];
};

export function ImageGallerySection({ images }: ImageGallerySectionProps) {
  return (
    <section className="border-b border-[#d8cdbf] bg-parchment py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.38em] text-primary">Gallery</p>
          <h2 className="mt-6 text-4xl font-light tracking-[0.08em] text-ink md:text-5xl">말씀과 공동체의 순간들</h2>
        </FadeIn>
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {images.map((image, index) => (
            <FadeIn key={image.src} delay={index * 0.08}>
              <div className="relative aspect-[4/5] overflow-hidden border border-[#d8cdbf] bg-secondary">
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

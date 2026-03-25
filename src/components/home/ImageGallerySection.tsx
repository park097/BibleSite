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
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-accent">Gallery</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-wide text-primary md:text-5xl">말씀과 공동체의 순간들</h2>
        </FadeIn>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {images.map((image, index) => (
            <FadeIn key={image.src} delay={index * 0.08}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-background shadow-sm ring-1 ring-primary/8">
                <Image src={image.src} alt={image.alt} fill className="object-cover transition duration-700 group-hover:scale-110" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center md:mb-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.38em] text-accent">{eyebrow}</p>
      <h2 className="font-serif text-4xl font-semibold tracking-wide text-primary md:text-5xl">{title}</h2>
      {description ? <p className="mx-auto mt-4 max-w-3xl text-sm leading-8 text-muted">{description}</p> : null}
    </div>
  );
}

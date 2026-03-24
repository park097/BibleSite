type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-secondary">{eyebrow}</p>
      <h2 className="font-sans text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/75">{description}</p> : null}
    </div>
  );
}

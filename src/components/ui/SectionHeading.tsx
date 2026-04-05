export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2
        className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-wider"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-4 text-base md:text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="mt-4 w-16 h-0.5 mx-auto"
        style={{ background: "var(--accent)" }}
      />
    </div>
  );
}

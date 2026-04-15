type Variant = "dark" | "light";
type Align = "center" | "left";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  variant?: Variant;
  align?: Align;
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  variant = "dark",
  align = "center",
}: SectionHeadingProps) {
  const isDark = variant === "dark";
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";
  const ruleClasses = align === "center" ? "mx-auto" : "ml-0";

  return (
    <div className={`mb-12 md:mb-16 flex flex-col ${alignClasses}`}>
      {overline && (
        <p
          className={`font-body text-[13px] font-medium uppercase tracking-[0.2em] mb-3 ${
            isDark ? "text-gold" : "text-gold-dark"
          }`}
        >
          {overline}
        </p>
      )}
      <h2
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-wide leading-tight ${
          isDark ? "text-white" : "text-gray-700"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 font-body text-lg leading-relaxed max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${isDark ? "text-gray-300" : "text-gray-500"}`}
        >
          {subtitle}
        </p>
      )}
      <div className={`mt-4 w-12 h-0.5 bg-gold ${ruleClasses}`} />
    </div>
  );
}

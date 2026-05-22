import Link from "next/link";
import type { CSSProperties } from "react";

interface LogoProps {
  /** Cap height of "SCULPTED" in px (the only knob that drives proportions). */
  size?: number;
  /** Whether to render the italic-serif "by Larry" suffix. Drop at < 40px. */
  showByLarry?: boolean;
  /** If provided, the logo renders as a Next.js Link; otherwise as a span. */
  href?: string;
  /** Override text color. Defaults to inheriting from parent (currentColor). */
  color?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Sculpted by Larry wordmark — single source of truth.
 *
 * The "U" in SCULPTED is replaced by a custom SVG glyph (the chiseled
 * muscle-flex mark). Italic serif "by Larry" sits to the right.
 *
 * Sizing: pass `size` in px. Recommended sizes per the handoff:
 *   - 92+: hero / landing
 *   -  56: cards, in-page sections
 *   -  28: navigation, footer
 *   - < 40: drop "by Larry" via showByLarry={false}
 */
export function Logo({
  size = 28,
  showByLarry = true,
  href,
  color,
  className,
  ariaLabel = "Sculpted by Larry — home",
}: LogoProps) {
  const style: CSSProperties & Record<"--sbl-size", string> = {
    "--sbl-size": `${size}px`,
    ...(color ? { color } : {}),
  };

  const inner = (
    <>
      <span className="sbl-logo__word">
        SC
        <svg
          className="sbl-logo__u"
          viewBox="0 0 520 1000"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 0L180 0L180 740Q260 820 340 740L340 0L520 240L520 740A260 260 0 0 1 0 740Z" />
        </svg>
        LPTED
      </span>
      {showByLarry && (
        <span className="sbl-logo__by">by Larry</span>
      )}
    </>
  );

  const classes = ["sbl-logo", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        style={style as CSSProperties}
        aria-label={ariaLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <span
      className={classes}
      style={style as CSSProperties}
      aria-label={ariaLabel}
      role="img"
    >
      {inner}
    </span>
  );
}

import Link from "next/link";
import { CAL_BOOKING_URL } from "@/lib/constants";

export function CTASection() {
  return (
    <section
      id="start"
      style={{
        padding: "160px 0 160px",
        borderTop: "1px solid var(--line)",
        position: "relative",
      }}
    >
      <div className="container">
        <h2
          className="display reveal"
          style={{
            fontSize: "clamp(64px,11vw,184px)",
            margin: "0 0 24px",
            textAlign: "center",
            lineHeight: 0.86,
            letterSpacing: "-0.01em",
          }}
        >
          Start the{" "}
          <em
            className="serif-i"
            style={{
              textTransform: "none",
              color: "var(--accent)",
              letterSpacing: "-0.02em",
            }}
          >
            work
          </em>
          .
        </h2>
        <p
          className="reveal reveal-delay-1"
          style={{
            textAlign: "center",
            maxWidth: 560,
            margin: "0 auto 56px",
            color: "var(--fg-soft)",
            fontSize: 17,
            lineHeight: 1.6,
          }}
        >
          Try the free 5-day plan if you want to see how I program before
          committing to anything. Or skip ahead and book a 15-minute call —
          we&rsquo;ll talk about what you want and whether I can help.
        </p>
        <div
          className="reveal reveal-delay-2"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <Link href="/free-plan" className="btn btn-primary">
            Get your free starter training plan{" "}
            <span className="arrow">→</span>
          </Link>
          <a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            Book a 15-min call <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

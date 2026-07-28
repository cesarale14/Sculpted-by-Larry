"use client";

import Link from "next/link";
import { CAL_BOOKING_URL } from "@/lib/constants";

// Reveal observation is owned globally by SiteChrome (useReveal per pathname),
// so the Hero no longer mounts its own observer.
export function Hero() {
  return (
    <section id="top" className="hero-pad">
      <div className="container" style={{ marginBottom: 40 }}>
        <div
          className="hero-eyebrow reveal hero-strike"
          style={{
            color: "var(--fg-mute)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span className="hero-eyebrow__dot" aria-hidden="true" />
          <span>Taking new online coaching clients — in person for Tampa locals</span>
        </div>
      </div>

      <div className="container">
        <h1 className="display hero-headline reveal" style={{ margin: 0 }}>
          <span className="line-mask">
            <span className="line-inner">Sculpt the</span>
          </span>
          <span className="line-mask">
            <span className="line-inner">
              <em>body</em> your
            </span>
          </span>
          <span className="line-mask">
            <span className="line-inner">life demands.</span>
          </span>
        </h1>
      </div>

      <div className="container" style={{ marginTop: 64 }}>
        <p
          className="reveal hero-strike"
          style={{
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--fg-soft)",
            margin: "0 0 32px",
            maxWidth: 540,
            transitionDelay: "500ms",
          }}
        >
          One coach. Real programming. Direct access. Start with the free
          5-day plan, or book a call.
        </p>
        <div
          className="cta-row hero-ctas reveal hero-strike"
          style={{ transitionDelay: "620ms" }}
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

      <style jsx>{`
        .hero-ctas {
          display: flex;
          flex-direction: row;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }
      `}</style>
    </section>
  );
}

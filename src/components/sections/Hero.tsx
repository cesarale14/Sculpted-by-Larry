"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import { CAL_BOOKING_URL } from "@/lib/constants";

export function Hero() {
  useReveal();

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: 140,
        paddingBottom: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="side-stamp">SCULPTED — N°001 — TAMPA · FL</div>

      <div
        className="container reveal"
        style={{
          marginBottom: 40,
          color: "var(--fg-mute)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Taking new clients online &amp; in person — Tampa, FL only
      </div>

      <div className="container">
        <h1 className="display hero-headline reveal" style={{ margin: 0 }}>
          Sculpt the<br />
          <em>body</em> your<br />
          life demands.
        </h1>
      </div>

      <div className="container" style={{ marginTop: 64 }}>
        <div className="reveal reveal-delay-1">
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--fg-soft)",
              margin: "0 0 32px",
              maxWidth: 540,
            }}
          >
            One coach. Real programming. Direct access. Start with the free
            5-day plan, or book a call.
          </p>
          <div className="hero-ctas">
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

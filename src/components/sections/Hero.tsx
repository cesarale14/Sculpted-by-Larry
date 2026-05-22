"use client";

import Link from "next/link";
import Image from "next/image";
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
        <div className="hero-grid">
          <div className="reveal reveal-delay-1">
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--fg-soft)",
                margin: "0 0 32px",
                maxWidth: 460,
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

          <div className="reveal reveal-delay-2 hero-portrait-wrap">
            <Image
              src="/images/larry-portrait.jpg"
              alt="Larry Faria — portrait"
              width={1200}
              height={1600}
              priority
              sizes="(max-width: 880px) 100vw, 40vw"
              className="hero-portrait-img"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 64px;
          align-items: end;
        }
        .hero-portrait-wrap {
          aspect-ratio: 3 / 4;
          position: relative;
          overflow: hidden;
          background: var(--bg-soft);
          border: 1px solid var(--line);
        }
        :global(.hero-portrait-img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: contrast(1.02) saturate(0.96);
        }
        .hero-ctas {
          display: flex;
          flex-direction: row;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }
        @media (max-width: 880px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-portrait-wrap {
            aspect-ratio: 4 / 5;
            max-height: 70vh;
          }
        }
      `}</style>
    </section>
  );
}

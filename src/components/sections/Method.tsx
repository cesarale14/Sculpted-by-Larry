"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    n: "01",
    title: "Assess",
    body: "Movement screen, training history, lifestyle audit, sleep and stress profile. We see what you actually have to work with, not what a checklist assumes.",
  },
  {
    n: "02",
    title: "Engineer",
    body: "Programming built from your inputs — strength blocks, conditioning, a nutrition framework, and a recovery protocol you can actually stick to.",
  },
  {
    n: "03",
    title: "Execute",
    body: "Daily structure. Weekly check-ins. Direct text access to Larry on the days when the work is hardest. Coaching, not cheerleading.",
  },
  {
    n: "04",
    title: "Recalibrate",
    body: "Every two weeks we adjust load, volume, and nutrition based on what your body actually did. No guesswork. No plateaus by accident.",
  },
];

/**
 * Method — pinned scroll sequence on desktop.
 *
 * The section is tall (~300vh); an inner sticky viewport pins while the four
 * phases take the stage in turn as scroll progresses. Stage changes are
 * discrete (class-driven CSS transitions, transform/opacity only) — native
 * scroll speed is never altered.
 *
 * Fallback: below 861px or under prefers-reduced-motion the sticky variant is
 * display:none and the original stacked pillar grid renders instead. The two
 * variants are CSS-gated (display), so assistive tech only ever sees one.
 */
export function Method() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;

    const mq = window.matchMedia(
      "(min-width: 861px) and (prefers-reduced-motion: no-preference)",
    );

    let raf = 0;
    const tick = () => {
      raf = 0;
      if (!mq.matches) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(0.999, Math.max(0, -rect.top / total));
      setStage(Math.floor(p * pillars.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const head = (
    <>
      <span className="eyebrow">
        <span className="dot" aria-hidden="true"></span>The Method
      </span>
      <h2 className="display display-lg" style={{ margin: "20px 0 0" }}>
        Four phases.
        <br />
        <em>One outcome.</em>
      </h2>
    </>
  );

  return (
    <section
      id="method"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      {/* ── Pinned sequence (desktop, motion-ok) ─────────────────── */}
      <div className="method-sticky" ref={stickyRef}>
        <div className="method-sticky__pin">
          <div className="container">
            <div className="method-sticky__head reveal strike">{head}</div>

            <div className="method-sticky__stage-area">
              {pillars.map((p, i) => (
                <div
                  key={p.n}
                  className={`method-stage ${
                    i === stage ? "active" : i < stage ? "past" : ""
                  }`}
                  aria-hidden={i !== stage}
                >
                  <div className="method-stage__num display" aria-hidden="true">
                    {p.n}
                  </div>
                  <h3 className="method-stage__title display">{p.title}</h3>
                  <p className="method-stage__body">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="method-sticky__rail" aria-hidden="true">
              {pillars.map((p, i) => (
                <span
                  key={p.n}
                  className={`method-rail__tick ${i === stage ? "active" : ""}`}
                >
                  {p.n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stacked fallback (mobile / reduced motion) ───────────── */}
      <div className="method-stacked section-pad">
        <div className="container">
          <div className="reveal method-head section-head">
            <div style={{ maxWidth: 720 }}>{head}</div>
            <p className="side-note">
              Same system, every client. Adapted to your body, your schedule,
              your goals.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 0,
              borderTop: "1px solid var(--line)",
              borderLeft: "1px solid var(--line)",
            }}
          >
            {pillars.map((p, i) => (
              <div
                key={p.n}
                className="pillar reveal"
                style={{
                  borderRight: "1px solid var(--line)",
                  borderBottom: "1px solid var(--line)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="num">{p.n}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Variant gating — exactly one renders. */
        .method-sticky { display: none; }
        @media (min-width: 861px) and (prefers-reduced-motion: no-preference) {
          .method-sticky { display: block; }
          .method-stacked { display: none; }
        }

        .method-sticky { height: 300vh; }
        .method-sticky__pin {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .method-sticky__pin .container { width: 100%; }
        .method-sticky__head { margin-bottom: var(--space-16); }

        .method-sticky__stage-area {
          position: relative;
          min-height: 340px;
        }
        .method-stage {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: minmax(200px, 320px) minmax(0, 1fr);
          gap: var(--space-16);
          align-items: start;
          opacity: 0;
          transform: translate3d(0, 44px, 0);
          transition: opacity var(--dur-med) var(--ease-strike),
                      transform var(--dur-med) var(--ease-strike);
          pointer-events: none;
        }
        .method-stage.active {
          opacity: 1;
          transform: none;
          pointer-events: auto;
          transition-delay: 120ms; /* let the outgoing stage clear first */
        }
        .method-stage.past {
          transform: translate3d(0, -32px, 0);
        }
        .method-stage__num {
          font-size: clamp(120px, 16vw, 240px);
          line-height: 0.8;
          color: transparent;
          -webkit-text-stroke: 1px var(--line-strong);
          user-select: none;
        }
        .method-stage.active .method-stage__num {
          -webkit-text-stroke: 1px var(--accent-soft);
        }
        .method-stage__title {
          font-size: clamp(40px, 5vw, 72px);
          margin: 0 0 var(--space-4);
          letter-spacing: -0.005em;
        }
        .method-stage__body {
          max-width: var(--measure);
          font-size: var(--text-lede);
          line-height: 1.65;
          color: var(--fg-soft);
          margin: 0;
        }

        .method-sticky__rail {
          display: flex;
          gap: var(--space-6);
          margin-top: var(--space-16);
          border-top: 1px solid var(--line);
          padding-top: var(--space-4);
        }
        .method-rail__tick {
          font-family: var(--mono);
          font-size: var(--text-xs);
          letter-spacing: 0.2em;
          color: var(--fg-mute);
          transition: color var(--dur-fast) ease;
        }
        .method-rail__tick.active { color: var(--accent); }
      `}</style>
    </section>
  );
}

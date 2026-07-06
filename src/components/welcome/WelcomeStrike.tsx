"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/constants";

/**
 * After-payment animation for /welcome — ported faithfully from the approved
 * prototype (welcome-animation-prototype.html). A chalk-dust particle canvas
 * bursts from center, seeks and forms the dumbbell-U glyph, holds with a
 * shimmer, then disperses as the masked "YOU'RE / in." headline strikes in
 * (rack-settle), an ember rule draws, and the next-steps content cascades.
 *
 * Differences from the prototype, all intentional:
 *  - State classes (`struck` / `dispersed`) toggle on the component root, not
 *    `document.body`, so the effect is self-contained and React-safe.
 *  - Fonts come from the site's next/font CSS vars (no Google Fonts <link>).
 *  - The replay control is removed (it was a prototype-only preview affordance);
 *    Skip is kept.
 *  - Canvas/listeners/timeouts are torn down on unmount.
 * Timeline constants, physics, particle budgets, the U path, the ember
 * fraction, the strike easing and every reveal delay are unchanged.
 */
export function WelcomeStrike() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  // Custom in-person payments (from /pay) arrive with ?t=custom. Those clients
  // did NOT sign a waiver through this path and there's no online-intake to run,
  // so the confirmation line and the "what happens next" block both change.
  // Resolved after mount (SSR-safe); it lands well before the reveal transitions
  // fire in the animation timeline, so there's no visible flash.
  const [isCustom, setIsCustom] = useState(false);
  useEffect(() => {
    setIsCustom(new URLSearchParams(window.location.search).get("t") === "custom");
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const skipBtn = skipRef.current;
    if (!root || !canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Skip straight to the end state — no canvas, instant content.
      root.classList.add("struck", "dispersed");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let raf = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // ---- sample the dumbbell-U path into target points ----
    const U_PATH =
      "M0 0L180 0L180 740Q260 820 340 740L340 0L520 240L520 740A260 260 0 0 1 0 740Z";
    function samplePoints(): [number, number][] {
      const vw = 520;
      const vh = 1000;
      const s = 0.26; // sampling resolution
      const ow = Math.floor(vw * s);
      const oh = Math.floor(vh * s);
      const oc = document.createElement("canvas");
      oc.width = ow;
      oc.height = oh;
      const octx = oc.getContext("2d")!;
      octx.scale(s, s);
      octx.fillStyle = "#fff";
      octx.fill(new Path2D(U_PATH));
      const data = octx.getImageData(0, 0, ow, oh).data;
      const pts: [number, number][] = [];
      const step = 2;
      for (let y = 0; y < oh; y += step) {
        for (let x = 0; x < ow; x += step) {
          if (data[(y * ow + x) * 4 + 3] > 128) {
            pts.push([x / s / vw, y / s / vh]); // normalized 0..1 in glyph space
          }
        }
      }
      return pts;
    }
    const glyphPts = samplePoints();

    // glyph placement on screen
    function glyphRect() {
      const gh = Math.min(H * 0.4, 360);
      const gw = gh * 0.52;
      const cx = W / 2;
      const cy = H * 0.44;
      return { x: cx - gw / 2, y: cy - gh / 2, w: gw, h: gh, cx, cy };
    }

    // ---- particles ----
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      tx: number;
      ty: number;
      r: number;
      ember: boolean;
      ja: number;
      alpha: number;
      dx: number;
      dy: number;
    }

    const isMobile = W < 640;
    const N = isMobile ? 1100 : 2100;
    let parts: Particle[] = [];

    function buildParticles() {
      parts = [];
      const g = glyphRect();
      // shuffle glyph points, take N targets (reuse if fewer)
      const idx = glyphPts.map((_, i) => i);
      for (let i = idx.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const t = idx[i];
        idx[i] = idx[j];
        idx[j] = t;
      }
      for (let k = 0; k < N; k++) {
        const p = glyphPts[idx[k % glyphPts.length]];
        const a = Math.random() * Math.PI * 2;
        const sp = 1.5 + Math.random() * 5.5;
        parts.push({
          x: W / 2 + (Math.random() - 0.5) * 8,
          y: H * 0.44 + (Math.random() - 0.5) * 8,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp * 0.85,
          tx: g.x + p[0] * g.w + (Math.random() - 0.5) * 1.5,
          ty: g.y + p[1] * g.h + (Math.random() - 0.5) * 1.5,
          r: 0.5 + Math.random() * 1.5,
          ember: Math.random() < 0.045,
          ja: Math.random() * Math.PI * 2, // jitter phase
          alpha: 0.35 + Math.random() * 0.65,
          dx: 0,
          dy: 0, // disperse impulse, set later
        });
      }
    }
    buildParticles();

    // timeline (ms)
    const T_BURST = 380; // particles appear + burst
    const T_FORM = 1050; // begin seeking glyph
    const T_HOLD = 2450; // glyph formed, shimmer
    const T_DISP = 3050; // disperse + headline strike
    const T_END = 3950; // canvas done

    let t0: number | null = null;
    let dispersed = false;

    function strike() {
      if (root!.classList.contains("struck")) return;
      root!.classList.add("struck");
    }
    function disperseImpulse() {
      const g = glyphRect();
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const dx = p.x - g.cx;
        const dy = p.y - g.cy;
        const d = Math.max(Math.sqrt(dx * dx + dy * dy), 4);
        const f = 2.2 + Math.random() * 3.4;
        p.dx = (dx / d) * f + (Math.random() - 0.5) * 1.2;
        p.dy = (dy / d) * f + (Math.random() - 0.5) * 1.2 - 0.4;
      }
    }

    function frame(now: number) {
      if (t0 === null) t0 = now;
      const t = now - t0;
      ctx!.clearRect(0, 0, W, H);

      if (t < T_BURST) {
        raf = requestAnimationFrame(frame);
        return;
      }

      let formK = 0;
      if (t > T_FORM) {
        formK = Math.min((t - T_FORM) / (T_HOLD - T_FORM), 1);
        formK = 1 - Math.pow(1 - formK, 3); // easeOutCubic
      }
      const holding = t > T_HOLD && t < T_DISP;
      const dispersing = t >= T_DISP;

      if (dispersing && !dispersed) {
        dispersed = true;
        disperseImpulse();
        root!.classList.add("dispersed");
        strike();
      }

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];

        if (dispersing) {
          p.x += p.dx;
          p.y += p.dy;
          p.dx *= 0.95;
          p.dy *= 0.95;
          p.alpha *= 0.965;
        } else {
          // drift physics
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.955;
          p.vy *= 0.955;
          // gentle turbulence
          p.vx += Math.sin((p.y + t * 0.04) * 0.013 + p.ja) * 0.035;
          p.vy += Math.cos((p.x - t * 0.03) * 0.011 + p.ja) * 0.03;
          // seek target
          if (formK > 0) {
            const pull = 0.018 + formK * 0.13;
            p.x += (p.tx - p.x) * pull;
            p.y += (p.ty - p.y) * pull;
          }
          if (holding) {
            // settled shimmer
            p.x += Math.sin(t * 0.006 + p.ja) * 0.18;
            p.y += Math.cos(t * 0.005 + p.ja) * 0.18;
          }
        }

        let a = p.alpha;
        if (t < T_FORM) a *= Math.min((t - T_BURST) / 220, 1); // fade in on burst
        if (holding) a = Math.min(a * 1.15, 1); // brighten on hold
        if (a <= 0.01) continue;

        ctx!.globalAlpha = a;
        ctx!.fillStyle = p.ember ? "#C84E2A" : "#ECE6D6";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      if (t < T_END || !dispersing) {
        raf = requestAnimationFrame(frame);
      }
      // else: done — canvas already faded via .dispersed
    }

    function start() {
      t0 = null;
      dispersed = false;
      root!.classList.remove("struck", "dispersed");
      buildParticles();
      cancelAnimationFrame(raf);
      // force reflow so transitions can play from a clean state
      void root!.offsetWidth;
      raf = requestAnimationFrame(frame);
    }

    function skipAll() {
      cancelAnimationFrame(raf);
      root!.classList.add("dispersed");
      strike();
    }

    skipBtn?.addEventListener("click", skipAll);

    // start after fonts are ready (race with 900ms timeout so it never hangs)
    let started = false;
    function go() {
      if (!started) {
        started = true;
        start();
      }
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(go);
      timeouts.push(setTimeout(go, 900));
    } else {
      timeouts.push(setTimeout(go, 300));
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      skipBtn?.removeEventListener("click", skipAll);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={rootRef} className="welcome-strike">
      <canvas ref={canvasRef} className="ws-dust" aria-hidden="true" />

      <main id="main" className="ws-stage">
        <div className="ws-eyebrow">Welcome to the program</div>

        <h1 className="ws-hl" aria-label="You're in.">
          <span className="ws-mask">
            <span className="ws-line ws-l1">YOU&apos;RE</span>
          </span>
          <span className="ws-mask">
            <span className="ws-line ws-l2">
              in<span className="ws-dot">.</span>
            </span>
          </span>
        </h1>

        <div className="ws-rule" />

        <p className="ws-confirm">
          {isCustom
            ? "Payment confirmed. Larry's got the notification."
            : "Payment confirmed. Your signed waiver is in your inbox."}
        </p>

        {isCustom ? (
          <section className="ws-next ws-next-custom" aria-label="What happens next">
            <p className="ws-custom-line">You&apos;re set. See you at the next session.</p>
          </section>
        ) : (
          <section className="ws-next" aria-label="What happens next">
            <div className="ws-next-label">What happens next</div>
            <div className="ws-step">
              <div className="ws-num">01</div>
              <div>
                <h3>Intake</h3>
                <p>
                  Your intake questions land in your inbox within 24 hours. Answer
                  them straight — the programming is only as good as the
                  information.
                </p>
              </div>
            </div>
            <div className="ws-step">
              <div className="ws-num">02</div>
              <div>
                <h3>Programming</h3>
                <p>
                  Larry builds your first block around your body, your schedule,
                  and your answers. Written for you, not copied from a template.
                </p>
              </div>
            </div>
            <div className="ws-step">
              <div className="ws-num">03</div>
              <div>
                <h3>Training</h3>
                <p>
                  Day one. Show up, follow the plan, send your check-ins. The rest
                  compounds.
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="ws-cta-wrap">
          <p className="ws-cta-q">Questions before then?</p>
          <a className="ws-cta" href={`mailto:${BRAND.email}`}>
            Message Larry
          </a>
        </div>
      </main>

      <button className="ws-skip" id="skip" type="button" ref={skipRef}>
        Skip →
      </button>

      <style>{`
        .welcome-strike {
          --strike: cubic-bezier(0.16, 1, 0.3, 1);
          --bone-dim: rgba(236, 230, 214, 0.55);
          --bone-faint: rgba(236, 230, 214, 0.28);
        }

        /* ---------- particle canvas ---------- */
        .ws-dust {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          transition: opacity 0.7s ease;
        }
        .welcome-strike.dispersed .ws-dust { opacity: 0; }

        /* ---------- stage ---------- */
        .ws-stage {
          position: relative;
          z-index: 2;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 48px 24px 64px;
          text-align: center;
        }

        /* eyebrow */
        .ws-eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 26px;
          opacity: 0;
          transform: translateY(14px);
        }

        /* headline — masked line reveals */
        .ws-hl { line-height: 0.84; user-select: none; }
        .ws-hl .ws-mask { display: block; overflow: hidden; padding-bottom: 0.06em; }
        .ws-hl .ws-line {
          display: block;
          transform: translateY(112%);
          will-change: transform;
        }
        .ws-hl .ws-l1 {
          font-family: var(--display);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.005em;
          font-size: clamp(84px, 17vw, 210px);
          color: var(--fg);
        }
        .ws-hl .ws-l2 {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(64px, 13vw, 160px);
          color: var(--fg);
          letter-spacing: 0.01em;
        }
        .ws-hl .ws-l2 .ws-dot { color: var(--accent); font-style: normal; }

        /* strike-in states */
        .welcome-strike.struck .ws-hl .ws-l1 {
          transition: transform 0.54s var(--strike);
          transform: translateY(0);
        }
        .welcome-strike.struck .ws-hl .ws-l2 {
          transition: transform 0.54s var(--strike) 0.09s;
          transform: translateY(0);
        }
        .welcome-strike.struck .ws-eyebrow {
          transition: opacity 0.5s ease 0.35s, transform 0.5s var(--strike) 0.35s;
          opacity: 1;
          transform: translateY(0);
        }

        /* the rack settle — whole stage drops 2px and locks */
        @keyframes ws-rack {
          0% { transform: translateY(0); }
          55% { transform: translateY(2.5px); }
          100% { transform: translateY(0); }
        }
        .welcome-strike.struck .ws-stage { animation: ws-rack 0.32s ease-out 0.5s 1; }

        /* orange rule */
        .ws-rule {
          width: 84px;
          height: 3px;
          background: var(--accent);
          margin: 34px auto 0;
          transform: scaleX(0);
          transform-origin: center;
        }
        .welcome-strike.struck .ws-rule {
          transition: transform 0.45s var(--strike) 0.62s;
          transform: scaleX(1);
        }

        /* confirmation */
        .ws-confirm {
          margin-top: 30px;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--bone-dim);
          opacity: 0;
          transform: translateY(16px);
        }
        .welcome-strike.struck .ws-confirm {
          transition: opacity 0.55s ease 0.8s, transform 0.55s var(--strike) 0.8s;
          opacity: 1;
          transform: translateY(0);
        }

        /* ---------- what happens next ---------- */
        .ws-next {
          margin-top: 64px;
          width: 100%;
          max-width: 680px;
          text-align: left;
        }
        .ws-next-label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--bone-faint);
          margin-bottom: 22px;
          opacity: 0;
          transform: translateY(16px);
        }
        .ws-step {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 18px;
          padding: 20px 0;
          border-top: 1px solid rgba(236, 230, 214, 0.1);
          opacity: 0;
          transform: translateY(18px);
        }
        .ws-step:last-of-type { border-bottom: 1px solid rgba(236, 230, 214, 0.1); }
        .ws-step .ws-num {
          font-family: var(--display);
          font-weight: 900;
          font-size: 34px;
          line-height: 1;
          color: var(--accent);
        }
        .ws-step h3 {
          font-family: var(--display);
          font-weight: 900;
          text-transform: uppercase;
          font-size: 21px;
          letter-spacing: 0.02em;
          margin-bottom: 5px;
        }
        .ws-step p {
          font-size: 14.5px;
          line-height: 1.55;
          color: var(--bone-dim);
          max-width: 46ch;
        }
        .welcome-strike.struck .ws-next-label {
          transition: opacity 0.5s ease 1.05s, transform 0.5s var(--strike) 1.05s;
          opacity: 1;
          transform: translateY(0);
        }
        .welcome-strike.struck .ws-step:nth-of-type(2) {
          transition: opacity 0.5s ease 1.18s, transform 0.5s var(--strike) 1.18s;
          opacity: 1;
          transform: translateY(0);
        }
        .welcome-strike.struck .ws-step:nth-of-type(3) {
          transition: opacity 0.5s ease 1.3s, transform 0.5s var(--strike) 1.3s;
          opacity: 1;
          transform: translateY(0);
        }
        .welcome-strike.struck .ws-step:nth-of-type(4) {
          transition: opacity 0.5s ease 1.42s, transform 0.5s var(--strike) 1.42s;
          opacity: 1;
          transform: translateY(0);
        }

        /* custom (in-person) — single sign-off line replaces the numbered steps */
        .ws-next-custom { text-align: center; }
        .ws-custom-line {
          font-family: var(--serif);
          font-style: italic;
          font-size: 22px;
          line-height: 1.5;
          color: var(--bone-dim);
          opacity: 0;
          transform: translateY(16px);
        }
        .welcome-strike.struck .ws-custom-line {
          transition: opacity 0.55s ease 1.05s, transform 0.55s var(--strike) 1.05s;
          opacity: 1;
          transform: translateY(0);
        }

        /* CTA */
        .ws-cta-wrap {
          margin-top: 46px;
          text-align: center;
          opacity: 0;
          transform: translateY(16px);
        }
        .welcome-strike.struck .ws-cta-wrap {
          transition: opacity 0.5s ease 1.6s, transform 0.5s var(--strike) 1.6s;
          opacity: 1;
          transform: translateY(0);
        }
        .ws-cta-q {
          font-family: var(--serif);
          font-style: italic;
          font-size: 19px;
          color: var(--bone-dim);
          margin-bottom: 16px;
        }
        .ws-cta {
          display: inline-block;
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-fg);
          background: var(--fg);
          padding: 16px 34px;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .ws-cta:hover { background: var(--accent); color: var(--fg); }

        /* skip */
        .ws-skip {
          position: fixed;
          bottom: 22px;
          right: 24px;
          z-index: 3;
          font-family: var(--mono);
          font-size: 10.5px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--bone-faint);
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          transition: color 0.2s ease, opacity 0.4s ease;
        }
        .ws-skip:hover { color: var(--fg); }
        .welcome-strike.struck .ws-skip { opacity: 0; pointer-events: none; }

        /* reduced motion: skip straight to end state */
        @media (prefers-reduced-motion: reduce) {
          .ws-dust { display: none; }
          .ws-hl .ws-line { transform: none !important; transition: none !important; }
          .ws-eyebrow,
          .ws-confirm,
          .ws-next-label,
          .ws-step,
          .ws-custom-line,
          .ws-cta-wrap {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .ws-rule { transform: scaleX(1) !important; transition: none !important; }
          .welcome-strike.struck .ws-stage { animation: none; }
          .ws-skip { display: none; }
        }

        @media (max-width: 560px) {
          .ws-step { grid-template-columns: 48px 1fr; gap: 14px; }
          .ws-step .ws-num { font-size: 28px; }
          .ws-next { margin-top: 48px; }
        }
      `}</style>
    </div>
  );
}

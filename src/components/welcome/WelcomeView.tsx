"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useReveal } from "@/lib/useReveal";
import { BRAND } from "@/lib/constants";

const NEXT_STEPS = [
  {
    n: "01",
    title: "Intake questions hit your inbox",
    body: "Within 24 hours. A few specifics so the programming is built around you, not a template.",
  },
  {
    n: "02",
    title: "Larry builds your first block",
    body: "Your opening training block — written for your body, your schedule, your starting point.",
  },
  {
    n: "03",
    title: "Training starts",
    body: "You get your program and we get to work. The waiting is over.",
  },
];

export function WelcomeView() {
  useReveal();

  return (
    <main id="main" className="min-h-screen bg-bg">
      <div className="container">
        <header className="flex items-center justify-between py-7">
          <Logo href="/" size={26} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute">
            Enrolled
          </span>
        </header>

        <div className="mx-auto max-w-2xl pb-28 pt-10 sm:pt-16">
          <p className="eyebrow reveal">
            <span className="dot" aria-hidden="true" />
            Payment received
          </p>

          <h1
            className="display hero-headline reveal"
            style={{
              fontSize: "clamp(64px,13vw,128px)",
              lineHeight: 0.92,
              margin: "20px 0 0",
              letterSpacing: "-0.01em",
            }}
          >
            <span className="line-mask">
              <span className="line-inner">You&apos;re in.</span>
            </span>
          </h1>

          <p
            className="reveal hero-strike"
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--fg-soft)",
              margin: "28px 0 0",
              maxWidth: 540,
              transitionDelay: "480ms",
            }}
          >
            Your payment went through, and your signed waiver is already in your inbox —
            Larry has his copy too. The paperwork is done. Now the real work starts.
          </p>

          {/* What happens next */}
          <div className="reveal" style={{ marginTop: 64 }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute">
              What happens next
            </p>
            <ol className="mt-6 list-none p-0">
              {NEXT_STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`reveal reveal-delay-${i + 1} flex gap-5`}
                  style={{
                    padding: "22px 0",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <span
                    className="display shrink-0"
                    style={{ fontSize: 22, color: "var(--accent)", lineHeight: 1 }}
                  >
                    {s.n}
                  </span>
                  <span>
                    <span className="display block text-fg" style={{ fontSize: 22 }}>
                      {s.title}
                    </span>
                    <span
                      className="mt-1 block"
                      style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--fg-soft)" }}
                    >
                      {s.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div
            className="reveal"
            style={{
              marginTop: 48,
              paddingTop: 28,
              borderTop: "1px solid var(--line)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 16,
            }}
          >
            <p style={{ margin: 0, fontSize: 14.5, color: "var(--fg-soft)" }}>
              Questions before then?
            </p>
            <a href={`mailto:${BRAND.email}`} className="btn btn-primary">
              Text Larry <span className="arrow">→</span>
            </a>
            <Link href="/" className="btn btn-ghost">
              Back to home <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

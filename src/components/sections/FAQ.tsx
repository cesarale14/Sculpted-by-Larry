"use client";

import { useState } from "react";

const items = [
  {
    q: "How is this different from a regular online coach?",
    a: "Most online coaching is templated programming you barely change for the next client, run through an assistant. Here it's just me — I write every program, I review every check-in, I answer the texts. That's the whole pitch.",
  },
  {
    q: "What's the time commitment?",
    a: "Plan for 3–5 training sessions per week, 45–75 minutes each, plus a 15-minute check-in. Total: roughly 4–6 hours per week. The program flexes around your calendar, not the other way around.",
  },
  {
    q: "Do I need a gym membership?",
    a: "Preferred but not required. I'll program around your access — full commercial gym, home setup, hotel, or hybrid. Tell me what you've got.",
  },
  {
    q: "What if online coaching doesn't work for me?",
    a: "Cancel anytime on the monthly plan. The quarterly and annual plans are non-refundable past the first two weeks, but I'd rather you leave than be miserable — tell me and we'll work it out.",
  },
  {
    q: "Where in Tampa do we train?",
    a: "At my gym. I'll share the exact location when we book your free first session.",
  },
  {
    q: "I'm not in Florida. Can I still work with you?",
    a: "Yes — online coaching is the same product wherever you live. The only thing you won't get is the in-person session.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      id="faq"
      className="section-pad"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="container">
        <div className="faq-grid">
          <div className="reveal">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>FAQ
            </span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,5vw,72px)",
                margin: "20px 0 0",
                letterSpacing: "-0.005em",
              }}
            >
              Direct answers to{" "}
              <em
                className="serif-i"
                style={{
                  textTransform: "none",
                  color: "var(--fg-soft)",
                  letterSpacing: "-0.02em",
                }}
              >
                direct
              </em>{" "}
              questions.
            </h2>
          </div>
          <div className="reveal reveal-delay-1">
            {items.map((it, i) => (
              <div
                key={i}
                className={`acc-item ${open === i ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="acc-trigger"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span>{it.q}</span>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="acc-content">
                  <div className="acc-inner">{it.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
          gap: 64px;
        }
        @media (max-width: 880px) {
          .faq-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </section>
  );
}

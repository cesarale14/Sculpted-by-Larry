import { TESTIMONIALS } from "@/lib/constants";

/**
 * Testimonials section.
 *
 * Renders NOTHING when TESTIMONIALS is empty (which it is until Larry adds
 * real reviews to src/lib/constants.ts). This is deliberate — the previous
 * v1 site shipped a fabricated "Michael R." testimonial; the v2 discipline
 * is no invented proof, ever. Section appears only when honest reviews exist.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="section-pad"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="container">
        <div
          className="reveal"
          style={{ marginBottom: 64, maxWidth: 760 }}
        >
          <span className="eyebrow">
            <span className="dot" aria-hidden="true"></span>From clients
          </span>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px,6vw,84px)",
              margin: "20px 0 0",
              letterSpacing: "-0.005em",
            }}
          >
            What people{" "}
            <em
              className="serif-i"
              style={{
                textTransform: "none",
                color: "var(--fg-soft)",
                letterSpacing: "-0.02em",
              }}
            >
              actually say
            </em>
            .
          </h2>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="reveal testimonial-card"
              style={{
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(20px, 2vw, 24px)",
                  lineHeight: 1.4,
                  color: "var(--fg)",
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption
                style={{
                  marginTop: 24,
                  paddingTop: 18,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--display)",
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                  }}
                >
                  {t.name}
                </span>
                {t.context && (
                  <span
                    className="eyebrow"
                    style={{ fontSize: 10 }}
                  >
                    {t.context}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0;
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .testimonial-card {
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 36px 32px 32px;
          background: var(--bg-soft);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 280px;
        }
      `}</style>
    </section>
  );
}

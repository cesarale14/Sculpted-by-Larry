import {
  CAL_BOOKING_URL,
  ONLINE_TIERS,
  ONLINE_FEATURES,
} from "@/lib/constants";

export function ProgramCards() {
  return (
    <section
      id="programs"
      className="section-pad"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="container">
        <div className="reveal section-head">
          <div>
            <h2 className="display display-lg" style={{ margin: 0 }}>
              How we <em>work together</em>.
            </h2>
          </div>
          <p className="side-note">
            Online coaching — anywhere with a gym and a phone. In-person
            training in Tampa, priced separately. Either way, it starts with a
            15-minute call.
          </p>
        </div>

        {/* Online Coaching */}
        <div
          className="reveal"
          style={{
            border: "1px solid var(--line)",
            padding: "36px 36px 32px",
            marginBottom: 16,
            background: "var(--bg-soft)",
          }}
        >
          <div className="prog-grid">
            <div>
              <h3
                className="display"
                style={{
                  fontSize: 44,
                  margin: "0 0 8px",
                  letterSpacing: "-0.005em",
                }}
              >
                Online Coaching
              </h3>
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "var(--fg-mute)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 22,
                }}
              >
                1:1 · Anywhere
              </div>
              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--fg-soft)",
                  lineHeight: 1.6,
                  margin: "0 0 14px",
                }}
              >
                Programming written for your body and your week. Direct access
                when the work gets hard. Pick the commitment that fits —
                monthly is fine, longer saves money.
              </p>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  margin: "0 0 22px",
                }}
              >
                Monthly is rolling — cancel anytime.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {ONLINE_FEATURES.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "10px 0",
                      borderTop: "1px solid var(--line)",
                      fontSize: 13.5,
                      color: "var(--fg-soft)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--mono)",
                        fontSize: 14,
                        lineHeight: 1.3,
                        flexShrink: 0,
                      }}
                    >
                      —
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tier-grid">
              {ONLINE_TIERS.map((t) => {
                const featured = "featured" in t && t.featured;
                return (
                  <div
                    key={t.id}
                    style={{
                      border: featured
                        ? "1px solid var(--accent)"
                        : "1px solid var(--line-strong)",
                      padding: "22px 18px 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      position: "relative",
                      background: "var(--bg)",
                    }}
                  >
                    {featured && (
                      <div
                        style={{
                          position: "absolute",
                          top: -1,
                          right: -1,
                          background: "var(--accent)",
                          color: "var(--accent-fg)",
                          fontFamily: "var(--mono)",
                          fontSize: 9,
                          letterSpacing: "0.18em",
                          padding: "5px 9px",
                          textTransform: "uppercase",
                        }}
                      >
                        Best value
                      </div>
                    )}
                    <div className="eyebrow" style={{ fontSize: 10 }}>
                      {t.cadence}
                    </div>
                    <div
                      className="display"
                      style={{
                        fontSize: 38,
                        lineHeight: 1,
                        letterSpacing: "-0.01em",
                        color: featured ? "var(--accent)" : "var(--fg)",
                      }}
                    >
                      {t.price}
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: "var(--fg-soft)",
                        margin: 0,
                      }}
                    >
                      {t.note}
                    </p>
                    <a
                      href={CAL_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={featured ? "btn btn-primary" : "btn btn-ghost"}
                      style={{
                        padding: "10px 14px",
                        fontSize: 10.5,
                        marginTop: "auto",
                      }}
                    >
                      Start with a call <span className="arrow">→</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tampa in-person — its own product, quote-only. From $70/week; the
            exact price is set in conversation with Larry, never published. */}
        <div
          className="reveal tampa-strip"
          style={{
            border: "1px solid var(--line)",
            borderLeft: "2px solid var(--accent)",
            padding: "26px 30px",
            background: "var(--bg-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--accent)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Tampa local? Train with me in person — from $70/week.
            </div>
            <p
              style={{
                fontSize: 14.5,
                color: "var(--fg-soft)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              In-person is its own thing. I price it in the room, not on a
              pricing page — depends on your schedule, your goals, how often we
              train. Book the call and we&rsquo;ll set it.
            </p>
          </div>
          <a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ whiteSpace: "nowrap" }}
          >
            Book a 15-min call <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <style>{`
        .prog-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 2fr);
          gap: 48px;
        }
        .tier-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 880px) {
          /* minmax(0, 1fr) prevents a wide-min-content child (e.g.
             a nowrap CTA button) from blowing the column past the
             container width on narrow phones — that was shifting
             the In-Person card off-center vs the viewport. */
          .prog-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
          .tier-grid { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </section>
  );
}

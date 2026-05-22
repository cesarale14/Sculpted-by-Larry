import {
  CAL_BOOKING_URL,
  ONLINE_TIERS,
  ONLINE_FEATURES,
  INPERSON_FEATURES,
} from "@/lib/constants";

export function ProgramCards() {
  return (
    <section
      id="programs"
      style={{ padding: "140px 0", borderTop: "1px solid var(--line)" }}
    >
      <div className="container">
        <div
          className="reveal"
          style={{
            marginBottom: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          <div>
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>Coaching · Available now
            </span>
            <h2
              className="display"
              style={{ fontSize: "clamp(40px,6vw,84px)", margin: "20px 0 0" }}
            >
              Two ways to{" "}
              <em
                className="serif-i"
                style={{
                  textTransform: "none",
                  color: "var(--fg-soft)",
                  letterSpacing: "-0.02em",
                }}
              >
                work together
              </em>
              .
            </h2>
          </div>
          <p
            style={{
              maxWidth: 360,
              fontSize: 14.5,
              lineHeight: 1.6,
              color: "var(--fg-soft)",
              margin: 0,
            }}
          >
            Online — anywhere with a gym and a phone. In-person — Tampa only.
            Both start with a 15-minute call so we can be sure it&rsquo;s a
            fit.
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
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                Product 01
              </div>
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
                Programming written for your body and your week, plus direct
                access to me whenever the work gets hard. Pick the commitment
                that matches where you are right now — month-to-month is fine,
                longer saves money.
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
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                      }}
                    >
                      {String(j + 1).padStart(2, "0")}
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

        {/* In-Person Tampa */}
        <div
          className="reveal"
          style={{
            border: "1px solid var(--line)",
            padding: "36px 36px 32px",
            background: "var(--bg-soft)",
          }}
        >
          <div className="prog-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>
                Product 02
              </div>
              <h3
                className="display"
                style={{
                  fontSize: 44,
                  margin: "0 0 8px",
                  letterSpacing: "-0.005em",
                }}
              >
                In-Person{" "}
                <em
                  className="serif-i"
                  style={{
                    textTransform: "none",
                    color: "var(--fg-soft)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  (Tampa)
                </em>
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
                1:1 · In studio
              </div>
              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--fg-soft)",
                  lineHeight: 1.6,
                  margin: "0 0 22px",
                }}
              >
                Train with me in person. We program around your schedule, lift
                in the same room, and fix what only gets fixed when someone is
                actually watching you move. The first session is free — if it
                isn&rsquo;t a fit, that&rsquo;s fine.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {INPERSON_FEATURES.map((f, j) => (
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
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                      }}
                    >
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 12,
                alignContent: "start",
              }}
            >
              <div
                style={{
                  border: "1px solid var(--accent)",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  background: "var(--bg)",
                }}
              >
                <div className="eyebrow" style={{ fontSize: 10 }}>
                  First session
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: 48,
                    lineHeight: 1,
                    color: "var(--accent)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Free
                </div>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "var(--fg-soft)",
                    margin: 0,
                  }}
                >
                  An hour in the studio. Movement screen, a real training
                  session, an honest conversation about what working together
                  would look like. No pitch deck.
                </p>
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <div
                    className="eyebrow"
                    style={{ fontSize: 10, marginBottom: 6 }}
                  >
                    Ongoing
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: "var(--fg-soft)",
                      margin: 0,
                    }}
                  >
                    Pricing is by conversation — it depends on session
                    frequency, programming load, and where you&rsquo;re
                    starting. Always fair, never surprise-billed.
                  </p>
                </div>
                <a
                  href={CAL_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: 4 }}
                >
                  Book your free first session{" "}
                  <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
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
          .prog-grid { grid-template-columns: 1fr; gap: 32px; }
          .tier-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

import Link from "next/link";

const days = [
  {
    n: "Day 01",
    kind: "Training" as const,
    title: "Lower Body · Strength",
    block: [
      "A.  Goblet squat — 3 × 8",
      "B.  Romanian deadlift — 3 × 8",
      "C.  Walking lunge — 3 × 10 per leg",
      "D.  Plank — 3 × 30 sec",
    ],
  },
  {
    n: "Day 02",
    kind: "Mobility" as const,
    title: "Hips · Ankles · Recovery walk",
    block: [
      "World's greatest stretch — 2 × 5 per side",
      "90/90 hip switches — 2 × 8 per side",
      "Wall ankle mobilization — 2 × 10 per side",
      "Easy walk — 25–35 min",
    ],
  },
  {
    n: "Day 03",
    kind: "Training" as const,
    title: "Upper Body · Push & Pull",
    block: [
      "A.  Dumbbell bench press — 3 × 8",
      "B.  Seated cable row — 3 × 10",
      "C.  Standing dumbbell press — 3 × 8",
      "D.  Lat pulldown — 3 × 10",
    ],
  },
  {
    n: "Day 04",
    kind: "Mobility" as const,
    title: "Thoracic · Shoulders · Reset",
    block: [
      "Cat-cow — 2 × 8",
      "Open book — 2 × 6 per side",
      "Banded shoulder dislocates — 2 × 10",
      "Easy walk — 25–35 min",
    ],
  },
  {
    n: "Day 05",
    kind: "Training" as const,
    title: "Full Body · Conditioning",
    block: [
      "A.  Trap bar deadlift — 4 × 6",
      "B.  Push-up — 3 × max-2",
      "C.  KB swing — 3 × 15",
      "D.  Carry circuit — 3 × 40 yd",
    ],
  },
];

export function FreePlan() {
  return (
    <section
      id="free-plan"
      style={{ padding: "140px 0", borderTop: "1px solid var(--line)" }}
    >
      <div className="container">
        <div
          className="reveal"
          style={{
            marginBottom: 72,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>
              Free starter plan · No email guilt
            </span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,6vw,84px)",
                margin: "20px 0 0",
                letterSpacing: "-0.005em",
              }}
            >
              A real{" "}
              <em
                className="serif-i"
                style={{
                  textTransform: "none",
                  color: "var(--fg-soft)",
                  letterSpacing: "-0.02em",
                }}
              >
                five-day
              </em>
              <br />
              plan, on me.
            </h2>
          </div>
          <p
            style={{
              maxWidth: 360,
              fontSize: 15.5,
              lineHeight: 1.65,
              color: "var(--fg-soft)",
              margin: 0,
            }}
          >
            Three training days, two mobility days. Full-gym,
            beginner-appropriate, written the same way I write programs for
            paying clients. No upsell.
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
          {days.map((d, i) => (
            <div
              key={d.n}
              className="reveal"
              style={{
                borderRight: "1px solid var(--line)",
                borderBottom: "1px solid var(--line)",
                padding: "28px 26px 32px",
                transitionDelay: `${i * 60}ms`,
                background:
                  d.kind === "Mobility" ? "var(--bg-soft)" : "transparent",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 22,
                }}
              >
                <div className="eyebrow">{d.n}</div>
                <div
                  className="eyebrow"
                  style={{
                    color:
                      d.kind === "Training"
                        ? "var(--accent)"
                        : "var(--fg-mute)",
                  }}
                >
                  {d.kind}
                </div>
              </div>
              <h3
                className="display"
                style={{
                  fontSize: 22,
                  lineHeight: 1.05,
                  margin: "0 0 18px",
                  letterSpacing: "-0.005em",
                }}
              >
                {d.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {d.block.map((line, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      color: "var(--fg-soft)",
                      lineHeight: 1.7,
                      padding: "5px 0",
                      borderBottom:
                        j < d.block.length - 1
                          ? "1px solid var(--line)"
                          : "none",
                    }}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="reveal"
          style={{
            marginTop: 56,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              margin: 0,
              maxWidth: 560,
              color: "var(--fg-soft)",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            The full PDF — warm-ups, sets/reps progressions, video form notes,
            and a one-page nutrition primer — arrives by email immediately. Use
            it. If it helps and you want more, you know where to find me.
          </p>
          <Link href="/free-plan" className="btn btn-primary">
            Get your free starter training plan{" "}
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

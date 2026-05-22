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

export function Method() {
  return (
    <section
      id="method"
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
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>The Method
            </span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,6vw,84px)",
                margin: "20px 0 0",
                letterSpacing: "-0.005em",
              }}
            >
              Four phases.
              <br />
              <em
                className="serif-i"
                style={{
                  textTransform: "none",
                  color: "var(--fg-soft)",
                  letterSpacing: "-0.02em",
                }}
              >
                One outcome.
              </em>
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
            Every Sculpted client moves through the same system — adapted to
            their body, schedule, and goals.
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
    </section>
  );
}

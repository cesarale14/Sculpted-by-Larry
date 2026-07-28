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
      className="section-pad"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="container">
        <div className="reveal method-head section-head">
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>The Method
            </span>
            <h2 className="display display-lg" style={{ margin: "20px 0 0" }}>
              Four phases.
              <br />
              <em>One outcome.</em>
            </h2>
          </div>
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
    </section>
  );
}

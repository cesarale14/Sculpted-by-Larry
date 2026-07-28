import Link from "next/link";

export function FreePlan() {
  return (
    <section
      id="free-plan"
      className="section-pad"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="container">
        <div className="reveal section-head" style={{ marginBottom: 0 }}>
          <div style={{ maxWidth: 760 }}>
            <h2 className="display display-lg" style={{ margin: 0 }}>
              A real <em>five-day</em>
              <br />
              plan, on me.
            </h2>
          </div>
          <p className="side-note">
            Three training days, two mobility days. Beginner-appropriate.
            Written like a paying client&rsquo;s program. No upsell.
          </p>
        </div>

        <div
          className="reveal reveal-delay-1"
          style={{
            marginTop: "var(--space-14)",
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
              maxWidth: "var(--measure)",
              color: "var(--fg-soft)",
              fontSize: "var(--text-base)",
              lineHeight: 1.6,
            }}
          >
            Full PDF arrives by email — five days of programming with the form
            cues that matter. Use it. If you want more after, you know where
            to find me.
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

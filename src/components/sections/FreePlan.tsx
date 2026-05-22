import Link from "next/link";

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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,6vw,84px)",
                margin: 0,
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
            Three training days, two mobility days. Beginner-appropriate.
            Written like a paying client&rsquo;s program. No upsell.
          </p>
        </div>

        <div
          className="reveal reveal-delay-1"
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

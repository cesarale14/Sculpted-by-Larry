import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="section-pad"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <p
          className="eyebrow"
          style={{ justifyContent: "center", display: "inline-flex" }}
        >
          <span className="dot" aria-hidden="true" />
          404
        </p>
        <h1
          className="display display-lg"
          style={{ margin: "20px 0 0" }}
        >
          This page skipped <em>leg day</em>.
        </h1>
        <p
          className="lede"
          style={{ margin: "24px auto 0", maxWidth: 480 }}
        >
          Whatever you were looking for isn&rsquo;t here. The work is.
        </p>
        <div style={{ marginTop: "var(--space-10)" }}>
          <Link href="/" className="btn btn-primary">
            Back to the work <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

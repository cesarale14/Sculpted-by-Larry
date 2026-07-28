import type { Metadata } from "next";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Free 5-Day Sculpt Starter Plan | Sculpted by Larry",
  description:
    "Download Larry's free 5-day workout and nutrition starter plan. Kickstart your transformation with structured workouts and nutrition basics.",
};

export default function FreePlanPage() {
  return (
    <section className="section-pad" style={{ minHeight: "100vh" }}>
      <div
        className="container"
        style={{ maxWidth: 720, paddingTop: 80, textAlign: "center" }}
      >
        <p
          className="eyebrow"
          style={{ display: "inline-flex", justifyContent: "center" }}
        >
          <span className="dot" aria-hidden="true" />
          The free 5-day plan
        </p>

        <h1
          className="display display-md"
          style={{ margin: "24px 0 0" }}
        >
          You&apos;ve started before.
          <br />
          <em>You&apos;ve stopped before, too.</em>
        </h1>

        <div
          className="lede"
          style={{
            margin: "40px auto 0",
            maxWidth: 560,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>
            Most people don&apos;t quit fitness because they&apos;re lazy.
            <br />
            They quit because nobody ever taught them what they were doing.
          </p>
          <p style={{ margin: 0 }}>This is a 5-day plan I built for that.</p>
          <p style={{ margin: 0 }}>
            Five workouts. The nutrition rule that actually matters.
            <br />
            No filler. No shortcuts. No &ldquo;just trust the process.&rdquo;
          </p>
          <p style={{ margin: 0 }}>
            If you want to feel what real programming feels like
            <br />
            before you ever pay anyone — start here.
          </p>
        </div>

        <p
          className="serif-i"
          style={{
            marginTop: 40,
            fontSize: 16,
            color: "var(--fg-mute)",
          }}
        >
          — Larry, ISSA Certified Trainer · Tampa, FL
        </p>

        <div
          style={{
            marginTop: 40,
            border: "1px solid var(--line)",
            background: "var(--bg-soft)",
            padding: "var(--space-8)",
          }}
        >
          <LeadCaptureForm />
        </div>

        <p
          style={{
            marginTop: 24,
            fontSize: 12,
            color: "var(--fg-mute)",
            fontFamily: "var(--mono)",
            letterSpacing: "0.04em",
          }}
        >
          One email. The plan. No spam. Reply if you want to talk.
        </p>
      </div>
    </section>
  );
}

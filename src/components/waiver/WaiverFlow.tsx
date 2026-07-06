"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { useWaiverForm } from "@/components/waiver/useWaiverForm";
import { StepHeader, DetailsStep, WaiverReadStep, SignStep } from "@/components/waiver/steps";

type Step = 1 | 2 | 3;

const STEP_LABELS: Record<Step, string> = {
  1: "Your details",
  2: "The waiver",
  3: "Agree & sign",
};

/**
 * Standalone waiver signing for in-person clients — the /start flow minus the
 * plan selection and payment. Same attorney-reviewed v1-2026-05 document and
 * the same details/waiver/sign steps (shared via useWaiverForm + the /waiver
 * step components), submitted to the same /api/waiver route with
 * `source: "waiver_only"`. No payment handoff; the minted token is unused.
 */
export function WaiverFlow() {
  const [step, setStep] = useState<Step>(1);
  const form = useWaiverForm();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form.buildPayload(), source: "waiver_only" }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) {
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      // Waiver signed + emailed to the client and Larry. No payment on this
      // path — the token in the response is intentionally ignored.
      setSigned(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Signed confirmation — static (reduced-motion safe), NOT the /welcome
  //    animation, which is reserved for the payment moment. ───────────────────
  if (signed) {
    return (
      <Shell>
        <div className="border border-line p-8 text-center sm:p-12">
          <p className="eyebrow justify-center"><span className="dot" />Waiver signed</p>
          <h1 className="display mt-4 text-6xl text-fg sm:text-7xl">
            SIGNED<span className="text-accent">.</span>
          </h1>
          <p className="mt-5 text-fg-soft leading-relaxed">
            Your copy is in your inbox. See Larry at your session.
          </p>
          <p className="mt-8">
            <a
              href="/pay"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute underline underline-offset-4 transition-colors hover:text-accent"
            >
              Need to pay for a session? &rarr; /pay
            </a>
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="eyebrow mb-8">
        <span className="dot" />In-person clients — sign before your first session.
      </p>

      {/* Progress */}
      <div className="mb-10 flex items-center gap-3">
        {([1, 2, 3] as Step[]).map((n) => (
          <div key={n} className="flex flex-1 flex-col gap-2">
            <div
              className="h-0.5 w-full"
              style={{ background: n <= step ? "var(--accent)" : "var(--line-strong)" }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ color: n === step ? "var(--accent)" : "var(--fg-mute)" }}
            >
              {n}. {STEP_LABELS[n]}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {step === 1 && (
            <section>
              <StepHeader eyebrow="Step 1" title="Tell me about you" />
              <DetailsStep form={form} />

              <div className="mt-10 flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!form.detailsValid}
                  style={!form.detailsValid ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
                  onClick={() => setStep(2)}
                >
                  Continue <span className="arrow">&rarr;</span>
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <StepHeader eyebrow="Step 2" title="Read the waiver" />
              <WaiverReadStep form={form} />

              <div className="mt-10 flex justify-between gap-3">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                  <span className="arrow" style={{ transform: "scaleX(-1)" }}>&rarr;</span> Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!form.waiverValid}
                  style={!form.waiverValid ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
                  onClick={() => setStep(3)}
                >
                  Continue <span className="arrow">&rarr;</span>
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <StepHeader eyebrow="Step 3" title="Agree & sign" />
              <SignStep form={form} error={error} />

              <div className="mt-10 flex justify-between gap-3">
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={submitting}
                  onClick={() => setStep(2)}
                >
                  <span className="arrow" style={{ transform: "scaleX(-1)" }}>&rarr;</span> Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!form.signValid || submitting}
                  style={
                    !form.signValid || submitting ? { opacity: 0.5, cursor: "not-allowed" } : undefined
                  }
                  onClick={handleSubmit}
                >
                  {submitting ? "Signing…" : "Sign waiver"}{" "}
                  {!submitting && <span className="arrow">&rarr;</span>}
                </button>
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="min-h-screen bg-bg">
      <div className="container">
        <header className="flex items-center justify-between py-7">
          <Logo href="/" size={26} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute">
            Waiver
          </span>
        </header>
        <div className="mx-auto max-w-2xl pb-24 pt-8 sm:pt-14">{children}</div>
      </div>
    </main>
  );
}

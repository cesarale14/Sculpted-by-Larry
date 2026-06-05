"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import {
  WAIVER_SECTIONS,
  WAIVER_VERSION,
  ACTIVITY_PROVIDER,
  FITNESS_ATTESTATION_TEXT,
  fillIntro,
} from "@/lib/waiver";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

type Step = 1 | 2 | 3;

const STEP_LABELS: Record<Step, string> = {
  1: "Your details",
  2: "The waiver",
  3: "Agree & sign",
};

export function StartFlow() {
  const [step, setStep] = useState<Step>(1);

  // Step 1 — intake
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantDob, setParticipantDob] = useState("");
  const [participantPhone, setParticipantPhone] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Step 2 — waiver
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const [fitnessAttestation, setFitnessAttestation] = useState(false);
  const waiverBoxRef = useRef<HTMLDivElement>(null);

  // Step 3 — agreement + signature
  const [agree, setAgree] = useState(false);
  const [signatureName, setSignatureName] = useState("");

  // Submit
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storedNoPayment, setStoredNoPayment] = useState(false);

  const emailOk = EMAIL_REGEX.test(participantEmail.trim());
  const step1Valid =
    participantName.trim() !== "" &&
    emailOk &&
    DATE_REGEX.test(participantDob) &&
    participantPhone.trim() !== "" &&
    emergencyName.trim() !== "" &&
    emergencyPhone.trim() !== "";
  const step2Valid = scrolledToEnd && fitnessAttestation;
  const step3Valid = agree && signatureName.trim() !== "";

  // Auto-enable the "read" gate if the waiver text isn't tall enough to scroll.
  useEffect(() => {
    if (step !== 2) return;
    const el = waiverBoxRef.current;
    if (el && el.scrollHeight - el.clientHeight < 8) setScrolledToEnd(true);
  }, [step]);

  function handleWaiverScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 32) setScrolledToEnd(true);
  }

  const now = new Date();
  const introText = fillIntro(
    participantName.trim() || "[participant name]",
    ordinal(now.getDate()),
    `${MONTHS[now.getMonth()]}, ${now.getFullYear()}`,
  );

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    const agreedAt = new Date().toISOString();
    try {
      const res = await fetch("/api/waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantName: participantName.trim(),
          participantEmail: participantEmail.trim(),
          participantDob,
          participantPhone: participantPhone.trim(),
          emergencyName: emergencyName.trim(),
          emergencyPhone: emergencyPhone.trim(),
          fitnessAttestation,
          agree,
          signatureName: signatureName.trim(),
          agreedAt,
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.success) {
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      // Waiver signed + emailed. Hand off to payment using the signed token —
      // the checkout route won't create a session without a valid token.
      const token = body.token as string | undefined;
      if (token) {
        try {
          const payRes = await fetch("/api/waiver/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const payBody = await payRes.json().catch(() => null);
          if (payRes.ok && payBody?.url) {
            window.location.href = payBody.url as string;
            return;
          }
        } catch {
          // fall through to the "signed, payment pending" state
        }
      }
      // Waiver emailed, but payment isn't enabled yet (Stripe keys missing).
      setStoredNoPayment(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success-without-payment state ───────────────────────────────────────────
  if (storedNoPayment) {
    return (
      <Shell>
        <div className="border border-line p-8 text-center">
          <p className="eyebrow justify-center"><span className="dot" />Waiver received</p>
          <h1 className="display mt-4 text-3xl text-fg">You&apos;re signed.</h1>
          <p className="mt-4 text-fg-soft leading-relaxed">
            Your signed waiver is on its way to your inbox, and Larry has a copy. Payment
            isn&apos;t enabled in this environment yet — Larry will follow up to complete
            enrollment.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
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
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Full name" className="sm:col-span-2">
                  <input
                    className="field"
                    type="text"
                    autoComplete="name"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="Your full legal name"
                  />
                </Field>
                <Field label="Email">
                  <input
                    className="field"
                    type="email"
                    autoComplete="email"
                    value={participantEmail}
                    onChange={(e) => setParticipantEmail(e.target.value)}
                    placeholder="you@email.com"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    className="field"
                    type="tel"
                    autoComplete="tel"
                    value={participantPhone}
                    onChange={(e) => setParticipantPhone(e.target.value)}
                    placeholder="(813) 555-0123"
                  />
                </Field>
                <Field label="Date of birth">
                  <input
                    className="field"
                    type="date"
                    value={participantDob}
                    onChange={(e) => setParticipantDob(e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2 mt-2 border-t border-line pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-mute">
                    Emergency contact
                  </p>
                </div>
                <Field label="Emergency contact name">
                  <input
                    className="field"
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="Their name"
                  />
                </Field>
                <Field label="Emergency contact phone">
                  <input
                    className="field"
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="Their phone"
                  />
                </Field>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!step1Valid}
                  style={!step1Valid ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
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
              <p className="mt-3 text-sm text-fg-mute">
                Scroll through the full document. {ACTIVITY_PROVIDER}. Version {WAIVER_VERSION}.
              </p>

              <div
                ref={waiverBoxRef}
                onScroll={handleWaiverScroll}
                className="mt-6 max-h-[360px] overflow-y-auto border border-line bg-bg-soft p-6 text-[14px] leading-relaxed text-fg-soft"
              >
                <p className="mb-5">{introText}</p>
                {WAIVER_SECTIONS.map((sectionItem) => (
                  <div key={sectionItem.heading} className="mb-5">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      {sectionItem.heading}
                    </p>
                    {sectionItem.clauses.map((clause) => (
                      <p key={clause.n} className="mb-2">
                        <span className="text-fg">{clause.n}.</span> {clause.text}
                      </p>
                    ))}
                  </div>
                ))}
                <p className="mt-4 border-t border-line pt-4 text-xs text-fg-mute">
                  You have reached the end of the waiver.
                </p>
              </div>

              {!scrolledToEnd && (
                <p className="mt-3 text-xs text-fg-mute">
                  Scroll to the end of the waiver to enable the checkbox.
                </p>
              )}

              <label
                className={`mt-6 flex items-start gap-3 ${
                  scrolledToEnd ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)] disabled:cursor-not-allowed"
                  checked={fitnessAttestation}
                  disabled={!scrolledToEnd}
                  onChange={(e) => setFitnessAttestation(e.target.checked)}
                />
                <span className="text-sm text-fg-soft">
                  <span className="font-semibold text-fg">Clause 5 — Fitness to participate.</span>{" "}
                  {FITNESS_ATTESTATION_TEXT}
                </span>
              </label>

              <div className="mt-10 flex justify-between gap-3">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                  <span className="arrow" style={{ transform: "scaleX(-1)" }}>&rarr;</span> Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!step2Valid}
                  style={!step2Valid ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
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

              <label className="mt-8 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <span className="text-sm text-fg-soft">
                  I have read and agree to this waiver, and I understand I am releasing the
                  Activity Provider as described above.
                </span>
              </label>

              <div className="mt-8">
                <label
                  htmlFor="signature"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-mute"
                >
                  Type your full legal name to sign
                </label>
                <input
                  id="signature"
                  type="text"
                  autoComplete="off"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Your full legal name"
                  className="mt-2 w-full border-b border-line-strong bg-transparent pb-2 font-serif text-2xl italic text-fg outline-none focus:border-accent"
                  style={{ fontFamily: "var(--serif)" }}
                />
                <p className="mt-3 text-xs leading-relaxed text-fg-mute">
                  By typing your name above, you adopt it as your legal electronic signature.
                  The date, your IP address, and your browser will be recorded with this signature
                  as part of the audit trail. Document version {WAIVER_VERSION}.
                </p>
              </div>

              {error && <p className="mt-6 text-sm text-danger">{error}</p>}

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
                  disabled={!step3Valid || submitting}
                  style={
                    !step3Valid || submitting ? { opacity: 0.5, cursor: "not-allowed" } : undefined
                  }
                  onClick={handleSubmit}
                >
                  {submitting ? "Submitting…" : "Sign & continue to payment"}{" "}
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
            Enrollment
          </span>
        </header>
        <div className="mx-auto max-w-2xl pb-24 pt-8 sm:pt-14">{children}</div>
      </div>
    </main>
  );
}

function StepHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow"><span className="dot" />{eyebrow}</p>
      <h1 className="display mt-3 text-4xl text-fg sm:text-5xl">{title}</h1>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-mute">
        {label}
      </span>
      {children}
    </label>
  );
}

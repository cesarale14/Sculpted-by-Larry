"use client";

import { useEffect, useRef } from "react";
import {
  WAIVER_SECTIONS,
  WAIVER_VERSION,
  ACTIVITY_PROVIDER,
  FITNESS_ATTESTATION_TEXT,
  fillIntro,
} from "@/lib/waiver";
import type { WaiverFormApi } from "./useWaiverForm";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ── Shared primitives ────────────────────────────────────────────────────────

export function StepHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow"><span className="dot" />{eyebrow}</p>
      <h1 className="display mt-3 text-4xl text-fg sm:text-5xl">{title}</h1>
    </div>
  );
}

export function Field({
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

// ── Step: Your details (intake) ──────────────────────────────────────────────

export function DetailsStep({ form }: { form: WaiverFormApi }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Field label="Full name" className="sm:col-span-2">
        <input
          className="field"
          type="text"
          autoComplete="name"
          value={form.participantName}
          onChange={(e) => form.setParticipantName(e.target.value)}
          placeholder="Your full legal name"
        />
      </Field>
      <Field label="Email">
        <input
          className="field"
          type="email"
          autoComplete="email"
          value={form.participantEmail}
          onChange={(e) => form.setParticipantEmail(e.target.value)}
          placeholder="you@email.com"
        />
      </Field>
      <Field label="Phone">
        <input
          className="field"
          type="tel"
          autoComplete="tel"
          value={form.participantPhone}
          onChange={(e) => form.setParticipantPhone(e.target.value)}
          placeholder="(813) 555-0123"
        />
      </Field>
      <Field label="Date of birth">
        <input
          className="field"
          type="date"
          value={form.participantDob}
          onChange={(e) => form.setParticipantDob(e.target.value)}
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
          value={form.emergencyName}
          onChange={(e) => form.setEmergencyName(e.target.value)}
          placeholder="Their name"
        />
      </Field>
      <Field label="Emergency contact phone">
        <input
          className="field"
          type="tel"
          value={form.emergencyPhone}
          onChange={(e) => form.setEmergencyPhone(e.target.value)}
          placeholder="Their phone"
        />
      </Field>
    </div>
  );
}

// ── Step: Read the waiver (scroll-gated + clause-5 attestation) ───────────────

export function WaiverReadStep({ form }: { form: WaiverFormApi }) {
  const waiverBoxRef = useRef<HTMLDivElement>(null);
  const { scrolledToEnd, setScrolledToEnd } = form;

  // Auto-enable the "read" gate if the waiver text isn't tall enough to scroll.
  useEffect(() => {
    const el = waiverBoxRef.current;
    if (el && el.scrollHeight - el.clientHeight < 8) setScrolledToEnd(true);
  }, [setScrolledToEnd]);

  function handleWaiverScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 32) setScrolledToEnd(true);
  }

  const now = new Date();
  const introText = fillIntro(
    form.participantName.trim() || "[participant name]",
    ordinal(now.getDate()),
    `${MONTHS[now.getMonth()]}, ${now.getFullYear()}`,
  );

  return (
    <>
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
          checked={form.fitnessAttestation}
          disabled={!scrolledToEnd}
          onChange={(e) => form.setFitnessAttestation(e.target.checked)}
        />
        <span className="text-sm text-fg-soft">
          <span className="font-semibold text-fg">Clause 5 — Fitness to participate.</span>{" "}
          {FITNESS_ATTESTATION_TEXT}
        </span>
      </label>
    </>
  );
}

// ── Step: Agree & sign (affirmative checkbox + typed signature) ───────────────

export function SignStep({ form, error }: { form: WaiverFormApi; error?: string | null }) {
  return (
    <>
      <label className="mt-8 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
          checked={form.agree}
          onChange={(e) => form.setAgree(e.target.checked)}
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
          value={form.signatureName}
          onChange={(e) => form.setSignatureName(e.target.value)}
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
    </>
  );
}

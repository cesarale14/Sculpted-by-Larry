"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Client-side guardrails — the server re-validates these on /api/pay/checkout.
const MIN_AMOUNT = 25;
const MAX_AMOUNT = 5000;

type Billing = "one_time" | "weekly" | "monthly";

// The cadence Larry quoted. One-time is the default (the common case); weekly
// and monthly create a Stripe subscription at the same client-entered amount.
const BILLING_OPTIONS: { key: Billing; label: string }[] = [
  { key: "one_time", label: "One-time" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

export function PayFlow() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [billing, setBilling] = useState<Billing>("one_time");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Whole dollars only — strip anything that isn't a digit as the client types.
  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value.replace(/[^\d]/g, ""));
  }

  const emailOk = EMAIL_REGEX.test(email.trim());
  const amountNum = Number(amount);
  const amountOk =
    amount !== "" &&
    Number.isInteger(amountNum) &&
    amountNum >= MIN_AMOUNT &&
    amountNum <= MAX_AMOUNT;
  const valid = name.trim() !== "" && emailOk && amountOk;

  async function handleSubmit() {
    if (!valid) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/pay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          amount: amountNum,
          billing,
        }),
      });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.url) {
        window.location.href = body.url as string;
        return;
      }
      throw new Error(body?.error || "Something went wrong. Please try again.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main id="main" className="min-h-screen bg-bg">
      <div className="container">
        <header className="flex items-center justify-between py-7">
          <Logo href="/" size={26} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute">
            Payment
          </span>
        </header>

        <div className="mx-auto max-w-lg pb-24 pt-10 sm:pt-16">
          <p className="eyebrow"><span className="dot" />In-person training</p>
          <h1 className="display mt-3 text-5xl text-fg sm:text-6xl">
            SETTLE <span className="font-serif italic font-normal text-accent">up.</span>
          </h1>
          <p className="mt-4 text-fg-soft leading-relaxed">
            Enter the amount you agreed on with Larry.
          </p>

          <form
            className="mt-10 flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-mute">
                Full name
              </span>
              <input
                className="field"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-mute">
                Email <span className="text-fg-mute normal-case tracking-normal">(for your receipt)</span>
              </span>
              <input
                className="field"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-mute">
                Amount (USD)
              </span>
              <div
                className="flex items-center gap-2 border border-line-strong bg-bg-soft px-5 py-4 focus-within:border-accent"
              >
                <span className="font-mono text-3xl text-fg-mute">$</span>
                <input
                  className="w-full bg-transparent font-mono text-4xl text-fg outline-none placeholder:text-fg-mute sm:text-5xl"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  aria-label="Amount in US dollars"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-mute">
                Whole dollars · ${MIN_AMOUNT}–${MAX_AMOUNT.toLocaleString()}
              </span>
            </label>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-mute">
                How often
              </span>
              <div className="grid grid-cols-3 gap-3">
                {BILLING_OPTIONS.map((option) => {
                  const selected = billing === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setBilling(option.key)}
                      className="display px-2 py-4 text-lg transition-colors"
                      style={{
                        border: "1px solid",
                        borderColor: selected ? "var(--accent)" : "var(--line-strong)",
                        background: selected ? "var(--bg-soft)" : "transparent",
                        color: selected ? "var(--accent)" : "var(--fg)",
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {billing !== "one_time" && (
                <p className="mt-1 text-xs leading-relaxed text-fg-mute">
                  Recurring charges continue until you or Larry cancel — just tell Larry
                  when you&apos;re done.
                </p>
              )}
            </div>

            {error && <p className="text-sm text-danger">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary mt-2 w-full justify-center"
              disabled={!valid || submitting}
              style={!valid || submitting ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            >
              {submitting ? "Redirecting…" : "Continue to payment"}{" "}
              {!submitting && <span className="arrow">&rarr;</span>}
            </button>

            <p className="text-center text-xs leading-relaxed text-fg-mute">
              Payments are processed by Stripe. You&apos;ll get a receipt by email.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

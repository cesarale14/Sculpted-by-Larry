"use client";

import { useState } from "react";

export function LeadCaptureForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok || !body.success) {
        throw new Error(body.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-accent p-8 text-center">
        <p className="eyebrow justify-center" style={{ display: "inline-flex" }}>
          <span className="dot" aria-hidden="true" />
          Check your inbox
        </p>
        <p className="display mt-3 text-3xl text-fg">You&apos;re in.</p>
        <p className="mt-3 text-sm text-fg-soft leading-relaxed">
          Your free 5-Day Sculpt Starter Plan is on its way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-5 text-left">
      <label htmlFor="lead-name" className="sr-only">
        Your first name
      </label>
      <input
        id="lead-name"
        type="text"
        name="name"
        required
        placeholder="Your first name"
        className="field"
      />
      <label htmlFor="lead-email" className="sr-only">
        Your email
      </label>
      <input
        id="lead-email"
        type="email"
        name="email"
        required
        placeholder="Your email"
        className="field"
      />
      {error && <p className="text-center text-sm text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary mt-2 w-full justify-center"
        style={loading ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
      >
        {loading ? "Sending…" : "Send me the plan"}{" "}
        {!loading && <span className="arrow">→</span>}
      </button>
    </form>
  );
}

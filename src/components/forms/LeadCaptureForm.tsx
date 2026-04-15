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
      <div className="rounded-xl p-8 text-center bg-navy-light border border-gold">
        <p className="font-heading text-2xl font-semibold text-gold">You&apos;re In</p>
        <p className="mt-2 font-body text-sm text-gray-300">
          Check your inbox for your free 5-Day Sculpt Starter Plan.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3.5 rounded-lg font-body text-base bg-navy-light border border-navy-lighter text-white placeholder:text-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto text-left">
      <input
        type="text"
        name="name"
        required
        placeholder="Your first name"
        className={inputClasses}
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        className={inputClasses}
      />
      {error && (
        <p className="font-body text-sm text-error text-center">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center font-body text-[15px] font-medium bg-gold text-navy rounded-lg px-8 py-3.5 hover:bg-gold-hover transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Get the Free Plan"}
      </button>
    </form>
  );
}

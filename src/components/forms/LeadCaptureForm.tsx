"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function LeadCaptureForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Mailerlite API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-accent)" }}
      >
        <p className="font-heading text-2xl font-semibold" style={{ color: "var(--accent)" }}>
          You&apos;re In!
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          Check your inbox for your free 5-Day Sculpt Starter Plan.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors"
        style={{
          background: "color-mix(in srgb, var(--text-primary) 10%, transparent)",
          border: "1px solid var(--border-color)",
          color: "var(--text-primary)",
        }}
      />
      <Button type="submit">Get Free Plan</Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const inputStyle: React.CSSProperties = {
  background: "color-mix(in srgb, var(--text-primary) 10%, transparent)",
  border: "1px solid var(--border-color)",
  color: "var(--text-primary)",
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Resend API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-xl p-8 text-center"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-accent)" }}
      >
        <p className="font-heading text-2xl font-semibold" style={{ color: "var(--accent)" }}>
          Message Sent!
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          I&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          placeholder="First name"
          className="px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors"
          style={inputStyle}
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors"
          style={inputStyle}
        />
      </div>
      <textarea
        required
        rows={4}
        placeholder="Tell me about your goals..."
        className="w-full px-4 py-3 rounded-lg font-body text-sm focus:outline-none transition-colors resize-none"
        style={inputStyle}
      />
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}

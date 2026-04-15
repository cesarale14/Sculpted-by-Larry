import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Cancelled",
  description: "No worries — your spot is still available.",
};

export default function PaymentCancelPage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h1
          className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide"
          style={{ color: "var(--text-primary)" }}
        >
          Payment Cancelled
        </h1>

        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          No worries — your spot is still available. If you have questions, book a free call and we&apos;ll figure out the right plan together.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="inline-block px-8 py-4 rounded-lg font-sans text-sm font-medium uppercase tracking-wider transition-all hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
          >
            Book a Free Call
          </Link>
          <Link
            href="/programs"
            className="inline-block px-8 py-4 rounded-lg font-sans text-sm font-medium uppercase tracking-wider transition-all hover:-translate-y-0.5"
            style={{
              background: "transparent",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
            }}
          >
            View Programs
          </Link>
        </div>
      </div>
    </section>
  );
}

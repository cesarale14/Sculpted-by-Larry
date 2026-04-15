import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Confirmed",
  description: "Thank you for choosing Sculpted by Larry.",
};

const nextSteps = [
  {
    num: "01",
    title: "Larry will reach out within 24 hours",
    desc: "You'll hear from me personally to kick off your onboarding.",
  },
  {
    num: "02",
    title: "You'll get your custom program",
    desc: "Tailored to your goals, schedule, and experience level.",
  },
  {
    num: "03",
    title: "Your transformation begins",
    desc: "Show up, follow the plan, and the results will follow.",
  },
];

export default function PaymentSuccessPage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex justify-center">
          <CheckCircle2
            size={80}
            strokeWidth={1.5}
            style={{ color: "var(--accent)" }}
          />
        </div>

        <h1
          className="mt-8 font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide"
          style={{ color: "var(--text-primary)" }}
        >
          Payment Confirmed
        </h1>

        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Thank you for choosing Sculpted by Larry. You&apos;ll receive a confirmation email shortly with your next steps.
        </p>

        <div className="mt-12 text-left">
          <h2
            className="font-heading text-xl font-semibold uppercase tracking-wide text-center"
            style={{ color: "var(--text-primary)" }}
          >
            What Happens Next
          </h2>

          <ol className="mt-8 space-y-6">
            {nextSteps.map((step) => (
              <li key={step.num} className="flex gap-4">
                <span
                  className="font-heading text-3xl font-bold shrink-0"
                  style={{ color: "var(--accent)" }}
                >
                  {step.num}
                </span>
                <div>
                  <h3
                    className="font-heading text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-lg font-sans text-sm font-medium uppercase tracking-wider transition-all hover:-translate-y-0.5"
            style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Confirmed | Sculpted by Larry",
  description: "Thank you for choosing Sculpted by Larry.",
  robots: { index: false, follow: false },
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
    <section className="min-h-screen flex items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28 bg-navy">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="flex justify-center">
          <CheckCircle2 size={80} strokeWidth={1.5} className="text-gold" />
        </div>

        <p className="mt-8 font-body text-[13px] font-medium uppercase tracking-[0.2em] text-gold">
          You&apos;re In
        </p>
        <h1 className="mt-3 font-heading text-4xl md:text-5xl font-bold text-white uppercase tracking-wide leading-[0.95]">
          Payment Confirmed
        </h1>

        <p className="mt-6 font-body text-lg text-gray-300 leading-relaxed">
          Thank you for choosing Sculpted by Larry. You&apos;ll receive a confirmation email shortly with your next steps.
        </p>

        <div className="mt-12 text-left">
          <h2 className="font-heading text-xl md:text-2xl font-semibold text-white uppercase tracking-wide text-center">
            What Happens Next
          </h2>

          <ol className="mt-8 space-y-6">
            {nextSteps.map((step) => (
              <li key={step.num} className="flex gap-4">
                <span className="font-heading text-3xl font-bold text-gold shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-gray-300 leading-relaxed">
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
            className="inline-flex items-center font-body text-[15px] font-medium bg-gold text-navy rounded-lg px-8 py-3.5 hover:bg-gold-hover transition-all duration-200 hover:-translate-y-0.5"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

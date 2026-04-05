import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Free 5-Day Sculpt Starter Plan",
  description:
    "Get Larry's free 5-Day Sculpt Starter Plan delivered to your inbox. Start your fitness transformation today.",
};

export default function FreePlanPage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center py-20"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <p
            className="text-sm uppercase tracking-[0.3em] font-body mb-4"
            style={{ color: "var(--accent)" }}
          >
            Free Download
          </p>
          <h1
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-wider leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Larry&apos;s 5-Day
            <br />
            <span style={{ color: "var(--accent)" }}>Sculpt Starter Plan</span>
          </h1>
          <p
            className="mt-6 font-body leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            A free 5-day training plan to kickstart your fitness journey. Enter
            your email and get instant access.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10">
            <LeadCaptureForm />
          </div>
        </ScrollReveal>

        <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
          By signing up you agree to receive emails from {BRAND.name}. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

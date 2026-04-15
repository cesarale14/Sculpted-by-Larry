import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CalEmbed } from "@/components/booking/CalEmbed";

const CAL_LINK =
  process.env.NEXT_PUBLIC_CALCOM_LINK || "sculpted-by-larry/free-consultation";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a free 15-minute consultation with Larry. Let's discuss your fitness goals and find the right program for you.",
};

const steps = [
  {
    num: "01",
    title: "Pick a Time",
    desc: "Choose a 15-minute slot that works for your schedule.",
  },
  {
    num: "02",
    title: "Tell Me Your Goals",
    desc: "We'll discuss where you are now and where you want to be.",
  },
  {
    num: "03",
    title: "Get Your Plan",
    desc: "I'll recommend the best program and we'll map out your next steps.",
  },
];

export default function BookPage() {
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Book a Free Call"
            subtitle="15 minutes. No pressure. Let's talk about your goals."
          />

          <ScrollReveal>
            <div
              className="rounded-xl overflow-hidden min-h-[700px]"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
            >
              <CalEmbed calLink={CAL_LINK} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="What to Expect"
            subtitle="Your free consultation in 3 simple steps."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.15}>
                <div className="text-center">
                  <span
                    className="font-heading text-5xl font-bold"
                    style={{ color: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="mt-4 font-heading text-xl font-semibold uppercase tracking-wide"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

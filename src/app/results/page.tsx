import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Results",
  description:
    "See real client transformations and testimonials from Sculpted by Larry training programs.",
};

const metrics = [
  { value: "500+", label: "Pounds Lost by Clients" },
  { value: "50+", label: "Clients Trained" },
  { value: "98%", label: "Client Retention Rate" },
];

const testimonials = [
  {
    name: "Michael R.",
    goal: "Lost 25 lbs in 12 weeks",
    quote:
      "Larry completely changed how I approach fitness. The accountability and personalized programming made all the difference.",
  },
  {
    name: "Sarah T.",
    goal: "First pull-up at 35",
    quote:
      "I never thought I'd be the kind of person who looks forward to the gym. Larry made training something I actually enjoy.",
  },
  {
    name: "James K.",
    goal: "Gained 15 lbs of muscle",
    quote:
      "The online coaching program was exactly what I needed. Custom workouts, nutrition plan, and Larry was always a message away.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Results"
            subtitle="Real people, real transformations. See what's possible."
          />

          <ScrollReveal>
            <div className="grid grid-cols-3 gap-6 text-center mb-16">
              {metrics.map((m) => (
                <div key={m.label}>
                  <p
                    className="font-heading text-3xl md:text-5xl font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {m.value}
                  </p>
                  <p
                    className="mt-2 text-xs md:text-sm uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Transformations" />

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="rounded-xl aspect-[3/4] flex items-center justify-center"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
              >
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Before
                  </p>
                  <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Photo coming soon</p>
                </div>
              </div>
              <div
                className="rounded-xl aspect-[3/4] flex items-center justify-center"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-accent)" }}
              >
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    After
                  </p>
                  <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Photo coming soon</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading title="What Clients Say" />

          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="pl-6" style={{ borderLeft: "2px solid var(--accent)" }}>
                  <blockquote
                    className="text-lg italic font-heading leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p
                    className="mt-3 font-body text-sm uppercase tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    &mdash; {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.goal}</p>
                  <p className="text-xs mt-1 italic" style={{ color: "var(--text-muted)" }}>
                    *Placeholder testimonial
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CountUp } from "@/components/ui/CountUp";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Results",
  description:
    "See real client transformations and testimonials from Sculpted by Larry training programs.",
};

const metrics = [
  { end: 500, suffix: "+", label: "Pounds Lost by Clients" },
  { end: 50, suffix: "+", label: "Clients Trained" },
  { end: 98, suffix: "%", label: "Client Retention" },
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
      "The online coaching program was exactly what I needed. Custom workouts, a nutrition plan, and Larry was always a message away.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-navy text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            overline="Proof"
            title="Results"
            subtitle="Real people, real transformations."
            variant="dark"
          />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-navy-light border-y border-navy-lighter">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 text-center">
              {metrics.map((m) => (
                <div key={m.label}>
                  <CountUp
                    end={m.end}
                    suffix={m.suffix}
                    className="font-heading text-4xl md:text-5xl font-semibold text-gold"
                  />
                  <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-gray-300">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-off-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            overline="Before & After"
            title="Transformations"
            variant="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                <div className="flex">
                  <div className="flex-1 min-h-[200px] bg-gray-100 flex items-center justify-center flex-col">
                    <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500">
                      Before
                    </p>
                    <p className="mt-2 font-body text-xs text-gray-500">Photo coming soon</p>
                  </div>
                  <div className="flex-1 min-h-[200px] bg-gray-100 flex items-center justify-center flex-col">
                    <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-gold-dark">
                      After
                    </p>
                    <p className="mt-2 font-body text-xs text-gray-500">Photo coming soon</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm min-h-[200px] flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="font-heading italic text-2xl text-gray-700">
                    Your transformation could be next.
                  </p>
                  <p className="mt-3 font-body text-sm text-gray-500">
                    Real clients. Real results. Let&apos;s build yours.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            overline="Testimonials"
            title="What Clients Say"
            variant="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.15}>
                <div className="bg-navy-light rounded-xl p-6 border-l-[3px] border-gold h-full">
                  <span className="block font-heading text-5xl leading-none text-gold/30 select-none">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 font-heading italic text-lg text-gray-300 leading-relaxed">
                    {t.quote}
                  </blockquote>
                  <p className="mt-4 font-body text-sm font-medium text-gold not-italic">
                    {t.name}
                  </p>
                  <p className="mt-1 font-body text-xs text-gray-300">{t.goal}</p>
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

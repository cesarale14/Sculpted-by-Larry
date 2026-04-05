import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Larry — ISSA-certified personal trainer in Tampa, FL. Learn about his story, training philosophy, and approach.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div
                className="rounded-xl aspect-[3/4] flex items-center justify-center"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
              >
                <div className="text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
                    style={{
                      background: "color-mix(in srgb, var(--accent) 20%, transparent)",
                      border: "2px solid var(--accent)",
                    }}
                  >
                    <span
                      className="font-heading text-4xl font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      L
                    </span>
                  </div>
                  <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
                    Professional photo coming soon
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <p
                  className="text-sm uppercase tracking-[0.3em] font-body mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  Meet Your Trainer
                </p>
                <h1
                  className="font-heading text-4xl md:text-5xl font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-primary)" }}
                >
                  Larry
                </h1>
                <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  {BRAND.certification} &bull; {BRAND.location}
                </p>

                <div
                  className="mt-8 space-y-4 text-base leading-relaxed font-body"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <p>
                    Fitness wasn&apos;t always part of my story. I know what
                    it&apos;s like to feel lost in the gym, not know where to
                    start, and wonder if any of it is actually working.
                  </p>
                  <p>
                    That struggle is exactly what drove me to become a certified
                    personal trainer. I wanted to be the coach I wish I&apos;d
                    had &mdash; someone who meets you where you are, builds a
                    real plan, and holds you accountable every step of the way.
                  </p>
                  <p>
                    I earned my ISSA certification and built Sculpted by Larry to
                    help people in Tampa and beyond transform not just their
                    bodies, but their relationship with fitness.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Training Philosophy"
            subtitle="What sets Sculpted by Larry apart."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Engineered, Not Generic",
                desc: "Every program is built from scratch for your body, goals, and lifestyle. No templates, no shortcuts.",
              },
              {
                title: "Sustainable Results",
                desc: "I focus on habits that last, not crash diets or unsustainable routines. Real transformation takes time — and I'm here for the long game.",
              },
              {
                title: "Premium Experience",
                desc: "From the first consultation to every check-in, you'll feel supported, motivated, and valued. This is coaching at the highest level.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="text-center">
                  <div
                    className="w-12 h-0.5 mx-auto mb-6"
                    style={{ background: "var(--accent)" }}
                  />
                  <h3
                    className="font-heading text-xl font-semibold uppercase tracking-wide"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.desc}
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

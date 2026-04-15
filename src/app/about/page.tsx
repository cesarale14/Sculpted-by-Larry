import type { Metadata } from "next";
import { Target, TrendingUp, Award as AwardIcon } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTASection } from "@/components/sections/CTASection";
import { StructuredData } from "@/components/StructuredData";
import { personSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Larry | ISSA Certified Personal Trainer | Tampa, FL",
  description:
    "Meet Larry — ISSA certified personal trainer in Tampa, FL. Learn about his training philosophy, credentials, and why he built Sculpted by Larry.",
};

const pillars = [
  {
    icon: Target,
    title: "Engineered, Not Generic",
    desc: "Every program is built from scratch for your body, goals, and lifestyle. No templates, no shortcuts.",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Results",
    desc: "I focus on habits that last, not crash diets or unsustainable routines. Real transformation takes time.",
  },
  {
    icon: AwardIcon,
    title: "Premium Experience",
    desc: "From the first consultation to every check-in, you'll feel supported, motivated, and valued.",
  },
];

export default function AboutPage() {
  return (
    <>
      <StructuredData data={personSchema} />
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-navy text-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            overline="The Trainer"
            title="Meet Larry"
            variant="dark"
            as="h1"
          />
        </div>
      </section>

      <section className="py-20 md:py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm min-h-[500px] flex items-center justify-center flex-col p-8">
                <div className="w-24 h-24 rounded-full border-2 border-gold flex items-center justify-center" aria-hidden="true">
                  <span className="font-heading text-4xl font-bold text-gold">L</span>
                </div>
                <p className="mt-4 font-body text-sm text-gray-500">
                  Professional photo coming soon
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div>
                <p className="font-body text-[13px] font-medium uppercase tracking-[0.2em] text-gold-dark">
                  Meet Your Trainer
                </p>
                <h2 className="mt-3 font-heading text-4xl md:text-5xl font-bold text-gray-700 uppercase tracking-wide">
                  Larry
                </h2>
                <p className="mt-2 font-body text-sm text-gray-500">
                  {BRAND.certification} &bull; {BRAND.location}
                </p>

                <div className="mt-6 space-y-4 font-body text-base text-gray-700 leading-relaxed">
                  <p>
                    Fitness wasn&apos;t always part of my story. I know what it&apos;s like
                    to feel lost in the gym, not know where to start, and wonder if any
                    of it is actually working.
                  </p>
                  <p>
                    That struggle is exactly what drove me to become a certified personal
                    trainer. I wanted to be the coach I wish I&apos;d had &mdash; someone
                    who meets you where you are, builds a real plan, and holds you
                    accountable every step of the way.
                  </p>
                  <p>
                    I earned my ISSA certification and built Sculpted by Larry to help
                    people in Tampa and beyond transform not just their bodies, but their
                    relationship with fitness.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-navy">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading
            overline="Approach"
            title="Training Philosophy"
            subtitle="What sets Sculpted by Larry apart."
            variant="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.15}>
                  <div className="bg-navy-light rounded-xl p-8 border border-navy-lighter text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-gold-muted flex items-center justify-center mx-auto">
                      <Icon size={22} strokeWidth={1.5} className="text-gold" />
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-semibold text-white uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-body text-sm text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

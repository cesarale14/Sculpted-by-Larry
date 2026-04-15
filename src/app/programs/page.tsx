import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "In-person training, online coaching, and starter packs. Find the right program for your fitness goals.",
};

interface Tier {
  title: string;
  price: string;
  priceSuffix?: string;
  altPrice?: string;
  description: string;
  features: readonly string[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
}

const tiers: Tier[] = [
  {
    title: "Starter Pack",
    price: `$${PRICING.starterPack.oneTime}`,
    priceSuffix: "one-time",
    description: PRICING.starterPack.description,
    features: PRICING.starterPack.features,
    cta: "Get Started",
    href: "/book",
  },
  {
    title: "Online Coaching",
    price: `$${PRICING.onlineCoaching.monthly}`,
    priceSuffix: "/ month",
    description: PRICING.onlineCoaching.description,
    features: PRICING.onlineCoaching.features,
    cta: "Book a Call",
    href: "/book",
    featured: true,
    badge: PRICING.onlineCoaching.badge,
  },
  {
    title: "In-Person Training",
    price: `$${PRICING.inPerson.session}`,
    priceSuffix: "/ session",
    altPrice: `or $${PRICING.inPerson.monthly}/mo (${PRICING.inPerson.frequency})`,
    description: PRICING.inPerson.description,
    features: PRICING.inPerson.features,
    cta: "Book a Call",
    href: "/book",
  },
];

const faqs = [
  {
    q: "What makes your coaching different?",
    a: "I focus on building sustainable habits, not just workouts. Every program is custom-built for your body, goals, and lifestyle. No cookie-cutter plans.",
  },
  {
    q: "I'm a complete beginner. Is that okay?",
    a: "Absolutely. Many of my clients started with zero gym experience. I'll meet you where you are and build you up from there.",
  },
  {
    q: "How does online coaching work?",
    a: "You get a custom workout plan, nutrition guidance, and weekly check-ins via video call. Plus WhatsApp access for questions between sessions.",
  },
  {
    q: "Can I switch between in-person and online?",
    a: "Yes. Many clients do a hybrid approach. We'll figure out what works best for your schedule and goals.",
  },
  {
    q: "What's included in the free consultation?",
    a: "A 15-minute call where we discuss your goals, experience level, and which program is the best fit. No pressure, no commitment.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-navy">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading
            overline="Pick Your Program"
            title="Programs"
            subtitle="Choose the training experience that fits your goals, schedule, and budget."
            variant="dark"
          />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.title} delay={i * 0.15} className="flex">
                <div
                  className={`relative w-full flex flex-col rounded-2xl bg-white p-8 border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    tier.featured ? "border-gold lg:scale-[1.02]" : "border-gray-100"
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold rounded-t-2xl" />
                  )}
                  {tier.badge && (
                    <span className="absolute -top-3 right-6 inline-block font-body text-[11px] font-medium uppercase tracking-[0.15em] bg-gold text-navy px-3 py-1 rounded-full">
                      {tier.badge}
                    </span>
                  )}

                  <h3 className="font-heading text-2xl font-semibold text-gray-700 uppercase tracking-wide">
                    {tier.title}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-heading italic text-4xl text-gray-700">
                      {tier.price}
                    </span>
                    {tier.priceSuffix && (
                      <span className="font-body text-sm text-gray-500">
                        {tier.priceSuffix}
                      </span>
                    )}
                  </div>
                  {tier.altPrice && (
                    <p className="mt-1 font-body text-xs text-gray-500">{tier.altPrice}</p>
                  )}

                  <p className="mt-4 font-body text-sm text-gray-500 leading-relaxed">
                    {tier.description}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 font-body text-sm text-gray-700">
                        <Check size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-dark" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href={tier.href}
                      className={`inline-flex items-center justify-center w-full font-body text-[15px] font-medium rounded-lg px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 ${
                        tier.featured
                          ? "bg-gold text-navy hover:bg-gold-hover"
                          : "bg-transparent border border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-white"
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-navy">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeading
            overline="Frequently Asked"
            title="FAQ"
            subtitle="Common questions about training with Larry."
            variant="dark"
          />
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.05}>
                <div className="pb-6 border-b border-navy-lighter">
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-white">
                    {faq.q}
                  </h3>
                  <p className="mt-2 font-body text-sm text-gray-300 leading-relaxed">
                    {faq.a}
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

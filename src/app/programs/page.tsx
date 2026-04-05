import type { Metadata } from "next";
import { PRICING } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "In-person training, online coaching, and starter packs. Find the right program for your fitness goals.",
};

const tiers = [
  {
    title: "1-on-1 In-Person Training",
    price: `$${PRICING.inPerson.session}/session`,
    altPrice: `$${PRICING.inPerson.monthly}/month (${PRICING.inPerson.frequency})`,
    description:
      "Work directly with Larry in Tampa for hands-on coaching, form correction, and real-time accountability.",
    features: [
      "Fully personalized workout programming",
      "Real-time form correction & coaching",
      "Progressive overload tracking",
      "Nutrition guidance included",
      "Flexible scheduling",
      "In-person accountability & motivation",
    ],
    cta: "Book a Call",
    href: "/book",
    featured: true,
  },
  {
    title: "Online Coaching",
    price: `$${PRICING.onlineCoaching.monthly}/month`,
    altPrice: null,
    description:
      "Get a custom training and nutrition plan with weekly coaching, no matter where you are.",
    features: [
      "Custom workout programming updated monthly",
      "Weekly video check-ins",
      "Personalized nutrition plan",
      "WhatsApp support for questions",
      "Progress tracking & adjustments",
      "Access from anywhere nationwide",
    ],
    cta: "Book a Call",
    href: "/book",
    featured: false,
  },
  {
    title: "Starter Pack",
    price: `$${PRICING.starterPack.oneTime}`,
    altPrice: "one-time purchase",
    description:
      "A 4-week self-guided program to kickstart your fitness journey on your own terms.",
    features: [
      "4-week structured workout plan (PDF)",
      "Exercise demonstration video links",
      "Nutrition basics & meal ideas",
      "Progress tracking template",
      "Great for beginners",
    ],
    cta: "Get Started",
    href: "/book",
    featured: false,
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
    a: "Yes! Many clients do a hybrid approach. We'll figure out what works best for your schedule and goals.",
  },
  {
    q: "What's included in the free consultation?",
    a: "A 15-minute call where we discuss your goals, experience level, and which program is the best fit. No pressure, no commitment.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Programs"
            subtitle="Choose the training experience that fits your goals, schedule, and budget."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.title} delay={i * 0.15}>
                <Card gold={tier.featured} className="flex flex-col h-full">
                  <h3
                    className="font-heading text-xl md:text-2xl font-semibold uppercase tracking-wide"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {tier.title}
                  </h3>
                  <p
                    className="mt-3 font-heading text-3xl md:text-4xl font-bold"
                    style={{ color: "var(--accent)" }}
                  >
                    {tier.price}
                  </p>
                  {tier.altPrice && (
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                      {tier.altPrice}
                    </p>
                  )}
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {tier.description}
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span className="mt-0.5" style={{ color: "var(--accent)" }}>
                          &#10003;
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button
                      href={tier.href}
                      variant={tier.featured ? "primary" : "outline"}
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="FAQ"
            subtitle="Common questions about training with Larry."
          />
          <div className="space-y-6">
            {faqs.map((faq) => (
              <ScrollReveal key={faq.q}>
                <div className="pb-6" style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <h3
                    className="font-body font-medium text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
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

import { PRICING } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const programs = [
  {
    title: "1-on-1 In-Person",
    price: `$${PRICING.inPerson.session}/session`,
    sub: `or $${PRICING.inPerson.monthly}/mo (${PRICING.inPerson.frequency})`,
    features: [
      "Personalized training sessions",
      "Form correction & coaching",
      "Progressive overload tracking",
      "In-person accountability",
    ],
    cta: "Book a Call",
    href: "/book",
    featured: false,
    badge: null,
  },
  {
    title: "Online Coaching",
    price: `$${PRICING.onlineCoaching.monthly}/mo`,
    sub: null,
    features: [
      "Custom workout programming",
      "Weekly check-ins",
      "Nutrition guidance",
      "WhatsApp support",
    ],
    cta: "Book a Call",
    href: "/book",
    featured: true,
    badge: "Most Popular",
  },
  {
    title: "Starter Pack",
    price: `$${PRICING.starterPack.oneTime}`,
    sub: "one-time",
    features: [
      "4-week self-guided program",
      "PDF workout plan",
      "Exercise video links",
      "Nutrition basics guide",
    ],
    cta: "Get Started",
    href: "/programs",
    featured: false,
    badge: null,
  },
];

export function ProgramCards() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Programs"
          subtitle="Find the right fit for your goals and lifestyle."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.15}>
              <Card gold={program.featured} className="flex flex-col h-full">
                {program.badge && (
                  <div className="mb-4">
                    <span className="inline-block bg-gold text-navy text-xs font-body font-medium uppercase tracking-wider px-3 py-1 rounded-full">
                      {program.badge}
                    </span>
                  </div>
                )}
                <h3
                  className="font-heading text-xl md:text-2xl font-semibold uppercase tracking-wide"
                  style={{ color: "var(--text-primary)" }}
                >
                  {program.title}
                </h3>
                <p
                  className="mt-3 font-heading text-3xl md:text-4xl font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {program.price}
                </p>
                {program.sub && (
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    {program.sub}
                  </p>
                )}
                <ul className="mt-6 space-y-3 flex-1">
                  {program.features.map((f) => (
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
                    href={program.href}
                    variant={program.featured ? "primary" : "outline"}
                    className="w-full"
                  >
                    {program.cta}
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

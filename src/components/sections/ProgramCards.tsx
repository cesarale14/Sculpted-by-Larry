import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface OnlineTier {
  cadence: string;
  price: string;
  savings?: string;
}

const onlineTiers: OnlineTier[] = [
  { cadence: "Monthly", price: "$199/mo" },
  { cadence: "Quarterly", price: "$499", savings: "save 17%" },
  { cadence: "Yearly", price: "$999", savings: "save 58%" },
];

const onlineFeatures = [
  "Programming built to your body, history, and equipment access",
  "Weekly check-ins and adjustments",
  "Direct message access — Larry replies fast",
  "Nutrition framework (macros, taught honestly)",
  "16-week program structure",
];

const inPersonFeatures = [
  "All Online Coaching program features",
  "Weekly in-person training at Larry's gym",
  "Form coaching that's hard to get any other way",
];

interface ProgramCardsProps {
  showHeading?: boolean;
}

export function ProgramCards({ showHeading = true }: ProgramCardsProps = {}) {
  return (
    <section className="py-20 md:py-24 bg-off-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {showHeading && (
          <SectionHeading
            overline="Two Ways In"
            title="Programs"
            subtitle="Both real coaching, not template programs."
            variant="light"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Online card — slight visual emphasis */}
          <ScrollReveal className="flex">
            <div className="relative w-full flex flex-col rounded-2xl bg-white p-8 md:p-10 border border-gold shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold rounded-t-2xl" />

              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-gray-700 uppercase tracking-wide">
                Online Coaching
              </h3>
              <p className="mt-2 font-heading italic text-base md:text-lg text-gray-500">
                Real coaching from anywhere.
              </p>

              <ul className="mt-6 space-y-3">
                {onlineFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-body text-sm text-gray-700"
                  >
                    <Check
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-gold-dark"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-gold-dark mb-3">
                  Commitment
                </p>
                <div className="space-y-2">
                  {onlineTiers.map((tier) => (
                    <div
                      key={tier.cadence}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="font-body text-sm text-gray-700">
                        {tier.cadence}
                      </span>
                      <span className="flex items-baseline gap-2">
                        <span className="font-heading italic text-xl text-gray-700">
                          {tier.price}
                        </span>
                        {tier.savings && (
                          <span className="font-body text-xs text-gold-dark">
                            {tier.savings}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/free-plan"
                  className="inline-flex items-center justify-center w-full font-body text-[15px] font-medium rounded-lg px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 bg-gold text-navy hover:bg-gold-hover"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* In-Person card */}
          <ScrollReveal delay={0.15} className="flex">
            <div className="relative w-full flex flex-col rounded-2xl bg-white p-8 md:p-10 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-gray-700 uppercase tracking-wide">
                In-Person <span className="text-gold-dark">(Tampa)</span>
              </h3>
              <p className="mt-2 font-heading italic text-base md:text-lg text-gray-500">
                Everything online includes, plus weekly sessions with Larry.
              </p>

              <ul className="mt-6 space-y-3">
                {inPersonFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-body text-sm text-gray-700"
                  >
                    <Check
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-gold-dark"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="font-heading italic text-2xl md:text-3xl text-gray-700 leading-tight">
                  Price by conversation.
                </p>
                <p className="mt-2 font-body text-sm text-gray-700">
                  First session is free.
                </p>
                <p className="mt-2 font-body text-sm text-gray-500 leading-relaxed">
                  Get on the calendar with Larry to talk through fit.
                </p>
              </div>

              <div className="mt-auto pt-8">
                <a
                  href="https://cal.com/sculptedbylarry/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full font-body text-[15px] font-medium rounded-lg px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 bg-transparent border border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-white"
                >
                  Book a 15-min call
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

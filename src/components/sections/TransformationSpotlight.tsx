import Link from "next/link";
import { Quote, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function TransformationSpotlight() {
  return (
    <section className="py-20 md:py-24 bg-navy">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          overline="Real Results"
          title="Transformations"
          subtitle="See what's possible with the right plan and the right coach."
          variant="dark"
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl aspect-[3/4] bg-navy-light border border-navy-lighter flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/logo_badge_dark.svg"
                    alt=""
                    loading="lazy"
                    className="w-24 h-24"
                  />
                </div>
                <div className="relative text-center">
                  <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gray-300">
                    Before
                  </p>
                </div>
              </div>
              <div className="rounded-xl aspect-[3/4] bg-navy-light border-2 border-gold flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/logo_badge_dark.svg"
                    alt=""
                    loading="lazy"
                    className="w-24 h-24"
                  />
                </div>
                <div className="relative text-center">
                  <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
                    After
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-navy-light border-l-[3px] border-gold rounded-r-xl p-8">
              <Quote size={32} strokeWidth={1.5} className="text-gold mb-4" />
              <blockquote className="font-heading italic text-xl md:text-2xl text-gray-300 leading-relaxed">
                Larry completely changed how I approach fitness. In 12 weeks I
                lost 25 lbs and gained confidence I never thought possible.
              </blockquote>
              <p className="mt-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-gold">
                Michael R. &mdash; Tampa, FL
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 text-center">
          <Link
            href="/results"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-gold hover:underline underline-offset-4"
          >
            See More Results
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gold">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy uppercase tracking-wide leading-tight">
            Ready to Get{" "}
            <span className="italic font-semibold">Sculpted?</span>
          </h2>
          <p className="mt-6 font-body text-lg text-navy/70 max-w-xl mx-auto leading-relaxed">
            Book a free 15-minute consultation and let&apos;s build the plan
            that gets you there.
          </p>
          <div className="mt-10">
            <Link
              href="/book"
              className="inline-flex items-center font-body text-[15px] font-medium bg-navy text-white rounded-lg px-8 py-3.5 hover:bg-navy-light transition-all duration-200 hover:-translate-y-0.5"
            >
              Book a Free Call
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

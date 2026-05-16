import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gold">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight">
            Real coaching, <span className="italic">not motivational content.</span>
          </h2>
          <div className="mt-6 font-body text-lg text-navy/75 max-w-xl mx-auto leading-relaxed space-y-3">
            <p>
              Programming built to your body, your history, and what you can
              actually sustain.
            </p>
            <p>Get on the calendar with Larry to talk through fit.</p>
          </div>
          <div className="mt-10">
            <a
              href="https://cal.com/sculptedbylarry/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-body text-[15px] font-medium bg-navy text-white rounded-lg px-8 py-3.5 hover:bg-navy-light transition-all duration-200 hover:-translate-y-0.5"
            >
              Book a 15-min call
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

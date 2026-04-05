import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <h2
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to Get{" "}
            <span style={{ color: "var(--accent)" }}>Sculpted</span>?
          </h2>
          <p
            className="mt-6 text-lg font-body"
            style={{ color: "var(--text-secondary)" }}
          >
            Book a free 15-minute consultation and let&apos;s build your plan.
          </p>
          <div className="mt-10">
            <Button href="/book">Book a Free Call</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

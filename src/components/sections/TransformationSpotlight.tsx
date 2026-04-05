import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function TransformationSpotlight() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Real Results"
          subtitle="See what's possible with the right plan and the right coach."
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div
                className="rounded-xl aspect-[3/4] flex items-center justify-center"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="text-center">
                  <p
                    className="text-sm uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Before
                  </p>
                  <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                    Photo coming soon
                  </p>
                </div>
              </div>
              <div
                className="rounded-xl aspect-[3/4] flex items-center justify-center"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-accent)",
                }}
              >
                <div className="text-center">
                  <p
                    className="text-sm uppercase tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    After
                  </p>
                  <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                    Photo coming soon
                  </p>
                </div>
              </div>
            </div>

            <div>
              <blockquote
                className="text-lg md:text-xl italic font-heading leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                &ldquo;Larry completely changed how I approach fitness. In 12
                weeks I lost 25 lbs and gained confidence I never thought
                possible.&rdquo;
              </blockquote>
              <p
                className="mt-4 font-body text-sm uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                &mdash; Michael R., Tampa
              </p>
              <p className="text-xs mt-1 italic" style={{ color: "var(--text-muted)" }}>
                *Placeholder testimonial
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

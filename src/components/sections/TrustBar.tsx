import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  { label: "ISSA Certified", value: "Certified" },
  { label: "Location", value: "Tampa, FL" },
  { label: "Clients Trained", value: "50+" },
  { label: "Client Satisfaction", value: "98%" },
];

export function TrustBar() {
  return (
    <section
      className="py-10 md:py-12"
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-heading text-2xl md:text-3xl font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-1 text-xs md:text-sm uppercase tracking-wider font-body"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

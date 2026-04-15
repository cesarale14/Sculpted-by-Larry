import { ScrollReveal } from "@/components/ui/ScrollReveal";

const items = [
  { value: "ISSA", label: "Certified Trainer" },
  { value: "Tampa, FL", label: "Training Location" },
  { value: "50+", label: "Clients Trained" },
  { value: "98%", label: "Satisfaction Rate" },
];

export function TrustBar() {
  return (
    <section className="py-8 md:py-10 bg-navy-light border-y border-navy-lighter">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {items.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-heading text-2xl md:text-3xl font-semibold text-gold">
                  {item.value}
                </p>
                <p className="mt-1 font-body text-[11px] md:text-xs uppercase tracking-[0.15em] text-gray-300">
                  {item.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

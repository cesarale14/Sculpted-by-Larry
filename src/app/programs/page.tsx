import type { Metadata } from "next";
import { ProgramCards } from "@/components/sections/ProgramCards";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Programs · Sculpted by Larry",
  description:
    "Two ways in: online coaching ($199/mo, $499/quarter, $999/year) or in-person training in Tampa. Real coaching, not template programs.",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-navy">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-body text-[13px] font-medium uppercase tracking-[0.2em] text-gold mb-5">
            Programs
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.02]">
            Two ways in.
          </h1>
          <p className="mt-5 font-heading italic text-xl md:text-2xl text-gray-300 leading-snug">
            Both real coaching, not template programs.
          </p>
        </div>
      </section>

      <ProgramCards showHeading={false} />

      <CTASection />
    </>
  );
}

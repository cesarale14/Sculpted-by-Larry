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
      <div style={{ height: 120 }} aria-hidden="true" />
      <ProgramCards />
      <CTASection />
    </>
  );
}

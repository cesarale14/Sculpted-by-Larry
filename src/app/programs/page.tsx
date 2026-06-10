import type { Metadata } from "next";
import { ProgramCards } from "@/components/sections/ProgramCards";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Programs · Sculpted by Larry",
  description:
    "Online coaching, one program — $199/mo, $499/quarter, or $999/year. Tampa locals also train in person. Real coaching, not template programs.",
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

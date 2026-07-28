import type { Metadata } from "next";
import { ProgramCards } from "@/components/sections/ProgramCards";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Programs · Sculpted by Larry",
  description:
    "Online coaching, one program — $199/mo, $499/quarter, or $1,599/year. In-person training in Tampa from $70/week. Real coaching, not template programs.",
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

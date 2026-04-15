import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProgramCards } from "@/components/sections/ProgramCards";
import { TransformationSpotlight } from "@/components/sections/TransformationSpotlight";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Sculpted by Larry | Personal Training & Online Coaching | Tampa, FL",
  description:
    "ISSA certified personal trainer offering in-person training in Tampa and online coaching nationwide. Custom programs, nutrition guidance, and real accountability. Book your free consultation.",
  openGraph: {
    title: "Sculpted by Larry | Personal Training & Online Coaching | Tampa, FL",
    description:
      "ISSA certified personal trainer offering in-person training in Tampa and online coaching nationwide. Custom programs, nutrition guidance, and real accountability.",
    url: "/",
    siteName: "Sculpted by Larry",
    type: "website",
    locale: "en_US",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProgramCards />
      <TransformationSpotlight />
      <CTASection />
    </>
  );
}

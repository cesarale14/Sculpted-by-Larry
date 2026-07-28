import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Method } from "@/components/sections/Method";
import { PhotoBand } from "@/components/sections/PhotoBand";
import { FreePlan } from "@/components/sections/FreePlan";
import { Larry } from "@/components/sections/Larry";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProgramCards } from "@/components/sections/ProgramCards";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Sculpted by Larry — Premium Coaching · Tampa, FL",
  description:
    "1:1 coaching with Larry Faria. Online anywhere, in-person in Tampa. Real programming, real coaching, no hype. Start with a free 5-day plan.",
  openGraph: {
    title: "Sculpted by Larry — Premium Coaching · Tampa, FL",
    description:
      "1:1 coaching with Larry Faria. Online anywhere, in-person in Tampa. Real programming, real coaching, no hype.",
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
      <Method />
      <PhotoBand />
      <FreePlan />
      <Larry />
      <Testimonials />
      <ProgramCards />
      <FAQ />
      <CTASection />
    </>
  );
}

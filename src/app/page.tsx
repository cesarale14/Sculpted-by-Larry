import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProgramCards } from "@/components/sections/ProgramCards";
import { TransformationSpotlight } from "@/components/sections/TransformationSpotlight";
import { CTASection } from "@/components/sections/CTASection";

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

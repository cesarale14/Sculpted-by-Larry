import type { Metadata } from "next";
import { StartFlow } from "@/components/start/StartFlow";

// Feature-gated: reachable by direct URL for testing, but kept out of the
// nav, the footer, and the sitemap, and explicitly noindex so it is not
// discoverable until the flow has been tested end-to-end with TEST data.
export const metadata: Metadata = {
  title: "Get Started — Sculpted by Larry",
  description: "Complete your waiver and enrollment with Sculpted by Larry.",
  robots: { index: false, follow: false },
};

export default function StartPage() {
  return <StartFlow />;
}

import type { Metadata } from "next";
import { WaiverFlow } from "@/components/waiver/WaiverFlow";

// Focused route like /start and /pay: standalone waiver signing for in-person
// clients (no plan, no payment). Kept out of the nav/footer/sitemap and
// explicitly noindex — it's shared directly with a client before their session.
export const metadata: Metadata = {
  title: "Sign your waiver — Sculpted by Larry",
  description: "Sign the Sculpted by Larry activity waiver before your first session.",
  robots: { index: false, follow: false },
};

export default function WaiverPage() {
  return <WaiverFlow />;
}

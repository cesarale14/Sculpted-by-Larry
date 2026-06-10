import type { Metadata } from "next";
import { WelcomeView } from "@/components/welcome/WelcomeView";

// Focused route like /start: the post-payment confirmation. Kept out of the
// nav/footer and explicitly noindex — it's only ever reached via Stripe's
// success redirect, never crawled or linked publicly.
export const metadata: Metadata = {
  title: "You're in — Sculpted by Larry",
  description: "Enrollment confirmed.",
  robots: { index: false, follow: false },
};

export default function WelcomePage() {
  return <WelcomeView />;
}

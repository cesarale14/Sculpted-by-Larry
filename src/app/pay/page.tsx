import type { Metadata } from "next";
import { PayFlow } from "@/components/pay/PayFlow";

// Focused route like /start: a custom-amount payment page for in-person clients
// Larry has already quoted in person. Kept out of the nav/footer and explicitly
// noindex — it's shared directly with a client, never crawled or linked publicly.
export const metadata: Metadata = {
  title: "Pay — Sculpted by Larry",
  description: "Pay the amount you agreed on with Larry.",
  robots: { index: false, follow: false },
};

export default function PayPage() {
  return <PayFlow />;
}

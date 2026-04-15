import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  console.warn("STRIPE_SECRET_KEY is not set — Stripe calls will fail at runtime.");
}

export const stripe = new Stripe(secretKey ?? "", {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
});

const SUBSCRIPTION_PRICE_IDS = new Set(
  [
    process.env.STRIPE_PRICE_ONLINE_MONTHLY,
    process.env.STRIPE_PRICE_INPERSON_MONTHLY,
  ].filter(Boolean) as string[],
);

export function isSubscriptionPrice(priceId: string): boolean {
  return SUBSCRIPTION_PRICE_IDS.has(priceId);
}

export interface CreateCheckoutSessionInput {
  priceId: string;
  customerEmail: string;
  customerName: string;
  mode?: "payment" | "subscription";
}

export async function createCheckoutSession({
  priceId,
  customerEmail,
  customerName,
  mode,
}: CreateCheckoutSessionInput): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const resolvedMode: "payment" | "subscription" =
    mode ?? (isSubscriptionPrice(priceId) ? "subscription" : "payment");

  const session = await stripe.checkout.sessions.create({
    mode: resolvedMode,
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: customerEmail,
    metadata: { customerName },
    success_url: `${siteUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/payment/cancel`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout session URL");
  }

  return session.url;
}

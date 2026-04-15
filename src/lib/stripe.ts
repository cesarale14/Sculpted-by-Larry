import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeClient = new Stripe(key, {
      apiVersion: "2026-03-25.dahlia",
      typescript: true,
    });
  }
  return stripeClient;
}

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop: keyof Stripe) {
    const client = getStripe();
    const value = client[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export function isSubscriptionPrice(priceId: string): boolean {
  const subscriptionIds = [
    process.env.STRIPE_PRICE_ONLINE_MONTHLY,
    process.env.STRIPE_PRICE_INPERSON_MONTHLY,
  ].filter(Boolean) as string[];
  return subscriptionIds.includes(priceId);
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

  const session = await getStripe().checkout.sessions.create({
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

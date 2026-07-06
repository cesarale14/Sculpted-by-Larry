import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { sendPaymentConfirmation, sendPaymentNotificationToLarry } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe signature or webhook secret" },
      { status: 400 },
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Signature verification failed";
    console.error("[stripe-webhook] signature verification failed:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_details?.email ?? session.customer_email ?? "";
        const customerName =
          (session.metadata?.customerName as string | undefined) ??
          session.customer_details?.name ??
          "Client";
        const amount = session.amount_total ?? 0;
        const isCustomInPerson = session.metadata?.type === "custom_in_person";

        // Custom in-person payments (from /pay) have no pre-made plan — the
        // client entered the amount Larry quoted. Give the client a clean plan
        // label, but tag Larry's PAYMENT RECEIVED subject with the amount so it
        // reads "… — $[amount] (in-person custom)" and never prints undefined.
        const clientPlan = isCustomInPerson
          ? "In-Person Training — Sculpted by Larry"
          : ((session.metadata?.plan as string | undefined) ??
            (session.mode === "subscription" ? "Coaching Subscription" : "Sculpted by Larry"));
        const larryPlan = isCustomInPerson
          ? `$${(amount / 100).toFixed(2)} (in-person custom)`
          : clientPlan;

        if (email) {
          await sendPaymentConfirmation({ email, customerName, plan: clientPlan, amount });
          // Email-as-record: notify Larry so payment lands in his inbox next to
          // the SIGNED WAIVER email (cross-reference via the waiverRef metadata).
          await sendPaymentNotificationToLarry({ email, customerName, plan: larryPlan, amount });
        }
        break;
      }
      case "customer.subscription.created": {
        // Future: persist subscription record
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[stripe-webhook] handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

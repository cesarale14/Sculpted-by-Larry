import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

// Guardrails — must match the client-side limits in PayFlow. Whole dollars only.
const MIN_AMOUNT = 25;
const MAX_AMOUNT = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Custom-amount payment for in-person clients Larry has already quoted in person.
 * No waiver-token gating here (unlike /api/waiver/checkout): this route is for
 * clients Larry already trains and has agreed a price with face-to-face — the
 * waiver flow is a separate concern. The client enters the agreed amount; Larry
 * verifies it against what he quoted via the PAYMENT RECEIVED notification.
 *
 * The amount is validated on both sides ($25–$5,000, whole dollars) and the
 * session is built with price_data so no pre-made Stripe price is needed.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const amount = body?.amount;

  if (name === "") {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (
    typeof amount !== "number" ||
    !Number.isInteger(amount) ||
    amount < MIN_AMOUNT ||
    amount > MAX_AMOUNT
  ) {
    return NextResponse.json(
      { error: `Enter a whole-dollar amount between $${MIN_AMOUNT} and $${MAX_AMOUNT}.` },
      { status: 400 },
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount * 100,
            product_data: { name: "In-Person Training — Sculpted by Larry" },
          },
        },
      ],
      customer_email: email,
      metadata: {
        type: "custom_in_person",
        client_name: name,
        amount: String(amount),
        // customerName is what the webhook reads for the client's display name.
        customerName: name,
      },
      success_url: `${siteUrl}/welcome?t=custom&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pay`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout session URL");
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[pay/checkout] error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { error: "Payment isn't available right now. Please try again, or text Larry." },
      { status: 503 },
    );
  }
}

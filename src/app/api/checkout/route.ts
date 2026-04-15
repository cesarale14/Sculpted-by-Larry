import { NextResponse } from "next/server";
import { createCheckoutSession, isSubscriptionPrice } from "@/lib/stripe";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { priceId, customerEmail, customerName } = body as {
      priceId?: unknown;
      customerEmail?: unknown;
      customerName?: unknown;
    };

    if (
      typeof priceId !== "string" ||
      typeof customerEmail !== "string" ||
      typeof customerName !== "string" ||
      !priceId.trim() ||
      !customerEmail.trim() ||
      !customerName.trim()
    ) {
      return NextResponse.json(
        { error: "priceId, customerEmail, and customerName are required" },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(customerEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const mode: "payment" | "subscription" = isSubscriptionPrice(priceId)
      ? "subscription"
      : "payment";

    const url = await createCheckoutSession({
      priceId,
      customerEmail: customerEmail.trim(),
      customerName: customerName.trim(),
      mode,
    });

    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { verifyWaiverToken } from "@/lib/waiverToken";
import { WAIVER_VERSION } from "@/lib/waiver";

export const runtime = "nodejs";

// One-time $499 quarterly. Prefer env; fall back to the confirmed price id.
const QUARTERLY_PRICE_ID =
  process.env.STRIPE_PRICE_QUARTERLY || "price_1TeihUCx8rPt5AvKXLVApCIB";

/**
 * Payment handoff — reachable ONLY with a valid waiver token from /api/waiver.
 * The token proves the waiver was completed this session. The waiver reference
 * + participant info ride along in the Stripe session metadata so the Stripe
 * dashboard is the lightweight "signed + paid" cross-reference.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const payload = verifyWaiverToken(body?.token);

  if (!payload) {
    return NextResponse.json(
      { error: "Waiver token is missing, invalid, or expired. Please complete the waiver again." },
      { status: 401 },
    );
  }

  try {
    const url = await createCheckoutSession({
      priceId: QUARTERLY_PRICE_ID,
      customerEmail: payload.email,
      customerName: payload.name,
      mode: "payment",
      metadata: {
        waiverRef: payload.ref,
        waiverVersion: payload.v || WAIVER_VERSION,
        participantEmail: payload.email,
        plan: "Online Coaching — Quarterly",
      },
    });
    return NextResponse.json({ url });
  } catch (err) {
    // Stripe keys not configured yet (go-live step). Waiver is already emailed.
    console.error("[waiver/checkout] error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { error: "Payment isn't enabled yet. Your signed waiver was emailed; Larry will follow up." },
      { status: 503 },
    );
  }
}

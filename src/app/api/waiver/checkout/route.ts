import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { verifyWaiverToken } from "@/lib/waiverToken";
import { WAIVER_VERSION } from "@/lib/waiver";

export const runtime = "nodejs";

type PlanKey = "monthly" | "quarterly" | "yearly";

/**
 * The three commitment tiers a client can pick on /start.
 * - monthly  → recurring Stripe subscription ($199/mo)
 * - quarterly → one-time payment ($499, the existing confirmed price)
 * - yearly   → one-time payment ($999)
 *
 * Price ids come from env (Cesar adds the real live ids in .env.local + Vercel).
 * Quarterly keeps a fallback to the already-confirmed live price so the existing
 * flow never regresses if the env var is missing.
 */
const PLAN_CONFIG: Record<
  PlanKey,
  { mode: "payment" | "subscription"; priceEnv: string; fallbackPrice?: string; label: string }
> = {
  monthly: {
    mode: "subscription",
    priceEnv: "STRIPE_PRICE_MONTHLY",
    label: "Online Coaching — Monthly ($199/mo)",
  },
  quarterly: {
    mode: "payment",
    priceEnv: "STRIPE_PRICE_QUARTERLY",
    fallbackPrice: "price_1TeihUCx8rPt5AvKXLVApCIB",
    label: "Online Coaching — Quarterly ($499)",
  },
  yearly: {
    mode: "payment",
    priceEnv: "STRIPE_PRICE_YEARLY",
    label: "Online Coaching — Yearly ($999)",
  },
};

function isPlanKey(v: unknown): v is PlanKey {
  return v === "monthly" || v === "quarterly" || v === "yearly";
}

/**
 * Payment handoff — reachable ONLY with a valid waiver token from /api/waiver.
 * The token proves the waiver was completed this session. The chosen plan
 * decides the Stripe price + mode (subscription vs one-time). The waiver
 * reference + participant info + plan ride along in the session metadata so the
 * Stripe dashboard is the lightweight "signed + paid" cross-reference, and the
 * webhook can name the plan in the PAYMENT RECEIVED email.
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

  // Validate the plan server-side. Absent → default to quarterly (the original
  // single-plan behaviour). Present-but-unrecognized → reject.
  if (body?.plan !== undefined && !isPlanKey(body.plan)) {
    return NextResponse.json({ error: "Unknown plan selection." }, { status: 400 });
  }
  const plan: PlanKey = isPlanKey(body?.plan) ? body.plan : "quarterly";
  const config = PLAN_CONFIG[plan];
  const priceId = process.env[config.priceEnv] || config.fallbackPrice;

  if (!priceId) {
    // This plan's price id hasn't been configured yet (go-live step).
    console.error(`[waiver/checkout] missing price env ${config.priceEnv} for plan "${plan}"`);
    return NextResponse.json(
      {
        error:
          "That plan isn't available for online checkout yet. Your signed waiver was emailed; Larry will follow up.",
      },
      { status: 503 },
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const url = await createCheckoutSession({
      priceId,
      customerEmail: payload.email,
      customerName: payload.name,
      mode: config.mode,
      metadata: {
        waiverRef: payload.ref,
        waiverVersion: payload.v || WAIVER_VERSION,
        participantEmail: payload.email,
        plan: config.label,
        planKey: plan,
      },
      // The /start flow lands paid clients on the celebratory /welcome page and
      // returns cancellations to /start.
      successUrl: `${siteUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${siteUrl}/start`,
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

import crypto from "crypto";

/**
 * Short-lived HMAC-signed waiver token.
 *
 * Email-as-record architecture: there is NO database. The token is the proof
 * that "a waiver was completed in this session" and is what gates the payment
 * step — /api/waiver mints it, /api/waiver/checkout verifies it before creating
 * the Stripe session. It is NOT persisted anywhere; it carries its own payload
 * and signature and expires on its own.
 *
 * The signing secret is server-only. Prefer a dedicated WAIVER_TOKEN_SECRET;
 * fall back to STRIPE_SECRET_KEY (always present wherever payment works, since
 * the token only matters when handing off to Stripe).
 */

const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

export interface WaiverTokenPayload {
  ref: string; // random reference id — also stamped into Stripe metadata
  name: string;
  email: string;
  v: string; // waiver version
  iat: number;
  exp: number;
}

function secret(): string {
  return (
    process.env.WAIVER_TOKEN_SECRET ||
    process.env.STRIPE_SECRET_KEY ||
    "sbl-dev-waiver-secret-change-me"
  );
}

function sign(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

export function createWaiverToken(input: {
  name: string;
  email: string;
  version: string;
}): { token: string; ref: string; exp: number } {
  const now = Date.now();
  const ref = crypto.randomUUID();
  const payload: WaiverTokenPayload = {
    ref,
    name: input.name,
    email: input.email,
    v: input.version,
    iat: now,
    exp: now + TOKEN_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return { token: `${body}.${sign(body)}`, ref, exp: payload.exp };
}

export function verifyWaiverToken(token: unknown): WaiverTokenPayload | null {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as WaiverTokenPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

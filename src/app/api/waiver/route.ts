import { NextResponse } from "next/server";
import { generateWaiverPdf } from "@/lib/waiverPdf";
import { sendExecutedWaiver } from "@/lib/resend";
import { createWaiverToken } from "@/lib/waiverToken";
import { WAIVER_VERSION } from "@/lib/waiver";

// pdf-lib + crypto require the Node runtime (not edge).
export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** Server-side IP capture — never trust a client-sent IP. */
function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const b = body as Record<string, unknown>;
    const participantName = str(b.participantName);
    const participantEmail = str(b.participantEmail);
    const participantDob = str(b.participantDob);
    const participantPhone = str(b.participantPhone);
    const emergencyName = str(b.emergencyName);
    const emergencyPhone = str(b.emergencyPhone);
    const signatureName = str(b.signatureName);
    const fitnessAttestation = b.fitnessAttestation === true;
    const agree = b.agree === true;
    const clientAgreedAt = str(b.agreedAt);
    // Which flow submitted this. "start" (default) is the enrollment flow with
    // payment attached; "waiver_only" is the standalone /waiver page for
    // in-person clients — Larry's copy gets a line noting no payment follows.
    const source = b.source === "waiver_only" ? "waiver_only" : "start";

    // ── Validation (hand-rolled, matching the repo's existing routes) ─────────
    if (!participantName) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(participantEmail)) {
      return NextResponse.json({ success: false, error: "A valid email is required" }, { status: 400 });
    }
    if (!DATE_REGEX.test(participantDob)) {
      return NextResponse.json({ success: false, error: "Date of birth is required" }, { status: 400 });
    }
    if (!participantPhone) {
      return NextResponse.json({ success: false, error: "Phone is required" }, { status: 400 });
    }
    if (!emergencyName || !emergencyPhone) {
      return NextResponse.json(
        { success: false, error: "Emergency contact name and phone are required" },
        { status: 400 },
      );
    }
    if (!fitnessAttestation) {
      return NextResponse.json(
        { success: false, error: "The fitness-to-participate attestation (clause 5) must be acknowledged" },
        { status: 400 },
      );
    }
    if (!agree) {
      return NextResponse.json(
        { success: false, error: "You must agree to the waiver to continue" },
        { status: 400 },
      );
    }
    if (!signatureName) {
      return NextResponse.json(
        { success: false, error: "A typed signature (full legal name) is required" },
        { status: 400 },
      );
    }

    // agreed_at: trust the client-captured timestamp if valid, else stamp now.
    const parsed = clientAgreedAt ? new Date(clientAgreedAt) : null;
    const agreedDate =
      parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date();
    const agreedAt = agreedDate.toISOString();
    const signedDate = agreedAt.slice(0, 10); // yyyy-mm-dd for the subject line

    // ── Audit trail captured SERVER-side ──────────────────────────────────────
    const signerIp = clientIp(request);
    const userAgent = request.headers.get("user-agent")?.slice(0, 1000) || "unknown";

    // Generate the executed PDF server-side (the email IS the record — no DB).
    const pdfBytes = await generateWaiverPdf({
      participantName,
      participantEmail,
      participantDob,
      participantPhone,
      emergencyName,
      emergencyPhone,
      fitnessAttestation,
      signatureName,
      agreedAt,
      signerIp,
      waiverVersion: WAIVER_VERSION,
    });

    // Email the executed PDF to the participant + Larry. This is the system of
    // record, so a failure here MUST fail the request (no DB fallback).
    const emailResult = await sendExecutedWaiver({
      participantName,
      participantEmail,
      pdfBytes,
      waiverVersion: WAIVER_VERSION,
      signedDate,
      source,
    });
    if (!emailResult.success) {
      console.error("[waiver] email failed:", emailResult.error);
      return NextResponse.json(
        { success: false, error: "We couldn't deliver your signed waiver by email. Please try again." },
        { status: 502 },
      );
    }

    // Mint a short-lived signed token that gates the payment step. Not stored.
    const { token } = createWaiverToken({
      name: participantName,
      email: participantEmail,
      version: WAIVER_VERSION,
    });

    return NextResponse.json({ success: true, token });
  } catch (err) {
    console.error("[waiver] handler error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { success: false, error: "The waiver service is temporarily unavailable." },
      { status: 503 },
    );
  }
}

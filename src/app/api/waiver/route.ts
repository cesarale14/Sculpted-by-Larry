import { NextResponse } from "next/server";
import { getSupabaseAdmin, WAIVER_BUCKET } from "@/lib/supabaseAdmin";
import { generateWaiverPdf } from "@/lib/waiverPdf";
import { sendExecutedWaiver } from "@/lib/resend";
import { createCheckoutSession } from "@/lib/stripe";
import { WAIVER_VERSION } from "@/lib/waiver";

// pdf-lib + service-role insert require the Node runtime (not edge).
export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// One-time $499 quarterly. Prefer env; fall back to the confirmed price id.
const QUARTERLY_PRICE_ID =
  process.env.STRIPE_PRICE_QUARTERLY || "price_1TeihUCx8rPt5AvKXLVApCIB";

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
    const agreedAt =
      parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : new Date().toISOString();

    // ── Audit trail captured SERVER-side ──────────────────────────────────────
    const signerIp = clientIp(request);
    const userAgent = request.headers.get("user-agent")?.slice(0, 1000) || "unknown";

    const supabase = getSupabaseAdmin();

    // 1) Insert the signed waiver (service role — bypasses RLS).
    const { data: inserted, error: insertError } = await supabase
      .from("client_waivers")
      .insert({
        participant_name: participantName,
        participant_email: participantEmail,
        participant_dob: participantDob,
        participant_phone: participantPhone,
        emergency_name: emergencyName,
        emergency_phone: emergencyPhone,
        fitness_attestation: fitnessAttestation,
        waiver_version: WAIVER_VERSION,
        signature_name: signatureName,
        signature_method: "typed",
        agreed_at: agreedAt,
        signer_ip: signerIp,
        user_agent: userAgent,
        payment_status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("[waiver] insert failed:", insertError?.message);
      return NextResponse.json(
        { success: false, error: "Could not store the waiver. Please try again." },
        { status: 500 },
      );
    }

    const waiverId: string = inserted.id;

    // 2) Generate the executed PDF (server-side).
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

    // 3) Store the PDF in the PRIVATE bucket; record the path.
    const pdfPath = `${waiverId}/waiver-${WAIVER_VERSION}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from(WAIVER_BUCKET)
      .upload(pdfPath, Buffer.from(pdfBytes), {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("[waiver] pdf upload failed:", uploadError.message);
    } else {
      await supabase
        .from("client_waivers")
        .update({ pdf_storage_path: pdfPath })
        .eq("id", waiverId);
    }

    // 4) Email the executed PDF to the participant + Larry (best-effort).
    let emailSent = false;
    try {
      const emailResult = await sendExecutedWaiver({
        participantName,
        participantEmail,
        pdfBytes,
        waiverVersion: WAIVER_VERSION,
      });
      emailSent = emailResult.success;
      if (!emailResult.success) {
        console.error("[waiver] email failed:", emailResult.error);
      }
    } catch (err) {
      console.error("[waiver] email threw:", err instanceof Error ? err.message : "unknown");
    }

    // 5) Stripe handoff — Checkout Session tied to this waiver via metadata.
    //    Only reachable here because the waiver is already stored above.
    let checkoutUrl: string | null = null;
    let paymentConfigured = false;
    try {
      checkoutUrl = await createCheckoutSession({
        priceId: QUARTERLY_PRICE_ID,
        customerEmail: participantEmail,
        customerName: participantName,
        mode: "payment",
        metadata: { waiverId, plan: "Online Coaching — Quarterly" },
      });
      paymentConfigured = true;
    } catch (err) {
      // Stripe keys not configured yet (go-live step). Waiver is still stored.
      console.error("[waiver] checkout session failed:", err instanceof Error ? err.message : "unknown");
    }

    return NextResponse.json({
      success: true,
      id: waiverId,
      checkoutUrl,
      paymentConfigured,
      emailSent,
    });
  } catch (err) {
    // Generic catch — e.g. Supabase not configured locally. No PII in logs.
    console.error("[waiver] handler error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { success: false, error: "The waiver service is temporarily unavailable." },
      { status: 503 },
    );
  }
}

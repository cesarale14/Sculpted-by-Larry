import { NextResponse } from "next/server";
import { sendLeadMagnetEmail } from "@/lib/resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
const MAILERLITE_GROUP_NURTURE_EN = process.env.MAILERLITE_GROUP_NURTURE_EN;
// Reserved for Phase 2.5 Spanish nurture sequence (read at module level so Vercel surfaces missing env vars early)
const MAILERLITE_GROUP_NURTURE_ES = process.env.MAILERLITE_GROUP_NURTURE_ES;
void MAILERLITE_GROUP_NURTURE_ES;

async function syncToMailerLite(data: { name: string; email: string }): Promise<void> {
  if (!MAILERLITE_API_KEY) {
    console.warn("MailerLite not configured — skipping subscriber sync");
    return;
  }

  try {
    const groups = MAILERLITE_GROUP_NURTURE_EN ? [MAILERLITE_GROUP_NURTURE_EN] : [];
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILERLITE_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        fields: {
          name: data.name,
          lead_magnet: "5_day_sculpt",
          language: "en",
          signup_source: "free_plan_page",
        },
        groups,
        status: "active",
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`MailerLite sync failed: ${res.status} ${text}`);
    }
  } catch (err) {
    console.error("MailerLite sync threw:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const { name, email } = body as { name?: unknown; email?: unknown };

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      !name.trim() ||
      !email.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "name and email are required" },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const result = await sendLeadMagnetEmail({ name: trimmedName, email: trimmedEmail });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error ?? "Failed to send email" },
        { status: 500 },
      );
    }

    await syncToMailerLite({ name: trimmedName, email: trimmedEmail });

    return NextResponse.json({ success: true, message: "Check your email!" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

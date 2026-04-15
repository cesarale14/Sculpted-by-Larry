import { NextResponse } from "next/server";
import { sendLeadMagnetEmail } from "@/lib/resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const result = await sendLeadMagnetEmail({ name: name.trim(), email: email.trim() });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error ?? "Failed to send email" },
        { status: 500 },
      );
    }

    // Future: Add Mailerlite API integration to add subscriber to list

    return NextResponse.json({ success: true, message: "Check your email!" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

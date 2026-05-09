import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not set");
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Sculpted by Larry <lfaria@sculptedbylarry.com>";
const LARRY_INBOX = "lfaria@sculptedbylarry.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sculptedbylarry.com";

type Result = { success: boolean; error?: string };

function escape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}): Promise<Result> {
  try {
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: LARRY_INBOX,
      replyTo: data.email,
      subject: `New contact form message from ${data.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escape(data.name)}</p>
        <p><strong>Email:</strong> ${escape(data.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escape(data.message).replace(/\n/g, "<br />")}</p>
      `,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function sendLeadMagnetEmail(data: {
  name: string;
  email: string;
}): Promise<Result> {
  try {
    const downloadUrl = `${SITE_URL}/downloads/sculpt-starter-plan.pdf`;
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Here's the plan, ${data.name}.`,
      html: `
        <p>Five days. Five workouts. One nutrition rule.</p>
        <p><a href="${downloadUrl}">Download it here →</a></p>
        <p>Don't print it. Don't read the whole thing tonight.</p>
        <p>Open Day 1 tomorrow morning. Do the workout.<br />Then come back to me.</p>
        <p>If something doesn't make sense, hit reply.<br />I read every email.</p>
        <p>— Larry</p>
      `,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function sendPaymentConfirmation(data: {
  email: string;
  customerName: string;
  plan: string;
  amount: number;
}): Promise<Result> {
  try {
    const amount = (data.amount / 100).toFixed(2);
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Payment confirmed — welcome to ${data.plan}`,
      html: `
        <h2>Welcome, ${escape(data.customerName)}!</h2>
        <p>Your payment for <strong>${escape(data.plan)}</strong> was received successfully.</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p>I'll be in touch within 24 hours with your onboarding details and next steps. Let's get to work.</p>
        <p>— Larry<br />ISSA Certified Personal Trainer</p>
      `,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

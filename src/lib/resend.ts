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

export async function sendExecutedWaiver(data: {
  participantName: string;
  participantEmail: string;
  pdfBytes: Uint8Array;
  waiverVersion: string;
  signedDate: string; // yyyy-mm-dd, used in Larry's filterable subject line
}): Promise<Result> {
  try {
    const content = Buffer.from(data.pdfBytes);
    const filename = `sculpted-by-larry-waiver-${data.waiverVersion}.pdf`;
    const name = escape(data.participantName);
    const version = escape(data.waiverVersion);
    const resend = getResend();

    // Participant's copy — sent separately so the two recipients are never
    // exposed to each other in the To: field.
    const participant = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.participantEmail,
      subject: "Your signed Sculpted by Larry waiver",
      html: `
        <h2>Thanks, ${name}.</h2>
        <p>Attached is your signed Activity Waiver (version ${version}) for your records.</p>
        <p>Keep this for your reference. If anything looks off, just reply to this email.</p>
        <p>&mdash; Larry<br />ISSA Certified Personal Trainer</p>
      `,
      attachments: [{ filename, content }],
    });
    if (participant.error) return { success: false, error: participant.error.message };

    // Larry's record copy.
    const larry = await resend.emails.send({
      from: FROM_EMAIL,
      to: LARRY_INBOX,
      replyTo: data.participantEmail,
      // Filterable/searchable record subject (email-as-record system).
      subject: `SIGNED WAIVER — ${data.participantName} — ${data.signedDate}`,
      html: `
        <h2>New signed waiver</h2>
        <p><strong>Participant:</strong> ${name}</p>
        <p><strong>Email:</strong> ${escape(data.participantEmail)}</p>
        <p><strong>Document version:</strong> ${version}</p>
        <p>The executed PDF is attached.</p>
      `,
      attachments: [{ filename, content }],
    });
    if (larry.error) return { success: false, error: larry.error.message };

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function sendPaymentNotificationToLarry(data: {
  customerName: string;
  email: string;
  plan: string;
  amount: number;
}): Promise<Result> {
  try {
    const amount = (data.amount / 100).toFixed(2);
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: LARRY_INBOX,
      replyTo: data.email,
      // Filterable/searchable record subject (email-as-record system).
      subject: `PAYMENT RECEIVED — ${data.customerName}`,
      html: `
        <h2>Payment received</h2>
        <p><strong>Client:</strong> ${escape(data.customerName)}</p>
        <p><strong>Email:</strong> ${escape(data.email)}</p>
        <p><strong>Plan:</strong> ${escape(data.plan)}</p>
        <p><strong>Amount:</strong> $${amount}</p>
      `,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
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

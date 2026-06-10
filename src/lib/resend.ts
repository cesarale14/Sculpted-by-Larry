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

// ── Branded email shell ──────────────────────────────────────────────────────
// Email-safe: table-based, inline styles only, no external stylesheets, system
// fonts (Georgia / Arial) so it renders consistently in Gmail, Apple Mail, and
// Outlook. Onyx header band with the SBL mark + bone-on-onyx body, matching the
// site's visual system. Every send also carries a plain-text fallback.
const BRAND_INK = "#0B0B0B"; // onyx
const BRAND_SURFACE = "#131311"; // bg-soft
const BRAND_LINE = "#2A2823";
const BRAND_BONE = "#ECE6D6"; // fg
const BRAND_SOFT = "#C9C2B0"; // fg-soft
const BRAND_MUTE = "#8A8472"; // fg-mute
const BRAND_ACCENT = "#C84E2A"; // burnt orange
// The real SBL wordmark (Big Shoulders + dumbbell-U + "by larry"), bone on
// transparent, matching the waiver PDF header. Hardcoded to the canonical https
// host (NOT SITE_URL) so the image resolves in inboxes even when emails are
// generated in a localhost/preview context. Asset: public/brand/email-logo.png.
const EMAIL_LOGO_URL = "https://sculptedbylarry.com/brand/email-logo.png";

/** A single body paragraph in the branded body color. */
function emailParagraph(html: string): string {
  return `<p style="margin:0 0 16px;color:${BRAND_SOFT};font-size:15px;line-height:1.65;">${html}</p>`;
}

/** A label: value row used in Larry's record emails. */
function emailRow(label: string, value: string): string {
  return `<p style="margin:0 0 8px;color:${BRAND_SOFT};font-size:15px;line-height:1.6;"><span style="color:${BRAND_MUTE};">${escape(
    label,
  )}:</span> ${value}</p>`;
}

const SIGNATURE_HTML = `<p style="margin:26px 0 0;color:${BRAND_SOFT};font-size:15px;line-height:1.6;">&mdash; Larry<br /><span style="color:${BRAND_MUTE};font-size:13px;">ISSA Certified Personal Trainer</span></p>`;

function emailShell(opts: { heading: string; bodyHtml: string; preheader?: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escape(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND_INK};">
${
  opts.preheader
    ? `<span style="display:none;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${BRAND_INK};">${escape(
        opts.preheader,
      )}</span>`
    : ""
}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND_INK};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background-color:${BRAND_SURFACE};border:1px solid ${BRAND_LINE};">
        <tr>
          <td style="background-color:${BRAND_INK};padding:22px 28px;border-bottom:1px solid ${BRAND_LINE};">
            <img src="${EMAIL_LOGO_URL}" width="164" height="32" alt="Sculpted by Larry" style="display:block;border:0;outline:none;" />
          </td>
        </tr>
        <tr>
          <td style="padding:34px 28px;font-family:Arial,Helvetica,sans-serif;">
            <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;color:${BRAND_BONE};font-size:23px;font-weight:normal;line-height:1.3;">${escape(
              opts.heading,
            )}</h1>
            <div style="width:40px;height:2px;background-color:${BRAND_ACCENT};margin:0 0 22px;font-size:0;line-height:0;">&nbsp;</div>
            ${opts.bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 28px;border-top:1px solid ${BRAND_LINE};font-family:Arial,Helvetica,sans-serif;color:${BRAND_MUTE};font-size:11px;line-height:1.6;">
            Sculpted by Larry &middot; ISSA Certified Personal Trainer &middot; Tampa, FL<br />
            <a href="${SITE_URL}" style="color:${BRAND_MUTE};text-decoration:underline;">sculptedbylarry.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
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
      html: emailShell({
        heading: `Thanks, ${name}.`,
        preheader: "Your signed Activity Waiver is attached.",
        bodyHtml:
          emailParagraph(
            `Attached is your signed Activity Waiver (version ${version}) for your records.`,
          ) +
          emailParagraph(
            "Keep this for your reference. If anything looks off, just reply to this email.",
          ) +
          SIGNATURE_HTML,
      }),
      text: `Thanks, ${data.participantName}.

Attached is your signed Activity Waiver (version ${data.waiverVersion}) for your records. Keep this for your reference. If anything looks off, just reply to this email.

— Larry
ISSA Certified Personal Trainer`,
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
      html: emailShell({
        heading: "New signed waiver",
        preheader: `${data.participantName} — ${data.signedDate}`,
        bodyHtml:
          emailRow("Participant", name) +
          emailRow("Email", escape(data.participantEmail)) +
          emailRow("Document version", version) +
          emailParagraph("The executed PDF is attached."),
      }),
      text: `New signed waiver

Participant: ${data.participantName}
Email: ${data.participantEmail}
Document version: ${data.waiverVersion}

The executed PDF is attached.`,
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
      subject: `PAYMENT RECEIVED — ${data.customerName} — ${data.plan}`,
      html: emailShell({
        heading: "Payment received",
        preheader: `${data.customerName} — ${data.plan} — $${amount}`,
        bodyHtml:
          emailRow("Client", escape(data.customerName)) +
          emailRow("Email", escape(data.email)) +
          emailRow("Plan", escape(data.plan)) +
          emailRow("Amount", `$${amount}`),
      }),
      text: `Payment received

Client: ${data.customerName}
Email: ${data.email}
Plan: ${data.plan}
Amount: $${amount}`,
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
      html: emailShell({
        heading: "New contact form submission",
        preheader: `${data.name} — ${data.email}`,
        bodyHtml:
          emailRow("Name", escape(data.name)) +
          emailRow("Email", escape(data.email)) +
          `<p style="margin:18px 0 6px;color:${BRAND_MUTE};font-size:15px;line-height:1.6;">Message:</p>` +
          emailParagraph(escape(data.message).replace(/\n/g, "<br />")),
      }),
      text: `New contact form submission

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}`,
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
      html: emailShell({
        heading: "Five days. Five workouts. One nutrition rule.",
        preheader: "Your free 5-day starter plan is ready.",
        bodyHtml:
          emailParagraph(
            `<a href="${downloadUrl}" style="color:${BRAND_ACCENT};text-decoration:underline;font-weight:bold;">Download it here &rarr;</a>`,
          ) +
          emailParagraph("Don't print it. Don't read the whole thing tonight.") +
          emailParagraph(
            "Open Day 1 tomorrow morning. Do the workout.<br />Then come back to me.",
          ) +
          emailParagraph(
            "If something doesn't make sense, hit reply.<br />I read every email.",
          ) +
          SIGNATURE_HTML,
      }),
      text: `Five days. Five workouts. One nutrition rule.

Download it here: ${downloadUrl}

Don't print it. Don't read the whole thing tonight. Open Day 1 tomorrow morning. Do the workout. Then come back to me.

If something doesn't make sense, hit reply. I read every email.

— Larry`,
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
      html: emailShell({
        heading: `Welcome, ${escape(data.customerName)}.`,
        preheader: `Your payment for ${data.plan} was received.`,
        bodyHtml:
          emailParagraph(
            `Your payment for <strong style="color:${BRAND_BONE};">${escape(
              data.plan,
            )}</strong> was received successfully.`,
          ) +
          emailRow("Amount", `$${amount}`) +
          emailParagraph(
            "I'll be in touch within 24 hours with your onboarding details and next steps. Let's get to work.",
          ) +
          SIGNATURE_HTML,
      }),
      text: `Welcome, ${data.customerName}.

Your payment for ${data.plan} was received successfully.
Amount: $${amount}

I'll be in touch within 24 hours with your onboarding details and next steps. Let's get to work.

— Larry
ISSA Certified Personal Trainer`,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

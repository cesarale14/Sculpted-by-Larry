import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import {
  WAIVER_SECTIONS,
  ACTIVITY_PROVIDER,
  fillIntro,
} from "@/lib/waiver";

export interface WaiverPdfData {
  participantName: string;
  participantEmail: string;
  participantDob?: string | null; // yyyy-mm-dd
  participantPhone?: string | null;
  emergencyName?: string | null;
  emergencyPhone?: string | null;
  fitnessAttestation: boolean;
  signatureName: string;
  agreedAt: string; // ISO timestamp
  signerIp: string;
  waiverVersion: string;
}

// US Letter
const W = 612;
const H = 792;
const M = 56; // margin
const CONTENT_W = W - M * 2;
const FOOTER_TOP = 66; // content must stay above this

const INK = rgb(0.05, 0.05, 0.05);
const MUTE = rgb(0.42, 0.42, 0.4);
const ACCENT = rgb(0.784, 0.306, 0.165); // #C84E2A
const HAIRLINE = rgb(0.85, 0.85, 0.83);

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Strip characters the standard WinAnsi fonts can't encode (avoid crashes). */
function safe(s: string | null | undefined): string {
  return (s ?? "").normalize("NFKD").replace(/[^\x20-\x7E]/g, "").trim();
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(test, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Generate the executed waiver PDF server-side (pdf-lib — Node/serverless safe).
 * Content matches the on-page waiver text exactly (shared lib/waiver.ts), with
 * the participant's data, typed signature, and an electronic-signature audit
 * footer stamped on every page.
 */
export async function generateWaiverPdf(data: WaiverPdfData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle("Sculpted by Larry - Activity Waiver");
  doc.setProducer("Sculpted by Larry");

  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const italic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  let page = doc.addPage([W, H]);
  let y = H - M;

  const newPage = () => {
    page = doc.addPage([W, H]);
    y = H - M;
  };
  const ensure = (h: number) => {
    if (y - h < FOOTER_TOP + 16) newPage();
  };

  const para = (
    str: string,
    opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; gap?: number; indent?: number } = {},
  ) => {
    const f = opts.font ?? font;
    const size = opts.size ?? 10.5;
    const color = opts.color ?? INK;
    const gap = opts.gap ?? 3;
    const indent = opts.indent ?? 0;
    for (const ln of wrap(str, f, size, CONTENT_W - indent)) {
      ensure(size + gap);
      page.drawText(ln, { x: M + indent, y: y - size, size, font: f, color });
      y -= size + gap;
    }
  };

  const space = (h: number) => {
    y -= h;
  };

  // ── Header ────────────────────────────────────────────────────────────────
  page.drawText("ACTIVITY WAIVER", { x: M, y: y - 22, size: 22, font: bold, color: INK });
  y -= 30;
  page.drawText(ACTIVITY_PROVIDER, { x: M, y: y - 11, size: 11, font: italic, color: ACCENT });
  y -= 20;
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1, color: ACCENT });
  space(18);

  // ── Intro ───────────────────────────────────────────────────────────────────
  const agreed = new Date(data.agreedAt);
  const dayLabel = ordinal(agreed.getUTCDate());
  const monthYear = `${MONTHS[agreed.getUTCMonth()]}, ${agreed.getUTCFullYear()}`;
  para(fillIntro(safe(data.participantName), dayLabel, monthYear), { gap: 4 });
  space(10);

  // ── Clauses ──────────────────────────────────────────────────────────────────
  for (const section of WAIVER_SECTIONS) {
    ensure(40);
    space(6);
    para(section.heading, { font: bold, size: 10.5, color: ACCENT, gap: 4 });
    for (const clause of section.clauses) {
      para(`${clause.n}.  ${clause.text}`, { gap: 3.5 });
      space(4);
    }
  }

  // ── Participant details ──────────────────────────────────────────────────────
  ensure(120);
  space(10);
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.5, color: HAIRLINE });
  space(14);
  para("PARTICIPANT DETAILS", { font: bold, size: 10.5, color: ACCENT, gap: 6 });

  const row = (label: string, value: string) => {
    ensure(15);
    page.drawText(label, { x: M, y: y - 10, size: 9, font: bold, color: MUTE });
    page.drawText(safe(value) || "-", { x: M + 150, y: y - 10, size: 10, font, color: INK });
    y -= 16;
  };
  row("Name", data.participantName);
  row("Email", data.participantEmail);
  row("Date of birth", data.participantDob || "");
  row("Phone", data.participantPhone || "");
  row("Emergency contact", data.emergencyName || "");
  row("Emergency phone", data.emergencyPhone || "");
  row(
    "Clause 5 attestation",
    data.fitnessAttestation ? "Acknowledged (fitness to participate)" : "NOT acknowledged",
  );

  // ── Signature ────────────────────────────────────────────────────────────────
  ensure(110);
  space(14);
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.5, color: HAIRLINE });
  space(16);
  para("ELECTRONIC SIGNATURE", { font: bold, size: 10.5, color: ACCENT, gap: 8 });

  page.drawText(safe(data.signatureName), { x: M, y: y - 22, size: 22, font: italic, color: INK });
  y -= 30;
  page.drawLine({ start: { x: M, y }, end: { x: M + 260, y }, thickness: 0.75, color: INK });
  space(6);
  para("Typed signature - by typing their full legal name, the Participant adopts this as their legal signature.", {
    font: italic,
    size: 8.5,
    color: MUTE,
    gap: 3,
  });

  const tsUtc = `${data.agreedAt.replace("T", " ").replace(/\.\d+Z$/, "").replace(/Z$/, "")} UTC`;
  space(6);
  para(`Agreed at: ${tsUtc}`, { size: 9, color: MUTE, gap: 3 });
  para(`Signer IP: ${safe(data.signerIp) || "unknown"}`, { size: 9, color: MUTE, gap: 3 });
  para(`Document version: ${data.waiverVersion}`, { size: 9, color: MUTE, gap: 3 });

  // ── Audit footer on every page ───────────────────────────────────────────────
  const footer =
    `Electronically signed by ${safe(data.signatureName)} on ${tsUtc}, IP ${safe(data.signerIp) || "unknown"}. ` +
    `Document version ${data.waiverVersion}.`;
  const pages = doc.getPages();
  pages.forEach((p, i) => {
    p.drawLine({
      start: { x: M, y: FOOTER_TOP },
      end: { x: W - M, y: FOOTER_TOP },
      thickness: 0.5,
      color: HAIRLINE,
    });
    p.drawText(footer, { x: M, y: FOOTER_TOP - 14, size: 7, font, color: MUTE });
    p.drawText(`Page ${i + 1} of ${pages.length}`, {
      x: W - M - 56,
      y: FOOTER_TOP - 26,
      size: 7,
      font,
      color: MUTE,
    });
  });

  return doc.save();
}

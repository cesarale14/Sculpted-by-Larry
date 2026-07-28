import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sculpted by Larry — 1:1 coaching. Online anywhere, in-person in Tampa.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Onyx palette (mirrors globals.css — this file can't read CSS vars).
const BG = "#0B0B0B";
const FG = "#ECE6D6";
const FG_SOFT = "#C9C2B0";
const FG_MUTE = "#8A8472";
const ACCENT = "#C84E2A";
const LINE = "#2A2723";

/**
 * Fetch Big Shoulders 800 at the edge so the card matches the site's display
 * face. Fails soft: if Google Fonts is unreachable the card renders with the
 * default sans — same layout, same palette, still on-brand.
 */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        "https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@800",
        // TTF response (instead of woff2) so ImageResponse can consume it.
        { headers: { "User-Agent": "Mozilla/5.0 (compatible; og-image)" } },
      )
    ).text();
    const url = css.match(/src:\s*url\(([^)]+\.ttf)\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const displayFont = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          fontFamily: displayFont ? "Big Shoulders" : "sans-serif",
        }}
      >
        {/* Eyebrow row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, background: ACCENT }} />
          <div
            style={{
              fontSize: 26,
              color: FG_MUTE,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Sculpted by Larry — Tampa, FL
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textTransform: "uppercase",
            fontWeight: 800,
            fontSize: 148,
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            color: FG,
          }}
        >
          <div>Sculpt the body</div>
          <div style={{ display: "flex" }}>
            your life{" "}
            <span style={{ color: ACCENT, marginLeft: 28 }}>demands.</span>
          </div>
        </div>

        {/* Bottom rule + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ height: 1, width: "100%", background: LINE }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 26,
              color: FG_SOFT,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <div>1:1 Coaching — Online anywhere</div>
            <div style={{ color: FG_MUTE }}>In person in Tampa</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: displayFont
        ? [
            {
              name: "Big Shoulders",
              data: displayFont,
              weight: 800 as const,
              style: "normal" as const,
            },
          ]
        : undefined,
    },
  );
}

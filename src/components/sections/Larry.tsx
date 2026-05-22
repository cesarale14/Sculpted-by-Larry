import Image from "next/image";
import { BRAND } from "@/lib/constants";

/**
 * Larry section — credibility home.
 *
 * Structure is shipped; copy slots marked `[Larry: ...]` are placeholders
 * for Larry to replace with his real story. Do NOT auto-fill these with
 * invented credentials, client counts, or fabricated specifics.
 */

const credentials = [
  {
    label: "Certification",
    value: BRAND.certification,
  },
  {
    label: "Based",
    value: "Tampa, FL",
  },
  {
    label: "Experience",
    value: "[Larry: years training clients]",
  },
];

export function Larry() {
  return (
    <section
      id="larry"
      className="section-pad"
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--bg-soft)",
      }}
    >
      <div className="container">
        <div className="larry-grid">
          <div className="reveal larry-portrait-wrap">
            <Image
              src="/images/larry-portrait.jpg"
              alt="Larry Faria — coach"
              width={1200}
              height={1500}
              sizes="(max-width: 880px) 100vw, 45vw"
              className="larry-portrait-img"
            />
          </div>

          <div className="reveal reveal-delay-1 larry-copy">
            <span className="eyebrow">
              <span className="dot" aria-hidden="true"></span>The Coach
            </span>
            <h2
              className="display larry-headline"
              style={{
                fontSize: "clamp(40px,6vw,84px)",
                margin: "20px 0 24px",
                letterSpacing: "-0.005em",
              }}
            >
              One coach.
              <br />
              <em
                className="serif-i"
                style={{
                  textTransform: "none",
                  color: "var(--fg-soft)",
                  letterSpacing: "-0.02em",
                }}
              >
                Every rep.
              </em>
              <br />
              Every result.
            </h2>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--fg-soft)",
                margin: "0 0 22px",
                maxWidth: 540,
              }}
            >
              I&rsquo;m Larry. I coach in Tampa, in person and online. No
              franchise. No assistant writing your program. One trainer. I
              write the work, I watch you do it, I tell you the truth.
            </p>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: "var(--fg-soft)",
                margin: "0 0 22px",
                maxWidth: 540,
              }}
            >
              [Larry: your story goes here — how you got into coaching, what
              you learned along the way, who you&rsquo;ve worked with, and the
              philosophy that runs through every program you write. 3–5 short
              paragraphs. Direct, honest, no influencer voice.]
            </p>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: "var(--fg-mute)",
                margin: "0 0 36px",
                maxWidth: 540,
                fontStyle: "italic",
                fontFamily: "var(--serif)",
              }}
            >
              &ldquo;I don&rsquo;t sell motivation. I sell structure. Show up,
              and I&rsquo;ll do my job.&rdquo;
            </p>

            <div className="larry-credentials">
              {credentials.map((c) => (
                <div key={c.label}>
                  <div
                    className="eyebrow"
                    style={{ marginBottom: 8, fontSize: 10 }}
                  >
                    {c.label}
                  </div>
                  <div className="larry-credential-value">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .larry-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        .larry-portrait-wrap {
          aspect-ratio: 4 / 5;
          position: relative;
          overflow: hidden;
          background: var(--bg);
          border: 1px solid var(--line);
        }
        .larry-portrait-img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: contrast(1.02) saturate(0.96);
        }
        @media (max-width: 880px) {
          .larry-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          /* Copy first on mobile so the page doesn't open on a lone portrait */
          .larry-copy { order: 1; }
          .larry-portrait-wrap { order: 2; aspect-ratio: 4 / 5; max-height: 80vh; }
        }
      `}</style>
    </section>
  );
}

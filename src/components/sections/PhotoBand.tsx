import Image from "next/image";
import { Parallax } from "@/components/ui/Parallax";

/**
 * Full-bleed photography band between Method and FreePlan — the graded gym
 * photo at edge-to-edge width, slow parallax, one line of voice over it.
 *
 * SWAP POINT: when Larry delivers the second cable-curl shot, replace
 * BAND_IMAGE (and adjust BAND_POSITION if the crop needs it). Nothing else
 * in this component should need to change.
 */
const BAND_IMAGE = "/images/larry-band.jpg";
const BAND_POSITION = "center 42%";

export function PhotoBand() {
  return (
    <section className="photo-band">
      <div className="photo-band__media" aria-hidden="true">
        <Parallax amount={34} baseScale={1.14} style={{ height: "100%" }}>
          <div className="photo-band__frame">
            <Image
              src={BAND_IMAGE}
              alt=""
              fill
              sizes="100vw"
              className="photo-band__img"
              style={{ objectPosition: BAND_POSITION }}
            />
          </div>
        </Parallax>
      </div>
      <div className="photo-band__scrim" aria-hidden="true" />
      <div className="container photo-band__caption">
        <p className="display photo-band__line reveal strike">
          Show up. <em>The rest is engineering.</em>
        </p>
      </div>

      <style>{`
        .photo-band {
          position: relative;
          height: clamp(320px, 56vh, 560px);
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: flex-end;
        }
        .photo-band__media {
          position: absolute;
          inset: 0;
        }
        .photo-band__frame {
          position: relative;
          height: 100%;
        }
        .photo-band__img {
          object-fit: cover;
          filter: saturate(0.88) contrast(1.04);
        }
        .photo-band__scrim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(11, 11, 11, 0.78) 0%,
            rgba(11, 11, 11, 0.35) 45%,
            rgba(11, 11, 11, 0.86) 100%
          );
        }
        .photo-band__caption {
          position: relative;
          width: 100%;
          padding-bottom: var(--space-10);
        }
        .photo-band__line {
          font-size: clamp(28px, 4vw, 56px);
          margin: 0;
          max-width: 18ch;
        }
      `}</style>
    </section>
  );
}

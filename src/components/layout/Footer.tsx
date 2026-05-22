import Link from "next/link";
import { BRAND, CAL_BOOKING_URL } from "@/lib/constants";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const coaching: FooterLink[] = [
  { label: "Online — $199/mo", href: CAL_BOOKING_URL, external: true },
  { label: "Online — $499/qtr", href: CAL_BOOKING_URL, external: true },
  { label: "In-Person (Tampa)", href: CAL_BOOKING_URL, external: true },
];

const site: FooterLink[] = [
  { label: "The Method", href: "#method" },
  { label: "Free 5-day plan", href: "#free-plan" },
  { label: "About Larry", href: "#larry" },
  { label: "FAQ", href: "#faq" },
];

const contact: FooterLink[] = [
  {
    label: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  { label: "Book a 15-min call", href: CAL_BOOKING_URL, external: true },
  { label: "Instagram", href: BRAND.instagram, external: true },
];

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 18 }}>
        {title}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {links.map((l) => (
          <li key={l.label} style={{ marginBottom: 10 }}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="footer-link">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "60px 0 40px",
        background: "var(--bg-soft)",
      }}
    >
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link
              href="#top"
              className="logo"
              style={{ marginBottom: 16 }}
              aria-label="Sculpted by Larry — back to top"
            >
              <div className="logo-mark">S</div>
              <div className="logo-wm">Sculpted by Larry</div>
            </Link>
            <p
              style={{
                color: "var(--fg-mute)",
                fontSize: 13.5,
                lineHeight: 1.55,
                maxWidth: 320,
                margin: "16px 0 0",
              }}
            >
              1:1 coaching. Online anywhere, in-person in Tampa. Real
              programming, real coaching, no hype.
            </p>
          </div>
          <FooterCol title="Coaching" links={coaching} />
          <FooterCol title="Site" links={site} />
          <FooterCol title="Contact" links={contact} />
        </div>
        <div className="hairline" style={{ margin: "48px 0 24px" }}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div className="eyebrow">© 2026 Sculpted by Larry — Tampa, FL</div>
          <div className="eyebrow">{BRAND.tagline}</div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .footer-link {
          color: var(--fg-soft);
          font-size: 14px;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .footer-link:hover { color: var(--accent); }
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </footer>
  );
}

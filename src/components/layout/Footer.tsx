import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-color)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <span
              className="font-heading text-xl tracking-widest uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              Sculpted{" "}
              <span className="italic normal-case" style={{ color: "var(--accent)" }}>
                by Larry
              </span>
            </span>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {BRAND.certification}
              <br />
              {BRAND.location}
            </p>
          </div>

          <div>
            <h4
              className="font-body text-sm font-medium uppercase tracking-wider mb-4"
              style={{ color: "var(--accent)" }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-body text-sm font-medium uppercase tracking-wider mb-4"
              style={{ color: "var(--accent)" }}
            >
              Connect
            </h4>
            <ul className="space-y-2">
              {BRAND.instagram && (
                <li>
                  <a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Instagram
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 text-center"
          style={{ borderTop: "1px solid var(--border-color)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

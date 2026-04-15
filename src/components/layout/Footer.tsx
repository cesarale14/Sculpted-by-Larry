import Link from "next/link";
import { Mail, MapPin, Award } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { BRAND, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy border-t border-navy-lighter">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <Link href="/" aria-label="Sculpted by Larry home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/logo_badge_dark.png"
                alt="Sculpted by Larry"
                width={80}
                height={80}
                className="w-20 h-auto"
              />
            </Link>
            <p className="mt-6 font-body text-sm text-gray-300 leading-relaxed">
              {BRAND.tagline}
            </p>
            <p className="mt-4 flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-gold">
              <Award size={14} strokeWidth={1.5} />
              {BRAND.certification}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-gray-300 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book"
                  className="font-body text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Book a Call
                </Link>
              </li>
              <li>
                <Link
                  href="/free-plan"
                  className="font-body text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Free 5-Day Plan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-start gap-2 font-body text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-2 font-body text-sm text-gray-300">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                {BRAND.location}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold mb-5">
              Follow
            </h4>
            <ul className="space-y-3">
              {BRAND.instagram && (
                <li>
                  <a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-body text-sm text-gray-300 hover:text-gold transition-colors"
                  >
                    <InstagramIcon size={16} />
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-lighter flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-gray-300">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-body text-xs text-gray-300">
            {BRAND.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

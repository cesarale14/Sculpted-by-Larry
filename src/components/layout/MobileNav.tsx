"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, CAL_BOOKING_URL } from "@/lib/constants";

/**
 * Mobile navigation — hamburger trigger + full-screen Onyx overlay.
 *
 * Visible at ≤860px (where the desktop .nav-links is hidden via globals.css).
 * Replaces the old MobileMenu component that was deleted in the v2 port.
 *
 * Behavior:
 * - Hamburger button is ≥44×44 tap target.
 * - Overlay covers the viewport with Onyx background and contains the 5
 *   primary nav links + both CTAs (free plan, Cal.com call).
 * - Body scroll locks while open; Escape key closes; clicking any link
 *   closes-then-navigates; × button closes.
 * - Focus moves into the overlay on open (to the close button) and
 *   returns to the hamburger on close.
 * - Reduced-motion: instant open/close (no fade).
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the close button when opening, so keyboard tab stays inside.
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      // Return focus to the trigger so the keyboard user lands where they were.
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="mobile-nav-trigger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        onClick={() => setOpen(true)}
      >
        <span className="mobile-nav-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {open && (
        <div
          id="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="mobile-nav-overlay"
        >
          <div className="mobile-nav-overlay__top">
            <button
              ref={closeRef}
              type="button"
              className="mobile-nav-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav
            className="mobile-nav-list"
            aria-label="Primary"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-nav-ctas">
            <Link
              href="/free-plan"
              className="btn btn-primary mobile-nav-cta"
              onClick={() => setOpen(false)}
            >
              Get your free starter training plan{" "}
              <span className="arrow">→</span>
            </Link>
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mobile-nav-cta"
              onClick={() => setOpen(false)}
            >
              Book a 15-min call <span className="arrow">→</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

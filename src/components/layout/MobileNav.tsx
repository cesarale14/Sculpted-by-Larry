"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NAV_LINKS, CAL_BOOKING_URL } from "@/lib/constants";

/**
 * Mobile navigation — hamburger trigger + full-screen Onyx overlay.
 *
 * The overlay is rendered via createPortal to document.body so it
 * escapes the Navbar's stacking + containing-block context. The nav
 * uses backdrop-filter when scrolled, which creates a containing
 * block for fixed descendants — without the portal, the overlay's
 * `inset: 0` would resolve relative to the ~72px-tall nav instead
 * of the viewport, making the menu invisible on non-hero sections.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Portal target only exists client-side.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  const overlay = (
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

      <nav className="mobile-nav-list" aria-label="Primary">
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
  );

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

      {open && mounted && createPortal(overlay, document.body)}
    </>
  );
}

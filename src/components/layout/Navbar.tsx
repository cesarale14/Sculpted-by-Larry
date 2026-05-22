"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-row">
        <Link href="/" className="logo" aria-label="Sculpted by Larry — home">
          <div className="logo-mark">S</div>
          <div className="logo-wm">
            Sculpted by Larry
            <span className="logo-sub">— Tampa, FL</span>
          </div>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/free-plan"
          className="btn btn-primary"
          style={{ padding: "10px 18px", fontSize: 12 }}
        >
          Free starter plan <span className="arrow">→</span>
        </Link>
      </div>
    </nav>
  );
}

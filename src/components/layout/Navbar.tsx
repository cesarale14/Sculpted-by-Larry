"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-navy-light/90 backdrop-blur-md border-b border-navy-lighter"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Sculpted by Larry home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/logo_icon.svg"
              alt=""
              width={44}
              height={44}
              className="w-11 h-11"
            />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-base font-bold text-white uppercase tracking-[0.15em]">
                Sculpted
              </span>
              <span className="font-heading text-sm italic text-gold">
                by Larry
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm font-medium text-white hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/book"
              className="inline-flex items-center font-body text-sm font-medium bg-gold text-navy px-5 py-2.5 rounded-lg hover:bg-gold-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              Book a Call
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-white hover:text-gold transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

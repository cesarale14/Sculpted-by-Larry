"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-navy/95 backdrop-blur-sm shadow-lg"
            : "bg-off-white/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 md:h-20">
        <Link href="/" className="flex-shrink-0 flex items-center gap-3">
          <Image
            src="/logos/logo_icon.svg"
            alt="Sculpted by Larry"
            width={36}
            height={36}
            className="w-9 h-9 md:w-11 md:h-11 rounded-full"
          />
          <div className="flex flex-col leading-tight">
            <span
              className={`font-heading text-base md:text-lg font-bold uppercase tracking-[0.2em] ${
                theme === "dark" ? "text-white" : "text-navy"
              }`}
            >
              SCULPTED
            </span>
            <span
              className={`font-heading text-sm md:text-base italic ${
                theme === "dark" ? "text-gold" : "text-gold-dark"
              }`}
            >
              by Larry
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-body tracking-wide transition-colors ${
                    link.label === "Book a Call"
                      ? theme === "dark"
                        ? "bg-gold text-navy px-5 py-2 rounded-lg hover:brightness-110"
                        : "bg-gold-dark text-white px-5 py-2 rounded-lg hover:brightness-110"
                      : theme === "dark"
                        ? "text-white/80 hover:text-gold"
                        : "text-dark-gray hover:text-gold-dark"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className={`p-2 ${theme === "dark" ? "text-white" : "text-navy"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

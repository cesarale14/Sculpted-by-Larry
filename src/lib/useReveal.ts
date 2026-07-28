"use client";

import { useEffect } from "react";

/**
 * Adds the `.in` class to every `.reveal` element when it scrolls into view.
 * Pairs with the .reveal / .reveal.in CSS transition in globals.css.
 *
 * Mounted once in SiteChrome with the current pathname as `key`, so every
 * route's reveal elements get observed — not just pages that happen to render
 * the Hero. (Before this, /programs rendered its .reveal content at opacity 0
 * forever because nothing ever observed it.) Pass a changing `key` to re-scan
 * after client-side navigation swaps the page content.
 */
export function useReveal(key?: string): void {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

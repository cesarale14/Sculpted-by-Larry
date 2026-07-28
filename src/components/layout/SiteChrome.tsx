"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useReveal } from "@/lib/useReveal";

/**
 * Routes that intentionally provide their own focused chrome (their own header
 * logo, no global nav/footer). The /start enrollment flow is stripped on purpose
 * so users don't navigate away mid-waiver — rendering the global Navbar there
 * would double the logo and add distractions. /welcome (the post-payment page)
 * is focused for the same reason — it owns the moment, no nav pulling away.
 * /pay (the custom-amount in-person payment page) is focused too — it's shared
 * directly with a quoted client, so the global chrome would only distract.
 * /waiver (standalone waiver signing for in-person clients) is focused for the
 * same reason as /start — no nav to wander off mid-signature.
 */
const FOCUSED_ROUTES = ["/start", "/welcome", "/pay", "/waiver"];

function isFocused(pathname: string): boolean {
  return FOCUSED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Observe .reveal elements on every route (re-scans on navigation). Focused
  // routes have none — the hook is a no-op there.
  useReveal(pathname);

  // Focused routes own their <main id="main"> and chrome entirely.
  if (isFocused(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

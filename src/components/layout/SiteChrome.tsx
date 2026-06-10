"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Routes that intentionally provide their own focused chrome (their own header
 * logo, no global nav/footer). The /start enrollment flow is stripped on purpose
 * so users don't navigate away mid-waiver — rendering the global Navbar there
 * would double the logo and add distractions. /welcome (the post-payment page)
 * is focused for the same reason — it owns the moment, no nav pulling away.
 */
const FOCUSED_ROUTES = ["/start", "/welcome"];

function isFocused(pathname: string): boolean {
  return FOCUSED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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

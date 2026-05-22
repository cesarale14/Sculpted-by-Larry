import type { Metadata } from "next";
import {
  Big_Shoulders,
  Instrument_Serif,
  Manrope,
  JetBrains_Mono,
} from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";
import { localBusinessSchema } from "@/lib/schema";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: "Sculpted by Larry — Premium Coaching · Tampa, FL",
    template: "%s | Sculpted by Larry",
  },
  description:
    "1:1 coaching with Larry Faria. Online anywhere, in-person in Tampa. Real programming, real coaching, no hype.",
  icons: {
    icon: "/logos/logo_icon.png",
    apple: "/logos/logo_icon.png",
  },
  openGraph: {
    title: "Sculpted by Larry",
    description:
      "1:1 coaching with Larry Faria. Online anywhere, in-person in Tampa. Real programming, real coaching, no hype.",
    url: BRAND.siteUrl,
    siteName: "Sculpted by Larry",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sculpted by Larry",
    description: "Sculpt the body your life demands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    bigShoulders.variable,
    instrumentSerif.variable,
    manrope.variable,
    jetbrainsMono.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontVars}>
      <body>
        <StructuredData data={localBusinessSchema} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-accent-fg focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

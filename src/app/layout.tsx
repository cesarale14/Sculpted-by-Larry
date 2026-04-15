import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { TopChrome } from "@/components/layout/TopChrome";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";
import { localBusinessSchema } from "@/lib/schema";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: "Sculpted by Larry | Personal Training in Tampa, FL",
    template: "%s | Sculpted by Larry",
  },
  description:
    "ISSA-certified personal trainer in Tampa, Florida. In-person training, online coaching, and custom programs. Your body, engineered.",
  icons: {
    icon: "/logos/logo_icon.svg",
    apple: "/logos/logo_icon.svg",
  },
  openGraph: {
    title: "Sculpted by Larry",
    description:
      "ISSA-certified personal trainer in Tampa, Florida. In-person training, online coaching, and custom programs.",
    url: BRAND.siteUrl,
    siteName: "Sculpted by Larry",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sculpted by Larry",
    description:
      "ISSA-certified personal trainer in Tampa, Florida. Your body, engineered.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-white font-body">
        <StructuredData data={localBusinessSchema} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <TopChrome />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

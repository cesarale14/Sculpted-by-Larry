export const BRAND = {
  name: "Sculpted by Larry",
  tagline: "Sculpt the body your life demands.",
  location: "Tampa, Florida",
  certification: "ISSA Certified Personal Trainer",
  email: "lfaria@sculptedbylarry.com",
  phone: "",
  instagram: "https://instagram.com/sculptedbylarry",
  tiktok: "",
  whatsapp: "",
  calcom: process.env.NEXT_PUBLIC_CALCOM_LINK || "sculpted-by-larry/free-consultation",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sculptedbylarry.com",
} as const;

export const CAL_BOOKING_URL = "https://cal.com/sculptedbylarry/15min";
export const FREE_PLAN_URL = "/free-plan";

export const NAV_LINKS = [
  { href: "/#method", label: "Method" },
  { href: "/#free-plan", label: "Free plan" },
  { href: "/#programs", label: "Coaching" },
  { href: "/#larry", label: "About" },
  { href: "/#faq", label: "FAQ" },
] as const;

/**
 * Online coaching — single product, three commitment tiers.
 * Locked 2026-05-09 (pricing pivot session).
 */
export const ONLINE_TIERS = [
  {
    id: "monthly",
    price: "$199",
    cadence: "per month",
    note: "Rolling. Cancel anytime.",
  },
  {
    id: "quarterly",
    price: "$499",
    cadence: "per quarter",
    note: "Save $98. The honest middle.",
    featured: true,
  },
  {
    id: "annual",
    price: "$999",
    cadence: "per year",
    note: "Save $1,389. For people who already know they're staying.",
  },
] as const;

/**
 * Online coaching feature list.
 */
export const ONLINE_FEATURES = [
  "Programming written for you, refreshed every 2 weeks",
  "Direct text channel with Larry",
  "Weekly video check-in (15 min)",
  "Nutrition framework + recovery protocol",
  "Movement & progress tracking",
] as const;

/**
 * In-person Tampa feature list.
 */
export const INPERSON_FEATURES = [
  "Sessions at my Tampa studio",
  "Programming + nutrition framework",
  "Hands-on movement & technique coaching",
  "Online check-ins between sessions",
  "Flexible scheduling around your week",
] as const;

/**
 * Real client testimonials.
 *
 * IMPORTANT: The Testimonials section renders nothing when this array is empty.
 * Add real reviews here — NEVER placeholders, NEVER fabricated quotes.
 *
 * Required shape per entry:
 *   { quote: string, name: string, context?: string }
 *
 * Example (commented out so it stays empty until real reviews come in):
 *   // { quote: "His program got me back to deadlifting after my back surgery.",
 *   //   name: "—— ——", context: "Online client · 6 months" }
 */
export interface Testimonial {
  quote: string;
  name: string;
  context?: string;
}

export const TESTIMONIALS: ReadonlyArray<Testimonial> = [];

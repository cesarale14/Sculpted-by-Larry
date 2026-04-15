export const BRAND = {
  name: "Sculpted by Larry",
  tagline: "Your Body. Engineered.",
  location: "Tampa, Florida",
  certification: "ISSA Certified Personal Trainer",
  email: "larry@sculptedbylarry.com",
  phone: "",
  instagram: "https://instagram.com/sculptedbylarry",
  tiktok: "",
  whatsapp: "",
  calcom: process.env.NEXT_PUBLIC_CALCOM_LINK || "sculpted-by-larry/free-consultation",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sculptedbylarry.com",
} as const;

export const PRICING = {
  inPerson: {
    session: 75,
    monthly: 500,
    frequency: "3x/week",
    description:
      "Work directly with Larry in Tampa for hands-on coaching, form correction, and real-time accountability.",
    features: [
      "Fully personalized workout programming",
      "Real-time form correction & coaching",
      "Progressive overload tracking",
      "Nutrition guidance included",
      "Flexible scheduling",
      "In-person accountability & motivation",
    ],
  },
  onlineCoaching: {
    monthly: 175,
    description:
      "Get a custom training and nutrition plan with weekly coaching, no matter where you are.",
    features: [
      "Custom workout programming updated monthly",
      "Weekly video check-ins",
      "Personalized nutrition plan",
      "WhatsApp support for questions",
      "Progress tracking & adjustments",
      "Access from anywhere nationwide",
    ],
    badge: "Most Popular",
  },
  starterPack: {
    oneTime: 49,
    description:
      "A 4-week self-guided program to kickstart your fitness journey on your own terms.",
    features: [
      "4-week structured workout plan (PDF)",
      "Exercise demonstration video links",
      "Nutrition basics & meal ideas",
      "Progress tracking template",
      "Great for beginners",
    ],
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
] as const;

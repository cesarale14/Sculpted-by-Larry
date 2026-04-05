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
  calcom: "",
} as const;

export const PRICING = {
  inPerson: { session: 75, monthly: 500, frequency: "3x/week" },
  onlineCoaching: { monthly: 175 },
  starterPack: { oneTime: 49 },
} as const;

export const COLORS = {
  navy: "#0F1525",
  gold: "#C9A84C",
  goldDark: "#A8873A",
  offWhite: "#F8F6F1",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Book a Call", href: "/book" },
] as const;

# CLAUDE.md — Sculpted by Larry

> **CRITICAL:** Read this file AND DESIGN_SYSTEM.md before ANY task.
> Then run `npx repomix` to understand the full codebase before making changes.
> Every prompt must begin by reading these two files.

---

## Project Overview

**Sculpted by Larry** — Premium personal training & online coaching brand.
ISSA-certified trainer based in Tampa, FL. Hybrid model: in-person Tampa Bay + online nationwide.

**Live:** https://sculpted-by-larry.vercel.app
**Repo:** cesarale14/sculpted-by-larry
**Status:** V2 rebuild — design system overhaul + backend integration

---

## Tech Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Framework | Next.js 14 (App Router) | ✅ |
| Language | TypeScript | ✅ |
| Styling | Tailwind CSS | ✅ |
| Animations | Framer Motion | ✅ |
| Hosting | Vercel | ✅ |
| Booking | Cal.com (embed + API) | 🔧 Needs integration |
| Email | Resend | 🔧 API key ready |
| Payments | Stripe (Checkout + Payment Links) | 🔧 API keys ready |
| Email Marketing | Mailerlite | 📋 Future |
| Analytics | Google Analytics + Meta Pixel | 📋 Future |
| Training App | TBD — planned future product | 📋 Future |
| Fonts | Google Fonts: Cormorant Garamond + DM Sans | ✅ |
| Icons | Lucide React | ✅ |

---

## Brand Identity (Quick Reference)

Full details in `DESIGN_SYSTEM.md`. Key values:

```
Navy:      #0F1525     (primary dark background)
Navy-light: #1A2235    (elevated dark surfaces)
Gold:      #C9A84C     (primary accent)
Off-white: #F8F6F1     (light section backgrounds)
Heading font: Cormorant Garamond (serif)
Body font: DM Sans (sans-serif)
```

**Design direction:** Dark navy hero with real gym photography of Larry. Alternating dark/light sections. Luxury-refined meets athletic confidence.

---

## Logo Assets

All logos in `/public/logos/` as SVG files:

| File | Format | Usage |
|------|--------|-------|
| `logo_icon.svg` | SVG | Navbar icon (44px), favicon source |
| `logo_badge_dark.svg` | SVG | Profile pic, watermarks |
| `logo_badge_light.svg` | SVG | Light backgrounds, print |
| `logo_horizontal.svg` | SVG | Email signature, wide placements |
| `logo_wordmark.svg` | SVG | Text-only minimal placements |
| `logo_social.svg` | SVG | Social media graphics |

**Navbar logo:** `logo_icon.svg` at 44px + stacked text "SCULPTED" / "by Larry"

**IMPORTANT:** All logos must be served as SVG, never JPG/PNG. Check that `next.config.js` allows SVG imports or use them via `<Image>` or `<img>` with proper SVG source paths.

---

## Site Architecture

### Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Hero + trust + programs + transformation + CTA |
| `/programs` | Programs | Detailed tiers + FAQ |
| `/results` | Results | Stats + transformations + testimonials |
| `/about` | About | Larry's story + credentials + philosophy |
| `/book` | Book a Call | Cal.com embed + what to expect |
| `/free-plan` | Lead Magnet | Email capture for free 5-day plan |
| `/payment/success` | Payment Success | Post-Stripe confirmation |
| `/payment/cancel` | Payment Cancel | Stripe cancel redirect |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | POST | Contact form → Resend email |
| `/api/lead` | POST | Lead capture → Resend + (future) Mailerlite |
| `/api/checkout` | POST | Create Stripe Checkout session |
| `/api/webhooks/stripe` | POST | Handle Stripe payment events |

---

## Backend Architecture

### Environment Variables (`.env.local`)

```env
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=larry@sculptedbylarry.com

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# Stripe Price IDs (create in Stripe Dashboard)
STRIPE_PRICE_STARTER=price_xxxxxxxxxxxx
STRIPE_PRICE_ONLINE_MONTHLY=price_xxxxxxxxxxxx
STRIPE_PRICE_INPERSON_SESSION=price_xxxxxxxxxxxx
STRIPE_PRICE_INPERSON_MONTHLY=price_xxxxxxxxxxxx

# Cal.com
NEXT_PUBLIC_CALCOM_LINK=sculpted-by-larry/free-consultation

# Site
NEXT_PUBLIC_SITE_URL=https://sculptedbylarry.com
```

### Stripe Integration

**Business flow:** Larry discusses plans with client on consultation call → creates a payment request → client pays via Stripe.

**Implementation approach:** Stripe Checkout Sessions created via API route. Larry can trigger these manually via a simple admin action, or send clients a payment link.

```
POST /api/checkout
Body: { priceId: string, customerEmail: string, customerName: string }
Returns: { url: string } (Stripe Checkout URL to redirect client to)

POST /api/webhooks/stripe
Handles: checkout.session.completed, customer.subscription.created
Actions: Send confirmation email via Resend, log payment
```

**Stripe products to create in Dashboard:**
- Starter Pack — $49.00 one-time
- Online Coaching — $175.00/month recurring
- In-Person Session — $75.00 one-time
- In-Person Monthly — $500.00/month recurring

**Payment success/cancel pages:**
- `/payment/success` — Thank you message, next steps, what to expect
- `/payment/cancel` — Friendly message, "still have questions?" CTA back to Book a Call

**Security:**
- Validate webhook signatures using `STRIPE_WEBHOOK_SECRET`
- Never expose `STRIPE_SECRET_KEY` to client
- Only `STRIPE_PUBLISHABLE_KEY` is prefixed with `NEXT_PUBLIC_`
- Rate limit the checkout endpoint (basic: check for duplicate sessions)

### Resend Integration

```typescript
// src/lib/resend.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form
export async function sendContactEmail(data: { name: string; email: string; message: string }) { ... }

// Lead magnet delivery
export async function sendLeadMagnetEmail(data: { name: string; email: string }) { ... }

// Payment confirmation
export async function sendPaymentConfirmation(data: { email: string; plan: string; amount: number }) { ... }
```

**Email templates** (use React Email or inline HTML):
- Contact form notification (to Larry)
- Lead magnet delivery (to subscriber, includes PDF link)
- Payment confirmation (to client)
- Welcome email (to new coaching client)

### Cal.com Integration

```tsx
// In /book/page.tsx
import Cal, { getCalApi } from "@calcom/embed-react";

// Inline embed (preferred)
<Cal calLink="sculpted-by-larry/free-consultation" config={{ theme: "dark" }} />

// Or popup trigger
const cal = await getCalApi();
cal("ui", { theme: "dark", styles: { branding: { brandColor: "#C9A84C" } } });
```

**Cal.com styling:** Set brand color to gold (#C9A84C), dark theme, hide Cal branding if possible on paid plan.

---

## File Structure

```
sculpted-by-larry/
├── public/
│   ├── logos/                    # All SVG logo variants
│   ├── images/                  # Larry's photos, transformation photos
│   │   ├── hero/                # Hero section images
│   │   ├── transformations/     # Before/after photos
│   │   ├── about/               # Larry portrait, gym shots
│   │   └── programs/            # Program-related imagery
│   ├── downloads/               # Downloadable assets
│   │   └── sculpt-starter-plan.pdf
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, fonts, metadata, Navbar, Footer
│   │   ├── page.tsx             # Home page
│   │   ├── programs/page.tsx
│   │   ├── results/page.tsx
│   │   ├── about/page.tsx
│   │   ├── book/page.tsx
│   │   ├── free-plan/page.tsx
│   │   ├── payment/
│   │   │   ├── success/page.tsx
│   │   │   └── cancel/page.tsx
│   │   ├── api/
│   │   │   ├── contact/route.ts
│   │   │   ├── lead/route.ts
│   │   │   ├── checkout/route.ts
│   │   │   └── webhooks/
│   │   │       └── stripe/route.ts
│   │   ├── globals.css
│   │   └── not-found.tsx        # Custom 404
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── AnnouncementBar.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── ProgramCards.tsx
│   │   │   ├── TransformationSpotlight.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   └── ProcessSteps.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Accordion.tsx
│   │   └── forms/
│   │       ├── ContactForm.tsx
│   │       └── LeadCaptureForm.tsx
│   ├── lib/
│   │   ├── constants.ts         # Brand info, pricing, social links
│   │   ├── resend.ts            # Email utilities
│   │   ├── stripe.ts            # Stripe client + helpers
│   │   └── utils.ts             # cn() helper, formatters
│   └── types/
│       └── index.ts             # Shared TypeScript types
├── CLAUDE.md                    # This file
├── DESIGN_SYSTEM.md             # Visual design rules
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
├── repomix.config.json
└── .env.local                   # API keys (not in git)
```

---

## Constants (`src/lib/constants.ts`)

```typescript
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
    description: "Work directly with Larry in Tampa for hands-on coaching, form correction, and real-time accountability.",
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
    description: "Get a custom training and nutrition plan with weekly coaching, no matter where you are.",
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
    description: "A 4-week self-guided program to kickstart your fitness journey on your own terms.",
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
```

---

## Build Phases

### Phase 1: Backend Foundation (Priority)
1. Set up environment variables in `.env.local`
2. Install Stripe SDK: `npm install stripe @stripe/stripe-js`
3. Install Cal.com embed: `npm install @calcom/embed-react`
4. Create `/api/contact/route.ts` — Resend contact form handler
5. Create `/api/lead/route.ts` — Lead magnet email delivery
6. Create `/api/checkout/route.ts` — Stripe Checkout session creation
7. Create `/api/webhooks/stripe/route.ts` — Stripe webhook handler
8. Create `src/lib/stripe.ts` — Stripe server + client utilities
9. Create `src/lib/resend.ts` — Email sending functions
10. Create payment success/cancel pages
11. Wire Cal.com embed into `/book` page

### Phase 2: Design System Overhaul
12. Update `tailwind.config.ts` with full color system from DESIGN_SYSTEM.md
13. Update `globals.css` with CSS custom properties and base styles
14. Rebuild Navbar (dark theme, transparent→solid, proper SVG logo)
15. Rebuild Footer (dark theme, 4-column grid)
16. Rebuild all UI components (Button, Card, SectionHeading, ScrollReveal) per design system
17. Remove light/cream theme — establish dark navy as hero default

### Phase 3: Page Redesign
18. Rebuild Hero (dark navy, Larry's photo with overlay, staggered animation)
19. Rebuild TrustBar (dark strip, animated stats)
20. Rebuild ProgramCards (alternating section, featured card treatment)
21. Rebuild TransformationSpotlight (real photos when available)
22. Rebuild CTASection (gold background break)
23. Rebuild Programs page (dark/light alternating sections)
24. Rebuild Results page (stats counter + testimonials)
25. Rebuild About page (Larry's photo + story, split layout)
26. Rebuild Book page (Cal.com embed + dark theme)
27. Build Lead Magnet page (email capture + Resend delivery)
28. Add AnnouncementBar component (top of site, lead magnet CTA)

### Phase 4: Polish & Launch
29. SEO metadata per page (titles, descriptions, OG images)
30. Favicon generation from logo_icon.svg
31. Custom 404 page
32. Form validation + error handling polish
33. Mobile responsive testing pass
34. Performance audit (Lighthouse)
35. Google Analytics setup
36. Structured data (JSON-LD for LocalBusiness)

### Future: Training App
37. Client portal / dashboard (separate Next.js route group)
38. Workout program viewer
39. Progress tracking
40. Direct messaging with Larry
41. Payment history / subscription management

---

## Development Commands

```bash
npm run dev          # Local development
npm run build        # Production build
npm run lint         # ESLint
npx repomix          # Generate codebase context

# Stripe CLI (for webhook testing locally)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Rules for Claude Code

1. **Always read CLAUDE.md and DESIGN_SYSTEM.md first**
2. **Always run `npx repomix` after reading docs** to get full codebase context
3. Use App Router (not Pages Router)
4. All components use TypeScript with proper typing
5. `"use client"` only where required (Framer Motion, forms, Cal.com embed, interactive)
6. Server Components are default
7. Use `next/image` for all images
8. Tailwind classes only — no inline styles, no CSS modules
9. Framer Motion for animations — `import { motion } from "framer-motion"`
10. Mobile-first responsive design
11. All API routes must validate inputs and handle errors gracefully
12. Never expose secret keys to the client (no `NEXT_PUBLIC_` prefix on secrets)
13. All SVG logos loaded as SVG source, never converted to JPG/PNG
14. Follow the color system and typography scale exactly as specified in DESIGN_SYSTEM.md
15. The site aesthetic is luxury-refined, not template-generic

---

## Image Assets Needed from Larry

Before the design overhaul, Larry should provide:

- [ ] **Hero photo** — Larry training a client, or a dramatic gym shot (landscape, high-res)
- [ ] **Portrait photo** — Professional or semi-professional headshot for About page
- [ ] **Gym environment shots** — 2-3 photos of the training space or Larry working out
- [ ] **Transformation photos** — Before/after of at least 1 client (with permission)
- [ ] **Video clip** (optional) — Short gym footage for hero background video

These go in `/public/images/` organized by subfolder. Until provided, use styled placeholders with the silhouette logo watermark as described in DESIGN_SYSTEM.md.

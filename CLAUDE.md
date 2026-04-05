# CLAUDE.md — Sculpted by Larry

> **IMPORTANT:** Always read this file first before any task. Run `npx repomix` after reading to understand the full codebase context before making changes.

---

## Project Overview

**Sculpted by Larry** is a personal training and online coaching brand website for an ISSA-certified trainer based in Tampa, Florida. The business operates on a hybrid model: in-person training in Tampa Bay + scalable online coaching nationwide.

**Live URL (target):** sculptedbylarry.com  
**Repo:** Local development → Vercel deployment  
**Status:** Initial build

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Hosting | Vercel (free tier) |
| Booking | Cal.com embed (free tier) |
| Contact/Email | Resend (free tier, 3K emails/mo) |
| Email Marketing | Mailerlite (free tier, up to 1K subs) |
| Domain | sculptedbylarry.com |
| Font | Google Fonts — Cormorant Garant (serif headings) + Inter or DM Sans (body) |

---

## Brand Identity

### Colors

```css
/* Primary palette */
--navy: #0F1525;           /* Primary dark / backgrounds */
--gold: #C9A84C;           /* Primary accent / CTAs / highlights */
--gold-dark: #A8873A;      /* Gold on light backgrounds */
--white: #FFFFFF;           /* Body text on dark */
--off-white: #F8F6F1;      /* Light background variant */
--light-gray: #F5F5F5;     /* Section backgrounds */
--dark-gray: #333333;      /* Body text on light */
--med-gray: #666666;       /* Secondary text */
```

### Typography

- **Headings:** "SCULPTED" uses wide letter-spacing (tracking), uppercase, serif font (Cormorant Garant or Playfair Display)
- **Script/Accent:** "by Larry" uses italic serif
- **Body:** Clean sans-serif (DM Sans or Inter)
- **Tone:** Premium, confident, approachable — NOT aggressive gym-bro energy

### Logo Assets

SVG logo files are in `/public/logos/`:

| File | Usage |
|------|-------|
| `logo_badge_dark.svg` | Instagram profile, watermark, merch — navy circle with gold silhouette |
| `logo_badge_light.svg` | Light backgrounds, print — cream circle with dark gold |
| `logo_horizontal.svg` | **Website navbar**, email signature — icon + divider + wordmark |
| `logo_icon.svg` | Favicon, app icon, small format — silhouette only in circle |
| `logo_wordmark.svg` | Text-only — minimal placements, social bios |
| `logo_social.svg` | Reels thumbnails, story graphics — gold block impact version |

**The horizontal lockup (`logo_horizontal.svg`) is the primary website header logo.**

---

## Site Architecture (5 Pages MVP)

### 1. Home (`/`)
- **Hero section:** Full-viewport, navy background, large headline ("Your Body. Engineered."), one transformation photo, gold CTA button → Book a Call
- **Trust bar:** ISSA certification badge, "Tampa, FL" location, client count
- **Programs preview:** 3 cards (In-Person, Online Coaching, Starter Pack) with pricing hints
- **Transformation spotlight:** Before/after with client testimonial quote
- **Final CTA:** "Ready to get sculpted?" → Book a Call

### 2. Programs (`/programs`)
- **3 program tiers with pricing:**
  - 1-on-1 In-Person: $75/session or $500/month (3x/week)
  - Online Coaching: $175/month (custom programming, weekly check-ins, nutrition, WhatsApp support)
  - Starter Pack: $49 one-time (4-week self-guided PDF program)
- Each tier has feature list, CTA to book or purchase
- FAQ section at bottom

### 3. Results (`/results`)
- Before/after photo gallery (start with 1 transformation, design for grid expansion)
- Written testimonials with client first name + goal achieved
- Metrics bar: "X lbs lost", "Y clients trained", "Z% retention rate"

### 4. About (`/about`)
- Larry's personal story (origin, why he became a trainer)
- ISSA certification display
- Training philosophy section
- Professional photo(s)

### 5. Book a Call (`/book`)
- Cal.com embed for free 15-min consultation
- "What to expect" section explaining the call structure
- Confirmation flow via Resend

### Lead Magnet Landing Page (`/free-plan`)
- Standalone page (not in main nav)
- Email capture form → delivers "Larry's 5-Day Sculpt Starter Plan" PDF
- Instagram bio link destination
- Connected to Mailerlite for email nurture sequence

### Contact (`/contact`) — Optional, can be footer section
- Contact form via Resend
- WhatsApp direct link
- Location: Tampa, FL (no specific address)
- Social links: Instagram, TikTok

---

## Design Guidelines

### Layout Principles
- **Mobile-first** — 80%+ of fitness traffic is mobile
- **Dark theme primary** — navy backgrounds with gold accents (matches brand)
- **Every page has a CTA** — no dead-end pages
- **Generous whitespace** — premium feel, not cluttered
- **Sticky navbar** with horizontal logo lockup, transparent on hero → solid on scroll

### Component Patterns
- **Buttons:** Gold background (#C9A84C) with navy text, rounded-lg, hover: slight brightness increase
- **Cards:** Navy or dark-gray background, subtle gold border or gold accent line, rounded-xl
- **Section transitions:** Subtle Framer Motion fade-in-up on scroll (useInView)
- **Hero:** Full viewport height, centered content, subtle background texture or gradient overlay on photo
- **Typography scale:** Hero h1 = 48-64px, Section h2 = 32-40px, Card h3 = 20-24px, Body = 16px

### Animations (Framer Motion)
- Page load: staggered fade-in for hero elements (0.2s delay between headline, subhead, CTA)
- Scroll reveals: fade-in-up with 0.6s duration, triggered at 20% viewport intersection
- Hover states: subtle scale(1.02) on cards, brightness increase on buttons
- **Keep it tasteful** — subtle motion that adds polish, not distracting

---

## File Structure

```
sculpted-by-larry/
├── public/
│   ├── logos/
│   │   ├── logo_badge_dark.svg
│   │   ├── logo_badge_light.svg
│   │   ├── logo_horizontal.svg
│   │   ├── logo_icon.svg
│   │   ├── logo_wordmark.svg
│   │   └── logo_social.svg
│   ├── images/
│   │   ├── transformation-1.jpg    (placeholder until real photo)
│   │   └── larry-portrait.jpg      (placeholder until real photo)
│   └── favicon.ico                 (generated from logo_icon.svg)
├── src/
│   ├── app/
│   │   ├── layout.tsx              (root layout, fonts, metadata)
│   │   ├── page.tsx                (home page)
│   │   ├── programs/
│   │   │   └── page.tsx
│   │   ├── results/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── book/
│   │   │   └── page.tsx
│   │   ├── free-plan/
│   │   │   └── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── ProgramCards.tsx
│   │   │   ├── TransformationSpotlight.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTASection.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── ScrollReveal.tsx
│   │   └── forms/
│   │       ├── ContactForm.tsx
│   │       └── LeadCaptureForm.tsx
│   └── lib/
│       ├── constants.ts            (brand colors, pricing, social links)
│       └── resend.ts               (email sending utility)
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
├── repomix.config.json
└── CLAUDE.md                       (this file)
```

---

## Constants Reference (`src/lib/constants.ts`)

```typescript
export const BRAND = {
  name: "Sculpted by Larry",
  tagline: "Your Body. Engineered.",
  location: "Tampa, Florida",
  certification: "ISSA Certified Personal Trainer",
  email: "larry@sculptedbylarry.com",
  phone: "",  // TBD
  instagram: "https://instagram.com/sculptedbylarry",  // TBD - confirm handle
  tiktok: "",  // TBD
  whatsapp: "",  // TBD
  calcom: "",  // TBD - Cal.com booking link
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
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Generate repomix context
npx repomix

# Deploy (auto via Vercel Git integration)
git push origin main
```

---

## Build Order (Phase by Phase)

### Phase 1: Foundation
1. Initialize Next.js 14 project with TypeScript + Tailwind
2. Set up tailwind.config.ts with brand colors and fonts
3. Copy logo SVGs to `/public/logos/`
4. Create root layout with fonts (Cormorant Garant + DM Sans from Google Fonts)
5. Build Navbar (sticky, transparent→solid, horizontal logo, mobile hamburger)
6. Build Footer (logo, nav links, social icons, "ISSA Certified" badge)

### Phase 2: Home Page
7. Hero section (full viewport, headline, CTA)
8. Trust bar (certification, location, stats)
9. Program cards preview (3 tiers)
10. Transformation spotlight (before/after + testimonial)
11. Final CTA section

### Phase 3: Inner Pages
12. Programs page (detailed tiers + FAQ)
13. Results page (gallery + testimonials)
14. About page (story + credentials)
15. Book a Call page (Cal.com embed)

### Phase 4: Lead Capture
16. Lead magnet landing page (`/free-plan`)
17. Contact form with Resend integration
18. Email confirmation flow

### Phase 5: Polish
19. SEO metadata (per page titles, descriptions, OG images)
20. Performance optimization (image optimization, lazy loading)
21. Mobile testing pass
22. Favicon generation from logo_icon.svg
23. Google Business Profile link

---

## Notes for Claude Code

- **Always read this CLAUDE.md first** before starting any task
- **Always run `npx repomix`** after reading this file to get full codebase context
- Use App Router (not Pages Router)
- All components use TypeScript with proper typing
- Prefer `"use client"` only where needed (Framer Motion components, forms, interactive elements)
- Keep Server Components as default
- Use Next.js Image component for all images
- Tailwind classes only — no inline styles, no CSS modules
- Framer Motion for animations — import from `"framer-motion"`
- Mobile-first responsive: design for mobile, then add `md:` and `lg:` breakpoints
- The site should feel premium and polished, not generic template-y
- Gold (#C9A84C) is the primary action color — all CTAs use this
- Navy (#0F1525) is the primary background — most sections use this

---

## Placeholder Content

Until Larry provides real photos and copy, use:
- **Transformation photo:** A placeholder card with "Before → After" text and a note "Photo coming soon"
- **Larry's portrait:** A styled placeholder with his initials "L" in gold
- **Testimonials:** 2-3 realistic but clearly placeholder testimonials
- **Stats:** "50+ Clients Trained" / "98% Client Satisfaction" / "Tampa's Premier Trainer"

---

## Reference: What NOT to do

- ❌ No generic gym/fitness template aesthetic
- ❌ No bright colors or gradients (stay with navy + gold)
- ❌ No stock photography vibes
- ❌ No aggressive "BEAST MODE" energy
- ❌ No cluttered layouts or small text
- ❌ No pages without a clear CTA
- ❌ No slow page loads (optimize everything)

# DESIGN_SYSTEM.md — Sculpted by Larry

> The definitive visual and interaction rulebook for the Sculpted by Larry website.
> Every component, every color, every animation follows this system.
> Claude Code must read this file before any UI work.

---

## 1. Design Philosophy

**Aesthetic direction:** Luxury-refined meets athletic confidence. Think high-end menswear brand crossed with a premium coaching practice — NOT a gym franchise, NOT a fitness app, NOT a generic template.

**References studied:**
- Ultimate Performance — dark hero, bold stats, photography-driven, red accent on black/white
- The Parker Practice — editorial serif typography, lifestyle photography, muted accent color, sophisticated minimalism
- Scott Laidler — authority-first copy, credential stats bar, media logos, embedded Google Reviews
- Jeff Nippard — product-led e-commerce, cover art for programs, star ratings, cart flow
- RP Strength — dark theme, bold condensed type, app screenshots, aggressive red accent

**What makes Sculpted by Larry distinctive:**
- Navy + gold palette (no other trainer uses this combination at this level)
- Serif display type (Cormorant Garamond) gives editorial sophistication most fitness sites lack
- The muscular silhouette logo is a signature mark — use it as a background texture element, not just a logo
- Larry's real photography is the differentiator — the site should feel like HIS world, not a stock photo template

---

## 2. Color System

### Primary Palette

```
--navy:           #0F1525    /* Primary background, hero, dark sections */
--navy-light:     #1A2235    /* Elevated surfaces on dark bg (cards, navbar solid) */
--navy-lighter:   #232D42    /* Borders, dividers on dark bg */
--gold:           #C9A84C    /* Primary accent, CTAs, highlights, links */
--gold-hover:     #D4B65E    /* Gold hover/active state */
--gold-dark:      #A8873A    /* Gold on light backgrounds */
--gold-muted:     rgba(201, 168, 76, 0.15)  /* Gold tint for backgrounds */
```

### Neutral Palette

```
--white:          #FFFFFF    /* Primary text on dark backgrounds */
--off-white:      #F8F6F1    /* Light section backgrounds */
--cream:          #F0EDE5    /* Slightly warmer light bg variant */
--gray-100:       #E8E5DE    /* Light borders */
--gray-300:       #B8B5AE    /* Muted text on light bg */
--gray-500:       #6B6860    /* Secondary text on light bg */
--gray-700:       #3D3A35    /* Primary text on light bg */
--gray-900:       #1A1815    /* Near-black text */
```

### Semantic Colors

```
--success:        #4CAF50    /* Form success states */
--error:          #E53935    /* Form error states */
--info:           #5C8DB5    /* Informational highlights */
```

### Usage Rules

| Context | Background | Text | Accent |
|---------|-----------|------|--------|
| Hero section | navy | white | gold |
| Dark content sections | navy | white / gray-300 | gold |
| Light content sections | off-white | gray-700 | gold-dark |
| CTA break sections | gold | navy | white |
| Cards on dark bg | navy-light | white | gold |
| Cards on light bg | white | gray-700 | gold-dark |
| Navbar (scrolled) | navy-light + backdrop-blur | white | gold |
| Footer | navy | gray-300 | gold |

### Section Rhythm Pattern

Pages alternate between dark and light sections to create visual rhythm:
```
HERO (dark navy) → TRUST BAR (navy-light strip) → CONTENT (off-white) → 
FEATURE (dark navy) → CONTENT (off-white) → CTA BREAK (gold bg) → FOOTER (navy)
```

Not every section must alternate. Two dark sections in a row are fine if the content demands it. But never two light sections back-to-back — they'll blur together.

---

## 3. Typography

### Font Stack

```css
/* Display / Headings */
font-family: 'Cormorant Garamond', 'Georgia', serif;

/* Body / UI */
font-family: 'DM Sans', 'Helvetica Neue', sans-serif;

/* Monospace (pricing, stats) */
font-family: 'DM Mono', 'Courier New', monospace;
```

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Font | Usage |
|-------|------|--------|-------------|----------------|------|-------|
| `display-xl` | 72px / 4.5rem | 700 | 0.9 | 0.04em | Cormorant | Hero headline (desktop) |
| `display-lg` | 56px / 3.5rem | 700 | 0.95 | 0.04em | Cormorant | Hero headline (mobile) |
| `display-md` | 42px / 2.625rem | 600 | 1.0 | 0.03em | Cormorant | Page titles |
| `heading-lg` | 32px / 2rem | 600 | 1.15 | 0.02em | Cormorant | Section headings |
| `heading-md` | 24px / 1.5rem | 600 | 1.2 | 0.01em | Cormorant | Card titles, subsections |
| `heading-sm` | 20px / 1.25rem | 600 | 1.3 | 0 | Cormorant | Small headings |
| `body-lg` | 18px / 1.125rem | 400 | 1.7 | 0 | DM Sans | Lead paragraphs, hero sub |
| `body` | 16px / 1rem | 400 | 1.7 | 0 | DM Sans | Default body text |
| `body-sm` | 14px / 0.875rem | 400 | 1.6 | 0 | DM Sans | Captions, fine print |
| `label` | 12px / 0.75rem | 500 | 1.4 | 0.1em | DM Sans | Badges, overlines, tags |
| `overline` | 13px / 0.8125rem | 500 | 1.4 | 0.2em | DM Sans | Section overlines, "ISSA CERTIFIED" |
| `price` | 36px / 2.25rem | 400 | 1.0 | -0.01em | Cormorant | Pricing display |

### Typography Rules

- **Headings** are always Cormorant Garamond, uppercase when they're section titles, mixed case for card titles
- **"by Larry"** is always Cormorant Garamond italic, gold color, normal case
- **Body text** is always DM Sans, never Cormorant
- **Overlines** (small text above headings like "ISSA CERTIFIED PERSONAL TRAINER") are DM Sans, uppercase, letter-spacing 0.2em, gold color on dark bg or gold-dark on light bg
- **Price text** uses Cormorant at large size with italic style for the dollar amount
- **Never use Inter, Roboto, Arial, or system fonts anywhere**
- Minimum font size on mobile: 16px for body, 14px for captions

---

## 4. Spacing System

Base unit: 4px. All spacing uses multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps (icon + label) |
| `space-2` | 8px | Inline element gaps |
| `space-3` | 12px | Small component padding |
| `space-4` | 16px | Default component padding |
| `space-5` | 20px | Card internal padding |
| `space-6` | 24px | Card padding, grid gaps |
| `space-8` | 32px | Section internal padding |
| `space-10` | 40px | Large section gaps |
| `space-12` | 48px | Between sections (mobile) |
| `space-16` | 64px | Between sections (desktop) |
| `space-20` | 80px | Major section spacing |
| `space-24` | 96px | Hero top/bottom padding |
| `space-32` | 128px | Extra large hero spacing |

### Container

```css
max-width: 1280px;  /* max-w-7xl */
padding-inline: 24px;  /* px-6 mobile */
padding-inline: 32px;  /* px-8 tablet+ */
margin: 0 auto;
```

---

## 5. Layout Patterns

### Section Types

**A. Hero Section (dark)**
- Full viewport height (`min-h-screen`)
- Navy background with photo overlay (dark gradient on image)
- Content vertically centered, left-aligned or centered
- Overline → Display heading → Body subheadline → CTA buttons
- Subtle scroll indicator at bottom

**B. Split Content (dark or light)**
- Two columns: 50/50 or 60/40
- One side: text content (heading + body + optional CTA)
- Other side: image or visual element
- Stacked on mobile (content first, image second)

**C. Cards Grid**
- 3-column on desktop, 2 on tablet, 1 on mobile
- Equal height cards within the grid
- Featured card (Online Coaching) has gold border + slight scale increase

**D. Stats Bar**
- Full-width strip, navy-light or gold-muted background
- 3-4 stat items in a row
- Large number (Cormorant, display size) + small label below
- Animated count-up on scroll into view

**E. Testimonials**
- Horizontal scroll or carousel on desktop
- Stacked on mobile
- Quote mark icon, italic text, client name + result achieved
- Optional star rating

**F. CTA Break**
- Full-width gold background
- Navy text, centered
- Bold heading + subtext + single CTA button (navy bg, white text)
- This section breaks the flow and demands attention

**G. Full-Bleed Image**
- Edge-to-edge image with text overlay
- Dark gradient overlay (bottom-heavy) for text readability
- Used sparingly — once per page maximum

---

## 6. Component Specifications

### 6.1 Buttons

**Primary (gold CTA)**
```
Background: gold (#C9A84C)
Text: navy (#0F1525)
Font: DM Sans, 500 weight, 15px
Padding: 14px 32px
Border radius: 8px
Hover: gold-hover (#D4B65E), translateY(-1px), subtle shadow
Active: scale(0.98)
Transition: all 200ms ease
```

**Secondary (outline)**
```
Background: transparent
Border: 1px solid gold
Text: gold
Hover: gold bg, navy text (fill transition)
Same sizing as primary
```

**Ghost (text link)**
```
Background: transparent
Text: gold
Hover: underline offset 4px
No border, no padding
```

**Dark CTA (on gold backgrounds)**
```
Background: navy
Text: white
Hover: navy-light, translateY(-1px)
```

### 6.2 Cards

**Program Card**
```
Background: navy-light (on dark) or white (on light)
Border: 1px solid navy-lighter (dark) or gray-100 (light)
Border radius: 16px
Padding: 32px
Hover: translateY(-4px), shadow-lg, border-color transition to gold-muted
Transition: all 300ms ease
```

**Featured Program Card (Online Coaching)**
```
Same as above PLUS:
Border: 1px solid gold
Top accent: 3px solid gold bar at top
Badge: "Most Popular" gold pill at top-right
Scale: scale(1.02) at rest compared to siblings (desktop only)
```

**Testimonial Card**
```
Background: navy-light (dark) or white (light)
Border radius: 12px
Padding: 24px
Left border: 3px solid gold (accent)
Quote icon: gold, 24px, top-left
```

### 6.3 Navbar

```
Position: fixed, top-0, z-50
Height: 80px (desktop), 64px (mobile)
Default state: transparent background
Scrolled state (>50px): navy-light bg + backdrop-blur-md + border-bottom navy-lighter
Transition: background 300ms, backdrop-filter 300ms

Logo: icon SVG (44px) + "SCULPTED" text + "by Larry" text, link to /
Nav links: DM Sans, 14px, 500, white, hover gold
CTA button: gold, small size, "Book a Call"
Mobile: hamburger → fullscreen overlay menu with staggered animation
```

### 6.4 Footer

```
Background: navy (#0F1525)
Top border: 1px solid navy-lighter
Padding: 64px top, 32px bottom
Grid: 4 columns desktop → 2 tablet → stacked mobile
Logo section: badge icon + tagline + "ISSA Certified" text
Bottom bar: copyright, separated by 1px navy-lighter line
```

### 6.5 Form Inputs

```
Background: navy-light (dark) or white (light)
Border: 1px solid navy-lighter (dark) or gray-100 (light)
Border radius: 8px
Padding: 14px 16px
Font: DM Sans, 16px
Focus: border-color gold, ring-2 ring-gold/20
Error: border-color error, error text below in 14px
Placeholder: gray-500
Transition: border-color 200ms
```

### 6.6 Section Heading

```
Structure: Overline → Heading → Optional subtitle → Gold rule line

Overline: DM Sans, 13px, 500, uppercase, letter-spacing 0.2em, gold
Heading: Cormorant Garamond, heading-lg (32px), uppercase or mixed case
Subtitle: DM Sans, body-lg (18px), gray-300 (dark) or gray-500 (light)
Gold rule: 48px wide, 2px tall, gold, centered below subtitle, margin-top 16px

Alignment: centered default, left-aligned for split layouts
```

---

## 7. Animation System

### Entrance Animations (Framer Motion)

**Fade Up (default for all elements)**
```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

**Stagger Children (hero elements, card grids)**
```tsx
// Parent
transition={{ staggerChildren: 0.15 }}

// Each child
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

**Scale In (badges, icons)**
```tsx
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.4, ease: "easeOut" }}
```

**Slide In (mobile menu items)**
```tsx
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.3 }}
```

### Scroll Trigger (useInView)

```tsx
// ScrollReveal wrapper settings
threshold: 0.2
triggerOnce: true
animation: fadeUp (default)
delay: configurable per instance (0, 0.1, 0.2 for staggered items)
```

### Hover States

```
Cards: translateY(-4px) + shadow elevation increase (300ms ease)
Buttons: translateY(-1px) + color shift (200ms ease)
Links: underline with offset transition (200ms)
Images: scale(1.03) with overflow hidden on container (400ms ease)
Nav links: color to gold (150ms)
```

### Count-Up Animation (stats)

```
Trigger: useInView
Duration: 2 seconds
Easing: easeOut
Format: number + suffix (e.g., "50+" or "98%")
Font: Cormorant Garamond, display size
```

### Page Transitions

```
No full page transitions (they slow down perceived navigation)
Individual sections animate on scroll entry
Hero animates on page load
```

---

## 8. Image Treatment

### Hero Images
```
Full-bleed or contained within a shaped mask
Dark gradient overlay: linear-gradient(to bottom, rgba(15,21,37,0.7), rgba(15,21,37,0.9))
Filter: slight desaturation for consistency with gold palette
Object-fit: cover
Lazy loading: eager for hero, lazy for below fold
```

### Transformation Photos
```
Aspect ratio: 3:4 portrait
Border radius: 12px
Side-by-side layout with "Before" / "After" labels
Gold border accent on after photo
Hover: subtle scale(1.02)
```

### Profile / About Photo
```
Aspect ratio: 4:5 or 3:4
Border radius: 16px
Optional gold border treatment (2px solid gold)
Can use rounded-full for circular crop in specific contexts
```

### Placeholder Pattern (until real photos provided)
```
Background: navy-light
Silhouette logo watermark at 10% opacity, centered
Text: "Photo coming soon" in gray-500, centered
Minimum height to maintain layout: 300px (portrait), 200px (landscape)
```

---

## 9. Responsive Breakpoints

```css
/* Mobile first — base styles are mobile */
sm: 640px    /* Large phones */
md: 768px    /* Tablets */
lg: 1024px   /* Small desktops */
xl: 1280px   /* Standard desktops */
2xl: 1536px  /* Large screens */
```

### Key Responsive Rules

- **Navbar**: horizontal links → hamburger menu at `md` breakpoint
- **Card grids**: 3 cols → 2 cols at `lg` → 1 col at `md`
- **Split layouts**: side-by-side → stacked at `md`
- **Hero headline**: display-xl → display-lg at `lg` → display-md at `md`
- **Section padding**: space-24 → space-16 at `lg` → space-12 at `md`
- **Container padding**: 32px → 24px at `md` → 16px at `sm`
- **Footer**: 4 cols → 2 cols at `md` → 1 col at `sm`

---

## 10. Accessibility

- All images: descriptive `alt` text
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- Focus states: gold ring (ring-2 ring-gold/30) on all interactive elements
- Skip-to-content link (hidden, visible on focus)
- Proper heading hierarchy (single h1 per page, sequential h2 → h3)
- Button/link touch targets: minimum 44px
- Form labels: visible labels or aria-label, never placeholder-only
- Reduced motion: respect `prefers-reduced-motion` media query
- Semantic HTML: use `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`

---

## 11. Icons

Use Lucide React icons (already available in the stack).

```
Size: 20px default, 16px for inline, 24px for feature icons
Stroke width: 1.5 (matches the refined aesthetic)
Color: inherit from parent text color
```

Common icons used:
- `Check` — feature lists (gold color)
- `ArrowRight` — CTA buttons, links
- `Phone` — contact/call CTAs
- `MapPin` — Tampa location
- `Award` — ISSA certification
- `Instagram` — social link
- `Menu` / `X` — mobile nav toggle
- `Star` — review ratings
- `Quote` — testimonials
- `ChevronDown` — FAQ accordion, scroll indicator

---

## 12. Dark Mode Consideration

The site is NOT a dark-mode-togglable site. It uses intentional dark AND light sections by design. The system toggle icon in the navbar should be removed if present. The site's visual identity IS the dark/light interplay — it's not a user preference.

---

## 13. Patterns to AVOID

- ❌ Full page of same-background-color sections (no visual rhythm)
- ❌ Generic card layouts with equal visual weight (featured items must stand out)
- ❌ Stock photography or placeholder images that look broken
- ❌ Buttons with low contrast (gold on light bg is hard to read — use gold-dark)
- ❌ More than 2 CTA buttons visible simultaneously
- ❌ Aggressive gym/bodybuilder aesthetic ("BEAST MODE", neon colors, heavy gradients)
- ❌ Text over images without proper overlay gradient
- ❌ Animations that play every time element enters viewport (triggerOnce: true)
- ❌ Loading spinners visible to users (use skeleton screens or instant transitions)
- ❌ Inter, Roboto, or system font fallbacks visible to users

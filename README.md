# Storefront Studio — agency marketing site

Production-ready marketing website for a software agency serving local
businesses: restaurants, cafes, salons and spas, gyms and studios, bakeries and
food trucks, and independent retail.

Built to convert business owners into leads — every page ends in a call to
action, and the contact form is wired to a real delivery mechanism rather than
a `mailto:` link.

> **Storefront Studio is a placeholder brand.** The agency name, contact
> details, case studies, testimonials and team are all invented. See
> [CONTENT.md](./CONTENT.md) for the swap-in checklist before you launch.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript strict) |
| Styling | Tailwind CSS v4 — tokens defined in `src/app/globals.css` |
| Content | Typed data modules in `src/content` — no CMS, no database |
| Forms | Route handler at `/api/contact` → Resend and/or a webhook |
| Runtime deps | `next`, `react`, `react-dom`. That's the whole list. |

Every page except `/api/contact` is prerendered as static HTML at build time,
so it can be served from a CDN edge.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build   # production build; also type-checks
npm start       # serve the production build locally
npm run lint    # ESLint
```

## Project structure

```
src/
├── app/                      Routes (App Router)
│   ├── page.tsx              Home
│   ├── services/             Service lines, one anchored section each
│   ├── industries/           Index + /industries/[slug] per vertical
│   ├── work/                 Portfolio + /work/[slug] case studies
│   ├── pricing/              Packages, care plans, pricing FAQ
│   ├── about/                Story, values, team, FAQ
│   ├── blog/                 Index + /blog/[slug] posts
│   ├── contact/              Form, direct contact, booking widget slot
│   ├── privacy/ terms/       Legal templates — have a lawyer review
│   ├── api/contact/route.ts  Form endpoint: validate → rate-limit → deliver
│   ├── sitemap.ts            Generated /sitemap.xml
│   ├── robots.ts             Generated /robots.txt
│   ├── opengraph-image.tsx   Generated social share card
│   └── globals.css           Design tokens and base styles
├── components/
│   ├── ui/                   Button, Section, Card, PlaceholderBadge
│   ├── mockups.tsx           Product "screenshots", drawn in markup
│   ├── contact-form.tsx      The only substantial client component
│   └── …                     Header, footer, CTA banner, cards, FAQ
├── content/                  ← edit these to change the site's copy
└── lib/                      SEO, JSON-LD, validation, rate limiting, delivery
```

## Editing content

Nearly all copy lives in `src/content`, separate from the components that
render it. To change the site you edit data, not JSX:

| File | What it controls |
|---|---|
| `site.ts` | Agency name, phone, email, address, nav, CTA labels |
| `services.ts` | The five service lines and the four-step process |
| `industries.ts` | Verticals, pain points, features (drives `/industries/[slug]`) |
| `case-studies.ts` | Portfolio entries (drives `/work/[slug]`) |
| `social-proof.ts` | Testimonials, headline stats, client logos |
| `pricing.ts` | Packages, care plans, pricing FAQ |
| `posts.ts` | Blog posts, as structured blocks |
| `about.ts` | Story, values, team, general FAQ |

Adding an industry, case study or post automatically creates its page, adds it
to the sitemap, and cross-links it — no routing changes needed.

### Brand colours and type

The palette is defined once, at the top of `src/app/globals.css`, as Tailwind
v4 `@theme` tokens: `clay` (primary), `honey` (accent), `ink` (warm neutrals),
plus `canvas`, `surface` and `line`. Change the hex values there and the whole
site follows.

Fonts are Plus Jakarta Sans (headings) and Inter (body), self-hosted
automatically by `next/font` — no render-blocking request to Google.

## Wiring the contact form

The form works out of the box in the sense that it validates, rate-limits and
responds correctly — but with nothing configured it tells visitors to phone
instead, and logs the enquiry to the server console so it isn't lost. Set one
of these (both is fine — either succeeding counts as delivered):

**Email via Resend**

```bash
RESEND_API_KEY=re_xxxxxxxx
LEAD_TO_EMAIL=hello@yourdomain.com      # comma-separated for multiple
LEAD_FROM_EMAIL=website@yourdomain.com  # must be a domain verified with Resend
```

**Webhook to a CRM / Zapier / Slack**

```bash
LEAD_WEBHOOK_URL=https://hooks.zapier.com/…
LEAD_WEBHOOK_SECRET=optional-shared-secret
```

Using a different provider (Postmark, SendGrid, Mailgun)? Replace
`sendViaResend` in `src/lib/leads.ts`. Nothing else needs to change — the route
only depends on `deliverLead`.

The endpoint already includes a honeypot field, per-IP rate limiting (5
submissions per 10 minutes), server-side validation that mirrors the client's,
and error messages that always give the visitor a phone number to fall back on.

> The rate limiter is in-memory, so on serverless each instance counts
> separately. Fine for a contact form; back it with Upstash/Redis if you need a
> hard guarantee. Keep the `check()` signature and nothing else changes.

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo. The framework is
   detected; no build settings to change.
3. Add environment variables from `.env.example` (at minimum
   `NEXT_PUBLIC_SITE_URL`, plus your form delivery channel).
4. Deploy, then add your domain under **Settings → Domains** and update
   `NEXT_PUBLIC_SITE_URL` to match.

Set `NEXT_PUBLIC_NOINDEX=true` on preview environments so staging never
competes with production in search results.

### Netlify

Install `@netlify/plugin-nextjs`, then: build command `npm run build`, publish
directory `.next`. Add the same environment variables.

### Anywhere else (Docker, VPS, Cloud Run)

`npm run build && npm start` serves on port 3000 behind any reverse proxy.
Node 20+.

## SEO

Included and working:

- Per-page titles, descriptions and canonical URLs (`src/lib/seo.ts`)
- Open Graph and Twitter cards, with a generated share image
- `sitemap.xml` and `robots.txt`, both generated from content
- JSON-LD: `ProfessionalService`, `WebSite`, `Service`, `BlogPosting`,
  `FAQPage`, `BreadcrumbList` (`src/lib/jsonld.ts`)
- Semantic landmarks, one `<h1>` per page, descriptive internal link text

Before launch: set `NEXT_PUBLIC_SITE_URL`, submit the sitemap in Google Search
Console, and create a Google Business Profile — for a local agency that listing
usually outperforms the website in search.

## Accessibility

Built to WCAG 2.1 AA basics: skip link, visible focus rings on everything
focusable, semantic landmarks and heading order, form labels tied to inputs
with `aria-invalid`/`aria-describedby` on errors, `aria-current` on active nav,
`role="img"` with a description on every decorative mockup, and full
`prefers-reduced-motion` support.

Not automated — re-test with a screen reader after you swap in real content,
and check contrast if you change the palette.

## Performance

- Zero image files. Mockups, logos, icons and the hero artwork are markup, SVG
  and CSS gradients, so there is nothing to download, nothing to lazy-load and
  no layout shift.
- Only three client components ship JavaScript: the header (mobile menu), the
  contact form, and the scroll-reveal wrapper. Everything else is a server
  component.
- No analytics, fonts-from-CDN, chat widget or map iframe loads unless you
  explicitly configure it.

If you add images later, use `next/image` with explicit `width`/`height`, and
`priority` only on the hero.

## Licence

Proprietary — replace with your own licence before publishing.

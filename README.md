# Marketing site — restaurant & gym management systems

Production-ready marketing website for a company that builds two products: a
**restaurant management system** (ordering, menus, tables, kitchen) and a **gym
management system** (memberships, classes, check-in).

Built to convert operators into leads — every page ends in a call to action,
and the contact form is wired to a real delivery mechanism rather than a
`mailto:` link.

> **No invented content.** There are no fake clients, testimonials, statistics
> or team members anywhere in this site, and the only published price is the
> one you supplied. What it still needs is your company name and contact
> details — see [CONTENT.md](./CONTENT.md).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript strict) |
| Styling | Tailwind CSS v4 — tokens defined in `src/app/globals.css` |
| Content | Typed data modules in `src/content` — no CMS, no database |
| Forms | Route handler at `/api/contact` → Resend and/or a webhook |
| Runtime deps | `next`, `react`, `react-dom`, `three` (lazy, desktop only) |

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
│   ├── restaurant-management-system/
│   ├── gym-management-system/
│   ├── pricing/              How pricing works, cost drivers, FAQ
│   ├── about/                How we work, values, process, FAQ
│   ├── contact/              Form, direct contact, booking widget slot
│   ├── privacy/ terms/       Legal templates — have a lawyer review
│   ├── api/contact/route.ts  Form endpoint: validate → rate-limit → deliver
│   ├── sitemap.ts            Generated /sitemap.xml
│   ├── robots.ts             Generated /robots.txt
│   ├── opengraph-image.tsx   Generated social share card
│   └── globals.css           Design tokens and base styles
├── components/
│   ├── ui/                   Button, Section, Card, PlaceholderBadge
│   ├── mockups.tsx           Interface "screenshots", drawn in markup
│   ├── product-page.tsx      The layout both systems share
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
| `site.ts` | Company name, contact details, nav, CTA labels, trust points |
| `products.ts` | Both systems — problems, modules, outcomes, FAQs — and the four-stage process |
| `pricing.ts` | Packages and prices, cost drivers, running costs, pricing FAQ |
| `company.ts` | About-page copy, values, general FAQ |

Both product pages render from one shared template
(`src/components/product-page.tsx`), so they can't drift apart. Contact details
left blank in `site.ts` are hidden site-wide rather than rendered as dead
links — see CONTENT.md.

### Brand colours and type

The palette is defined once, at the top of `src/app/globals.css`, as Tailwind
v4 `@theme` tokens: `clay` (primary), `honey` (accent), `ink` (warm neutrals),
plus `canvas`, `surface` and `line`. Change the hex values there and the whole
site follows.

Fonts are Plus Jakarta Sans (headings) and Inter (body), self-hosted
automatically by `next/font` — no render-blocking request to Google.

## Wiring the contact form

The form works out of the box in the sense that it validates, rate-limits and
responds correctly — but with nothing configured it tells visitors to contact
you another way, and logs the enquiry to the server console so it isn't lost.
Set one of these (both is fine — either succeeding counts as delivered):

**Email via Resend**

```bash
RESEND_API_KEY=re_xxxxxxxx
LEAD_TO_EMAIL=hello@bizwisetech.com     # comma-separated for multiple
LEAD_FROM_EMAIL=website@bizwisetech.com # must be a domain verified with Resend
```

No domain yet? Sign up to Resend with the address you want enquiries sent to,
and send from `onboarding@resend.dev`. Resend's sandbox delivers only to the
address the account was created with — which is exactly what you want when that
address is your own inbox, and it needs no DNS setup. Switch the sender to your
own verified domain once you have one; until then you cannot deliver anywhere
else, and sandbox mail is more likely to be filtered as spam.

`LEAD_TO_EMAIL` is read server-side only and never reaches the browser, so the
destination inbox stays private even though the site is public. Set it in your
host's dashboard rather than committing it, especially if this repo is public.

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
and error messages that offer whichever fallback contact details you've
configured.

> The rate limiter is in-memory, so on serverless each instance counts
> separately. Fine for a contact form; back it with Upstash/Redis if you need a
> hard guarantee. Keep the `check()` signature and nothing else changes.

## Payments (Razorpay)

Optional, and off unless configured — with no keys set, "Pay now" says so and
links to the contact form.

**Two flows, and which one runs is decided per tier:**

| Configured | Flow | What the customer gets |
|---|---|---|
| Keys only | One-off **order** (Standard Checkout) | A single charge for one month |
| Keys **+** a plan id for that tier | Recurring **subscription** | Monthly billing until cancelled |

Orders need nothing but the keys, so they work on a fresh test account.
Subscriptions are what a "/month" price should really be, but they need a
dashboard plan per tier and e-mandate/AutoPay enabled on the account. The card
says which of the two it is under the button, because charging once and
charging monthly are not the same promise.

| File | Role |
|---|---|
| `src/lib/razorpay.ts` | REST calls and all three HMACs. `server-only`, so importing it from a client component is a build error rather than a leaked secret |
| `api/create-order` | Creates a one-off order from a tier slug |
| `api/verify-payment` | Verifies the order signature — `order_id\|payment_id` |
| `api/checkout` | Creates a subscription from a tier slug |
| `api/checkout/verify` | Verifies the subscription signature — `payment_id\|subscription_id` |
| `api/razorpay/webhook` | The reliable record — fires even if the tab is closed |
| `src/components/checkout-button.tsx` | Runs either flow. Loads Checkout on click, not on page load |

Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to take payments at all, plus
`RAZORPAY_WEBHOOK_SECRET` and a plan id per tier for subscriptions — see
`.env.example`.

Four things worth knowing:

- **Plans live in the Razorpay dashboard.** The client sends a tier slug and
  never an amount, so a tampered request cannot change what is charged.
- **The client never sends an amount.** For subscriptions the price lives on
  the dashboard plan; for orders it is read from `src/content/pricing.ts` on
  the server. An order carries its own amount, so that lookup is the only thing
  between a tampered request and a ₹1 invoice for a ₹1,999 plan.
- **The two signatures use opposite field orders.** Orders sign
  `order_id|payment_id`; subscriptions sign `payment_id|subscription_id`.
  Swapping them produces a signature that never matches, with no error saying
  why.
- **The pricing page is prerendered**, so whether "Pay now" can reach Razorpay
  is decided at build time. Adding keys requires a rebuild, not just a restart
  — a Vercel redeploy does this for you. Without a plan configured the button
  still renders, but says payments aren't switched on and links to the form.
- **There is no database.** Payments succeed and notifications are sent through
  the same channels as contact-form leads, but nothing is stored, so the site
  cannot tell you who is currently subscribed. Razorpay's dashboard is your
  source of truth until you add persistence. See CONTENT.md.

### Trying it in test mode

Test keys charge nothing and need no KYC, so this is the way to exercise the
whole flow before going live.

**1. Get test keys.** In the Razorpay dashboard, switch the toggle to **Test
Mode**, then Account & Settings → API Keys → Generate Test Key. You get an
`rzp_test_...` id and a secret shown exactly once.

**2. Create the two plans, in test mode.** Subscriptions → Plans → New Plan.
One at ₹999 monthly, one at ₹1,999 monthly, matching `src/content/pricing.ts`.
Copy the `plan_...` id from each.

> Test-mode and live-mode plans are separate objects with different ids. A live
> plan id sent with a test key fails, and the error does not say why — if the
> checkout call is rejected, check you are not mixing the two.

**3. Point the site at them.** Create `.env.local` in the project root — it is
gitignored, so the secret stays off GitHub:

```bash
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
RAZORPAY_PLAN_STARTER=plan_xxxxxxxxxxxx
RAZORPAY_PLAN_GROWTH=plan_xxxxxxxxxxxx
```

**4. Restart.** `npm run dev` reads `.env.local` at startup, so a running dev
server will not pick these up — stop it and start it again. If you are testing
a production build instead (`npm run build && npm start`), rebuild: the tier
buttons are baked in at build time.

**5. Pay.** Open `/pricing`, click **Pay now**, and use a Razorpay test card at
the checkout — their current list is in the dashboard under Test Mode, and
`4111 1111 1111 1111` with any future expiry and any CVV is the usual Visa
success card. No money moves in test mode.

Two things will not work locally, and neither is a fault:

- **The webhook.** Razorpay cannot reach `localhost`, so
  `api/razorpay/webhook` never fires. The success screen still appears —
  that path is `api/checkout/verify`, called by the browser. To exercise the
  webhook, expose the port with a tunnel (ngrok, cloudflared) and point the
  dashboard webhook at `https://<tunnel>/api/razorpay/webhook` with
  `RAZORPAY_WEBHOOK_SECRET` set to match.
- **Subscriptions on a fresh account.** Recurring payments need Subscriptions
  enabled on the Razorpay account, and live keys additionally need completed
  KYC plus e-mandate/UPI AutoPay. If the create call is rejected in test mode,
  that is what to ask Razorpay support about.

**On Vercel**, the same four variables go in Settings → Environment Variables
scoped to **Preview** (leave Production unset until you have live keys), then
redeploy — setting them without a redeploy changes nothing, per the build-time
note above.

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
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`,
  `BreadcrumbList` (`src/lib/jsonld.ts`), with fields omitted when the
  underlying detail isn't configured
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

## The 3D hero

`src/components/hero-scene.tsx` renders an animated Three.js object behind the
hero: a rotating icosahedron in a wireframe cage, with an orbiting point ring,
lit from one side and leaning toward the cursor.

Three.js costs about **178KB gzipped**, which is more than the rest of the site
put together — so it is quarantined:

- imported dynamically **inside** the effect, so it is a separate chunk that is
  only fetched once we have decided to render at all
- **never loaded** below 1024px, under `prefers-reduced-motion`, on devices
  reporting two cores or fewer, with data saver on, or without WebGL
- capped at 30fps and pixel ratio 1.5, and it stops completely when scrolled
  out of view or the tab is hidden

Measured: a 390px viewport downloads **4KB** of this (the component, not the
library); desktop downloads the full 712KB uncompressed. The hero is entirely
readable without it — delete the `<HeroScene />` line in `src/app/page.tsx` and
`npm uninstall three` if you would rather have the bytes back.

## Performance

- Zero image files. Mockups, icons and the hero artwork are markup, SVG and
  CSS gradients, so there is nothing to download, nothing to lazy-load and no
  layout shift.
- Four client components ship JavaScript: the header (mobile menu), the
  contact form, the scroll-reveal wrapper, and the 3D hero. Everything else is a server
  component.
- No analytics, fonts-from-CDN, chat widget or map iframe loads unless you
  explicitly configure it.

If you add images later, use `next/image` with explicit `width`/`height`, and
`priority` only on the hero.

## Licence

Proprietary — replace with your own licence before publishing.

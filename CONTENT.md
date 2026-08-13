# Swapping in real content

Everything invented in this site is marked, in two ways:

1. **In the code** — a `// PLACEHOLDER` comment at the top of the file or on
   the line, and a `placeholder: true` field on records that have one.
2. **On the page** — a small ✱ **Sample** badge next to anything fabricated.

Setting `placeholder: false` removes the badge for that record. There is no
global switch on purpose: the badge disappears when the content is genuinely
real, one item at a time.

Work top to bottom and the site is launch-ready.

---

## 1. Agency identity — `src/content/site.ts`

Required before launch. Everything else in the site reads from here.

- [ ] `name`, `legalName`, `tagline`, `description`
- [ ] `contact.email`, `phoneE164` (E.164 format, e.g. `+14155551234`),
      `phoneDisplay`
- [ ] `contact.address` — used in the footer, contact page and JSON-LD
- [ ] `contact.hours` and `responsePromise` — **only promise what you'll hit**
- [ ] `social` — delete any you don't have rather than leaving a dead link
- [ ] `NEXT_PUBLIC_SITE_URL` in your host's environment variables

The logo mark is an inline SVG in `src/components/logo.tsx`; the favicon is
`src/app/icon.svg`. Replace both with your own.

## 2. Case studies — `src/content/case-studies.ts`

All six are fabricated. Each needs:

- [ ] Real client name, location and industry slug
- [ ] `problem` → `solution` → `result`, in the owner's language
- [ ] `metrics` — the first one is displayed large on the card, so lead with
      your strongest number
- [ ] `quote` — with the client's written permission to publish it
- [ ] `placeholder: false`

**Two or three real case studies beat six invented ones.** Delete the rest;
every page that references them degrades gracefully.

If you have client screenshots, replace the `mockup` field's generated artwork
by swapping the component body in `src/components/mockups.tsx` for a
`next/image`.

## 3. Testimonials, stats and logos — `src/content/social-proof.ts`

- [ ] `testimonials` — real quotes only, with permission, then
      `placeholder: false`
- [ ] `stats` — the four headline numbers on the home page. **Do not guess.**
      An unverifiable "$1.2M saved" is a legal and reputational risk; use
      numbers you can evidence, or cut the band to two you can.
- [ ] `clientLogos` — currently text wordmarks. Only use a client's name or
      logo with permission.
- [ ] `trustPoints` — appear beside every CTA. Keep them literally true.

## 4. Pricing — `src/content/pricing.ts`

- [ ] Tier prices, or set `price: null` for quote-only
- [ ] `carePlans` monthly rates
- [ ] `pricingFaqs` — particularly the ownership and ongoing-cost answers,
      which currently make specific promises on your behalf

Prices also appear on `/services` (from `services.ts` `priceFrom`) — keep the
two consistent.

## 5. Services and industries

- [ ] `src/content/services.ts` — `includes`, `timeline` and `priceNote` should
      match what you actually deliver
- [ ] `src/content/industries.ts` — `stat` on each industry hero is invented;
      the pain points and features are generic enough to keep, but sharpen them
      with what you hear on real calls
- [ ] Delete any vertical you don't serve — its page, nav entry and sitemap
      entry all disappear with it

## 6. About — `src/content/about.ts`

- [ ] `story` — the founding story is fiction, replace it entirely
- [ ] `team` — real people and roles, then `placeholder: false`. Delete the
      array if you'd rather not show a team.
- [ ] `values` and `faqs` — these make commitments (fixed quotes, you own
      everything, plain English). Keep only the ones you'll honour.

## 7. Blog — `src/content/posts.ts`

The three posts are genuine advice and safe to publish as-is, but:

- [ ] Change `author` to a real person
- [ ] Check the claims against your own experience — the no-show and commission
      figures are industry-typical, not measured
- [ ] The quote in the restaurant post is attributed to a placeholder client;
      remove it or replace with a real one

## 8. Legal — `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`

- [ ] Have a lawyer review both against the regimes you operate under
- [ ] Name your actual processors in the privacy notice (email provider, CRM,
      host, analytics)
- [ ] Update the "Last updated" dates
- [ ] Remove the `PlaceholderBadge` from each page once reviewed

## 9. Before you flip the switch

- [ ] Contact form delivers to a real inbox — **submit a test enquiry and
      confirm it arrives**
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain
- [ ] `NEXT_PUBLIC_NOINDEX=true` on preview, absent in production
- [ ] Analytics IDs set, and a consent banner if you serve EU/UK visitors
- [ ] `grep -rn "PLACEHOLDER" src/` returns nothing you haven't dealt with
- [ ] Every phone, email and WhatsApp link opens the right thing on a real phone
- [ ] Lighthouse pass on mobile
- [ ] Submit `sitemap.xml` to Google Search Console

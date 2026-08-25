# Before you launch

This site contains **no invented clients, quotes, statistics or team members**,
and the only published prices are the ones you supplied. What it does contain is a
small number of placeholders that only you can fill in, and a set of claims
made in your name that you should read and agree with.

Work through this list and the site is ready to go live.

---

## 1. Who you are — `src/content/site.ts`

The only genuinely blocking items.

- [ ] `name` — currently **"Your Company"**. Appears in the logo, every page
      title, the metadata and the social share card.
- [ ] `legalName` — currently **"Your Company Ltd"**. Footer and legal pages.
- [ ] `tagline` and `description` — accurate, but make them yours.

## 2. How to reach you

Set these either in `src/content/site.ts` or as environment variables (see
`.env.example`) so you can go live from your host's dashboard.

- [ ] Email — `NEXT_PUBLIC_CONTACT_EMAIL`
- [ ] Phone — `NEXT_PUBLIC_CONTACT_PHONE` (E.164, e.g. `+14155551234`) and
      `NEXT_PUBLIC_CONTACT_PHONE_DISPLAY`
- [ ] WhatsApp — `NEXT_PUBLIC_WHATSAPP_ENABLED=true`, only if that number
      actually receives WhatsApp
- [ ] Address and opening hours — in `site.ts`, or leave blank
- [ ] Social profiles — in `site.ts`, or leave blank

**Anything left blank is hidden**, not rendered empty. A missing phone number
removes the call buttons rather than shipping a dead link, and the error
messages on the contact form adapt to whichever details exist. So it is safe to
launch with only an email address.

## 3. Claims made in your name

These are not facts about clients — they're promises. Read them and keep only
the ones you will honour.

- [ ] `trustPoints` in `site.ts` — shown beside every call to action
      ("fixed quote", "your data stays yours", "no lock-in contracts")
- [ ] `values` in `src/content/company.ts` — the four promises on the About page
- [ ] `faqs` in `company.ts` — several answers commit you to specific
      behaviour (parallel-run migrations, written support terms, data export
      on request)
- [ ] `process` in `src/content/products.ts` — says you spend time on site
      during a busy period, and that you're present for go-live

## 4. What the systems actually do — `src/content/products.ts`

Both systems are described by capability, with no results or numbers attached.
Still worth a pass:

- [ ] `modules` — remove anything you don't build, add anything missing. The
      counts on the home page and product pages update themselves.
- [ ] `integrations` — deliberately kept as categories ("food-delivery
      aggregator order sync", "accounting exports for your CA"). **Name a
      specific platform — an aggregator, a payment provider, Tally — only once
      you have actually built and tested that integration.** Naming one you
      have not built is the fastest way to lose a deal at demo stage.
- [ ] **Aggregator sync, captain app, KOT printing, GST invoicing and UPI
      AutoPay are claims about what you ship.** They are standard for this
      market, which is why they are here — delete any you do not build yet.
- [ ] `faqs` per product — the offline-behaviour and POS answers promise an
      honest conversation at scoping; make sure that's how you sell.

## 5. Pricing — `src/content/pricing.ts`

Three packages. Starter (₹999/month) and Growth (₹1,999/month) carry published
prices; Custom shows "On request" and asks for a scoping call.

- [ ] Confirm both monthly prices, and what each tier includes at that price
- [ ] Add a price for Custom, or leave `price: null` to keep it quote-only.
      Set `period: "month"` on any tier that recurs; omit it for a one-off.
- [ ] Check the Starter feature list matches what you actually deliver
- [ ] Currency is set once, in `formatPrice` in `src/lib/utils.ts` (INR)
- [ ] Confirm the fixed-quote promise is really how you work
- [ ] Check `runningCosts` matches your commercial setup — particularly that
      payment processing goes direct to the provider and never through you

## 6. Legal — `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`

Both are template wording carrying a visible ✱ Template badge.

- [ ] Have a lawyer review them against the regimes you operate under
- [ ] Name your actual processors in the privacy notice (email provider, CRM,
      host, analytics)
- [ ] Update the "Last updated" dates
- [ ] Remove the `PlaceholderBadge` from each page once reviewed

## 7. Brand

- [ ] Logo mark — inline SVG in `src/components/logo.tsx`
- [ ] Favicon — `src/app/icon.svg`
- [ ] Colours — monochrome by default. The palette is defined once at the top
      of `src/app/globals.css` (`carbon` primary, `chrome` accent, `ink` text,
      `steel` positive). Redefine those hex values to introduce a brand colour;
      no component hard-codes one.
- [ ] The 3D hero object (`src/components/hero-scene.tsx`) is decoration and
      costs ~178KB gzipped, on desktop only — never on phones or under
      reduced motion. Remove `<HeroScene />` from `src/app/page.tsx` and run
      `npm uninstall three` if you would rather have the bytes.

## 8. Interface mockups

The mockups in `src/components/mockups.tsx` show generic sample rows — no
invented business names, and no results presented as a customer's. Replace them
with real screenshots when you have them by swapping a component's body for a
`next/image`; the frames still apply.

## 9. Payments, if you switch them on

Razorpay is wired up but dormant until the keys are set. Before taking real
money:

- [ ] Test with `rzp_test_` keys end to end, including a renewal
- [ ] Complete Razorpay KYC, and confirm e-mandate/UPI AutoPay is enabled —
      recurring subscriptions are rejected without it
- [ ] Create the plans in the dashboard at the prices the site advertises, and
      check they match `src/content/pricing.ts`
- [ ] Register the webhook and set `RAZORPAY_WEBHOOK_SECRET`
- [ ] **Add a refund and cancellation policy page.** Payment providers expect
      one, and a recurring charge without a stated cancellation route invites
      chargebacks. This site does not have one yet.
- [ ] Decide what happens after payment — right now you get a notification and
      nothing is recorded. **There is no database**, so the site cannot tell
      who is subscribed, cannot gate anything behind a subscription, and cannot
      show a customer their own billing. Razorpay's dashboard is the record.

## 10. Final checks

- [ ] Contact form delivers to a real inbox — **submit a test enquiry and
      confirm it arrives**
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain
- [ ] `NEXT_PUBLIC_NOINDEX=true` on preview, absent in production
- [ ] Analytics IDs set, plus a consent banner if you serve EU/UK visitors
- [ ] `grep -rn "Your Company" src/` returns nothing
- [ ] Every phone, email and WhatsApp link opens the right thing on a real phone
- [ ] Lighthouse pass on mobile
- [ ] Submit `sitemap.xml` to Google Search Console

## Adding things back later

Case studies, testimonials and a blog were deliberately left out rather than
filled with invented content. When you have real material, each is a
self-contained addition: a content module plus a route, following the same
pattern as `products.ts` and the product pages.

/**
 * Company identity and contact details.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  The name and domain are set. The contact fields are deliberately empty —
 *  nothing here is invented on your behalf.
 *
 *  Anything left blank is HIDDEN across the site rather than rendered as an
 *  empty link — so a missing phone number never ships as a dead "Call us"
 *  button. Fill in what you have; leave the rest blank until you do.
 *
 *  Contact details can also be supplied as environment variables, so you can
 *  go live from your host's dashboard without touching code. See .env.example.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** Trading name. Appears in the logo, page titles and metadata. */
  name: "BizWise Tech",
  /**
   * The entity a customer actually contracts with, and the one Razorpay
   * verifies. Trading as an individual, that is a person, not the brand:
   * "BizWise Tech" is the name over the shop, "Neelam Srivastava" is who is
   * liable. Both legal pages and the structured data use this.
   *
   * Change it to the company name if you later incorporate.
   */
  legalName: "Neelam Srivastava",

  /**
   * Whether the business is registered for GST.
   *
   * This is not a detail — it decides what the pricing page is allowed to
   * say. Below the registration threshold you cannot collect GST, so
   * advertising a price that "excludes tax" promises a bill you may not
   * lawfully issue. Flip this to true and add the GSTIN on the day you
   * register, and the wording follows.
   */
  gst: {
    registered: false,
    /** Printed on invoices and shown in the footer once you have one. */
    gstin: "",
  },

  tagline: "Restaurant and gym management software",

  description:
    "We build and run two systems: a restaurant management system for ordering, menus, tables and kitchen operations, and a gym management system for memberships, classes and check-in.",

  /** Canonical origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bizwisetech.com",

  contact: {
    /** Override per environment with NEXT_PUBLIC_CONTACT_EMAIL. */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@bizwisetech.com",
    /**
     * E.164 — country code, no spaces or punctuation. This is what `tel:` and
     * the WhatsApp link are built from, so it must stay in this form even
     * though it is not how the number is displayed.
     */
    phoneE164: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+918861390146",
    /** How the number reads on screen. Falls back to the E.164 value. */
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? "+91 88613 90146",
    /**
     * Set to true once the number above can receive WhatsApp messages — or set
     * NEXT_PUBLIC_WHATSAPP_ENABLED=true. Left off deliberately: a WhatsApp
     * button on a number that does not answer there is worse than no button.
     */
    whatsappEnabled: process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true",
    whatsappMessage:
      "Hi! I'd like to talk about your restaurant/gym management system.",
    /**
     * Every field is optional and rendered only if set, so you can publish as
     * much or as little as you want. CITY is the minimum that shows anything:
     *
     *   city + region                 → "Bengaluru, Karnataka"
     *   city + region + country       → adds "India" on the next line
     *   street + city + … + postcode  → the full postal form
     *
     * A city on its own is a deliberate option, not a half-filled mistake.
     * Trading from home under your own name, publishing the street puts your
     * house on the internet; a city still tells a customer where you are.
     *
     * TODO: set at least `city`.
     */
    address: {
      street: "",
      city: "",
      region: "",
      postalCode: "",
      country: "India",
    },
    /** TODO: e.g. "Mon–Fri, 9am–6pm". Blank hides it. */
    hours: "",
    /** Only promise what you will actually hit. */
    responsePromise: "We reply to every enquiry within one business day.",
  },

  /** TODO: add your profiles. Blank entries are not rendered. */
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },

  /**
   * Booking widget. Drop in a Calendly/Cal.com URL (or set
   * NEXT_PUBLIC_BOOKING_URL) and the contact page shows a live scheduler.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
} as const;

/* ------------------------------------------------------------------ *
 * Derived helpers. Components use these to decide what to render, so  *
 * an unset detail disappears instead of rendering as a broken link.   *
 * ------------------------------------------------------------------ */

/**
 * True when the brand and the legal entity differ, which they do whenever
 * someone trades under a name that is not their own. Indian e-commerce rules
 * expect the customer to be able to find out who they are actually dealing
 * with, so where this is true the site says so rather than leaving the brand
 * to imply a company that does not exist.
 */
// Widened deliberately: `site` is `as const`, so comparing the two literal
// types directly is a type error for having "no overlap" — which is exactly
// the case this flag exists to describe.
const legalName: string = site.legalName;
export const tradesUnderAnotherName = legalName !== site.name;

export const hasEmail = site.contact.email.length > 0;
export const hasPhone = site.contact.phoneE164.length > 0;
export const hasWhatsapp = hasPhone && site.contact.whatsappEnabled;
/**
 * Whether there is an address worth showing. Keyed on the city rather than the
 * street: keying it on the street meant filling in a city and nothing else
 * hid the address entirely, with no error and no clue why.
 */
export const hasAddress = site.contact.address.city.length > 0;

/**
 * The address as display lines, with anything unset left out.
 *
 * Shared so the contact page, the footer and the structured data cannot
 * disagree about how a partial address is formatted.
 */
export const addressLines: string[] = (() => {
  const { street, city, region, postalCode, country } = site.contact.address;
  const lines: string[] = [];

  if (street) lines.push(street);

  // "City, Region  Postcode" — the comma only appears when both sides exist,
  // so a city on its own never renders a stray leading or trailing comma.
  const locality = [city, region].filter(Boolean).join(", ");
  const withPostcode = [locality, postalCode].filter(Boolean).join(" ");
  if (withPostcode) lines.push(withPostcode);

  if (country) lines.push(country);

  return lines;
})();
export const hasSocial = Object.values(site.social).some((url) => url.length > 0);

/** What to print for the phone number: the display form, else the raw number. */
export const phoneLabel = site.contact.phoneDisplay || site.contact.phoneE164;

export const telUrl = hasPhone ? `tel:${site.contact.phoneE164}` : "";
export const mailtoUrl = hasEmail ? `mailto:${site.contact.email}` : "";
export const whatsappUrl = hasWhatsapp
  ? `https://wa.me/${site.contact.phoneE164.replace(/\D/g, "")}?text=${encodeURIComponent(
      site.contact.whatsappMessage,
    )}`
  : "";

/**
 * "call us on X or email Y" — adapts to whichever details are configured, and
 * comes back empty when none are. Used wherever the site has to offer a way
 * through after something failed, so it never says "call us on " with nothing
 * after it.
 */
export const contactFallbackPhrase = (() => {
  if (hasPhone && hasEmail) return `call us on ${phoneLabel} or email ${site.contact.email}`;
  if (hasPhone) return `call us on ${phoneLabel}`;
  if (hasEmail) return `email us at ${site.contact.email}`;
  return "";
})();

/** A complete sentence offering the fallback, or a plain retry line. */
export function fallbackSentence(
  lead: string,
  { retryable = true }: { retryable?: boolean } = {},
): string {
  // A configured phone or email is always the best next step.
  if (contactFallbackPhrase) return `${lead} Please ${contactFallbackPhrase}.`;

  // Otherwise only suggest retrying when retrying could actually work. Telling
  // someone to try again in a few minutes when the form has no inbox wired up
  // sends them round a loop that can never succeed.
  return retryable ? `${lead} Please try again in a few minutes.` : lead;
}

/**
 * The date printed on the terms, privacy and cancellation pages.
 *
 * Deliberately a fixed string and NOT derived from `new Date()`. A date that
 * follows the clock would claim the policy changed on every deploy, which
 * makes the line worthless — its only job is to tell a customer whether the
 * terms have moved since they last read them.
 *
 * Bump it by hand when you change the wording of any of those pages, and only
 * then.
 */
export const legalLastUpdated = "4 September 2026";

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Restaurants", href: "/restaurant-management-system" },
  { label: "Gyms", href: "/gym-management-system" },
  // The plans live on the home page; /pricing carries the detail behind them.
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "What we do",
    items: [
      { label: "Restaurant management system", href: "/restaurant-management-system" },
      { label: "Gym management system", href: "/gym-management-system" },
      { label: "How pricing works", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      // Razorpay looks for this during account activation, and a customer
      // looking for how to cancel should not have to ask.
      { label: "Cancellation & refunds", href: "/refunds" },
    ],
  },
];

/**
 * One CTA phrase, used everywhere, so it never drifts.
 *
 * Points at the form itself, not the top of the contact page — someone who
 * clicked "Book a free demo" has already decided, and should not have to
 * scroll past the page heading to find the thing they came for.
 */
export const primaryCta = {
  label: "Book a free demo",
  href: "/contact#message",
} as const;

export const secondaryCta = {
  label: "See how it works",
  href: "/restaurant-management-system",
} as const;

/**
 * Commitments shown beside the calls to action.
 *
 * These are promises made in your name — read them and keep only the ones you
 * will honour.
 */
export const trustPoints: string[] = [
  "A fixed quote before any work starts",
  "Your data stays yours, and exports on request",
  "No lock-in contracts",
  "Straight answers, no jargon",
];

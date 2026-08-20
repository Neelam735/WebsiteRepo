/**
 * Company identity and contact details.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  SET THESE BEFORE LAUNCH. Nothing here is invented on your behalf, which
 *  means the placeholders below are deliberately obvious and the contact
 *  fields are deliberately empty.
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
  /** TODO: your trading name. Appears in the logo, page titles and metadata. */
  name: "Your Company",
  /** TODO: your registered name. Used in the footer and legal pages. */
  legalName: "Your Company Ltd",

  tagline: "Restaurant and gym management software",

  description:
    "We build and run two systems: a restaurant management system for ordering, menus, tables and kitchen operations, and a gym management system for memberships, classes and check-in.",

  /** Canonical origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  contact: {
    /** TODO: or set NEXT_PUBLIC_CONTACT_EMAIL. */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    /** TODO: E.164, e.g. "+14155551234". Or set NEXT_PUBLIC_CONTACT_PHONE. */
    phoneE164: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
    /** How the number reads on screen. Falls back to the E.164 value. */
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? "",
    /** Set to true once the number above can receive WhatsApp messages. */
    whatsappEnabled: process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true",
    whatsappMessage:
      "Hi! I'd like to talk about your restaurant/gym management system.",
    /** TODO: leave blank to hide the address entirely. */
    address: {
      street: "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
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

export const hasEmail = site.contact.email.length > 0;
export const hasPhone = site.contact.phoneE164.length > 0;
export const hasWhatsapp = hasPhone && site.contact.whatsappEnabled;
export const hasAddress = site.contact.address.street.length > 0;
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
export function fallbackSentence(lead: string): string {
  return contactFallbackPhrase
    ? `${lead} Please ${contactFallbackPhrase}.`
    : `${lead} Please try again in a few minutes.`;
}

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Restaurants", href: "/restaurant-management-system" },
  { label: "Gyms", href: "/gym-management-system" },
  { label: "Pricing", href: "/pricing" },
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
    ],
  },
];

/** One CTA phrase, used everywhere, so it never drifts. */
export const primaryCta = {
  label: "Book a free demo",
  href: "/contact",
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

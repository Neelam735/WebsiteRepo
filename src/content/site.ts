/**
 * Global site configuration.
 *
 * Everything here is agency-identity content: name, contact details, nav,
 * social links. Swap these values and the whole site follows — no component
 * hard-codes a phone number or an address.
 *
 * PLACEHOLDER: name, domain, phone, email, WhatsApp and address are stand-ins.
 * Replace them with real details before launch. See CONTENT.md.
 */

export const site = {
  name: "Storefront Studio",
  legalName: "Storefront Studio LLC", // PLACEHOLDER
  tagline: "Software for the businesses on your street",
  description:
    "We build websites, online ordering and booking systems for restaurants, cafes, salons, gyms, bakeries and local shops. Fixed quotes, launched in weeks, supported for as long as you need.",

  /** Canonical origin, no trailing slash. Used for metadata, sitemap and JSON-LD. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://storefrontstudio.com",

  contact: {
    email: "hello@storefrontstudio.com", // PLACEHOLDER
    /** E.164, used for tel: and WhatsApp links. */
    phoneE164: "+15550142280", // PLACEHOLDER
    phoneDisplay: "(555) 014-2280", // PLACEHOLDER
    whatsappMessage:
      "Hi! I run a local business and I'd like to talk about a website or booking system.",
    address: {
      street: "218 Mercer Street, Suite 4", // PLACEHOLDER
      city: "Austin",
      region: "TX",
      postalCode: "78701",
      country: "US",
    },
    hours: "Mon–Fri, 9am–6pm CT",
    responsePromise: "We reply to every enquiry within one business day.",
  },

  social: {
    instagram: "https://instagram.com/storefrontstudio", // PLACEHOLDER
    facebook: "https://facebook.com/storefrontstudio", // PLACEHOLDER
    linkedin: "https://linkedin.com/company/storefrontstudio", // PLACEHOLDER
  },

  /**
   * Booking widget. Drop in a Calendly/Cal.com/SavvyCal URL and the contact
   * page swaps its placeholder card for a real embed automatically.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
} as const;

export const whatsappUrl = `https://wa.me/${site.contact.phoneE164.replace(
  /\D/g,
  "",
)}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

export const telUrl = `tel:${site.contact.phoneE164}`;
export const mailtoUrl = `mailto:${site.contact.email}`;

export type NavItem = {
  label: string;
  href: string;
  /** Rendered in the mobile menu and mega-menu as supporting copy. */
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { label: "Website design", href: "/services#website-design" },
      { label: "Online ordering", href: "/services#online-ordering" },
      { label: "Booking systems", href: "/services#booking-systems" },
      { label: "Custom software", href: "/services#custom-software" },
      { label: "Support & maintenance", href: "/services#support-maintenance" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "Restaurants", href: "/industries/restaurants" },
      { label: "Cafes", href: "/industries/cafes" },
      { label: "Salons & spas", href: "/industries/salons-spas" },
      { label: "Gyms & studios", href: "/industries/gyms-fitness" },
      { label: "Bakeries & food trucks", href: "/industries/bakeries-food-trucks" },
      { label: "Retail & boutiques", href: "/industries/retail-boutiques" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "Our work", href: "/work" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** The one CTA phrase used everywhere, so it stays consistent. */
export const primaryCta = {
  label: "Get a free consultation",
  href: "/contact",
} as const;

export const secondaryCta = {
  label: "See our work",
  href: "/work",
} as const;

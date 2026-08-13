/**
 * Packages and pricing.
 *
 * PLACEHOLDER: the numbers are plausible but invented. Set your real prices
 * here — nothing else in the site hard-codes an amount.
 */

export type Tier = {
  slug: string;
  name: string;
  /** Who it's for, in one line. */
  audience: string;
  price: number | null;
  /** Shown under the price. */
  priceNote: string;
  timeline: string;
  description: string;
  features: string[];
  /** Things this tier deliberately does not include. Honesty converts. */
  notIncluded?: string[];
  cta: { label: string; href: string };
  highlighted: boolean;
};

export const tiers: Tier[] = [
  {
    slug: "starter",
    name: "Starter",
    audience: "One location that needs to look right and be findable.",
    price: 3500,
    priceNote: "one-off, fixed quote",
    timeline: "Live in 3 weeks",
    description:
      "A proper website — fast, mobile-first, easy for you to update — plus the Google setup that makes people nearby actually find you.",
    features: [
      "Up to 6 pages, custom designed",
      "Mobile-first build, tested on real phones",
      "Menu, service list or product highlights",
      "Enquiry form straight to your inbox",
      "Google Business Profile setup",
      "Local SEO and analytics",
      "Self-serve editing for hours and text",
      "3 months of support included",
    ],
    notIncluded: ["Online payments", "Booking or ordering systems"],
    cta: { label: "Get a free consultation", href: "/contact" },
    highlighted: false,
  },
  {
    slug: "growth",
    name: "Growth",
    audience: "Businesses taking orders or bookings every day.",
    price: 6900,
    priceNote: "one-off, fixed quote",
    timeline: "Live in 5 weeks",
    description:
      "Everything in Starter, plus the system that takes the orders or the bookings — the part that pays for itself.",
    features: [
      "Everything in Starter, up to 12 pages",
      "Online ordering *or* appointment booking",
      "Card payments and deposits",
      "SMS and email reminders or order updates",
      "Kitchen printer or staff calendar sync",
      "Customer accounts and reorder/rebooking",
      "POS integration where supported",
      "Staff training and launch-day cover",
      "6 months of support included",
    ],
    cta: { label: "Get a free consultation", href: "/contact" },
    highlighted: true,
  },
  {
    slug: "custom",
    name: "Custom",
    audience: "Multiple locations, or a process no off-the-shelf tool fits.",
    price: null,
    priceNote: "quoted after a free discovery session",
    timeline: "Scoped with you",
    description:
      "When the work is inventory, rotas, loyalty, wholesale or several sites at once, we scope it properly and quote a fixed price.",
    features: [
      "Everything in Growth, no page limit",
      "Multi-location support and per-site menus",
      "Custom software — inventory, rotas, loyalty, CRM",
      "Integrations with your existing tools",
      "Data migration from spreadsheets or old systems",
      "Dedicated project lead",
      "Priority phone and WhatsApp support",
      "12 months of support included",
    ],
    cta: { label: "Book a discovery call", href: "/contact" },
    highlighted: false,
  },
];

/** Monthly care plans, sold after the included support period ends. */
export const carePlans: { name: string; price: number; description: string; features: string[] }[] =
  [
    {
      name: "Essential",
      price: 149,
      description: "Hosting, monitoring and the small changes you need each month.",
      features: [
        "Managed hosting and CDN",
        "Uptime monitoring and daily backups",
        "Security patches and updates",
        "Up to 1 hour of content changes monthly",
        "Email support, next business day",
      ],
    },
    {
      name: "Priority",
      price: 349,
      description: "For businesses where an hour of downtime costs real money.",
      features: [
        "Everything in Essential",
        "Up to 4 hours of changes monthly",
        "Phone and WhatsApp support",
        "Same-day response, 7 days a week",
        "Quarterly speed and SEO review",
        "Seasonal menu or timetable updates",
      ],
    },
  ];

export const pricingFaqs: { question: string; answer: string }[] = [
  {
    question: "Why is the price fixed rather than hourly?",
    answer:
      "Because you need to know what it costs before you commit. We scope the work in the discovery session, quote a fixed price, and that's the price — if we underestimate, that's our problem, not your invoice.",
  },
  {
    question: "What if I need something halfway between two packages?",
    answer:
      "That's most people. The packages are a starting point; we quote what you actually need. Tell us the situation on the call and you'll get a number for your version of it.",
  },
  {
    question: "Are there ongoing costs?",
    answer:
      "Three, and we'll tell you all of them upfront: your domain (about $15 a year), payment processing if you take money online (charged by Stripe or Square, not by us), and a care plan if you want one after the included support runs out. Nothing is hidden.",
  },
  {
    question: "Do I own it?",
    answer:
      "Yes — the domain, the code, the customer data, all of it, in accounts under your name. If you ever want to move to another agency, you leave with everything. We'd rather earn the renewal than trap you.",
  },
  {
    question: "Can I pay in instalments?",
    answer:
      "Yes. The standard split is a third to start, a third at design sign-off, and a third on launch. If you need it spread further, ask — we've done longer terms for seasonal businesses.",
  },
  {
    question: "What if I already have a website I like?",
    answer:
      "Then keep it. We'll build the ordering or booking system into what you've got, or take over support for the existing site if the previous developer has gone quiet. You don't have to start over to work with us.",
  },
];

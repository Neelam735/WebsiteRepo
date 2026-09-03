/**
 * Packages and how pricing works.
 *
 * Only tiers with a price you can stand behind should carry one; set `price`
 * to null and the card shows "Custom" with a quote CTA instead. Amounts are
 * plain numbers rendered by `formatPrice` in src/lib/utils.ts, which sets the
 * currency (INR) in one place.
 */

export const pricingModel = {
  headline: "You'll know the price before we start",
  lede: "Every business we work with has a different number of locations, a different mess to migrate and a different set of modules switched on. Start with a package below, and anything beyond it is scoped and quoted at a fixed price.",
};

export type Tier = {
  slug: string;
  name: string;
  /** Who it's for, in one line. */
  audience: string;
  /** Set to null for quote-only tiers. */
  price: number | null;
  /** Billing period for a recurring price. Omit for a one-off. */
  period?: "month" | "year";
  /** Sits under the price. */
  priceNote: string;
  description: string;
  features: string[];
  /** What this tier deliberately leaves out. Honesty converts. */
  notIncluded?: string[];
  cta: { label: string; href: string };
  highlighted: boolean;
};

export const tiers: Tier[] = [
  {
    slug: "starter",
    name: "Starter",
    audience: "A single site that needs to look right and be findable.",
    price: 999,
    period: "month",
    priceNote: "billed monthly",
    description:
      "A proper, fast, mobile-first presence for one location — designed around the two or three things your customers actually come to do.",
    features: [
      "Up to 6 pages, custom designed",
      "Mobile-first build, tested on real phones",
      "Menu, service list or product highlights",
    ],
    notIncluded: ["Online payments", "Booking or ordering systems"],
    cta: { label: "Get started", href: "/contact#message" },
    highlighted: false,
  },
  {
    slug: "growth",
    name: "Growth",
    audience: "Businesses taking orders or bookings every day.",
    price: 1999,
    period: "month",
    priceNote: "billed monthly",
    description:
      "Everything in Starter, plus the system that takes the orders or the bookings — the part that pays for itself.",
    features: [
      "Everything in Starter, up to 12 pages",
      "Online ordering or class and appointment booking",
      "Payment gateway integration for online payments",
      "Live order tracking for customers",
      "Kitchen printer or staff calendar sync",
    ],
    cta: { label: "Get started", href: "/contact#message" },
    highlighted: true,
  },
  {
    slug: "custom",
    name: "Custom",
    audience: "Multiple locations, or the full management system.",
    price: null,
    priceNote: "quoted after a scoping call",
    description:
      "The complete restaurant or gym management system — every module you need, across as many sites as you run.",
    features: [
      "Everything in Growth, no page limit",
      "The full restaurant or gym management system",
      "Multi-location support with per-site setup",
      "Integrations with your existing tools",
      "Data migration from spreadsheets or an old system",
      "A dedicated project lead",
    ],
    cta: { label: "Book a scoping call", href: "/contact#message" },
    highlighted: false,
  },
];

/** What actually moves a quote up or down. */
export const priceDrivers: { title: string; body: string }[] = [
  {
    title: "Which modules you switch on",
    body: "Ordering only is a different project from ordering, inventory, rotas and reporting. You pay for what you turn on, not for the full catalogue.",
  },
  {
    title: "How many locations",
    body: "A second site with its own menu, timetable and staff adds setup and training; the tenth adds much less than the second.",
  },
  {
    title: "What has to be migrated",
    body: "Moving members, balances and booking history from an existing system is real work. Starting from a spreadsheet is usually quicker than starting from a closed platform.",
  },
  {
    title: "Integrations",
    body: "Payments and printing are routine. A POS or door system with a documented API is straightforward; one without needs a workaround, and we will tell you which yours is at scoping.",
  },
  {
    title: "Training and go-live cover",
    body: "A team of four across one site is a different job from forty across three. We size this with you rather than assuming.",
  },
];

/** True of every project regardless of size. */
export const alwaysIncluded: string[] = [
  "A scoping session and a written summary of what we agreed",
  "Configuration around your real menu, timetable, plans and staff",
  "Data migration from your current system or spreadsheets",
  "Training for the people who will use it daily",
  "Someone present for go-live",
  "A fixed price agreed before any work starts",
];

/** Costs that are not ours, itemised so nothing arrives as a surprise. */
export const runningCosts: { title: string; body: string }[] = [
  {
    title: "Payment processing",
    body: "Charged by your payment provider, as a percentage of each transaction, and paid directly to them. It never passes through us.",
  },
  {
    title: "Hosting and support",
    body: "An ongoing plan covers hosting, updates, backups and support. Terms are agreed in writing before launch and are month-to-month.",
  },
  {
    title: "Messaging",
    body: "SMS reminders and notifications are billed at cost by the messaging provider. Email is usually included.",
  },
  {
    title: "Hardware",
    body: "Printers, tablets, scanners or kiosks, if you need them. We will tell you what works and let you buy it yourself rather than marking it up.",
  },
];

export const pricingFaqs: { question: string; answer: string }[] = [
  {
    question: "Why isn't the Custom price published?",
    answer:
      "Starter and Growth are known quantities, so we can put a number on them honestly. Custom is not: the same system can be a single site with a few modules or a migration across four locations with a POS integration in the middle. A published price there would be either meaningless or wrong, so we scope it and give you a real number instead.",
  },
  {
    question: "What does the quote actually cover?",
    answer:
      "Everything agreed in the scoping summary — configuration, migration, training and go-live — at a fixed price. If we underestimated the work, that is our problem to absorb, not a change request aimed at you.",
  },
  {
    question: "Is there an ongoing cost?",
    answer:
      "Yes, and we itemise all of it upfront: the monthly package price, payment processing charged directly by your payment provider, and messaging at cost. Nothing is hidden and nothing is bundled to obscure it.",
  },
  {
    question: "Can we pay in instalments?",
    answer:
      "Usually, yes — typically split across the start of the project, sign-off and go-live. If a seasonal business needs it spread differently, ask us.",
  },
  {
    question: "What if we only want one module?",
    answer:
      "That is fine and it is a smaller quote. Both systems are modular, and adding a module later is a normal, priced piece of work rather than a new project.",
  },
  {
    question: "What happens if we want to leave?",
    answer:
      "You take your data with you — customers, members, orders, bookings and history, exported in a usable format. The notice period and handover are written into the agreement so it is never a negotiation later.",
  },
];

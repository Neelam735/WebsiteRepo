/**
 * Service lines.
 *
 * Each service is written problem-first: the sentence a business owner would
 * use to describe what is going wrong, then what we build, then what they get.
 * Pricing is indicative — see src/content/pricing.ts for the packages.
 */

export type Service = {
  slug: string;
  name: string;
  /** One line for cards and nav. */
  summary: string;
  /** The owner's problem, in their words. Used as the section lede. */
  problem: string;
  /** How we solve it. Two or three sentences, no jargon. */
  solution: string;
  includes: string[];
  outcomes: string[];
  /** Indicative price, or null for quote-only. */
  priceFrom: number | null;
  priceNote: string;
  timeline: string;
  /** Industry slugs this service is most relevant to. */
  industries: string[];
  /** Which product mockup to show alongside it. */
  mockup: "ordering" | "booking" | "website" | "dashboard" | "support";
};

export const services: Service[] = [
  {
    slug: "website-design",
    name: "Website design & development",
    summary:
      "A fast, mobile-first site that makes people confident enough to walk in, call or order.",
    problem:
      "Your website was built years ago, looks wrong on a phone, and half your customers find you through a Google listing that points at a page you can't edit.",
    solution:
      "We design and build a site around the two or three things customers actually come to do — see the menu, check hours, book a table, find you. It loads in under two seconds on a phone on patchy signal, you can edit the text yourself, and it's wired into Google so you show up when someone nearby searches.",
    includes: [
      "Custom design — no recycled template",
      "Up to 8 pages, written and laid out with you",
      "Mobile-first build, tested on real phones",
      "Photo direction and image optimisation",
      "Google Business Profile setup and local SEO",
      "Analytics, call tracking and enquiry forms",
      "Self-serve editing for hours, menus and text",
      "30 days of post-launch tweaks included",
    ],
    outcomes: [
      "Loads in under 2 seconds on 4G",
      "Ranks for “near me” searches in your area",
      "Every page has one obvious next step",
    ],
    priceFrom: 3500,
    priceNote: "Fixed quote before we start. No hourly billing.",
    timeline: "3–5 weeks",
    industries: [
      "restaurants",
      "cafes",
      "salons-spas",
      "gyms-fitness",
      "bakeries-food-trucks",
      "retail-boutiques",
    ],
    mockup: "website",
  },
  {
    slug: "online-ordering",
    name: "Online ordering & menu systems",
    summary:
      "Take orders on your own site and keep the 30% the delivery apps charge you.",
    problem:
      "The phone rings during the dinner rush, someone writes the order on a pad, and it's wrong. Meanwhile the delivery apps take a third of every ticket and won't tell you who your customers are.",
    solution:
      "We build ordering directly into your site — pickup, delivery or table ordering — that prints straight to your kitchen or lands on a tablet. Menus update in seconds when you're out of something. You keep the customer list, the margin and the relationship.",
    includes: [
      "Menu builder with modifiers, combos and 86-ing",
      "Pickup, delivery and dine-in QR ordering",
      "Card payments (Stripe, Square or your processor)",
      "Kitchen printer or tablet display",
      "Scheduled orders and busy-time throttling",
      "Customer accounts, reorder and receipts",
      "POS integration where your POS allows it",
      "Staff training and a launch-day run-through",
    ],
    outcomes: [
      "No commission on your own orders",
      "Fewer mistakes than phone orders",
      "You own the customer list, not an app",
    ],
    priceFrom: 4500,
    priceNote: "Plus payment processing fees, paid direct to your processor.",
    timeline: "4–6 weeks",
    industries: ["restaurants", "cafes", "bakeries-food-trucks"],
    mockup: "ordering",
  },
  {
    slug: "booking-systems",
    name: "Appointment & booking systems",
    summary:
      "Let people book at 11pm without texting you, and cut no-shows with automatic reminders.",
    problem:
      "Bookings arrive by DM, text and phone call. Someone has to type them into a paper diary, two people get double-booked, and a quarter of Saturday just doesn't turn up.",
    solution:
      "One calendar that knows each staff member's hours, how long each service takes, and how much buffer you need between clients. Customers book themselves, get a reminder the day before, and can reschedule without calling. Deposits are optional but they work.",
    includes: [
      "Per-staff calendars, services and durations",
      "Online booking on your site and Instagram",
      "SMS and email reminders, timed by you",
      "Deposits and cancellation windows",
      "Class and group scheduling with waitlists",
      "Memberships, packs and recurring bookings",
      "Google/Apple Calendar sync for staff",
      "Client history, notes and rebooking prompts",
    ],
    outcomes: [
      "No-shows typically drop by half",
      "Bookings taken while you're closed",
      "One calendar instead of four inboxes",
    ],
    priceFrom: 4000,
    priceNote: "SMS reminders billed at cost, usually under $30/month.",
    timeline: "3–5 weeks",
    industries: ["salons-spas", "gyms-fitness", "retail-boutiques"],
    mockup: "booking",
  },
  {
    slug: "custom-software",
    name: "Custom business software",
    summary:
      "The spreadsheet that runs your business, rebuilt as something that won't break.",
    problem:
      "There's a spreadsheet only one person understands, a WhatsApp group for the rota, and a shoebox of supplier invoices. It works until the person who understands it is on holiday.",
    solution:
      "We map how you actually work, then build the smallest system that removes the manual parts — stock counts, staff rotas, loyalty, supplier orders, whatever is costing you evenings. It runs on the phones your team already has.",
    includes: [
      "Discovery session and written process map",
      "Inventory and stock-count tooling",
      "Staff rotas, shift swaps and hours",
      "Loyalty and repeat-customer programmes",
      "Supplier ordering and cost tracking",
      "Simple dashboards for the numbers you check daily",
      "Data import from your existing spreadsheets",
      "Role-based access so staff see only their part",
    ],
    outcomes: [
      "Hours a week back, every week",
      "The business keeps running when someone's away",
      "Numbers you can trust at a glance",
    ],
    priceFrom: null,
    priceNote:
      "Scoped and quoted after a free discovery session. Most projects land between $8k and $25k.",
    timeline: "6–12 weeks",
    industries: [
      "restaurants",
      "cafes",
      "salons-spas",
      "gyms-fitness",
      "bakeries-food-trucks",
      "retail-boutiques",
    ],
    mockup: "dashboard",
  },
  {
    slug: "support-maintenance",
    name: "Ongoing support & maintenance",
    summary:
      "Someone who answers when the site goes down at 7pm on a Friday.",
    problem:
      "The last developer disappeared. Nobody has the passwords, the plugin updates stopped a year ago, and you found out the site was down because a customer told you.",
    solution:
      "We host, monitor, patch and back up your site, and we're on the other end of a phone when something breaks. Small changes — a new menu item, a price change, holiday hours — are included, not billed by the hour.",
    includes: [
      "Managed hosting with a global CDN",
      "Uptime monitoring, we find out before you do",
      "Security patching and dependency updates",
      "Daily backups with one-click restore",
      "Small content changes included each month",
      "Quarterly speed and SEO health check",
      "Priority phone and WhatsApp support",
      "Full access to your own accounts, always",
    ],
    outcomes: [
      "99.9% uptime, monitored around the clock",
      "Changes done same-day, not next month",
      "You own every account and password",
    ],
    priceFrom: 149,
    priceNote: "Per month, cancel any time. Included free for the first 3 months.",
    timeline: "Ongoing",
    industries: [
      "restaurants",
      "cafes",
      "salons-spas",
      "gyms-fitness",
      "bakeries-food-trucks",
      "retail-boutiques",
    ],
    mockup: "support",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** The four-step engagement process, shown on Home and About. */
export const process = [
  {
    step: "01",
    name: "Discover",
    duration: "Week 1",
    description:
      "A free 30-minute call, then a proper sit-down. We learn how your business actually runs — the rush, the bottleneck, the thing that keeps going wrong — and write down what success looks like in numbers.",
  },
  {
    step: "02",
    name: "Design",
    duration: "Weeks 1–2",
    description:
      "You see real screens, not a wireframe you have to imagine. We iterate on the design with you until it looks like your business, then agree a fixed price and a launch date.",
  },
  {
    step: "03",
    name: "Build",
    duration: "Weeks 2–4",
    description:
      "We build it, and you watch it come together on a preview link you can share with your team. We test on real phones, real menus and real bookings — not lorem ipsum.",
  },
  {
    step: "04",
    name: "Launch & support",
    duration: "Week 5 onward",
    description:
      "We train your staff, stand by on launch day, and stay on for the first month of tweaks. After that, support is optional and month-to-month — never a lock-in contract.",
  },
];

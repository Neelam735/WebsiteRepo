/**
 * The two systems we build. This file is the spine of the site: the home page,
 * both product pages, the navigation, the sitemap and the contact form's
 * dropdowns all read from it.
 *
 * Everything here describes capability — what each system does — rather than
 * results we have not measured. If you add a claim with a number in it, make
 * sure you can evidence it.
 */

export type Module = {
  name: string;
  description: string;
  /** Lightweight glyph; keeps the cards illustrated without an image request. */
  glyph: string;
};

export type Product = {
  slug: string;
  /** Full name, used in headings and metadata. */
  name: string;
  /** Short label for nav, chips and cards. */
  shortName: string;
  glyph: string;
  /** One line, used on the home page cards. */
  tagline: string;
  /** Product page <h1> — speaks to the operator's problem. */
  headline: string;
  subheadline: string;
  /** Two or three sentences introducing the system. */
  intro: string;
  /** What is going wrong today, in the operator's own words. */
  problems: { title: string; body: string }[];
  /** The parts of the system. */
  modules: Module[];
  /** What changes once it is running. Capability, not measured results. */
  outcomes: string[];
  /** Integration categories. Confirm which you actually support before launch. */
  integrations: string[];
  /** Which mockup illustrates this product. */
  mockup: "ordering" | "classes" | "membership" | "dashboard";
  faqs: { question: string; answer: string }[];
  seo: { title: string; description: string };
};

export const products: Product[] = [
  {
    slug: "restaurant-management-system",
    name: "Restaurant management system",
    shortName: "Restaurants",
    glyph: "🍽️",
    tagline: "Orders, menus, tables and the kitchen — in one system you control.",
    headline: "Run the whole restaurant from one system",
    subheadline:
      "Online ordering on your own site, menus you can change in seconds, tables and reservations, and tickets that reach the kitchen the same way every time.",
    intro:
      "Most restaurants end up running on four or five disconnected tools: a delivery app, a reservation widget, a spreadsheet for stock and a phone that rings during service. Our restaurant management system replaces that with one system, so the menu you edit is the menu customers see, and the order they place is the ticket your kitchen prints.",
    problems: [
      {
        title: "Commission takes a bite out of every order",
        body: "Third-party delivery platforms charge a share of each ticket and keep the customer relationship. You pay to reach people who were already yours.",
      },
      {
        title: "The phone is a second job during service",
        body: "Someone leaves the floor to take an order, reads the menu out loud, and writes it on a pad the kitchen then has to decipher.",
      },
      {
        title: "The menu is out of date the moment it is published",
        body: "Prices change, dishes sell out, and a PDF menu cannot say so. Guests order what you cannot make.",
      },
      {
        title: "Nothing talks to anything else",
        body: "Orders live in one place, bookings in another, stock in a spreadsheet. Nobody can answer a simple question about last week without three exports.",
      },
    ],
    modules: [
      {
        name: "Online ordering",
        description:
          "Pickup and delivery ordering on your own domain, with card payments and scheduled orders. No per-order commission to a third party.",
        glyph: "🛒",
      },
      {
        name: "Menu management",
        description:
          "Modifiers, combos, allergens and day-parts. Mark an item unavailable and it disappears everywhere in seconds.",
        glyph: "📋",
      },
      {
        name: "Table ordering & QR",
        description:
          "Guests scan at the table, order and pay from their phone. Fewer trips to the till, faster turnaround.",
        glyph: "📱",
      },
      {
        name: "Reservations & waitlist",
        description:
          "Table plans, covers, deposits for large parties, and a waitlist that texts the next guest when a table frees up.",
        glyph: "🗓️",
      },
      {
        name: "Kitchen display & printing",
        description:
          "Every order reaches the kitchen the same way — a printed ticket or a screen — with prep timings and course grouping.",
        glyph: "🔔",
      },
      {
        name: "Inventory & recipe costing",
        description:
          "Track stock against what you actually sell, cost your recipes, and see margin per dish rather than per invoice.",
        glyph: "📦",
      },
      {
        name: "Staff rotas & hours",
        description:
          "Build the rota, publish it to phones, handle swaps, and export hours for payroll without retyping anything.",
        glyph: "👥",
      },
      {
        name: "Customers & loyalty",
        description:
          "Order history, repeat-order in two taps, and a loyalty scheme that lives on the customer's phone rather than in their wallet.",
        glyph: "⭐",
      },
      {
        name: "Reporting",
        description:
          "Sales by daypart, dish and channel, in a dashboard an owner can read in a minute — not a spreadsheet export.",
        glyph: "📈",
      },
    ],
    outcomes: [
      "Orders you own, on a channel that charges you no commission",
      "One menu, correct everywhere, changed in seconds",
      "Tickets the kitchen can read, every time",
      "The numbers for last week without three exports",
    ],
    integrations: [
      "Card payments and payouts",
      "POS systems that expose an API",
      "Receipt and kitchen printers",
      "Accounting exports",
      "SMS and email notifications",
    ],
    mockup: "ordering",
    faqs: [
      {
        question: "Do we have to stop using the delivery apps?",
        answer:
          "No, and most restaurants shouldn't. The apps are good at reaching people who have never heard of you. The system gives your regulars a cheaper, faster way to order direct, so you keep the margin on the orders you had already earned.",
      },
      {
        question: "Will it work with our POS?",
        answer:
          "It depends on the POS. Systems with a documented API can usually be integrated; some older or closed systems have no way in at all. We check yours during the scoping call and tell you honestly, rather than finding out halfway through.",
      },
      {
        question: "Can staff edit the menu themselves?",
        answer:
          "Yes. Prices, descriptions, photos and availability are all editable by your team, with permissions so a server can mark an item as sold out without being able to change prices.",
      },
      {
        question: "What happens if the internet drops during service?",
        answer:
          "This is the question worth asking of any system. We discuss your specific setup during scoping — including offline behaviour for ordering and printing, and what the fallback is — so there are no surprises on a Friday night.",
      },
    ],
    seo: {
      title: "Restaurant Management System — Ordering, Menus, Tables & Kitchen",
      description:
        "A restaurant management system covering online ordering, menu management, QR table ordering, reservations, kitchen display, inventory, rotas and reporting.",
    },
  },
  {
    slug: "gym-management-system",
    name: "Gym management system",
    shortName: "Gyms",
    glyph: "🏋️",
    tagline: "Memberships, classes and check-in, without the spreadsheet.",
    headline: "Stop running your gym from a spreadsheet",
    subheadline:
      "Memberships that bill themselves, a class timetable with real waitlists, and check-in that takes a second — so you coach instead of chasing payments.",
    intro:
      "Gyms and studios lose money in quiet ways: a card expires and nobody notices for two months, a class shows as full while three people who cancelled were never replaced, a new member's waiver is a photo on someone's phone. Our gym management system handles memberships, bookings, check-in and the paperwork around them, in one place.",
    problems: [
      {
        title: "Failed payments go unnoticed",
        body: "A card expires, the charge bounces, and the member keeps training. By the time anyone spots it, months of revenue have gone uninvoiced.",
      },
      {
        title: "Classes look full but aren't",
        body: "People book and don't show. The waitlist never gets called because nobody is free to call it, so you teach a half-empty room you priced for a full one.",
      },
      {
        title: "Sign-up still involves a clipboard",
        body: "Paper waivers, details typed into a spreadsheet later, and emergency contacts that are out of date by the time you need them.",
      },
      {
        title: "Nobody knows who is drifting away",
        body: "Members don't quit — they just stop coming. Without attendance trends you find out when the payment is cancelled, which is far too late.",
      },
    ],
    modules: [
      {
        name: "Memberships & billing",
        description:
          "Recurring plans, class packs and drop-ins, with automatic retries and a nudge to the member when a payment fails.",
        glyph: "💳",
      },
      {
        name: "Class timetable & booking",
        description:
          "Capacity per class, booking windows, cancellation policies, and a waitlist that promotes the next member automatically when a place opens.",
        glyph: "🗓️",
      },
      {
        name: "Personal training & 1:1s",
        description:
          "Trainer availability, session packs and bookings that respect each coach's own calendar and working hours.",
        glyph: "🏃",
      },
      {
        name: "Check-in",
        description:
          "QR or kiosk check-in at the door, with membership status verified on the spot and attendance recorded without anyone writing it down.",
        glyph: "✅",
      },
      {
        name: "Digital waivers & documents",
        description:
          "Waivers, health questionnaires and policies signed at sign-up, stored against the member record and easy to produce when you need them.",
        glyph: "📝",
      },
      {
        name: "Member portal & app",
        description:
          "Members book, cancel, update their card and see their history from their phone, instead of messaging you at 10pm.",
        glyph: "📱",
      },
      {
        name: "Staff & trainer scheduling",
        description:
          "Who is coaching what, cover when someone is off, and hours exported for payroll.",
        glyph: "👥",
      },
      {
        name: "Leads & trials",
        description:
          "Track enquiries, trial passes and the follow-up, so a walk-in on Tuesday doesn't get forgotten by Thursday.",
        glyph: "🎯",
      },
      {
        name: "Attendance & retention reporting",
        description:
          "See which classes fill, which are quietly dying, and which members have stopped turning up — while there is still time to call them.",
        glyph: "📈",
      },
    ],
    outcomes: [
      "Failed payments surfaced in days, not months",
      "Waitlists that refill cancellations without you lifting a finger",
      "Sign-up, waiver and first booking done on a phone",
      "An early warning when a regular stops showing up",
    ],
    integrations: [
      "Card payments, direct debit and recurring billing",
      "Access control and door systems that expose an API",
      "Calendar sync for trainers",
      "Accounting exports",
      "SMS and email notifications",
    ],
    mockup: "classes",
    faqs: [
      {
        question: "Can you move our existing members across?",
        answer:
          "Yes — members, plans, remaining class packs and billing dates. Migration is part of the project, and we run it in parallel first so you can check the numbers before anything goes live.",
      },
      {
        question: "Do you handle the payments yourself?",
        answer:
          "No. Money moves through a regulated payment provider and lands in your account. We integrate with it; we never sit between you and your revenue.",
      },
      {
        question: "What about members who aren't comfortable with an app?",
        answer:
          "Everything a member can do in the app, your staff can do for them at the desk. Nobody is locked out because they'd rather speak to a person.",
      },
      {
        question: "Can we run more than one site?",
        answer:
          "Yes. Multiple locations with their own timetables, staff and capacity, and reporting that rolls up across all of them.",
      },
    ],
    seo: {
      title: "Gym Management System — Memberships, Classes & Check-In",
      description:
        "A gym management system covering recurring membership billing, class booking with waitlists, check-in, digital waivers, trainer scheduling and retention reporting.",
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/**
 * How a project runs. This describes our process, not a result — keep it
 * accurate to how you actually work.
 */
export const process = [
  {
    step: "01",
    name: "Scope",
    description:
      "A call, then time in your business during a busy period. We map how you actually run today, agree what the system has to do, and put a fixed price and a date against it.",
  },
  {
    step: "02",
    name: "Configure",
    description:
      "We set the system up around your menu, timetable, plans and staff — with your real data, not a demo dataset — and you review it before anyone builds anything bespoke.",
  },
  {
    step: "03",
    name: "Migrate",
    description:
      "Existing customers, members, bookings and balances come across, and we run the old and new side by side until the numbers agree.",
  },
  {
    step: "04",
    name: "Launch & support",
    description:
      "We train your team, stand by through the first service or the first week of classes, and stay reachable afterwards. Support is month-to-month, never a lock-in.",
  },
];

/**
 * Portfolio / case studies.
 *
 * PLACEHOLDER: every entry below is illustrative. The structure is real —
 * problem → solution → result, with numbers — but the businesses, quotes and
 * metrics are invented. Replace them with real projects before launch and set
 * `placeholder: false`; the UI drops the "Sample project" badge automatically.
 * See CONTENT.md for the swap-in checklist.
 */

export type CaseStudy = {
  slug: string;
  /** Client business name. */
  client: string;
  /** Industry slug, links the study back to its vertical. */
  industry: string;
  location: string;
  /** Card headline — the outcome, not the deliverable. */
  headline: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  /** Two or three headline numbers. */
  metrics: { value: string; label: string }[];
  services: string[];
  /** Which mockup illustrates the project. */
  mockup: "ordering" | "booking" | "website" | "dashboard";
  /** Accent pairing for the card artwork. */
  tone: "clay" | "honey" | "sage" | "ink";
  featured: boolean;
  placeholder: boolean;
  quote?: { text: string; author: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "casa-lucia",
    client: "Casa Lucía",
    industry: "restaurants",
    location: "Austin, TX",
    headline: "Cut delivery commission to zero on a third of all orders",
    summary:
      "A family trattoria moved its regulars off the delivery apps and onto its own ordering system in six weeks.",
    problem:
      "Casa Lucía was doing good volume through two delivery apps and keeping very little of it — roughly 28% went out in commission, and the family had no way to contact the customers ordering from them twice a week. Phone orders were worse: one person took them on a pad during service, and the kitchen misread about one ticket in twenty.",
    solution:
      "We built ordering into their own site, with the full menu, modifiers and a pickup-time picker, printing straight to the kitchen. Regulars got accounts with one-tap reorder. We put a card on every table with a QR code and a line about ordering direct, and set up an email that goes out when someone hasn't ordered in six weeks.",
    result:
      "Within four months a third of orders came through their own site at zero commission. Order errors dropped because the kitchen reads a printed ticket instead of handwriting, and the family finally has a customer list of their own — about 1,900 people at last count.",
    metrics: [
      { value: "34%", label: "of orders now commission-free" },
      { value: "$4.1k", label: "monthly commission saved" },
      { value: "1,900", label: "customers on their own list" },
    ],
    services: ["online-ordering", "website-design", "support-maintenance"],
    mockup: "ordering",
    tone: "clay",
    featured: true,
    placeholder: true,
    quote: {
      text: "We were paying the apps more than we paid our head chef. Now people order from us directly and we know their names again.",
      author: "Marco Ferrante",
      role: "Owner, Casa Lucía",
    },
  },
  {
    slug: "june-and-co",
    client: "June & Co.",
    industry: "salons-spas",
    location: "Portland, OR",
    headline: "Halved no-shows with deposits and better reminders",
    summary:
      "A six-chair salon replaced its paper diary with per-stylist booking, deposits and timed SMS reminders.",
    problem:
      "June & Co. lost around 12 appointments a week to no-shows — worst on Saturdays, and worst on the long colour services that are hardest to refill at short notice. Bookings came in by phone, Instagram DM and walk-in, and the front desk was retyping all of it into a paper book.",
    solution:
      "One calendar per stylist, with real durations and buffers, and services only bookable with the stylists qualified to do them. A 20% deposit on anything over an hour, refundable up to 24 hours out. SMS reminders at 48 and 24 hours, and a rebooking nudge timed to each client's usual interval.",
    result:
      "No-shows fell from about 12 a week to 5, and the Saturday colour slots — the expensive ones — are now the most reliable in the book. The front desk stopped retyping bookings entirely.",
    metrics: [
      { value: "52%", label: "fewer no-shows" },
      { value: "9 hrs", label: "of front-desk time back per week" },
      { value: "41%", label: "of bookings made after hours" },
    ],
    services: ["booking-systems", "website-design", "support-maintenance"],
    mockup: "booking",
    tone: "honey",
    featured: true,
    placeholder: true,
    quote: {
      text: "The deposit was the part I was nervous about. Not one client complained, and my Saturdays actually hold now.",
      author: "June Alvarez",
      role: "Owner, June & Co.",
    },
  },
  {
    slug: "north-lane-coffee",
    client: "North Lane Coffee",
    industry: "cafes",
    location: "Denver, CO",
    headline: "Turned the 8am queue into pre-paid pickup orders",
    summary:
      "Two-site coffee shop added order-ahead and digital loyalty, and stopped losing commuters to the queue.",
    problem:
      "The morning rush peaked at eight or nine people deep, and the owners could watch commuters glance at the line and walk on. Their paper loyalty cards were popular but untrackable — no way to tell who had stopped coming.",
    solution:
      "Order-ahead with a customer-chosen pickup window, throttled so the bar never gets more than six drinks per five minutes. Saved favourites for regulars, so the daily flat white is two taps. Digital loyalty tied to the phone number they already give at the till.",
    result:
      "About one in five weekday morning orders is now placed before the customer arrives, and the queue moves faster for everyone else. Lapsed-regular emails bring back a steady trickle each month.",
    metrics: [
      { value: "21%", label: "of morning orders placed ahead" },
      { value: "4 min", label: "saved per order at peak" },
      { value: "3,400", label: "loyalty members enrolled" },
    ],
    services: ["online-ordering", "website-design", "custom-software"],
    mockup: "ordering",
    tone: "sage",
    featured: true,
    placeholder: true,
    quote: {
      text: "We used to watch people give up on the queue. Now they walk in, grab it off the shelf and go.",
      author: "Priya Raman",
      role: "Co-founder, North Lane Coffee",
    },
  },
  {
    slug: "ironwood-strength",
    client: "Ironwood Strength",
    industry: "gyms-fitness",
    location: "Nashville, TN",
    headline: "Recovered $2,300 a month in failed membership payments",
    summary:
      "A strength gym moved off spreadsheets to class booking, waitlists and billing that retries itself.",
    problem:
      "Memberships were charged manually each month from a spreadsheet. Expired cards silently stopped paying and often went unnoticed for weeks. Classes were booked in a group chat, so full classes had no waitlist and half-empty ones had no way to fill.",
    solution:
      "Timetable with per-class caps and an automatic waitlist that promotes the next person the moment someone cancels. Memberships and class packs on recurring billing, with retries and a nudge to the member when a card fails. Digital waivers at sign-up.",
    result:
      "Failed payments now get caught in days instead of months, worth about $2,300 a month. Waitlists fill roughly two-thirds of late cancellations, and the owner got his Sunday evenings back.",
    metrics: [
      { value: "$2.3k", label: "monthly revenue recovered" },
      { value: "68%", label: "of cancellations refilled" },
      { value: "3 hrs", label: "less admin per week" },
    ],
    services: ["booking-systems", "custom-software"],
    mockup: "dashboard",
    tone: "ink",
    featured: false,
    placeholder: true,
    quote: {
      text: "I found out we'd been missing payments for two months. That doesn't happen now — the system tells me the same day.",
      author: "Dre Whitfield",
      role: "Owner, Ironwood Strength",
    },
  },
  {
    slug: "flour-and-ash",
    client: "Flour & Ash",
    industry: "bakeries-food-trucks",
    location: "Asheville, NC",
    headline: "Cut end-of-day waste by nearly a third with pre-orders",
    summary:
      "A sourdough bakery and weekend market stall started baking to confirmed demand instead of guessing.",
    problem:
      "Every day ended with unsold loaves, and some mornings sold out by ten with a queue still going. Custom cake orders arrived as long DM threads where details went missing between the enquiry and the order sheet.",
    solution:
      "Pre-orders with daily caps per product and a collection window, so the bake list is set the night before. A custom cake form that asks for flavour, size, date, allergies and inscription upfront, takes a deposit, and lands as one tidy record.",
    result:
      "Waste is down about a third, and the bake list is now a printout instead of a guess. Cake enquiries convert better because nothing gets lost in the back-and-forth.",
    metrics: [
      { value: "31%", label: "less end-of-day waste" },
      { value: "62%", label: "of loaves pre-sold" },
      { value: "2 days", label: "faster cake quotes" },
    ],
    services: ["online-ordering", "website-design"],
    mockup: "ordering",
    tone: "honey",
    featured: false,
    placeholder: true,
    quote: {
      text: "I bake what's already sold. That one change took the anxiety out of the whole week.",
      author: "Sam Okafor",
      role: "Owner, Flour & Ash",
    },
  },
  {
    slug: "willow-mercantile",
    client: "Willow Mercantile",
    industry: "retail-boutiques",
    location: "Savannah, GA",
    headline: "More than doubled in-store collections with reserve-and-collect",
    summary:
      "A homewares boutique put live POS stock online and let customers hold items instead of shipping them.",
    problem:
      "The shop's stock wasn't visible online, so anything not posted to Instagram effectively didn't exist after closing. The owner didn't want to run a shipping operation, but had no alternative to offer someone browsing at 9pm.",
    solution:
      "Live stock synced from the POS, so the site shows what's genuinely on the shelf. Reserve-and-collect holds an item for 48 hours with no payment taken. Local delivery inside three ZIP codes, and personal-shopping appointments for bigger purchases.",
    result:
      "Collections more than doubled, and they bring people into the shop, where the average basket is larger than online. Almost no refunds now for items that sold in-store first.",
    metrics: [
      { value: "2.4×", label: "more in-store collections" },
      { value: "38%", label: "larger basket on collection" },
      { value: "~0", label: "oversold-item refunds" },
    ],
    services: ["website-design", "custom-software"],
    mockup: "website",
    tone: "sage",
    featured: false,
    placeholder: true,
    quote: {
      text: "I didn't want to become a warehouse. Now people reserve online and come in — which is what I wanted all along.",
      author: "Tessa Boone",
      role: "Owner, Willow Mercantile",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function caseStudiesByIndustry(industrySlug: string): CaseStudy[] {
  return caseStudies.filter((study) => study.industry === industrySlug);
}

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);

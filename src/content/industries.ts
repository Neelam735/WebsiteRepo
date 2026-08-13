/**
 * Verticals we sell into.
 *
 * Each one gets its own page at /industries/[slug]. The pain points are the
 * important part: they should sound like something the owner has said out
 * loud, not like a feature list.
 */

export type Industry = {
  slug: string;
  /** Full name, used in headings. */
  name: string;
  /** Short name for chips, tags and nav. */
  shortName: string;
  /** Emoji used as a lightweight, always-loads card glyph. */
  glyph: string;
  /** One line for the "Who we help" cards on the home page. */
  cardLine: string;
  /** Page hero headline — speaks to the owner's problem. */
  headline: string;
  subheadline: string;
  /** Three or four things going wrong today. */
  painPoints: { title: string; body: string }[];
  /** What we build for this vertical. */
  features: string[];
  /** Slugs from services.ts, in priority order for this vertical. */
  services: string[];
  /** Case study slug to feature on this page. */
  caseStudy: string;
  /** Testimonial id to feature on this page. */
  testimonial: string;
  /** Headline metric shown in the hero. PLACEHOLDER until real data. */
  stat: { value: string; label: string };
  seo: { title: string; description: string };
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    shortName: "Restaurants",
    glyph: "🍽️",
    cardLine: "Stop paying 30% commission on your own regulars.",
    headline: "Tired of losing orders to phone-line chaos?",
    subheadline:
      "Online ordering that runs on your site, prints to your kitchen, and doesn't take a cut of every ticket.",
    painPoints: [
      {
        title: "The delivery apps own your customers",
        body: "You pay 25–30% per order and you still don't know who ordered, what they liked, or how to get them back without paying again.",
      },
      {
        title: "The phone is a second job during service",
        body: "Someone has to leave the floor to take an order, read the menu out loud, and write it on a pad that the kitchen has to decipher.",
      },
      {
        title: "Your menu is a PDF from 2021",
        body: "Prices have changed twice since. Guests pinch-zoom on their phone, give up, and pick the place with a menu they can read.",
      },
      {
        title: "Bookings live in three places",
        body: "A paper book, an inbox and Instagram DMs. Tables get double-booked and nobody knows how many covers are walking in tonight.",
      },
    ],
    features: [
      "Commission-free pickup and delivery ordering",
      "QR table ordering that skips the queue at the till",
      "Menus you can edit — and 86 an item in one tap",
      "Kitchen printer or tablet display, no extra hardware",
      "Table reservations with deposits for large parties",
      "Google listing that shows your real hours and menu",
    ],
    services: ["online-ordering", "website-design", "booking-systems", "support-maintenance"],
    caseStudy: "casa-lucia",
    testimonial: "casa-lucia-owner",
    stat: { value: "$0", label: "commission on your own orders" },
    seo: {
      title: "Restaurant Websites & Online Ordering Systems",
      description:
        "Commission-free online ordering, QR table ordering and reservations built into your own restaurant website. Fixed quotes, launched in weeks.",
    },
  },
  {
    slug: "cafes",
    name: "Cafes & coffee shops",
    shortName: "Cafes",
    glyph: "☕",
    cardLine: "Beat the morning queue with ahead-of-time ordering.",
    headline: "The morning rush shouldn't cost you customers",
    subheadline:
      "Let regulars order ahead, pay on their phone, and walk straight past the queue to the pickup shelf.",
    painPoints: [
      {
        title: "The 8am queue turns people away",
        body: "Commuters look at eight people waiting, do the maths on their train, and keep walking. You never see the sale.",
      },
      {
        title: "Loyalty cards get lost in wallets",
        body: "The paper stamp card works right up until it goes through the wash. There's no way to reach the person who came in daily and then stopped.",
      },
      {
        title: "Nobody knows about the food",
        body: "You do proper lunch now, but everyone still thinks you're the place that only does flat whites, because the website hasn't changed since you opened.",
      },
    ],
    features: [
      "Order-ahead with a pickup time the customer chooses",
      "Saved favourites and one-tap reorder for regulars",
      "Digital loyalty that works from their phone",
      "Throttling so the 8am rush doesn't drown the bar",
      "Subscription coffee and prepaid tabs",
      "Simple site that shows the food, not just the coffee",
    ],
    services: ["online-ordering", "website-design", "custom-software", "support-maintenance"],
    caseStudy: "north-lane-coffee",
    testimonial: "north-lane-owner",
    stat: { value: "4 min", label: "saved per order at peak" },
    seo: {
      title: "Cafe Websites & Order-Ahead Systems",
      description:
        "Order-ahead, digital loyalty and a website that sells your food as well as your coffee. Built for cafes and coffee shops.",
    },
  },
  {
    slug: "salons-spas",
    name: "Salons & spas",
    shortName: "Salons & spas",
    glyph: "✂️",
    cardLine: "Fill the chair without answering the phone all day.",
    headline: "Stop losing Saturdays to no-shows",
    subheadline:
      "Online booking with deposits and automatic reminders, so the chair is full and you're not chasing people by text.",
    painPoints: [
      {
        title: "No-shows cost you the whole slot",
        body: "A 90-minute colour that doesn't turn up is 90 minutes you can't sell. There's no deposit, so there's no reason for them to call and cancel.",
      },
      {
        title: "You're booking clients while cutting hair",
        body: "The phone rings mid-blow-dry. You either stop and answer, or lose the booking to the salon that picked up.",
      },
      {
        title: "The diary doesn't know your stylists",
        body: "Every stylist has different services, different hours and different lengths. A generic calendar books a junior for a balayage.",
      },
      {
        title: "Rebooking is a conversation nobody has",
        body: "Clients mean to come back in six weeks. Without a nudge, eight weeks becomes twelve, and then they've found someone else.",
      },
    ],
    features: [
      "Per-stylist calendars with real service durations",
      "Deposits taken at booking, refunded to policy",
      "SMS reminders 24 hours out, timed by you",
      "Book directly from Instagram and Google",
      "Client history — colour formulas, notes, allergies",
      "Automatic rebooking nudges at the right interval",
    ],
    services: ["booking-systems", "website-design", "custom-software", "support-maintenance"],
    caseStudy: "june-and-co",
    testimonial: "june-and-co-owner",
    stat: { value: "52%", label: "fewer no-shows after deposits" },
    seo: {
      title: "Salon & Spa Booking Systems and Websites",
      description:
        "Online booking with deposits, SMS reminders and per-stylist calendars. Cut no-shows and stop taking bookings during appointments.",
    },
  },
  {
    slug: "gyms-fitness",
    name: "Gyms & fitness studios",
    shortName: "Gyms & studios",
    glyph: "🏋️",
    cardLine: "Fill classes and chase fewer failed payments.",
    headline: "Your class schedule shouldn't live in a spreadsheet",
    subheadline:
      "Class booking, waitlists and memberships that bill themselves — so you coach instead of doing admin at 10pm.",
    painPoints: [
      {
        title: "Classes look full but aren't",
        body: "People book and don't show, the waitlist never gets called, and you teach a six-person class in a room you priced for twelve.",
      },
      {
        title: "Memberships fail quietly",
        body: "A card expires, the payment bounces, and nobody notices for two months. That's revenue you'll never invoice for.",
      },
      {
        title: "Sign-up takes a clipboard",
        body: "New members fill in a paper waiver, someone types it into a spreadsheet later, and the details are wrong by the time you need them.",
      },
    ],
    features: [
      "Class timetable with caps and automatic waitlists",
      "Memberships, class packs and drop-ins in one system",
      "Recurring billing with automatic retry on failure",
      "Digital waivers signed at sign-up, stored properly",
      "Check-in on a tablet or a QR code at the door",
      "Attendance and retention numbers you can actually read",
    ],
    services: ["booking-systems", "custom-software", "website-design", "support-maintenance"],
    caseStudy: "ironwood-strength",
    testimonial: "ironwood-owner",
    stat: { value: "3 hrs", label: "of admin saved per week" },
    seo: {
      title: "Gym & Fitness Studio Booking and Membership Software",
      description:
        "Class booking with waitlists, recurring membership billing and digital waivers for gyms, studios and personal trainers.",
    },
  },
  {
    slug: "bakeries-food-trucks",
    name: "Bakeries & food trucks",
    shortName: "Bakeries & trucks",
    glyph: "🥐",
    cardLine: "Take pre-orders and sell out before you open.",
    headline: "Sell out before you open the doors",
    subheadline:
      "Pre-orders, custom cake enquiries and a live location for the truck — so you bake to demand instead of guessing.",
    painPoints: [
      {
        title: "You bake to a guess",
        body: "Too much and it goes in the bin at 4pm. Too little and you turn away the queue at 10am. Either way it costs you.",
      },
      {
        title: "Custom cake orders are 40 messages long",
        body: "Flavour, size, date, allergies, inscription, deposit — all negotiated over DMs, and half the details get lost before the order sheet.",
      },
      {
        title: "Nobody knows where the truck is",
        body: "You post the pitch to Instagram Stories each morning. Anyone who missed it that hour has no idea where to find you.",
      },
    ],
    features: [
      "Pre-orders with collection windows and daily caps",
      "Custom cake enquiry form that asks everything upfront",
      "Deposits taken online, balance on collection",
      "Live truck location and this week's schedule",
      "Wholesale ordering for your cafe accounts",
      "Sell-out badges that update the moment you're out",
    ],
    services: ["online-ordering", "website-design", "custom-software", "support-maintenance"],
    caseStudy: "flour-and-ash",
    testimonial: "flour-and-ash-owner",
    stat: { value: "31%", label: "less end-of-day waste" },
    seo: {
      title: "Bakery & Food Truck Pre-Order Systems and Websites",
      description:
        "Pre-orders, custom cake enquiries, deposits and live truck locations. Bake to demand instead of guessing.",
    },
  },
  {
    slug: "retail-boutiques",
    name: "Retail & boutique stores",
    shortName: "Retail & boutiques",
    glyph: "🛍️",
    cardLine: "Show your stock online without becoming a warehouse.",
    headline: "Your best stock is invisible after closing time",
    subheadline:
      "A site that shows what's actually on the shelf, holds items for collection, and brings people into the shop.",
    painPoints: [
      {
        title: "Online and in-store stock disagree",
        body: "Someone orders the last one online an hour after it sold in the shop. Now you're refunding a customer and apologising.",
      },
      {
        title: "You don't want to be a shipping company",
        body: "Packing and posting eats the morning and the margin. You'd rather people came in — but there's no way to reserve something first.",
      },
      {
        title: "New arrivals only reach the people already following you",
        body: "The drop goes on Instagram, gets seen by a fraction of your followers, and the rest of the neighbourhood never knows.",
      },
    ],
    features: [
      "Live stock synced with your POS",
      "Reserve online, pay and collect in store",
      "Local delivery zones with your own driver or courier",
      "New-arrival emails to customers who opted in",
      "Appointment booking for personal shopping",
      "Gift cards that work online and at the till",
    ],
    services: ["website-design", "custom-software", "booking-systems", "support-maintenance"],
    caseStudy: "willow-mercantile",
    testimonial: "willow-owner",
    stat: { value: "2.4×", label: "more in-store collections" },
    seo: {
      title: "Retail & Boutique Store Websites with Live Stock",
      description:
        "Websites for independent retailers — live POS stock, reserve-and-collect, local delivery and personal shopping appointments.",
    },
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

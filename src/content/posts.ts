/**
 * Blog posts.
 *
 * Posts are structured data rather than MDX — no extra dependency, no build
 * step, and every post is type-checked. To add one, append to `posts` below.
 * If the blog grows past ~30 posts, that's the point to move to a CMS or MDX;
 * the page components read from these types, so the swap is contained.
 *
 * PLACEHOLDER: authors are invented. The advice is genuine.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  /** Meta description and card copy. */
  excerpt: string;
  /** ISO date. */
  date: string;
  author: string;
  /** Minutes, shown on cards. */
  readingTime: number;
  tag: string;
  /** Industry slugs this is most relevant to, for cross-linking. */
  industries: string[];
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "increase-online-orders-restaurant",
    title: "How restaurants can increase online orders without paying more commission",
    excerpt:
      "The delivery apps are a marketing channel, not a business model. Here's how to move your regulars onto your own ordering system — without picking a fight you'll lose.",
    date: "2026-06-18",
    author: "Dana Whitmore",
    readingTime: 7,
    tag: "Online ordering",
    industries: ["restaurants", "cafes", "bakeries-food-trucks"],
    body: [
      {
        type: "p",
        text: "If you take orders through a delivery app, you already know the arithmetic. Somewhere between 15% and 30% of every ticket leaves before you've paid for the ingredients. On a $40 order that's up to $12 — often more than the dish itself makes you.",
      },
      {
        type: "p",
        text: "The advice you usually hear is to quit the apps. That's bad advice for most restaurants. The apps are genuinely good at one thing: putting you in front of someone who has never heard of you. What they're bad at is everything after that — because a customer who found you on an app stays the app's customer, forever, at 30% a time.",
      },
      { type: "h2", text: "Treat the apps as the top of the funnel, not the whole funnel" },
      {
        type: "p",
        text: "The goal isn't zero app orders. It's moving the repeat customers — the ones ordering from you every other Friday — onto a channel you control. They already know they like your food. You're not selling them anything; you're just giving them a cheaper door to walk through.",
      },
      {
        type: "p",
        text: "The restaurants that do this well tend to do the same handful of things.",
      },
      { type: "h2", text: "Five things that actually move the needle" },
      {
        type: "list",
        items: [
          "Put a card in every delivery bag. One line — “Order direct next time and we'll knock 15% off” — with a short URL and a QR code. It's the cheapest marketing you will ever run, and it reaches the exact person you want.",
          "Make direct ordering genuinely cheaper. Not a token dollar. If direct saves you $9 in commission, give $3 of it back and keep the rest. Customers can do the maths and they'll do it in your favour.",
          "Make the direct experience faster, not just cheaper. Saved cards, reorder-in-two-taps, and an accurate pickup time beat a discount for a regular ordering on a Tuesday night.",
          "Ask for the phone number, then use it sparingly. One message a month about a special is welcome. One a week is a block. The list only stays valuable if you don't burn it.",
          "Print the direct URL on every physical surface you own — the window, the receipt, the menu, the pizza box. The customers you most want are already standing in your restaurant.",
        ],
      },
      {
        type: "callout",
        title: "A realistic target",
        text: "Restaurants that push this consistently usually get 25–40% of orders onto their own channel within six months. Not 100% — and chasing 100% costs more than the last few points are worth.",
      },
      { type: "h2", text: "What direct ordering has to get right" },
      {
        type: "p",
        text: "If your own ordering page is slower or more confusing than the app, none of the above works. The bar is genuinely high, because the apps have spent billions on this. Three things are non-negotiable: it has to load in about two seconds on a phone, the menu has to be editable by you in seconds when you run out of something, and the order has to reach the kitchen the same way every time — a printer or a tablet, not an email someone has to notice.",
      },
      {
        type: "quote",
        text: "We were paying the apps more than we paid our head chef. Now people order from us directly and we know their names again.",
      },
      { type: "h2", text: "The part nobody mentions" },
      {
        type: "p",
        text: "Owning the ordering channel means owning the customer list — and that's worth more than the commission you save. A list of 2,000 people who have ordered from you is an asset. It's how you fill a slow Tuesday, launch a new menu, or survive the month a road closure kills your footfall. You can't rent that from an app.",
      },
      {
        type: "p",
        text: "Start with the bag insert. It costs about forty dollars to test, and you'll know within a month whether your regulars will follow you.",
      },
    ],
  },
  {
    slug: "reduce-no-shows-salon",
    title: "The no-show problem: what actually works (and what just annoys clients)",
    excerpt:
      "Deposits, reminders, waitlists and cancellation windows — ranked by how much they cut no-shows and how much goodwill they cost you.",
    date: "2026-05-02",
    author: "Dana Whitmore",
    readingTime: 6,
    tag: "Bookings",
    industries: ["salons-spas", "gyms-fitness"],
    body: [
      {
        type: "p",
        text: "A no-show isn't a lost appointment. It's a lost slot — and the longer the service, the worse it is. A 90-minute colour that doesn't turn up on a Saturday is the single most expensive thing that can happen to a salon that week.",
      },
      {
        type: "p",
        text: "Most owners try to fix it with willpower: reminding people personally, or just accepting it. There are four mechanisms that work better, and they're worth knowing in order of effectiveness.",
      },
      { type: "h2", text: "1. Deposits (biggest effect, smallest downside)" },
      {
        type: "p",
        text: "A deposit turns a vague intention into a commitment. 20% of the service price, refundable up to 24 hours before, is the setting that works almost everywhere. It typically cuts no-shows by half or more on its own.",
      },
      {
        type: "p",
        text: "Owners worry that clients will object. In practice, almost nobody does — because the people who object are disproportionately the people who weren't going to turn up. The clients you want barely notice. Apply it to long or high-value services first if you're nervous; you don't need a deposit on a 20-minute trim.",
      },
      { type: "h2", text: "2. Reminders, timed properly" },
      {
        type: "p",
        text: "One reminder 24 hours out does most of the work. A second at 48 hours helps for appointments booked weeks in advance, because that's the one people genuinely forget. Reminders any earlier get ignored; any later and there's no time to refill the slot.",
      },
      {
        type: "p",
        text: "The reminder must include a one-tap way to cancel or reschedule. This feels backwards — you're inviting cancellations — but a cancellation 24 hours out is a slot you can resell. A no-show is not. Make cancelling easy and you convert dead slots into live ones.",
      },
      { type: "h2", text: "3. A waitlist that fires automatically" },
      {
        type: "p",
        text: "A cancellation only helps if someone fills it. A waitlist that texts the next person the moment a slot opens — and gives them a time limit to claim it — refills a good share of late cancellations with no work from you. Doing this manually never happens; you're cutting hair.",
      },
      { type: "h2", text: "4. A cancellation policy you actually enforce" },
      {
        type: "p",
        text: "A policy nobody enforces is worse than no policy, because it teaches clients the rules are decorative. If you say 24 hours, charge the deposit at 23. Enforce it kindly, once, and word gets round.",
      },
      {
        type: "callout",
        title: "What doesn't work",
        text: "Overbooking to compensate. It papers over the problem until the day everyone turns up, and then you've got two clients, one chair and an apology. Fix the no-shows instead.",
      },
      { type: "h2", text: "Rebooking is the other half" },
      {
        type: "p",
        text: "Most salons lose more revenue to clients quietly drifting than to no-shows. Someone who comes every six weeks and slips to twelve has halved their value without ever cancelling anything. A nudge timed to each client's own interval — not a blanket monthly blast — brings a meaningful share of them back.",
      },
      {
        type: "p",
        text: "Deposits plus timed reminders will get you most of the way. Set both up this month and you'll see the difference in one booking cycle.",
      },
    ],
  },
  {
    slug: "what-local-business-website-costs",
    title: "What a local business website actually costs in 2026",
    excerpt:
      "Real ranges for real projects, what drives the price up, and the five questions that tell you whether a quote is honest.",
    date: "2026-03-27",
    author: "Ravi Chandrasekaran",
    readingTime: 8,
    tag: "Buying advice",
    industries: [
      "restaurants",
      "cafes",
      "salons-spas",
      "gyms-fitness",
      "bakeries-food-trucks",
      "retail-boutiques",
    ],
    body: [
      {
        type: "p",
        text: "Ask three agencies what a website costs and you'll get $500, $5,000 and $50,000. All three can be honest quotes for genuinely different things. Here's how to tell which one you're being offered.",
      },
      { type: "h2", text: "The three real tiers" },
      {
        type: "list",
        items: [
          "$0–$1,500 — a template you fill in yourself, or a freelancer configuring one for you. Fine if you need a business card on the internet: hours, address, a few photos. It will look like a template, because it is one.",
          "$3,000–$8,000 — a custom-designed site built for your business, with the local SEO and analytics done properly. This is where most restaurants, salons and shops should be.",
          "$8,000–$25,000+ — a site plus a system that runs part of your business: ordering, booking, inventory, memberships. You're buying software, not pages, and the price tracks the complexity of what it has to do.",
        ],
      },
      {
        type: "p",
        text: "Below about $3,000 for custom work, someone is either using a template and calling it custom, or losing money and will disappear halfway through. Both end the same way.",
      },
      { type: "h2", text: "What actually drives the price" },
      {
        type: "p",
        text: "Not page count — that's the thing everyone asks about and it barely matters. What moves a quote is whether money changes hands on the site, whether it has to talk to another system (your POS, your accounting), how much content has to be written and photographed from scratch, and how many locations or staff members the system has to model.",
      },
      {
        type: "callout",
        title: "The ongoing costs, so nobody surprises you",
        text: "A domain runs about $15 a year. Hosting for a small business site is $10–$50 a month, or included in a care plan. Payment processing is roughly 2.9% + 30¢ per transaction, paid to Stripe or Square — never to your agency. SMS reminders are about a cent each. Anyone who won't itemise these upfront is hiding something.",
      },
      { type: "h2", text: "Five questions that reveal an honest quote" },
      {
        type: "list",
        items: [
          "Who owns the domain and the code? The only correct answer is you, in accounts in your name. If the agency holds them, leaving costs you the site.",
          "Is this a fixed price or an estimate? Fixed means the risk of underestimating sits with them. Estimates drift, and they only ever drift up.",
          "What happens after launch, and what does it cost? Ask for the number. “We'll sort it out later” means an invoice you haven't budgeted for.",
          "Can I edit the menu and the hours myself? If not, every price change is a support ticket and a delay. This is the single most common regret.",
          "Can I speak to a client in my industry? A good agency will connect you without hesitating. Hesitation is the answer.",
        ],
      },
      { type: "h2", text: "Where the money is best spent" },
      {
        type: "p",
        text: "If your budget is tight, spend it in this order: make the site fast on a phone, get the Google Business Profile right, and make sure the one thing customers came to do — see the menu, book a table, find your hours — takes one tap from the home page. A plain site that nails those three beats a beautiful one that misses them.",
      },
      {
        type: "p",
        text: "Everything else — animation, video, a blog, a clever hero — is worth having, but only after the basics earn their keep.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function postsByIndustry(industrySlug: string): Post[] {
  return sortedPosts.filter((post) => post.industries.includes(industrySlug));
}

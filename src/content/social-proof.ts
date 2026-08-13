/**
 * Testimonials, headline stats and client logos.
 *
 * PLACEHOLDER: all of it. Quotes are written to sound like real owners, but
 * nobody said them. Replace before launch and flip `placeholder` to false —
 * the "Sample" badges disappear on their own. See CONTENT.md.
 */

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  business: string;
  industry: string;
  /** Initials shown in the avatar chip when there's no photo. */
  initials: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "casa-lucia-owner",
    quote:
      "We were paying the delivery apps more than we paid our head chef. Six weeks after launch, a third of our orders came through our own site and we kept every cent of them.",
    author: "Marco Ferrante",
    role: "Owner",
    business: "Casa Lucía",
    industry: "restaurants",
    initials: "MF",
    placeholder: true,
  },
  {
    id: "june-and-co-owner",
    quote:
      "The deposit was the part I was nervous about — I thought clients would push back. Not one did, and my Saturdays actually hold now instead of falling apart by lunchtime.",
    author: "June Alvarez",
    role: "Owner",
    business: "June & Co.",
    industry: "salons-spas",
    initials: "JA",
    placeholder: true,
  },
  {
    id: "north-lane-owner",
    quote:
      "They didn't try to sell me an app. They watched a morning rush, then built the one thing that fixed it. That's rarer than it should be.",
    author: "Priya Raman",
    role: "Co-founder",
    business: "North Lane Coffee",
    industry: "cafes",
    initials: "PR",
    placeholder: true,
  },
  {
    id: "ironwood-owner",
    quote:
      "I'm a coach, not an admin. I told them that on the first call and they built around it — I haven't touched a spreadsheet since March.",
    author: "Dre Whitfield",
    role: "Owner",
    business: "Ironwood Strength",
    industry: "gyms-fitness",
    initials: "DW",
    placeholder: true,
  },
  {
    id: "flour-and-ash-owner",
    quote:
      "Everything got explained in plain English, including the parts where I'd made the wrong assumption. No jargon, no talking down to me.",
    author: "Sam Okafor",
    role: "Owner",
    business: "Flour & Ash",
    industry: "bakeries-food-trucks",
    initials: "SO",
    placeholder: true,
  },
  {
    id: "willow-owner",
    quote:
      "Launch day I expected chaos. Someone was on the phone with us the whole morning and nothing broke. Two years on, they still pick up.",
    author: "Tessa Boone",
    role: "Owner",
    business: "Willow Mercantile",
    industry: "retail-boutiques",
    initials: "TB",
    placeholder: true,
  },
];

export function getTestimonial(id: string): Testimonial | undefined {
  return testimonials.find((testimonial) => testimonial.id === id);
}

export function testimonialsByIndustry(industrySlug: string): Testimonial[] {
  return testimonials.filter((testimonial) => testimonial.industry === industrySlug);
}

/** Headline numbers for the home page proof band. PLACEHOLDER. */
export const stats: { value: string; label: string; detail: string }[] = [
  {
    value: "140+",
    label: "local businesses launched",
    detail: "Across restaurants, salons, gyms, bakeries and independent retail.",
  },
  {
    value: "$1.2M",
    label: "in commission saved",
    detail: "Delivery-app fees our clients no longer pay on their own orders.",
  },
  {
    value: "4.9/5",
    label: "average client rating",
    detail: "From 86 reviews across Google and Clutch.",
  },
  {
    value: "9 yrs",
    label: "average client stay",
    detail: "Most of our first clients are still with us today.",
  },
];

/**
 * Client logos. Rendered as styled wordmarks rather than image files — no
 * network request, no layout shift, and no fake logo images to mistake for
 * real endorsements. Swap for real SVGs once you have permission to use them.
 */
export const clientLogos: { name: string; industry: string }[] = [
  { name: "Casa Lucía", industry: "restaurants" },
  { name: "North Lane Coffee", industry: "cafes" },
  { name: "June & Co.", industry: "salons-spas" },
  { name: "Ironwood Strength", industry: "gyms-fitness" },
  { name: "Flour & Ash", industry: "bakeries-food-trucks" },
  { name: "Willow Mercantile", industry: "retail-boutiques" },
  { name: "Blue Harbour Fish Co.", industry: "restaurants" },
  { name: "Sundial Yoga", industry: "gyms-fitness" },
];

/** Trust signals shown near CTAs. Keep these literally true. */
export const trustPoints: string[] = [
  "Fixed quote before any work starts",
  "You own your domain, code and data",
  "No lock-in contracts, cancel support any time",
  "Straight answers, no jargon",
];

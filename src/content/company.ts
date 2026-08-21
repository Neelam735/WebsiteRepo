/**
 * About-page content and the general FAQ.
 *
 * Deliberately free of history, headcount, client counts and years in
 * business — those are facts only you can supply. What's here describes how
 * the work is done, which is true from day one.
 */

export const about = {
  headline: "Two systems, built properly",
  lede: "We do two things: a restaurant management system and a gym management system. Both are the kind of software a business runs on all day, so both are built to be dependable rather than impressive.",
  paragraphs: [
    "Most software sold to restaurants and gyms falls into one of two traps. It is either a cheap tool that does one thing and refuses to talk to anything else, or it is built for chains with an IT department and priced accordingly. Independents end up stitching four products together with a spreadsheet in the middle.",
    "We work in the gap between those. One system per business, set up around how you already operate, with the modules you need switched on and the ones you don't left off.",
    "Before we design anything, we spend time in the business — a dinner service, a Monday evening class block. Watching what actually happens tells us more than any requirements document, and it is where nearly every good decision on a project comes from.",
  ],
  // TODO: add your own history, team and location once you're ready to state them.
};

export const values: { title: string; body: string }[] = [
  {
    title: "A fixed quote, before we start",
    body: "You get a number after scoping, and that is the number. If the work takes longer than we estimated, that is our estimate that was wrong — not your invoice.",
  },
  {
    title: "Your data is yours",
    body: "Customers, members, orders, bookings and history belong to you, and you can export the lot whenever you ask. Nothing is held hostage to keep you on the system.",
  },
  {
    title: "Plain English",
    body: "You should never have to ask what a word means. If we cannot explain a technical decision in terms of what it does for your business, we have not thought it through yet.",
  },
  {
    title: "We show up for launch",
    body: "Go-live is the risky part — first service, first week of classes. We are there for it, not on the end of a ticketing system.",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "How long does it take to get running?",
    answer:
      "It depends on how much has to move across and how many locations are involved. We give you a date at the end of scoping and we hold to it; if something is going to slip, you hear it from us first rather than discovering it.",
  },
  {
    question: "How much of my time will this take?",
    answer:
      "Most of it is front-loaded: a scoping session, a review of the configured system, and training for your team. We do the work — we need you for the decisions only you can make.",
  },
  {
    question: "Can you move our data from the system we use now?",
    answer:
      "That is a standard part of the project. Menus, customers, members, plans, balances and booking history come across, and we run old and new in parallel until the numbers agree.",
  },
  {
    question: "What happens when something breaks?",
    answer:
      "You reach a person who knows your setup. Support terms — hours, response times and what is included — are agreed in writing before launch, so nobody is guessing during a busy service.",
  },
  {
    question: "Do we own what you build?",
    answer:
      "Yes. Your data is yours and exportable on request, and what is included in the licence or handover is written into the agreement rather than left vague.",
  },
  {
    question: "Do you work with businesses outside your area?",
    answer:
      "Yes. Scoping and training work well over video. If you are local we would rather come and stand in your business for a service, because it makes the result better — but it is not a requirement.",
  },
  {
    question: "We only need part of this. Is that a problem?",
    answer:
      "No, and it is common. The systems are modular — take ordering without inventory, or memberships without personal training. You pay for what you switch on.",
  },
];

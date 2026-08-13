/**
 * About-page content and the general FAQ.
 *
 * PLACEHOLDER: the founding story, the team and the numbers are invented.
 * Keep the shape, replace the specifics.
 */

export const story = {
  headline: "We build software for the businesses on our own street",
  lede: "Storefront Studio started because a friend with a restaurant was paying $3,000 a month in delivery commission and had been quoted $40,000 for a website. Both numbers were wrong, and nobody was telling him so.",
  paragraphs: [
    "We spent the first year building for one restaurant, one salon and one bakery — all within a mile of the office. That's still roughly how we work: close enough to the business to sit in it during a rush and watch what actually goes wrong, rather than guessing from a requirements document.",
    "Local businesses get sold two kinds of software. The cheap kind is a template that looks like everyone else's and can't do the one thing you need. The expensive kind is built for chains with an IT department, priced accordingly, and takes nine months. There isn't much in between, which is the gap we work in.",
    "We're a small team on purpose. The person who scopes your project is the person who builds it and the person who picks up the phone eighteen months later when something breaks. Nobody gets handed to an account manager.",
  ],
};

export const values: { title: string; body: string }[] = [
  {
    title: "Fixed quotes, always",
    body: "You get a number before we start, and that's the number. If the work takes longer than we thought, that's our estimate that was wrong — not your invoice.",
  },
  {
    title: "You own everything",
    body: "Domain, code, customer data, every account in your name. If you ever leave, you leave with all of it. We'd rather earn the renewal than hold your business hostage.",
  },
  {
    title: "Plain English",
    body: "You will never need to ask what a word means. If we can't explain a technical decision in terms of what it does for your business, we haven't thought it through yet.",
  },
  {
    title: "We sit in your business first",
    body: "Before we design anything, we spend a service, a rush or a Saturday with you. The best ideas on every project so far came from watching, not from a meeting.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  placeholder: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Dana Whitmore",
    role: "Founder & product lead",
    initials: "DW",
    bio: "Ran front of house for eight years before writing a line of code, which is why every project starts with a shift on the floor.",
    placeholder: true,
  },
  {
    name: "Ravi Chandrasekaran",
    role: "Engineering lead",
    initials: "RC",
    bio: "Builds the ordering and booking systems. Cares more than is strictly reasonable about how fast a page loads on a phone with two bars.",
    placeholder: true,
  },
  {
    name: "Mia Okonkwo",
    role: "Design lead",
    initials: "MO",
    bio: "Designs the sites and the menus on them. Believes a menu nobody can read on a phone is a menu that doesn't exist.",
    placeholder: true,
  },
  {
    name: "Tom Béranger",
    role: "Support lead",
    initials: "TB",
    bio: "The person who answers when the site goes down at 7pm on a Friday. Has never once said “have you tried clearing your cache”.",
    placeholder: true,
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "How long does a project take?",
    answer:
      "A website is typically 3–5 weeks. Add ordering or booking and it's 4–6. Custom software depends on scope — usually 6–12 weeks. We agree the launch date at the start and we hit it; if something is going to slip you'll hear it from us first.",
  },
  {
    question: "How much of my time will this take?",
    answer:
      "About four hours in total, spread across the project. One discovery session of an hour or so, a design review, a content pass and a training session. We do the work; we just need you for the decisions only you can make.",
  },
  {
    question: "I don't have photos or written content. Is that a problem?",
    answer:
      "No, and it's the normal starting point. We write the first draft of every page and you correct it — that's far easier than facing a blank page. For photography we'll either direct a shoot or show you how to get usable shots on a phone, which for food is often better anyway.",
  },
  {
    question: "Will it work with my POS?",
    answer:
      "Usually. Square, Toast, Clover and Lightspeed all have integrations we've built before. Some older systems have no way in at all — we'll tell you honestly on the first call rather than discovering it halfway through.",
  },
  {
    question: "What if I want to make changes myself?",
    answer:
      "Menus, prices, hours, staff, services and photos are all yours to edit, and we train you on them. Structural changes — new pages, new features — come to us, and small ones are included in a care plan rather than billed hourly.",
  },
  {
    question: "Do you work with businesses outside your area?",
    answer:
      "Yes. Roughly half our clients are remote now, and the process works fine over video. If you're local we'll come and sit in your business, which is genuinely better — but it's not a requirement.",
  },
  {
    question: "What happens if I want to leave?",
    answer:
      "You take everything with you. The domain, code, designs and data are yours and always were, in accounts under your name. Give us a month's notice on a care plan and we'll hand over cleanly to whoever's next, no drama.",
  },
];

import Link from "next/link";

import { CheckList, ProductCard } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { ClassScheduleMockup, OrderingMockup } from "@/components/mockups";
import { Reveal } from "@/components/reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { faqs } from "@/content/company";
import { process, products } from "@/content/products";
import { primaryCta, site } from "@/content/site";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${site.name} — Restaurant & gym management systems`,
  description: site.description,
  path: "/",
  keywords: [
    "restaurant management system",
    "gym management system",
    "online ordering system",
    "class booking software",
    "membership management software",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <WhyUs />
      <HomeFaq />
      <CtaBanner />
      <JsonLd data={faqJsonLd(faqs.slice(0, 5))} />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas pt-12 sm:pt-16 lg:pt-20">
      {/* Warm wash behind the hero. Gradients, not images — nothing to download. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-honey-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-clay-100/50 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink-700 shadow-sm ring-1 ring-line">
              <span className="h-2 w-2 rounded-full bg-sage-500" />
              Two systems. Nothing else.
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Software that runs{" "}
              <span className="relative whitespace-nowrap text-clay-700">
                the whole floor
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-honey-300"
                >
                  <path
                    d="M2 8c60-5 120-6 180-4s90 4 116 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl">
              A restaurant management system for orders, menus, tables and the kitchen. A gym
              management system for memberships, classes and check-in. Set up around how you
              already work, with a fixed quote before we start.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryCta.href} size="lg" className="group">
                {primaryCta.label}
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="#what-we-do" variant="secondary" size="lg">
                See what&rsquo;s in each system
              </ButtonLink>
            </div>

            <p className="mt-5 text-sm text-ink-500">
              A walkthrough with your own menu or timetable · No obligation
            </p>
          </div>

          {/*
            One mockup per system. The phone overlaps the timetable's right
            edge — the half carrying the least information — and overhangs into
            the page margin, so both stay legible instead of one smothering the
            other. It only appears from lg up: below that there isn't room to
            render a phone at a width where its rows are readable.
          */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <Reveal>
              <ClassScheduleMockup />
            </Reveal>
            <Reveal delay={120}>
              <div className="absolute -bottom-14 right-0 hidden w-56 lg:block">
                <OrderingMockup className="max-w-none" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      <div className="h-24 lg:h-28" />
    </section>
  );
}

function WhatWeDo() {
  return (
    <Section id="what-we-do" tone="surface">
      <SectionHeading
        eyebrow="What we do"
        title="Two systems, built for two trades"
        description="We don't do a bit of everything. These are the two systems we build, and both go deep enough to run the business rather than just decorate it."
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {products.map((product, index) => (
          <Reveal key={product.slug} delay={index * 80} className="h-full">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="Scoped first, quoted once"
        description="You'll know what's happening at every stage, and you'll never get an invoice you weren't expecting."
      />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, index) => (
          <Reveal key={step.step} delay={index * 80} className="h-full">
            <li className="flex h-full flex-col rounded-card border border-line bg-surface p-6">
              <span className="font-display text-3xl font-extrabold text-clay-200">
                {step.step}
              </span>
              <h3 className="mt-3 text-lg font-bold">{step.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function WhyUs() {
  return (
    <Section tone="tinted">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Why work with us</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            One system instead of four tools and a spreadsheet
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            The cost of running on disconnected tools is not the subscriptions — it&rsquo;s the
            hour a day someone spends copying between them, and the questions nobody can answer
            without three exports.
          </p>

          <CheckList
            className="mt-6"
            items={[
              "Set up with your real data, not a demo dataset",
              "Modular — switch on what you need, leave the rest off",
              "Migration from your current system is part of the job",
              "We're there for go-live, not just for the invoice",
            ]}
          />

          <ButtonLink href="/about" variant="secondary" className="mt-7">
            How we work
          </ButtonLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/${product.slug}`}
              className="group flex flex-col rounded-card border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-clay-200 hover:shadow-[var(--shadow-lift)]"
            >
              <span aria-hidden="true" className="text-2xl">
                {product.glyph}
              </span>
              <h3 className="mt-3 font-bold text-ink-950">{product.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                {product.modules.length} modules, from{" "}
                {product.modules[0]!.name.toLowerCase()} to{" "}
                {product.modules[product.modules.length - 1]!.name.toLowerCase()}.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-700">
                Take a look
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

function HomeFaq() {
  return (
    <Section tone="surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">The things everyone asks</h2>
          <p className="mt-4 text-ink-600">
            Can&rsquo;t see yours?{" "}
            <Link
              href="/contact"
              className="font-semibold text-clay-700 underline underline-offset-4"
            >
              Ask us directly
            </Link>{" "}
            — you&rsquo;ll get a straight answer, not a sales call.
          </p>
        </div>

        <Faq items={faqs.slice(0, 5)} />
      </div>
    </Section>
  );
}

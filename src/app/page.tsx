import Link from "next/link";

import { CaseStudyCard, IndustryCard, ServiceCard } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { BookingMockup, OrderingMockup } from "@/components/mockups";
import { Reveal } from "@/components/reveal";
import { LogoCloud, StatBand, TestimonialCard } from "@/components/social-proof";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { faqs } from "@/content/about";
import { featuredCaseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { process, services } from "@/content/services";
import { primaryCta, secondaryCta, site } from "@/content/site";
import { testimonials } from "@/content/social-proof";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${site.name} — Websites & booking systems for local businesses`,
  description: site.description,
  path: "/",
  keywords: [
    "local business website design",
    "restaurant online ordering system",
    "salon booking software",
    "gym membership software",
    "small business web design",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoBand />
      <WhoWeHelp />
      <HowItWorks />
      <ServicesOverview />
      <Proof />
      <FeaturedWork />
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
              Taking on projects for {new Date().getFullYear()}
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Software that works as hard as{" "}
              <span className="relative whitespace-nowrap text-clay-700">
                you do
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
              We build the websites, ordering and booking systems that local businesses actually
              run on. Fixed quotes, live in weeks, and you own every bit of it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryCta.href} size="lg" className="group">
                {primaryCta.label}
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </ButtonLink>
            </div>

            <p className="mt-5 text-sm text-ink-500">
              Free 30-minute call · No obligation · {site.contact.responsePromise}
            </p>
          </div>

          {/*
            The two things people buy most, in one composition. The phone
            overlaps the booking frame's right edge — the half carrying the
            least information — and overhangs into the page margin, so both
            mockups stay legible instead of one smothering the other.

            It only appears from lg up: below that there isn't room to render a
            phone at a width where its menu rows are readable, and a cramped,
            truncated mockup undersells the product it's meant to show.
          */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <Reveal>
              <BookingMockup />
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

function LogoBand() {
  return (
    <section className="border-y border-line bg-surface py-10">
      <Container>
        <p className="text-center text-sm font-medium text-ink-500">
          Trusted by independent businesses across the country
        </p>
        <LogoCloud className="mt-6" />
      </Container>
    </section>
  );
}

function WhoWeHelp() {
  return (
    <Section id="who-we-help">
      <SectionHeading
        eyebrow="Who we help"
        title="We know your business, not just software"
        description="Every trade has its own version of the same problem: too much admin, too many missed customers. Here's what that looks like in yours."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => (
          <Reveal key={industry.slug} delay={index * 60} className="h-full">
            <IndustryCard industry={industry} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section tone="surface" id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps, five weeks, one fixed price"
        description="You'll know what's happening at every stage, and you'll never get an invoice you weren't expecting."
      />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, index) => (
          <Reveal key={step.step} delay={index * 80} className="h-full">
            <li className="relative flex h-full flex-col rounded-card border border-line bg-canvas p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-clay-200">
                  {step.step}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  {step.duration}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold">{step.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function ServicesOverview() {
  return (
    <Section id="services">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="What we build"
          title="Five things, done properly"
          description="Most projects are one or two of these. We'll tell you honestly which ones you actually need."
        />
        <ButtonLink href="/services" variant="secondary">
          All services
        </ButtonLink>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 60} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function Proof() {
  const featured = testimonials.slice(0, 3);

  return (
    <Section tone="tinted" id="results">
      <SectionHeading
        eyebrow="Results"
        title="The numbers owners actually care about"
        description="Commission saved, no-shows cut, hours handed back. Here's what our clients measure."
        align="center"
      />

      <div className="mt-12">
        <StatBand />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {featured.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={index * 80} className="h-full">
            <TestimonialCard testimonial={testimonial} featured={index === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FeaturedWork() {
  return (
    <Section id="work">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Case studies"
          title="Problem, solution, result"
          description="Three projects, with the numbers that came out the other side."
        />
        <ButtonLink href="/work" variant="secondary">
          See all work
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {featuredCaseStudies.map((study, index) => {
          const industry = industries.find((item) => item.slug === study.industry);
          return (
            <Reveal key={study.slug} delay={index * 80} className="h-full">
              <CaseStudyCard study={study} industryName={industry?.shortName} />
            </Reveal>
          );
        })}
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
            <Link href="/contact" className="font-semibold text-clay-700 underline underline-offset-4">
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

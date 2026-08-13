import Link from "next/link";

import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { Mockup } from "@/components/mockups";
import { Reveal } from "@/components/reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { serviceJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn, formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Services — Websites, Ordering, Booking & Custom Software",
  description:
    "Website design, online ordering, appointment booking, custom business software and ongoing support — built for restaurants, cafes, salons, gyms, bakeries and local retail.",
  path: "/services",
  keywords: [
    "restaurant website design",
    "online ordering system for restaurants",
    "salon appointment booking software",
    "custom small business software",
    "website maintenance for small business",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Everything you need to run the business online
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            Five service lines. Most businesses need one or two — we&rsquo;ll tell you which, and
            talk you out of the rest.
          </p>

          <nav aria-label="Services" className="mt-8 flex flex-wrap gap-2">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="rounded-full border border-line bg-canvas px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-clay-300 hover:bg-clay-50 hover:text-clay-700"
              >
                {service.name}
              </a>
            ))}
          </nav>
        </Container>
      </header>

      {services.map((service, index) => (
        <Section
          key={service.slug}
          id={service.slug}
          tone={index % 2 === 0 ? "canvas" : "surface"}
        >
          <div
            className={cn(
              "grid items-start gap-10 lg:grid-cols-2 lg:gap-16",
              index % 2 === 1 && "lg:[&>*:first-child]:order-2",
            )}
          >
            <div>
              <Eyebrow>{`0${index + 1} — ${service.timeline}`}</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{service.name}</h2>

              <p className="mt-5 border-l-2 border-clay-300 pl-5 text-lg italic leading-relaxed text-ink-700">
                {service.problem}
              </p>

              <p className="mt-5 text-[17px] leading-relaxed text-ink-600">{service.solution}</p>

              <div className="mt-7">
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                  What&rsquo;s included
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15px] text-ink-700">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-sage-500"
                      >
                        <path
                          d="m3.5 8.5 3 3 6-7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-card bg-ink-50 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Price
                  </p>
                  <p className="mt-0.5 text-lg font-bold text-ink-950">
                    {service.priceFrom
                      ? `From ${formatPrice(service.priceFrom)}${
                          service.slug === "support-maintenance" ? "/month" : ""
                        }`
                      : "Get a quote"}
                  </p>
                </div>
                <p className="max-w-xs text-sm text-ink-600">{service.priceNote}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" className="group">
                  Talk about {service.name.split(" ")[0].toLowerCase()}
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="/pricing" variant="secondary">
                  See packages
                </ButtonLink>
              </div>
            </div>

            <div className="space-y-6">
              <Reveal>
                <Mockup kind={service.mockup} className="mx-auto" />
              </Reveal>

              <div className="rounded-card border border-line bg-canvas p-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                  What changes for you
                </h3>
                <ul className="mt-3 space-y-2">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2.5 text-[15px] font-medium text-ink-800">
                      <span aria-hidden="true" className="text-clay-500">
                        →
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 border-t border-line pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Best for
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {service.industries.map((slug) => {
                      const industry = industries.find((item) => item.slug === slug);
                      if (!industry) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/industries/${slug}`}
                          className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ink-700 ring-1 ring-line transition-colors hover:text-clay-700 hover:ring-clay-200"
                        >
                          {industry.shortName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <JsonLd data={serviceJsonLd(service)} />
        </Section>
      ))}

      <Section tone="tinted">
        <SectionHeading
          align="center"
          eyebrow="Not sure what you need?"
          title="Most people aren't, and that's fine"
          description="Tell us what's going wrong and we'll tell you what would fix it — including when the answer is “nothing, you're fine as you are”."
        />
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/contact" size="lg" className="group">
            Get a free consultation
            <ArrowIcon />
          </ButtonLink>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}

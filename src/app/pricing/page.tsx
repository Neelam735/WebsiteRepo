import { CheckList } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import {
  alwaysIncluded,
  priceDrivers,
  pricingFaqs,
  pricingModel,
  runningCosts,
  tiers,
} from "@/content/pricing";
import { products } from "@/content/products";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn, formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pricing — Fixed Quotes, Scoped First",
  description:
    "How pricing works for our restaurant and gym management systems: scoped first, then a fixed quote. What drives the cost, what's always included, and the running costs itemised.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            {pricingModel.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            {pricingModel.lede}
          </p>
        </Container>
      </header>

      <Section className="pt-12 sm:pt-14">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.slug}
              className={cn(
                "relative flex flex-col rounded-card border bg-surface p-7",
                tier.highlighted
                  ? "border-clay-300 shadow-[var(--shadow-lift)] ring-1 ring-clay-200 lg:-my-3 lg:py-10"
                  : "border-line shadow-[var(--shadow-soft)]",
              )}
            >
              {tier.highlighted ? (
                <span className="absolute -top-3 left-7 rounded-full bg-clay-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most popular
                </span>
              ) : null}

              <h2 className="text-xl font-bold">{tier.name}</h2>
              <p className="mt-1.5 text-sm text-ink-600">{tier.audience}</p>

              <div className="mt-6">
                {/* "On request" rather than "Custom" — one of the tiers is
                    called Custom, and the same word in both places reads as a
                    mistake. */}
                <p className="font-display text-4xl font-extrabold text-ink-950">
                  {tier.price === null ? "On request" : formatPrice(tier.price)}
                </p>
                <p className="mt-1 text-sm text-ink-500">{tier.priceNote}</p>
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-ink-600">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-[15px] text-ink-700">
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
                    {feature}
                  </li>
                ))}

                {tier.notIncluded?.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] text-ink-400">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0">
                      <path
                        d="M4.5 4.5l7 7m0-7l-7 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={tier.cta.href}
                variant={tier.highlighted ? "primary" : "secondary"}
                size="lg"
                className="group mt-7 w-full"
              >
                {tier.cta.label}
                <ArrowIcon />
              </ButtonLink>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-500">
          Prices exclude tax. Anything beyond a package is scoped first, then quoted at a fixed
          price.
        </p>
      </Section>

      <Section tone="tinted">
        <SectionHeading
          eyebrow="What moves the price"
          title="Five things, and none of them is a surprise"
          description="Ask any supplier to explain their price in these terms. If they can't, the number is guesswork."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {priceDrivers.map((driver, index) => (
            <Reveal key={driver.title} delay={(index % 3) * 60} className="h-full">
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <h3 className="font-bold text-ink-950">{driver.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{driver.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>In every project</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              What the quote always covers
            </h2>
            <p className="mt-4 text-ink-600">
              Regardless of size, these are never billed as extras once the work is under way.
            </p>
            <CheckList className="mt-6" items={alwaysIncluded} />
          </div>

          <div className="rounded-card border border-line bg-surface p-7">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
              Running costs, itemised
            </h2>
            <p className="mt-3 text-[15px] text-ink-600">
              Costs that continue after launch. Some are ours, some are not — here&rsquo;s which
              is which.
            </p>
            <dl className="mt-5 space-y-4 border-t border-line pt-5">
              {runningCosts.map((cost) => (
                <div key={cost.title}>
                  <dt className="font-semibold text-ink-900">{cost.title}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-ink-600">{cost.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          align="center"
          eyebrow="Get a number"
          title="A quote takes one call and a look at your setup"
          description="Tell us which system you need and roughly how you operate. You'll get a fixed price, in writing, with the scope it covers spelled out."
        />

        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.slug}
              className="rounded-card border border-line bg-canvas p-6 text-center"
            >
              <span aria-hidden="true" className="text-3xl">
                {product.glyph}
              </span>
              <h3 className="mt-3 font-bold text-ink-950">{product.name}</h3>
              <p className="mt-2 text-[15px] text-ink-600">{product.tagline}</p>
              <ButtonLink href={`/${product.slug}`} variant="secondary" className="mt-5 w-full">
                What&rsquo;s included
              </ButtonLink>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Eyebrow>Pricing questions</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">No surprises, on purpose</h2>
            <p className="mt-4 text-ink-600">
              If something here isn&rsquo;t clear, ask before you commit to anything.
            </p>
          </div>
          <Faq items={pricingFaqs} />
        </div>
      </Section>

      <CtaBanner
        title="Get a fixed quote for your setup"
        description="One call and a look at how you operate is usually enough for us to give you a real number — not a range, and not “it depends”."
      />

      <JsonLd data={faqJsonLd(pricingFaqs)} />
    </>
  );
}

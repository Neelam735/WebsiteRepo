import { CheckList } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { PricingTiers } from "@/components/pricing-tiers";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import {
  alwaysIncluded,
  priceDrivers,
  pricingFaqs,
  pricingModel,
  runningCosts,
} from "@/content/pricing";
import { products } from "@/content/products";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

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
        <PricingTiers />
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

import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { carePlans, pricingFaqs, tiers } from "@/content/pricing";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { cn, formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pricing — Fixed-Price Packages for Local Businesses",
  description:
    "Transparent, fixed-price packages: Starter from $3,500, Growth from $6,900, and custom quotes for multi-location or bespoke software. No hourly billing, no surprises.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            You&rsquo;ll know the price before we start
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            Fixed quotes, agreed upfront. If the work takes longer than we estimated, that&rsquo;s
            our problem — not a bigger invoice.
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
                <p className="font-display text-4xl font-extrabold text-ink-950">
                  {tier.price ? formatPrice(tier.price) : "Custom"}
                </p>
                <p className="mt-1 text-sm text-ink-500">{tier.priceNote}</p>
                <p className="mt-2 inline-block rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-700">
                  {tier.timeline}
                </p>
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
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0"
                    >
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
          Prices in USD, excluding tax. Payment plans available — a third upfront, a third at design
          sign-off, a third on launch.
        </p>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="After launch"
          title="Care plans, if you want one"
          description="Support is included free for the first 3–12 months depending on your package. After that it's month-to-month, and you can stop any time."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {carePlans.map((plan) => (
            <div key={plan.name} className="rounded-card border border-line bg-canvas p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="font-display text-2xl font-bold text-ink-950">
                  {formatPrice(plan.price)}
                  <span className="text-sm font-medium text-ink-500">/mo</span>
                </p>
              </div>
              <p className="mt-2 text-[15px] text-ink-600">{plan.description}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-[15px] text-ink-700">
                    <span aria-hidden="true" className="text-clay-500">
                      →
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
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
              If something here isn&rsquo;t clear, ask us before you commit to anything.
            </p>
          </div>
          <Faq items={pricingFaqs} />
        </div>
      </Section>

      <CtaBanner
        title="Get a fixed quote for your project"
        description="Thirty minutes on a call is usually enough for us to give you a real number — not a range, and not “it depends”."
      />

      <JsonLd data={faqJsonLd(pricingFaqs)} />
    </>
  );
}

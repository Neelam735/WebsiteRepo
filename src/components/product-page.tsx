import Link from "next/link";

import { CheckList, ModuleCard, ProblemCard } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { DashboardMockup, Mockup } from "@/components/mockups";
import { Reveal } from "@/components/reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { products, type Product } from "@/content/products";
import { primaryCta } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, softwareJsonLd } from "@/lib/jsonld";

/**
 * The layout both systems share. Each route file supplies its own product and
 * metadata, so the two pages stay one template rather than two copies that
 * drift apart.
 */
export function ProductPage({ product }: { product: Product }) {
  const other = products.find((item) => item.slug !== product.slug);

  return (
    <>
      <header className="relative overflow-hidden border-b border-line bg-surface py-14 sm:py-18">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-chrome-100/60 blur-3xl"
        />
        <Container className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-carbon-50 px-3 py-1.5 text-sm font-semibold text-carbon-700">
                <span aria-hidden="true" className="text-base">
                  {product.glyph}
                </span>
                {product.name}
              </p>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
                {product.headline}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                {product.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={primaryCta.href} size="lg" className="group">
                  {primaryCta.label}
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="#modules" variant="secondary" size="lg">
                  What&rsquo;s included
                </ButtonLink>
              </div>
            </div>

            <Reveal className="scene scene-floor relative mx-auto w-full max-w-md">
              <div className="scene-layer scene-back">
                <Mockup kind={product.mockup} className="mx-auto" />
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xl leading-relaxed text-ink-700">{product.intro}</p>
        </div>
      </Section>

      <Section tone="surface" className="pt-0 sm:pt-0">
        <SectionHeading
          eyebrow="Sound familiar?"
          title="What we hear before we start"
          description="If two or more of these are true, there's a conversation worth having."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {product.problems.map((problem, index) => (
            <Reveal key={problem.title} delay={index * 60} className="h-full">
              <ProblemCard index={index} title={problem.title} body={problem.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="modules">
        <SectionHeading
          eyebrow="What's included"
          title={`${product.modules.length} modules, switched on as you need them`}
          description="Take the whole system or start with the part that hurts most. Adding a module later is a normal piece of work, not a new project."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {product.modules.map((module, index) => (
            <Reveal key={module.name} delay={(index % 3) * 60} className="h-full">
              <ModuleCard module={module} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="tinted">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>What changes</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              The difference it makes day to day
            </h2>
            <CheckList className="mt-6" items={product.outcomes} />

            <div className="mt-8 border-t border-line pt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                Works with
              </h3>
              <CheckList className="mt-3" items={product.integrations} />
              <p className="mt-3 text-sm text-ink-500">
                We confirm what your specific hardware and providers support during scoping,
                rather than discovering it halfway through.
              </p>
            </div>
          </div>

          <Reveal className="scene scene-floor relative lg:pt-4">
            <div className="scene-layer scene-back">
              <DashboardMockup />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              About the {product.shortName.toLowerCase()} system
            </h2>
            <p className="mt-4 text-ink-600">
              Anything not covered here, ask us — we&rsquo;d rather answer it before you commit.
            </p>
          </div>
          <Faq items={product.faqs} />
        </div>
      </Section>

      {other ? (
        <Section className="py-12 sm:py-14">
          <Link
            href={`/${other.slug}`}
            className="group flex flex-col gap-4 rounded-card border border-line bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-carbon-200 hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="text-3xl">
                {other.glyph}
              </span>
              <div>
                <p className="text-sm text-ink-500">We also build</p>
                <p className="text-lg font-bold text-ink-950">{other.name}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-carbon-700">
              Take a look
              <ArrowIcon />
            </span>
          </Link>
        </Section>
      ) : null}

      <CtaBanner />

      <JsonLd data={softwareJsonLd(product)} />
      <JsonLd data={faqJsonLd(product.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: product.name, path: `/${product.slug}` },
        ])}
      />
    </>
  );
}

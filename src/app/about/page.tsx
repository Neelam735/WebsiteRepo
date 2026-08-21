import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { about, faqs, values } from "@/content/company";
import { process, products } from "@/content/products";
import { site } from "@/content/site";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us — How We Work",
  description: `${site.name} builds two systems: a restaurant management system and a gym management system. Fixed quotes, plain English, and your data stays yours.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {about.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-700">{about.lede}</p>
        </Container>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[1.75] text-ink-700">
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="rounded-card border border-line bg-surface p-7">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
              What we build
            </h2>
            <ul className="mt-4 space-y-4">
              {products.map((product) => (
                <li key={product.slug}>
                  <a
                    href={`/${product.slug}`}
                    className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-clay-50"
                  >
                    <span aria-hidden="true" className="text-xl">
                      {product.glyph}
                    </span>
                    <span>
                      <span className="block font-bold text-ink-950">{product.name}</span>
                      <span className="block text-sm text-ink-600">{product.tagline}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-line pt-5">
              <ButtonLink href="/contact" className="group w-full">
                Book a free demo
                <ArrowIcon />
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="What we stand for"
          title="Four promises we don't break"
          description="These aren't values on a wall — they're the specific things operators tell us other suppliers got wrong."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 60} className="h-full">
              <div className="h-full rounded-card border border-line bg-canvas p-6">
                <h3 className="text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="tinted">
        <SectionHeading
          eyebrow="How a project runs"
          title="Four stages, agreed upfront"
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <li
              key={step.step}
              className="flex h-full flex-col rounded-card border border-line bg-surface p-6"
            >
              <span className="font-display text-3xl font-extrabold text-clay-200">
                {step.step}
              </span>
              <h3 className="mt-3 text-lg font-bold">{step.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Everything else</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBanner />

      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}

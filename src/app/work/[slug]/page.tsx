import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudyCard, OutcomeBlock } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { Mockup } from "@/components/mockups";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container, PlaceholderBadge, Section } from "@/components/ui/section";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { getIndustry } from "@/content/industries";
import { getService } from "@/content/services";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: `${study.client} — ${study.headline}`,
    description: study.summary,
    path: `/work/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const industry = getIndustry(study.industry);
  const related = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 3);

  return (
    <>
      <header className="border-b border-line bg-surface py-12 sm:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-500">
            <Link href="/work" className="transition-colors hover:text-clay-700">
              Our work
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-ink-800">{study.client}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {industry ? (
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="rounded-full bg-clay-50 px-3 py-1 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-100"
                  >
                    {industry.shortName}
                  </Link>
                ) : null}
                <span className="text-sm text-ink-500">{study.location}</span>
                {study.placeholder ? <PlaceholderBadge label="Sample project" /> : null}
              </div>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                {study.headline}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">{study.summary}</p>

              <dl className="mt-8 grid gap-5 sm:grid-cols-3">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl font-extrabold text-clay-700">
                        {metric.value}
                      </span>
                      <span className="mt-1 block text-sm text-ink-600">{metric.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <Reveal className="mx-auto w-full max-w-md">
              <Mockup kind={study.mockup} className="mx-auto" />
            </Reveal>
          </div>
        </Container>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <article>
            <OutcomeBlock
              problem={study.problem}
              solution={study.solution}
              result={study.result}
            />

            {study.quote ? (
              <figure className="mt-10 rounded-card bg-ink-950 p-7">
                <blockquote className="text-xl leading-relaxed text-white">
                  “{study.quote.text}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-ink-400">
                  <span className="font-semibold text-honey-300">{study.quote.author}</span> ·{" "}
                  {study.quote.role}
                </figcaption>
              </figure>
            ) : null}
          </article>

          <aside className="space-y-6">
            <div className="rounded-card border border-line bg-surface p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                What we built
              </h2>
              <ul className="mt-3 space-y-2">
                {study.services.map((serviceSlug) => {
                  const service = getService(serviceSlug);
                  if (!service) return null;
                  return (
                    <li key={serviceSlug}>
                      <Link
                        href={`/services#${serviceSlug}`}
                        className="text-[15px] font-medium text-ink-800 underline-offset-4 hover:text-clay-700 hover:underline"
                      >
                        {service.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-sm text-ink-600">
                  Running something similar? We can usually tell you in one call whether the same
                  approach would work.
                </p>
                <ButtonLink href="/contact" className="mt-4 w-full">
                  Get a free consultation
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface">
        <h2 className="text-2xl font-bold sm:text-3xl">More work</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((item) => {
            const relatedIndustry = getIndustry(item.industry);
            return (
              <CaseStudyCard
                key={item.slug}
                study={item}
                industryName={relatedIndustry?.shortName}
              />
            );
          })}
        </div>
      </Section>

      <CtaBanner />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our work", path: "/work" },
          { name: study.client, path: `/work/${study.slug}` },
        ])}
      />
    </>
  );
}

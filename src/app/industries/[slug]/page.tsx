import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudyCard, ServiceCard } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { Mockup } from "@/components/mockups";
import { Reveal } from "@/components/reveal";
import { TestimonialCard } from "@/components/social-proof";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { getCaseStudy } from "@/content/case-studies";
import { getIndustry, industries } from "@/content/industries";
import { getService } from "@/content/services";
import { getTestimonial } from "@/content/social-proof";
import { postsByIndustry } from "@/content/posts";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every industry page at build time. */
export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) return buildMetadata({ title: "Not found", description: "", noIndex: true });

  return buildMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  const caseStudy = getCaseStudy(industry.caseStudy);
  const testimonial = getTestimonial(industry.testimonial);
  const relatedServices = industry.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service) => service !== undefined);
  const relatedPosts = postsByIndustry(industry.slug).slice(0, 2);
  const others = industries.filter((item) => item.slug !== industry.slug);

  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-line bg-surface py-14 sm:py-18">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-honey-100/60 blur-3xl"
        />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-500">
            <Link href="/industries" className="transition-colors hover:text-clay-700">
              Industries
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-ink-800">{industry.name}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-clay-50 px-3 py-1.5 text-sm font-semibold text-clay-700">
                <span aria-hidden="true" className="text-base">
                  {industry.glyph}
                </span>
                For {industry.name.toLowerCase()}
              </p>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
                {industry.headline}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                {industry.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg" className="group">
                  Get a free consultation
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="/work" variant="secondary" size="lg">
                  See similar projects
                </ButtonLink>
              </div>

              <div className="mt-8 inline-flex items-baseline gap-3 rounded-card bg-ink-950 px-5 py-4">
                <span className="font-display text-3xl font-extrabold text-honey-300">
                  {industry.stat.value}
                </span>
                <span className="text-sm text-ink-300">{industry.stat.label}</span>
              </div>
            </div>

            <Reveal className="mx-auto w-full max-w-md">
              <Mockup kind={relatedServices[0]?.mockup ?? "website"} className="mx-auto" />
            </Reveal>
          </div>
        </Container>
      </header>

      {/* Pain points */}
      <Section>
        <SectionHeading
          eyebrow="Sound familiar?"
          title={`What we hear from ${industry.shortName.toLowerCase()} owners`}
          description="If two or more of these are true, there's a fix worth talking about."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {industry.painPoints.map((pain, index) => (
            <Reveal key={pain.title} delay={index * 60} className="h-full">
              <div className="flex h-full gap-4 rounded-card border border-line bg-surface p-6">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay-50 font-display text-sm font-bold text-clay-700"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-ink-950">{pain.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{pain.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Built for how {industry.shortName.toLowerCase()} actually run
            </h2>
            <p className="mt-4 text-ink-600">
              Not a generic template with your logo dropped on top — the specific features that
              take work off your plate.
            </p>
            <ButtonLink href="/contact" className="group mt-6">
              Talk it through
              <ArrowIcon />
            </ButtonLink>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {industry.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 rounded-lg border border-line bg-canvas px-4 py-3.5 text-[15px] text-ink-800"
              >
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
          </ul>
        </div>
      </Section>

      {/* Proof: case study + testimonial */}
      {caseStudy || testimonial ? (
        <Section tone="tinted">
          <SectionHeading
            eyebrow="Proof"
            title={`A ${industry.shortName.toLowerCase().replace(/s$/, "")} we did this for`}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {caseStudy ? (
              <CaseStudyCard study={caseStudy} industryName={industry.shortName} />
            ) : null}
            {testimonial ? <TestimonialCard testimonial={testimonial} featured /> : null}
          </div>
        </Section>
      ) : null}

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="Where to start"
          title="What we'd probably build first"
          description="In roughly this order — though we'll confirm on the call once we know your situation."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </ul>
      </Section>

      {/* Related reading */}
      {relatedPosts.length > 0 ? (
        <Section tone="surface">
          <SectionHeading eyebrow="Worth reading" title="Advice for your trade" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {relatedPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative rounded-card border border-line bg-canvas p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-clay-700">
                  {post.tag} · {post.readingTime} min read
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug">
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{post.excerpt}</p>
                <p className="mt-3 text-sm text-ink-400">{formatDate(post.date)}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Cross-links help both visitors and crawlers reach every vertical. */}
      <Section tone="tinted" className="py-12 sm:py-14">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
          We also work with
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/industries/${other.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-clay-300 hover:text-clay-700"
              >
                <span aria-hidden="true">{other.glyph}</span>
                {other.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title={`Let's talk about your ${industry.shortName.toLowerCase().replace(/s$/, "")}`}
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])}
      />
    </>
  );
}

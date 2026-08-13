import { CaseStudyCard } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/social-proof";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { PlaceholderBadge } from "@/components/ui/section";
import { caseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Work — Case Studies from Local Businesses",
  description:
    "Real projects for restaurants, cafes, salons, gyms, bakeries and retail shops — the problem, what we built, and the numbers that came out of it.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>Our work</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Six businesses, six specific problems
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            Every project below started with something concrete going wrong. Each one lists what
            it was, what we built, and what changed afterwards.
          </p>

          <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-lg border border-honey-200 bg-honey-50 px-4 py-3 text-sm text-ink-700">
            <PlaceholderBadge label="Placeholder portfolio" />
            These case studies are illustrative examples, not real clients — swap them for your own
            before launch.
          </p>
        </Container>
      </header>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => {
            const industry = industries.find((item) => item.slug === study.industry);
            return (
              <Reveal key={study.slug} delay={(index % 3) * 80} className="h-full">
                <CaseStudyCard study={study} industryName={industry?.shortName} />
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="tinted">
        <StatBand />
      </Section>

      <CtaBanner
        title="Want results like these?"
        description="Tell us what's costing you time or money right now. We'll tell you what we'd do about it, and what it would cost."
      />
    </>
  );
}

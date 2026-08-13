import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { StatBand } from "@/components/social-proof";
import { Container, Eyebrow, PlaceholderBadge, Section, SectionHeading } from "@/components/ui/section";
import { faqs, story, team, values } from "@/content/about";
import { process } from "@/content/services";
import { site } from "@/content/site";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us — Why Local Businesses Trust Us",
  description: `${site.name} builds websites and business software for local businesses. Fixed quotes, plain English, and you own everything we build.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {story.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-700">{story.lede}</p>
        </Container>
      </header>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-5">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[1.75] text-ink-700">
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="rounded-card border border-line bg-surface p-7">
            <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
              How we work
            </h2>
            <ol className="mt-5 space-y-5">
              {process.map((step) => (
                <li key={step.step} className="flex gap-4">
                  <span className="font-display text-lg font-extrabold text-clay-300">
                    {step.step}
                  </span>
                  <div>
                    <p className="font-bold text-ink-950">{step.name}</p>
                    <p className="text-sm text-ink-500">{step.duration}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow="What we stand for"
          title="Four promises we don't break"
          description="These aren't values on a wall — they're the specific things clients tell us other agencies got wrong."
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
          align="center"
          eyebrow="By the numbers"
          title="What we've done so far"
        />
        <div className="mt-12">
          <StatBand />
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading
            eyebrow="The team"
            title="Small on purpose"
            description="The person who scopes your project builds it, and picks up the phone two years later."
          />
          <PlaceholderBadge label="Sample team" />
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member.name} className="rounded-card border border-line bg-surface p-6">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-950 font-display text-lg font-bold text-honey-300"
              >
                {member.initials}
              </span>
              <h3 className="mt-4 font-bold">{member.name}</h3>
              <p className="text-sm font-medium text-clay-700">{member.role}</p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-600">{member.bio}</p>
            </li>
          ))}
        </ul>
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

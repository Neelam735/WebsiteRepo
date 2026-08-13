import { IndustryCard } from "@/components/cards";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries We Serve — Restaurants, Cafes, Salons, Gyms & Retail",
  description:
    "Industry-specific websites and software for restaurants, cafes, salons and spas, gyms and fitness studios, bakeries and food trucks, and independent retail.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>Industries</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            We&rsquo;ve seen your Saturday
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            A salon&rsquo;s busiest hour looks nothing like a food truck&rsquo;s. We build for the
            specifics — because that&rsquo;s where the wasted time actually hides.
          </p>
        </Container>
      </header>

      <Section>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal key={industry.slug} delay={index * 60} className="h-full">
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="tinted">
        <SectionHeading
          align="center"
          title="Run something that isn't on the list?"
          description="Clinics, dog groomers, garages, tutors, florists, tattoo studios — the problems rhyme. If you take bookings or orders from people nearby, we can probably help."
        />
      </Section>

      <CtaBanner />
    </>
  );
}

import { Container, PlaceholderBadge, Section } from "@/components/ui/section";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `The terms that apply to using the ${site.name} website.`,
  path: "/terms",
});

/**
 * PLACEHOLDER: template wording only, covering use of the website itself.
 * Client work is governed by the contract you sign, not this page. Have a
 * lawyer review before launch.
 */
export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl px-0 sm:px-0 lg:px-0">
        <h1 className="text-4xl font-extrabold">Terms of use</h1>
        <p className="mt-3 text-sm text-ink-500">Last updated: 1 January 2026</p>

        <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-lg border border-honey-200 bg-honey-50 px-4 py-3 text-sm text-ink-700">
          <PlaceholderBadge label="Template" />
          Draft wording — have this reviewed by a lawyer before you launch.
        </p>

        <div className="mt-8 space-y-6 text-[17px] leading-[1.75] text-ink-700">
          <section>
            <h2 className="text-2xl font-bold text-ink-950">About this site</h2>
            <p className="mt-2">
              This website is operated by {site.legalName}. By using it you accept these terms. If
              you don&rsquo;t accept them, please don&rsquo;t use the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Information on this site</h2>
            <p className="mt-2">
              We keep the content accurate and current, but it&rsquo;s provided for general
              information. Prices shown are indicative starting points — the price for your project
              is the one in the written quote we give you, and only that quote is binding.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Case studies and testimonials</h2>
            <p className="mt-2">
              Results described in case studies are specific to those businesses. They are not a
              promise of what your business will achieve.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Our work for clients</h2>
            <p className="mt-2">
              Projects are governed by the separate written agreement signed by both parties, not by
              this page. Where the two differ, the signed agreement wins.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Intellectual property</h2>
            <p className="mt-2">
              The design, text and code of this website belong to {site.legalName}. Client names
              and marks shown in case studies belong to their respective owners and are used with
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-clay-700 underline underline-offset-2"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}

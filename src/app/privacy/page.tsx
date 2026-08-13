import { Container, PlaceholderBadge, Section } from "@/components/ui/section";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Notice",
  description: `How ${site.name} collects, uses and stores the information you send through this website.`,
  path: "/privacy",
});

/**
 * PLACEHOLDER: template wording only. Have a lawyer review this against the
 * regimes you operate under (GDPR/UK GDPR, CCPA, and any state law that
 * applies) before launch, and update it whenever you add a tool that touches
 * visitor data.
 */
export default function PrivacyPage() {
  return (
    <Section>
      <Container className="max-w-3xl px-0 sm:px-0 lg:px-0">
        <h1 className="text-4xl font-extrabold">Privacy notice</h1>
        <p className="mt-3 text-sm text-ink-500">Last updated: 1 January 2026</p>

        <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-lg border border-honey-200 bg-honey-50 px-4 py-3 text-sm text-ink-700">
          <PlaceholderBadge label="Template" />
          Draft wording — have this reviewed by a lawyer before you launch.
        </p>

        <div className="mt-8 space-y-6 text-[17px] leading-[1.75] text-ink-700">
          <section>
            <h2 className="text-2xl font-bold text-ink-950">What we collect</h2>
            <p className="mt-2">
              When you submit the contact form we collect your name, business name, business type,
              email address, phone number (if you give one), what you&rsquo;re interested in, your
              rough budget, and your message. That&rsquo;s it — we don&rsquo;t ask for anything we
              don&rsquo;t need to reply to you properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">How we use it</h2>
            <p className="mt-2">
              Only to respond to your enquiry and, if you become a client, to deliver the work.
              We don&rsquo;t add you to a newsletter, we don&rsquo;t sell your details, and we
              don&rsquo;t share them with anyone except the service providers below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Who processes it</h2>
            <p className="mt-2">
              Enquiries are delivered by our email provider and, where configured, stored in our
              CRM. Our website is hosted by our hosting provider. Each processes data on our
              instructions only.{" "}
              <span className="font-medium text-ink-900">
                Name your actual providers here (for example Resend, HubSpot, Vercel).
              </span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Analytics and cookies</h2>
            <p className="mt-2">
              If analytics is enabled on this site, it sets cookies to measure how pages are used.
              No analytics or advertising script loads unless it has been explicitly configured. If
              you serve visitors in the EU or UK, add a consent banner and gate those scripts behind
              it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">How long we keep it</h2>
            <p className="mt-2">
              Enquiries that don&rsquo;t become projects are deleted after 24 months. Client records
              are kept for as long as we work together, and for the period our accountants and tax
              rules require afterwards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Your rights</h2>
            <p className="mt-2">
              You can ask us for a copy of what we hold about you, ask us to correct it, or ask us
              to delete it. Email{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="font-semibold text-clay-700 underline underline-offset-2"
              >
                {site.contact.email}
              </a>{" "}
              and we&rsquo;ll action it within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Contact</h2>
            <p className="mt-2">
              {site.legalName}, {site.contact.address.street}, {site.contact.address.city},{" "}
              {site.contact.address.region} {site.contact.address.postalCode}.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}

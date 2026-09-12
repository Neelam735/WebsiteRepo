import { Container, Section } from "@/components/ui/section";
import {
  hasAddress,
  hasEmail,
  legalLastUpdated,
  mailtoUrl,
  site,
} from "@/content/site";
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
        <p className="mt-3 text-sm text-ink-500">Last updated: {legalLastUpdated}</p>

        <div className="mt-8 space-y-6 text-[17px] leading-[1.75] text-ink-700">
          <section>
            <h2 className="text-2xl font-bold text-ink-950">What we collect</h2>
            <p className="mt-2">
              When you submit the contact form we collect your name, business name, business type,
              email address, phone number (if you give one), which system you&rsquo;re interested in,
              how many locations you run, and your message. That&rsquo;s it — we don&rsquo;t ask for
              anything we don&rsquo;t need to reply to you properly.
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
            <h2 className="text-2xl font-bold text-ink-950">Payment details</h2>
            <p className="mt-2">
              Payments are handled by Razorpay. Your card number, UPI PIN, CVV and bank credentials
              are entered on Razorpay&rsquo;s own secure checkout and are never sent to us, seen by
              us or stored on our systems. What we receive back is confirmation that a payment
              succeeded, the plan it was for, and Razorpay&rsquo;s reference numbers, which we keep
              as the record of your purchase. Razorpay processes that data under its own privacy
              policy as well as this one.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Who processes it</h2>
            <p className="mt-2">
              This site is hosted by Vercel. Enquiry emails are delivered by Resend. Payments are
              processed by Razorpay. Each of them processes data on our instructions only, and we
              do not share your details with anyone else.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Analytics and cookies</h2>
            <p className="mt-2">
              We set no advertising cookies and run no advertising trackers. Where analytics is
              switched on, it measures aggregate page usage only — which pages are visited and how
              often — and never anything that identifies you personally.
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
              to delete it.{" "}
              {hasEmail ? (
                <>
                  Email{" "}
                  <a
                    href={mailtoUrl}
                    className="font-semibold text-carbon-700 underline underline-offset-2"
                  >
                    {site.contact.email}
                  </a>{" "}
                  and we&rsquo;ll action it within 30 days.
                </>
              ) : (
                <>Contact us and we&rsquo;ll action it within 30 days.</>
              )}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Contact</h2>
            <p className="mt-2">
              {/* Only the parts that are configured — no stray commas for blanks. */}
              {[
                site.legalName,
                ...(hasAddress
                  ? [
                      site.contact.address.street,
                      site.contact.address.city,
                      `${site.contact.address.region} ${site.contact.address.postalCode}`.trim(),
                    ]
                  : []),
                ...(hasEmail ? [site.contact.email] : []),
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}

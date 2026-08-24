import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { faqs } from "@/content/company";
import { products } from "@/content/products";
import {
  hasAddress,
  hasEmail,
  hasPhone,
  hasWhatsapp,
  mailtoUrl,
  phoneLabel,
  site,
  telUrl,
  trustPoints,
  whatsappUrl,
} from "@/content/site";
import { faqJsonLd } from "@/lib/jsonld";
import { hasDeliveryChannel } from "@/lib/leads";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact — Book a Free Demo",
  description:
    "Tell us how you run today and we'll show you the system with your own menu or timetable in it. Free demo, no obligation.",
  path: "/contact",
});

export default function ContactPage() {
  const hasAnyDirectContact = hasPhone || hasEmail || hasWhatsapp;

  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Tell us how you run today
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            We&rsquo;ll show you the system with your own dishes, classes or plans in it, and give
            you a straight answer on whether it fits. If it doesn&rsquo;t, we&rsquo;ll say so.
          </p>
        </Container>
      </header>

      <Section className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
            <DeliveryWarning />
            <h2 className="text-xl font-bold">Send us a message</h2>
            <p className="mt-1.5 text-[15px] text-ink-600">
              Fields marked <span className="text-clay-600">*</span> are required. Everything else
              helps us come back with something useful.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6">
            {/* Direct contact renders only for details that are configured. */}
            {hasAnyDirectContact ? (
              <div className="rounded-card border border-line bg-surface p-6">
                <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                  Rather talk now?
                </h2>

                <div className="mt-4 space-y-3">
                  {hasPhone ? (
                    <a
                      href={telUrl}
                      className="flex items-center gap-3 rounded-lg border border-line bg-canvas px-4 py-3.5 transition-colors hover:border-clay-300 hover:bg-clay-50"
                    >
                      <span aria-hidden="true" className="text-lg">
                        📞
                      </span>
                      <span>
                        <span className="block font-bold text-ink-950">{phoneLabel}</span>
                        {site.contact.hours ? (
                          <span className="text-sm text-ink-500">{site.contact.hours}</span>
                        ) : null}
                      </span>
                    </a>
                  ) : null}

                  {hasWhatsapp ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-line bg-canvas px-4 py-3.5 transition-colors hover:border-clay-300 hover:bg-clay-50"
                    >
                      <span aria-hidden="true" className="text-lg">
                        💬
                      </span>
                      <span>
                        <span className="block font-bold text-ink-950">WhatsApp</span>
                        <span className="text-sm text-ink-500">Usually the fastest reply</span>
                      </span>
                    </a>
                  ) : null}

                  {hasEmail ? (
                    <a
                      href={mailtoUrl}
                      className="flex items-center gap-3 rounded-lg border border-line bg-canvas px-4 py-3.5 transition-colors hover:border-clay-300 hover:bg-clay-50"
                    >
                      <span aria-hidden="true" className="text-lg">
                        ✉️
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-ink-950">
                          {site.contact.email}
                        </span>
                        <span className="text-sm text-ink-500">
                          {site.contact.responsePromise}
                        </span>
                      </span>
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}

            <BookingCard />

            <div className="rounded-card border border-line bg-surface p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                What we build
              </h2>
              <ul className="mt-4 space-y-3">
                {products.map((product) => (
                  <li key={product.slug}>
                    <a
                      href={`/${product.slug}`}
                      className="flex gap-3 text-[15px] text-ink-700 transition-colors hover:text-clay-700"
                    >
                      <span aria-hidden="true">{product.glyph}</span>
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-line bg-surface p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                What you get
              </h2>
              <ul className="mt-4 space-y-2.5">
                {trustPoints.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[15px] text-ink-700">
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
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {hasAddress ? (
              <div className="rounded-card border border-line bg-surface p-6">
                <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">Office</h2>
                <address className="mt-3 text-[15px] not-italic leading-relaxed text-ink-700">
                  {site.contact.address.street}
                  <br />
                  {site.contact.address.city}
                  {site.contact.address.region ? `, ${site.contact.address.region}` : ""}{" "}
                  {site.contact.address.postalCode}
                </address>
                {/*
                  A map embed is deliberately omitted: third-party iframes are
                  the heaviest thing on a typical contact page and they set
                  cookies. If you need one, add it here behind a
                  click-to-load button.
                */}
              </div>
            ) : null}
          </aside>
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <Eyebrow>Before you ask</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Common questions</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}

/**
 * Warns the site owner — never the public — that the form has nowhere to send
 * enquiries. Shown in development and on preview deployments only, because
 * that is where it can still be fixed before a real visitor hits it. On the
 * live site the form's own error message handles it honestly instead.
 */
function DeliveryWarning() {
  const isLive =
    process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";

  if (isLive || hasDeliveryChannel()) return null;

  return (
    <div className="mb-6 rounded-lg border border-clay-300 bg-clay-50 p-4 text-sm leading-relaxed text-ink-800">
      <p className="font-bold text-clay-800">No delivery channel configured</p>
      <p className="mt-1">
        Submissions will fail. Set{" "}
        <code className="rounded bg-white px-1 py-0.5 text-[13px]">RESEND_API_KEY</code>,{" "}
        <code className="rounded bg-white px-1 py-0.5 text-[13px]">LEAD_TO_EMAIL</code> and{" "}
        <code className="rounded bg-white px-1 py-0.5 text-[13px]">LEAD_FROM_EMAIL</code>, or{" "}
        <code className="rounded bg-white px-1 py-0.5 text-[13px]">LEAD_WEBHOOK_URL</code>. See{" "}
        <code className="rounded bg-white px-1 py-0.5 text-[13px]">.env.example</code>.
      </p>
      <p className="mt-2 text-ink-600">
        This notice is not shown on the live site.
      </p>
    </div>
  );
}

/**
 * Booking widget slot. Set NEXT_PUBLIC_BOOKING_URL to a Calendly/Cal.com link
 * and this becomes a live embed; until then it's an honest placeholder rather
 * than a broken widget.
 */
function BookingCard() {
  if (site.bookingUrl) {
    return (
      <div className="overflow-hidden rounded-card border border-line bg-surface">
        <div className="border-b border-line p-6 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
            Book a free demo
          </h2>
          <p className="mt-1.5 text-[15px] text-ink-600">Pick a slot that suits you.</p>
        </div>
        <iframe
          src={site.bookingUrl}
          title="Book a free demo"
          loading="lazy"
          className="h-[620px] w-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="rounded-card border border-dashed border-clay-300 bg-clay-50/60 p-6">
      <h2 className="text-sm font-bold uppercase tracking-wide text-clay-700">
        Booking widget slot
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
        Set{" "}
        <code className="rounded bg-white px-1.5 py-0.5 text-[13px]">NEXT_PUBLIC_BOOKING_URL</code>{" "}
        to your Calendly or Cal.com link and a live scheduler appears here.
      </p>
      <p className="mt-3 text-sm text-ink-600">Until then, the form works fine.</p>
    </div>
  );
}

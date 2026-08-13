import { ContactForm } from "@/components/contact-form";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { faqs } from "@/content/about";
import { mailtoUrl, site, telUrl, whatsappUrl } from "@/content/site";
import { trustPoints } from "@/content/social-proof";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact — Book a Free Consultation",
  description: `Tell us what's going wrong and we'll tell you what would fix it. Free 30-minute consultation, no obligation. Call ${site.contact.phoneDisplay} or send a message.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <header className="border-b border-line bg-surface py-14 sm:py-18">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Tell us what&rsquo;s going wrong
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            You&rsquo;ll get a straight answer about whether we can help, what we&rsquo;d build, and
            what it would cost. If we&rsquo;re not the right fit, we&rsquo;ll say so and point you
            somewhere better.
          </p>
        </Container>
      </header>

      <Section className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
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
            <div className="rounded-card border border-line bg-surface p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                Rather talk now?
              </h2>

              <div className="mt-4 space-y-3">
                <a
                  href={telUrl}
                  className="flex items-center gap-3 rounded-lg border border-line bg-canvas px-4 py-3.5 transition-colors hover:border-clay-300 hover:bg-clay-50"
                >
                  <span aria-hidden="true" className="text-lg">
                    📞
                  </span>
                  <span>
                    <span className="block font-bold text-ink-950">
                      {site.contact.phoneDisplay}
                    </span>
                    <span className="text-sm text-ink-500">{site.contact.hours}</span>
                  </span>
                </a>

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
              </div>
            </div>

            <BookingCard />

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

            <div className="rounded-card border border-line bg-surface p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">Studio</h2>
              <address className="mt-3 text-[15px] not-italic leading-relaxed text-ink-700">
                {site.contact.address.street}
                <br />
                {site.contact.address.city}, {site.contact.address.region}{" "}
                {site.contact.address.postalCode}
              </address>
              <p className="mt-3 text-sm text-ink-500">
                Visits by appointment — we&rsquo;re usually out in someone&rsquo;s kitchen or salon.
              </p>
              {/*
                A map embed is deliberately omitted: third-party iframes are the
                heaviest thing on a typical contact page and they set cookies.
                If you need one, add it here behind a click-to-load button.
              */}
            </div>
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
 * Booking widget slot. Set NEXT_PUBLIC_BOOKING_URL to a Calendly/Cal.com link
 * and this becomes a live embed; until then it's an honest placeholder that
 * still routes people to the phone.
 */
function BookingCard() {
  if (site.bookingUrl) {
    return (
      <div className="overflow-hidden rounded-card border border-line bg-surface">
        <div className="border-b border-line p-6 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-500">
            Book a free consultation
          </h2>
          <p className="mt-1.5 text-[15px] text-ink-600">
            Pick a 30-minute slot that suits you.
          </p>
        </div>
        <iframe
          src={site.bookingUrl}
          title="Book a free consultation"
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
        Set <code className="rounded bg-white px-1.5 py-0.5 text-[13px]">NEXT_PUBLIC_BOOKING_URL</code>{" "}
        to your Calendly or Cal.com link and a live scheduler appears here.
      </p>
      <p className="mt-3 text-sm text-ink-600">
        Until then, the form and{" "}
        <a href={telUrl} className="font-semibold text-clay-700 underline underline-offset-2">
          {site.contact.phoneDisplay}
        </a>{" "}
        both work fine.
      </p>
    </div>
  );
}

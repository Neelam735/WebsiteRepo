import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { site, telUrl, whatsappUrl } from "@/content/site";
import { trustPoints } from "@/content/social-proof";

/**
 * The closing CTA. Appears at the foot of every marketing page, so a visitor
 * who has read to the bottom never has to scroll back up to act.
 */
export function CtaBanner({
  title = "Let's talk about your business",
  description = "A free 30-minute call. We'll tell you what we'd build, what it would cost, and whether it's worth doing at all — no pitch, no obligation.",
  primaryLabel = "Get a free consultation",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="bg-canvas pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 sm:px-10 sm:py-14 lg:px-14">
          {/* Warm glow, drawn with gradients so there's no image to load. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-clay-600/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-honey-500/15 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-300">{description}</p>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-ink-300">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 text-honey-400">
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

            <div className="flex flex-col gap-3">
              <ButtonLink href="/contact" variant="inverse" size="lg" className="group w-full">
                {primaryLabel}
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink
                href={telUrl}
                size="lg"
                className="w-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
              >
                Call {site.contact.phoneDisplay}
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl}
                size="lg"
                className="w-full bg-transparent text-ink-300 ring-1 ring-white/15 hover:bg-white/5 hover:text-white"
              >
                WhatsApp us
              </ButtonLink>
              <p className="mt-1 text-center text-xs text-ink-500">
                {site.contact.responsePromise}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

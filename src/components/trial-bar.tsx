import { TrialHighlight } from "@/components/trial-highlight";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { freeTrial } from "@/content/pricing";
import { primaryCta } from "@/content/site";

/**
 * The trial offer, at the very top of every page.
 *
 * Sits ABOVE the sticky header in the layout rather than inside it, so it is
 * the first thing on screen and then scrolls away for good. Putting it inside
 * the sticky region would cost every visitor a permanent band of viewport —
 * expensive on a phone, and for a message that only needs to land once.
 *
 * Because it scrolls out with the page, it takes no part in anchor offsets:
 * the `scroll-mt-*` values elsewhere are still measured against the header
 * alone and need no adjusting.
 */
export function TrialBar() {
  if (freeTrial.days === 0) return null;

  return (
    <div className="bg-ink-950 py-2.5 text-white">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
          <p className="text-sm font-bold leading-relaxed sm:text-[15px]">
            <TrialHighlight text={freeTrial.headline} tone="dark" />
          </p>

          {/* primaryCta.href is /contact#message — the enquiry form itself, not
              the top of the contact page. Someone who clicked this has already
              decided and should land on the fields, not on a heading. */}
          <ButtonLink href={primaryCta.href} variant="inverse" size="sm" className="shrink-0">
            {freeTrial.ctaLabel}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}

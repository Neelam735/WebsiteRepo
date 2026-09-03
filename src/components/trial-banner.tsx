import { freeTrial } from "@/content/pricing";
import { cn } from "@/lib/utils";

/**
 * The free-trial promise, given its own band so it reads as an offer rather
 * than another paragraph of body copy.
 *
 * Renders nothing when the offer is withdrawn (`freeTrial.days === 0`), so
 * turning it off never leaves an empty black box behind.
 */
export function TrialBanner({ className }: { className?: string }) {
  if (freeTrial.days === 0) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card bg-ink-950 px-6 py-8 text-center sm:px-10 sm:py-10",
        className,
      )}
    >
      {/* Same gradient treatment as the closing CTA, so the two dark blocks on
          the page look like siblings rather than two different designs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-carbon-600/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-chrome-500/15 blur-3xl"
      />

      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {freeTrial.label}
        </p>

        <p className="mx-auto mt-5 max-w-3xl text-balance text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl">
          {freeTrial.headline}
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
          {freeTrial.terms.map((term) => (
            <li key={term} className="flex items-center gap-2 text-sm text-ink-300">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 shrink-0 text-white">
                <path
                  d="m3.5 8.5 3 3 6-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {term}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * The same promise as one highlighted line, for places where a full band
 * would be too much weight.
 *
 * `tone` is the colour of the surface behind it, not of the highlight: on a
 * light page the marker is black, and on the dark hero it inverts to white.
 * Both keep the text-to-background contrast well past WCAG AA.
 */
export function TrialLine({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  if (freeTrial.days === 0) return null;

  return (
    <p className={cn("text-balance text-lg font-bold leading-relaxed sm:text-xl", className)}>
      {/* box-decoration-clone keeps the highlight unbroken across wrapped
          lines — without it the marker loses its padding mid-sentence. */}
      <mark
        className={cn(
          "box-decoration-clone rounded px-2 py-1",
          tone === "dark" ? "bg-white text-carbon-950" : "bg-carbon-950 text-white",
        )}
      >
        {freeTrial.headline}
      </mark>
    </p>
  );
}

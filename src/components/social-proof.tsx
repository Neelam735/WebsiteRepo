import { Card, PlaceholderBadge } from "@/components/ui/section";
import { clientLogos, stats, type Testimonial } from "@/content/social-proof";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  testimonial,
  className,
  featured = false,
}: {
  testimonial: Testimonial;
  className?: string;
  featured?: boolean;
}) {
  return (
    <Card
      as="figure"
      className={cn(
        "flex h-full flex-col",
        featured && "bg-clay-50/70 ring-1 ring-clay-100",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-clay-300">
        <path
          fill="currentColor"
          d="M9.5 5C6.5 6.6 5 9.3 5 13v6h6v-6H8.2c.1-2.3 1-3.9 2.6-4.8L9.5 5Zm9 0C15.5 6.6 14 9.3 14 13v6h6v-6h-2.8c.1-2.3 1-3.9 2.6-4.8L18.5 5Z"
        />
      </svg>

      <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed text-ink-800">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white"
        >
          {testimonial.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-ink-950">{testimonial.author}</p>
          <p className="truncate text-sm text-ink-600">
            {testimonial.role}, {testimonial.business}
          </p>
        </div>
        {testimonial.placeholder ? <PlaceholderBadge className="ml-auto shrink-0" /> : null}
      </figcaption>
    </Card>
  );
}

/** Headline numbers. Dark band so it reads as a punctuation mark between sections. */
export function StatBand() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-ink-950 p-6">
          <p className="font-display text-3xl font-bold text-honey-300 sm:text-4xl">{stat.value}</p>
          <p className="mt-1.5 text-sm font-semibold text-white">{stat.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-400">{stat.detail}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Client logos as wordmarks. Deliberately not image files: a fake logo image
 * is indistinguishable from a real endorsement, and these are placeholders.
 */
export function LogoCloud({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
        {clientLogos.map((logo) => (
          <span
            key={logo.name}
            className="font-display text-[15px] font-bold tracking-tight text-ink-400 transition-colors hover:text-ink-600 sm:text-base"
          >
            {logo.name}
          </span>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-ink-400">
        <PlaceholderBadge label="Sample client list" /> — replace with real logos once you have
        permission to use them.
      </p>
    </div>
  );
}

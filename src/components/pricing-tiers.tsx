import { CheckoutButton } from "@/components/checkout-button";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { freeTrial, tiers } from "@/content/pricing";
import { site } from "@/content/site";
import { canTakeOneOffPayment, payableTiers } from "@/lib/razorpay";
import { cn, formatPrice } from "@/lib/utils";

/**
 * The three plan cards.
 *
 * Shared by the home page section and the pricing page so the two can never
 * disagree about what a tier costs or includes — the kind of drift nobody
 * notices until a customer quotes the cheaper copy back at you.
 */
export function PricingTiers() {
  // Which tiers have a Razorpay plan behind them. Anything not payable keeps
  // its ordinary "talk to us" link, so this works with payments switched off
  // entirely.
  //
  // Both host pages are statically prerendered, so this runs at BUILD time.
  // Adding Razorpay keys to a host without rebuilding leaves the buttons as
  // they were — on Vercel a redeploy rebuilds, so the normal flow is fine, but
  // setting the variables alone is not enough.
  const payable = payableTiers();

  // Orders need only the keys; subscriptions also need a dashboard plan per
  // tier. So a tier with a plan bills monthly, and one without still takes a
  // single payment rather than showing a button that cannot do anything.
  const oneOff = canTakeOneOffPayment();

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.slug}
            className={cn(
              "relative flex flex-col rounded-card border bg-surface p-7",
              tier.highlighted
                ? "border-carbon-300 shadow-[var(--shadow-lift)] ring-1 ring-carbon-200 lg:-my-3 lg:py-10"
                : "border-line shadow-[var(--shadow-soft)]",
            )}
          >
            {tier.highlighted ? (
              <span className="absolute -top-3 left-7 rounded-full bg-carbon-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Most popular
              </span>
            ) : null}

            <h2 className="text-xl font-bold">{tier.name}</h2>
            <p className="mt-1.5 text-sm text-ink-600">{tier.audience}</p>

            <div className="mt-6">
              {/* "On request" rather than "Custom" — one of the tiers is
                  called Custom, and the same word in both places reads as a
                  mistake. */}
              <p className="font-display text-4xl font-extrabold text-ink-950">
                {tier.price === null ? (
                  "On request"
                ) : (
                  <>
                    {formatPrice(tier.price)}
                    {tier.period ? (
                      <span className="text-lg font-bold text-ink-500">/{tier.period}</span>
                    ) : null}
                  </>
                )}
              </p>
              <p className="mt-1 text-sm text-ink-500">{tier.priceNote}</p>

              {/* Only on tiers that carry a price — a trial on a quote-only
                  plan would promise something with no amount behind it. */}
              {freeTrial.days > 0 && tier.price !== null ? (
                <p className="mt-3 inline-flex items-center rounded-full bg-carbon-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {freeTrial.label}
                </p>
              ) : null}
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-ink-600">{tier.description}</p>

            <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-[15px] text-ink-700">
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-steel-500"
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
                  {feature}
                </li>
              ))}

              {tier.notIncluded?.map((item) => (
                <li key={item} className="flex gap-2.5 text-[15px] text-ink-400">
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0">
                    <path
                      d="M4.5 4.5l7 7m0-7l-7 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/*
              Two ways in, not one. The trial is the lead action on every tier;
              a priced tier also gets "Pay now" underneath for someone who has
              already made their mind up and does not want a conversation
              first. Custom has no amount to charge, so it keeps the single
              button.
            */}
            <div className="mt-7">
              <ButtonLink
                href={tier.cta.href}
                variant={tier.highlighted ? "primary" : "secondary"}
                size="lg"
                className="group w-full"
              >
                {tier.cta.label}
                <ArrowIcon />
              </ButtonLink>

              {tier.price !== null ? (
                <div className="mt-3">
                  <CheckoutButton
                    tier={tier.slug}
                    label={`Pay now — ${formatPrice(tier.price)}${tier.period ? `/${tier.period}` : ""}`}
                    companyName={site.name}
                    variant="ghost"
                    // An outline so it reads as a button at rest, not just on
                    // hover — lighter than the tier's own CTA above it, which
                    // stays the lead action.
                    className="ring-1 ring-ink-200 hover:ring-ink-300"
                    configured={payable.includes(tier.slug) || oneOff}
                    mode={payable.includes(tier.slug) ? "subscription" : "order"}
                    fallbackHref={tier.cta.href}
                  />
                  {/*
                    Says which of the two flows this actually is. A tier with
                    no dashboard plan takes a single payment, and calling that
                    "monthly" would be the kind of wrong that ends in a
                    chargeback.
                  */}
                  <p className="mt-2 text-center text-xs text-ink-500">
                    Card, UPI or netbanking via Razorpay ·{" "}
                    {payable.includes(tier.slug)
                      ? "Billed monthly from today, skips the trial"
                      : "One month, paid once · skips the trial"}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink-500">
        {/* Only claim tax is extra if it lawfully can be. Not registered for
            GST means the price shown is the price paid — saying "excludes
            tax" would promise a bill that cannot be issued. */}
        {site.gst.registered
          ? "Prices exclude GST. "
          : "Prices are the full amount payable — no tax is added. "}
        Anything beyond a package is scoped first, then quoted at a fixed price.
      </p>
    </>
  );
}

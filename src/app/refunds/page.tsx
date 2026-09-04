import Link from "next/link";

import { Container, Section } from "@/components/ui/section";
import { freeTrial } from "@/content/pricing";
import { hasEmail, mailtoUrl, site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cancellation & Refunds",
  description: `How to cancel a ${site.name} plan, when refunds are given, and how long they take.`,
  path: "/refunds",
});

/**
 * PLACEHOLDER: template wording. Have a lawyer review before launch, and read
 * every clause yourself — this page makes commitments in your name.
 *
 * Razorpay checks for a page like this during account activation, alongside
 * terms, privacy, pricing and a contact route. It also has to agree with what
 * the rest of the site says: the trial terms come from `freeTrial` rather than
 * being retyped, so withdrawing the offer cannot leave this page promising it.
 */
export default function RefundsPage() {
  /** One route to reach us, whichever contact details are configured. */
  const contactRoute = hasEmail ? (
    <>
      email{" "}
      <a href={mailtoUrl} className="font-semibold underline underline-offset-4">
        {site.contact.email}
      </a>
    </>
  ) : (
    <>
      use the{" "}
      <Link href="/contact#message" className="font-semibold underline underline-offset-4">
        contact form
      </Link>
    </>
  );

  return (
    <Section>
      <Container className="max-w-3xl px-0 sm:px-0 lg:px-0">
        <h1 className="text-4xl font-extrabold">Cancellation &amp; refunds</h1>
        <p className="mt-3 text-sm text-ink-500">Last updated: 4 September 2026</p>

        <div className="mt-8 space-y-6 text-[17px] leading-[1.75] text-ink-700">
          <section>
            <h2 className="text-2xl font-bold text-ink-950">The short version</h2>
            <p className="mt-2">
              Try it free for {freeTrial.days} days without paying anything. After that, cancel
              whenever you like — there is no lock-in and no notice period on a monthly plan. We
              don&rsquo;t refund a month you have already started, because the free trial exists so
              you never have to buy one to find out.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">The free trial</h2>
            <p className="mt-2">
              The {freeTrial.days}-day trial takes no card details and charges nothing. It does not
              turn into a paid plan on its own — when it ends, it simply stops unless you choose to
              subscribe. There is nothing to cancel and nothing to refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Cancelling a monthly plan</h2>
            <p className="mt-2">
              To cancel, {contactRoute}. We&rsquo;ll confirm in writing, usually the same business
              day. You can cancel at any point in the month.
            </p>
            <p className="mt-2">
              Cancelling stops the next payment. It does not cut your access off mid-month — your
              plan runs to the end of the period you have already paid for, and then ends. We do not
              charge a cancellation fee.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">When we refund</h2>
            <p className="mt-2">
              Part-months are not refunded, and neither is a month already under way. We will
              refund in full, without argument, in these cases:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>You were charged more than once for the same period.</li>
              <li>You were charged after asking us to cancel.</li>
              <li>You were charged the wrong amount.</li>
              <li>
                We could not deliver the service you paid for, and could not put it right in a
                reasonable time.
              </li>
            </ul>
            <p className="mt-3">
              If something has gone wrong that isn&rsquo;t on this list, {contactRoute} anyway and
              tell us what happened. We would rather sort it out directly than have you raise a
              dispute with your bank — a chargeback takes weeks and we can usually settle it in a
              day.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">How long a refund takes</h2>
            <p className="mt-2">
              Approved refunds are sent back to the original payment method through Razorpay, our
              payment provider. We start the refund within 3 business days of agreeing it. Your bank
              or card issuer then takes its own time to post it — usually 5 to 10 business days,
              occasionally longer. We cannot refund to a different card, account or person from the
              one that paid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Setup, migration and project work</h2>
            <p className="mt-2">
              Scoped work — configuration, data migration, training, go-live — is quoted at a fixed
              price and governed by the written agreement you sign, not by this page. Work already
              delivered and accepted is not refundable. If you cancel a project part-way, you pay
              for the stages completed to that point and nothing beyond them. Where the signed
              agreement and this page differ, the agreement wins.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Your data when you leave</h2>
            <p className="mt-2">
              You take your data with you — customers, members, orders, bookings and history —
              exported in a usable format, at no charge. Ask for it before your access ends. We keep
              it for 30 days after cancellation in case you change your mind, then delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Payment processing charges</h2>
            <p className="mt-2">
              Where you take payments from your own customers through the system, those fees are
              charged by your payment provider and paid directly to them. They never pass through
              us, and we cannot refund them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink-950">Contact</h2>
            <p className="mt-2">
              For anything on this page — cancelling, a refund, or a charge you don&rsquo;t
              recognise — {contactRoute}. We reply to every message within one business day.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}

import { NextResponse } from "next/server";

import { deliverNotice, sendCustomerEmail } from "@/lib/leads";
import { renderReceipt } from "@/lib/receipt";
import { verifyWebhookSignature } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Razorpay webhook — the reliable record of what actually happened.
 *
 * The browser callback can be lost (closed tab, dead battery, flaky network)
 * but this fires server to server regardless, and again on renewals months
 * later when no browser is involved at all.
 *
 * Point Razorpay at https://your-domain/api/razorpay/webhook and subscribe to
 * subscription.charged, subscription.halted and payment.failed. Put the secret
 * you set there in RAZORPAY_WEBHOOK_SECRET.
 */

/** Events worth telling a human about. Anything else is acknowledged and ignored. */
const NOTIFY: Record<string, string> = {
  "payment.captured": "Payment received",
  "subscription.activated": "Subscription activated",
  "subscription.charged": "Subscription payment received",
  "subscription.halted": "Subscription halted — payments are failing",
  "subscription.cancelled": "Subscription cancelled",
  "payment.failed": "Payment failed",
};

/** Paise to rupees, or an em dash when Razorpay did not send the field. */
function money(paise?: number): string {
  return typeof paise === "number" ? `₹${(paise / 100).toFixed(2)}` : "—";
}

/** What reaches the bank: what the customer paid, less the fee and its GST. */
function netSettlement(amount?: number, fee?: number, tax?: number): string {
  if (typeof amount !== "number" || typeof fee !== "number") return "—";
  return money(amount - fee - (typeof tax === "number" ? tax : 0));
}

export async function POST(request: Request) {
  // The raw bytes, exactly as sent. Parsing and re-serialising changes the
  // string and the HMAC will never match.
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    // Unsigned or wrongly signed: refuse, and do not echo anything back that
    // would help someone probe for a valid signature.
    console.error("[razorpay] Rejected a webhook with an invalid signature");
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let event: {
    event?: string;
    payload?: {
      subscription?: { entity?: { id?: string; status?: string; notes?: Record<string, string> } };
      payment?: {
        entity?: {
          id?: string;
          order_id?: string;
          amount?: number;
          currency?: string;
          email?: string;
          contact?: string;
          method?: string;
          /** Razorpay's cut, in paise. Charged to US, never to the customer. */
          fee?: number;
          /** GST on that fee, in paise. */
          tax?: number;
          notes?: Record<string, string>;
        };
      };
    };
  };

  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = event.event ?? "unknown";
  const subject = NOTIFY[name];

  if (subject) {
    const subscription = event.payload?.subscription?.entity;
    const payment = event.payload?.payment?.entity;
    const amount = typeof payment?.amount === "number" ? `₹${(payment.amount / 100).toFixed(2)}` : "—";

    try {
      await deliverNotice({
        subject,
        lines: [
          ["Event", name],
          ["Tier", subscription?.notes?.tier ?? "—"],
          ["Subscription", subscription?.id ?? "—"],
          ["Status", subscription?.status ?? "—"],
          ["Payment", payment?.id ?? "—"],
          ["Amount", amount],
          // Razorpay's fee is ours, not the customer's, so it appears on our
          // copy and never on theirs. `net` is what actually reaches the bank.
          ["Razorpay fee", money(payment?.fee)],
          ["GST on fee", money(payment?.tax)],
          ["Net to you", netSettlement(payment?.amount, payment?.fee, payment?.tax)],
          ["Email", payment?.email ?? "—"],
          ["Phone", payment?.contact ?? "—"],
        ],
        payload: { event: name },
      });
    } catch (error) {
      console.error("[razorpay] Notice failed for", name, error);
    }
  }

  // The customer's receipt. Sent from here rather than from the browser verify
  // route for two reasons: this fires even if the tab was closed, and the
  // customer's email address only exists on the payment entity — Checkout
  // hands the browser three ids and nothing else.
  if (name === "payment.captured" || name === "subscription.charged") {
    const payment = event.payload?.payment?.entity;
    const to = payment?.email;

    if (to && typeof payment?.amount === "number" && payment.id) {
      const tier = payment.notes?.tierName ?? payment.notes?.tier;
      const receipt = renderReceipt({
        paymentId: payment.id,
        reference: payment.order_id ?? event.payload?.subscription?.entity?.id,
        amountPaise: payment.amount,
        planName: tier,
        period: name === "subscription.charged" ? "monthly" : "one month",
        method: payment.method,
        feePaise: payment.fee,
        feeTaxPaise: payment.tax,
      });

      // Never let a receipt failure fail the webhook: the money has already
      // moved, and a non-2xx makes Razorpay retry and re-send the receipt.
      const sent = await sendCustomerEmail({ to, ...receipt });
      if (!sent) console.error("[razorpay] Receipt not sent for", payment.id);
    } else {
      console.warn("[razorpay] No customer email on", name, "— no receipt sent");
    }
  }

  // Always 200 on a verified webhook, even for events we ignore — a non-2xx
  // makes Razorpay retry an event we have already accepted.
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";

import { deliverNotice } from "@/lib/leads";
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
  "subscription.activated": "Subscription activated",
  "subscription.charged": "Subscription payment received",
  "subscription.halted": "Subscription halted — payments are failing",
  "subscription.cancelled": "Subscription cancelled",
  "payment.failed": "Payment failed",
};

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
      payment?: { entity?: { id?: string; amount?: number; currency?: string; email?: string; contact?: string } };
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
          ["Email", payment?.email ?? "—"],
          ["Phone", payment?.contact ?? "—"],
        ],
        payload: { event: name },
      });
    } catch (error) {
      console.error("[razorpay] Notice failed for", name, error);
    }
  }

  // Always 200 on a verified webhook, even for events we ignore — a non-2xx
  // makes Razorpay retry an event we have already accepted.
  return NextResponse.json({ ok: true });
}

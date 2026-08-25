import "server-only";

import crypto from "node:crypto";

/**
 * Razorpay subscriptions.
 *
 * Called over the REST API with fetch rather than the razorpay npm package —
 * the whole integration is three endpoints and two HMACs, and this avoids
 * another dependency in a project that deliberately has very few.
 *
 * `server-only` at the top is a guard, not decoration: importing this file
 * from a client component becomes a build error, so the key secret cannot be
 * bundled into the browser by accident.
 *
 * Configure in your host's dashboard:
 *
 *   RAZORPAY_KEY_ID            from the Razorpay dashboard
 *   RAZORPAY_KEY_SECRET        never prefix this with NEXT_PUBLIC_
 *   RAZORPAY_WEBHOOK_SECRET    set when you create the webhook
 *   RAZORPAY_PLAN_STARTER      plan_… id for the Starter plan
 *   RAZORPAY_PLAN_GROWTH       plan_… id for the Growth plan
 *
 * Plans are created in the Razorpay dashboard, not here. That is deliberate:
 * the price a customer is charged then lives with the payment provider, and a
 * bug in this repository cannot change what someone is billed.
 */

const API = "https://api.razorpay.com/v1";

export type CheckoutSuccess = {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
};

function keys() {
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  return { id, secret };
}

export function isRazorpayConfigured(): boolean {
  const { id, secret } = keys();
  return Boolean(id && secret);
}

/** The dashboard plan id backing a tier, or undefined if none is configured. */
export function planIdForTier(tierSlug: string): string | undefined {
  const byTier: Record<string, string | undefined> = {
    starter: process.env.RAZORPAY_PLAN_STARTER,
    growth: process.env.RAZORPAY_PLAN_GROWTH,
  };
  return byTier[tierSlug];
}

/** Which tiers can currently be paid for. Safe to call from a server component. */
export function payableTiers(): string[] {
  if (!isRazorpayConfigured()) return [];
  return ["starter", "growth"].filter((slug) => Boolean(planIdForTier(slug)));
}

function authHeader(): string {
  const { id, secret } = keys();
  return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
}

/**
 * Creates a subscription against a dashboard plan.
 *
 * The caller passes a tier slug, never an amount — the price comes from the
 * plan held by Razorpay, so a tampered request cannot change what is charged.
 */
export async function createSubscription({
  tierSlug,
  totalCount = 120,
  notes = {},
}: {
  tierSlug: string;
  totalCount?: number;
  notes?: Record<string, string>;
}): Promise<{ id: string; short_url?: string }> {
  const planId = planIdForTier(tierSlug);
  if (!planId) throw new Error(`No Razorpay plan configured for tier "${tierSlug}"`);

  const response = await fetch(`${API}/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: planId,
      // Ten years of monthly cycles. Razorpay requires a finite count; the
      // customer can cancel at any point, and the site promises no lock-in.
      total_count: totalCount,
      customer_notify: 1,
      notes: { tier: tierSlug, ...notes },
    }),
  });

  if (!response.ok) {
    throw new Error(`Razorpay subscription create failed (${response.status}): ${await response.text()}`);
  }

  return (await response.json()) as { id: string; short_url?: string };
}

/** Constant-time compare, so a wrong signature leaks nothing through timing. */
function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

/**
 * Verifies the signature Checkout hands back after a successful payment.
 *
 * NOTE THE FIELD ORDER. Subscriptions sign `payment_id|subscription_id`, which
 * is the reverse of the one-off order flow's `order_id|payment_id`. Getting it
 * backwards produces a signature that never matches, with no useful error.
 */
export function verifyCheckoutSignature(result: CheckoutSuccess): boolean {
  const { secret } = keys();
  if (!secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${result.razorpay_payment_id}|${result.razorpay_subscription_id}`)
    .digest("hex");

  return safeEqual(expected, result.razorpay_signature);
}

/**
 * Verifies a webhook against the raw request body.
 *
 * Must be the exact bytes Razorpay sent — parsing to JSON and re-serialising
 * changes the string and breaks the HMAC.
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return safeEqual(expected, signature);
}

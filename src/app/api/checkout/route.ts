import { NextResponse } from "next/server";

import { tiers } from "@/content/pricing";
import { check, clientKey } from "@/lib/rate-limit";
import { createSubscription, isRazorpayConfigured, planIdForTier } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Starts a subscription.
 *
 * The client sends a tier slug and nothing else. It never sends an amount, and
 * this route never reads one from the request — the price lives on the plan in
 * the Razorpay dashboard, so a tampered request cannot change what a customer
 * is charged.
 */
export async function POST(request: Request) {
  const limit = check(`checkout:${clientKey(request.headers)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Payments aren't switched on yet. Please get in touch and we'll set you up." },
      { status: 503 },
    );
  }

  let body: { tier?: unknown };
  try {
    body = (await request.json()) as { tier?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const tierSlug = typeof body.tier === "string" ? body.tier : "";

  // Must be a tier we actually publish, and one with a plan behind it.
  const tier = tiers.find((candidate) => candidate.slug === tierSlug);
  if (!tier || !planIdForTier(tierSlug)) {
    return NextResponse.json({ ok: false, error: "Unknown plan." }, { status: 400 });
  }

  try {
    const subscription = await createSubscription({ tierSlug });

    return NextResponse.json({
      ok: true,
      subscriptionId: subscription.id,
      // The publishable key. Safe in the browser; the secret never leaves the server.
      keyId: process.env.RAZORPAY_KEY_ID,
      tierName: tier.name,
    });
  } catch (error) {
    console.error("[checkout] Could not create subscription:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't start the payment. Please try again, or get in touch." },
      { status: 502 },
    );
  }
}

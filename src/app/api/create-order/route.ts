import { NextResponse } from "next/server";

import { tiers } from "@/content/pricing";
import { check, clientKey } from "@/lib/rate-limit";
import { RazorpayAuthError, createOrder, isRazorpayConfigured } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Creates a one-off Razorpay order — step one of Standard Checkout.
 *
 * The client sends a tier slug and NOTHING ELSE. In particular it never sends
 * an amount and this route never reads one from the request: the price is
 * looked up from src/content/pricing.ts on the server. An order, unlike a
 * subscription, carries its amount rather than inheriting it from a dashboard
 * plan, so this lookup is the only thing standing between a tampered request
 * and a ₹1 invoice for a ₹1,999 plan.
 */
export async function POST(request: Request) {
  const limit = check(`create-order:${clientKey(request.headers)}`);
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
  if (!tierSlug) {
    return NextResponse.json({ ok: false, error: "Missing plan." }, { status: 400 });
  }

  // Must be a tier we actually publish, and one that carries a price. Quote-only
  // tiers have no amount to charge.
  const tier = tiers.find((candidate) => candidate.slug === tierSlug);
  if (!tier || tier.price === null) {
    return NextResponse.json({ ok: false, error: "Unknown plan." }, { status: 400 });
  }

  const amountPaise = Math.round(tier.price * 100);
  if (amountPaise < 100) {
    // Razorpay's floor is ₹1. A tier priced below it is a content mistake, and
    // sending it upstream would only produce a less useful error.
    console.error(`[create-order] Tier "${tierSlug}" is priced below Razorpay's ₹1 minimum`);
    return NextResponse.json({ ok: false, error: "That plan can't be paid for online." }, { status: 400 });
  }

  try {
    const order = await createOrder({
      amountPaise,
      // Unique per attempt and readable in the dashboard. Capped at 40 chars
      // by createOrder, which is why the slug comes first.
      receipt: `${tierSlug}-${Date.now()}`,
      notes: { tier: tierSlug, tierName: tier.name },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      // The publishable key. Safe in the browser, and returned from here rather
      // than baked in as NEXT_PUBLIC_* so rotating it needs no rebuild.
      keyId: process.env.RAZORPAY_KEY_ID,
      tierName: tier.name,
    });
  } catch (error) {
    if (error instanceof RazorpayAuthError) {
      console.error("[create-order] Razorpay rejected the API key — check RAZORPAY_KEY_ID/SECRET");
      return NextResponse.json(
        { ok: false, error: "Payments are misconfigured. Please get in touch." },
        { status: 401 },
      );
    }

    console.error("[create-order] Could not create order:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't start the payment. Please try again, or get in touch." },
      { status: 500 },
    );
  }
}

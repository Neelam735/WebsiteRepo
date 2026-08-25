import { NextResponse } from "next/server";

import { deliverNotice } from "@/lib/leads";
import { verifyCheckoutSignature } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Verifies the signature Checkout returns to the browser after payment.
 *
 * This confirms the browser is telling the truth, which is enough to show the
 * customer a success screen. It is NOT the system of record: a closed tab
 * during a successful payment means this route never runs. The webhook is the
 * reliable path — see api/razorpay/webhook.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const asString = (value: unknown) => (typeof value === "string" ? value : "");

  const result = {
    razorpay_payment_id: asString(body.razorpay_payment_id),
    razorpay_subscription_id: asString(body.razorpay_subscription_id),
    razorpay_signature: asString(body.razorpay_signature),
  };

  if (!result.razorpay_payment_id || !result.razorpay_subscription_id || !result.razorpay_signature) {
    return NextResponse.json({ ok: false, error: "Incomplete payment result." }, { status: 400 });
  }

  if (!verifyCheckoutSignature(result)) {
    // Either a genuine mismatch or someone posting fabricated ids. Both are
    // worth seeing in the logs; neither gets a success screen.
    console.error("[checkout] Signature verification failed", {
      paymentId: result.razorpay_payment_id,
      subscriptionId: result.razorpay_subscription_id,
    });
    return NextResponse.json({ ok: false, error: "We couldn't verify that payment." }, { status: 400 });
  }

  // No database, so a notification is the only way anyone finds out. Failing to
  // notify must not fail the customer's payment — it already succeeded.
  try {
    await deliverNotice({
      subject: "New subscription started",
      lines: [
        ["Tier", asString(body.tier) || "—"],
        ["Subscription", result.razorpay_subscription_id],
        ["Payment", result.razorpay_payment_id],
        ["Name", asString(body.name) || "—"],
        ["Email", asString(body.email) || "—"],
        ["Phone", asString(body.phone) || "—"],
      ],
    });
  } catch (error) {
    console.error("[checkout] Payment verified but notice failed:", error);
  }

  return NextResponse.json({ ok: true });
}

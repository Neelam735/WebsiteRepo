import { NextResponse } from "next/server";

import { deliverNotice } from "@/lib/leads";
import { verifyOrderSignature } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Verifies the signature Checkout hands the browser after a one-off order.
 *
 * This confirms the browser is telling the truth, which is enough to show a
 * success screen. It is NOT the system of record: a tab closed during a
 * successful payment means this never runs. api/razorpay/webhook is the
 * reliable path, because it fires server to server regardless.
 *
 * A mismatch returns 400 and nothing is treated as paid.
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
    razorpay_order_id: asString(body.razorpay_order_id),
    razorpay_payment_id: asString(body.razorpay_payment_id),
    razorpay_signature: asString(body.razorpay_signature),
  };

  if (!result.razorpay_order_id || !result.razorpay_payment_id || !result.razorpay_signature) {
    return NextResponse.json({ ok: false, error: "Incomplete payment result." }, { status: 400 });
  }

  if (!verifyOrderSignature(result)) {
    // Either a genuine mismatch or someone posting fabricated ids. Both are
    // worth seeing in the logs; neither gets a success screen.
    console.error("[verify-payment] Signature verification failed", {
      orderId: result.razorpay_order_id,
      paymentId: result.razorpay_payment_id,
    });
    return NextResponse.json({ ok: false, error: "We couldn't verify that payment." }, { status: 400 });
  }

  // No database, so a notification is the only way anyone finds out. Failing to
  // notify must not fail the customer — their money has already moved.
  try {
    await deliverNotice({
      subject: "Payment received",
      lines: [
        ["Tier", asString(body.tier) || "—"],
        ["Order", result.razorpay_order_id],
        ["Payment", result.razorpay_payment_id],
        ["Name", asString(body.name) || "—"],
        ["Email", asString(body.email) || "—"],
        ["Phone", asString(body.phone) || "—"],
      ],
    });
  } catch (error) {
    console.error("[verify-payment] Payment verified but the notice failed to send:", error);
  }

  return NextResponse.json({ ok: true });
}

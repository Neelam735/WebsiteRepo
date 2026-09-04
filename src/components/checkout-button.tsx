"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Opens Razorpay Checkout for one tier.
 *
 * Two modes, chosen by the server (see pricing-tiers.tsx):
 *
 *   "subscription"  recurring monthly billing against a dashboard plan.
 *   "order"         a single charge. Needs no plan, so it works on a fresh
 *                   account, and it bills once rather than every month.
 *
 * They differ in more than the endpoint: the object handed to Checkout takes
 * `subscription_id` or `order_id`, and the signature returned afterwards is
 * built from different fields in a different order. Keeping both in one
 * component is what stops those four details drifting apart.
 *
 * The Checkout script is loaded on demand, the first time someone actually
 * clicks — visitors who never intend to buy do not pay for it.
 */

type RazorpayInstance = {
  open: () => void;
  /** Razorpay emits "payment.failed" here; the modal stays open for a retry. */
  on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadCheckout(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type Status = "idle" | "starting" | "done" | "error";

export function CheckoutButton({
  tier,
  label,
  companyName,
  variant = "primary",
  configured,
  mode,
  fallbackHref,
  className,
}: {
  tier: string;
  label: string;
  companyName: string;
  variant?: "primary" | "secondary" | "ghost";
  /**
   * Whether a Razorpay plan is actually configured for this tier. Decided on
   * the server by payableTiers(), because only the server can see the keys.
   * False means the button explains itself instead of loading a checkout that
   * cannot complete.
   */
  configured: boolean;
  /** Which flow to run. See the note at the top of this file. */
  mode: "subscription" | "order";
  /** Where to send someone when payments are off. */
  fallbackHref: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function start() {
    // No plan behind this tier. Fail here rather than pulling down the
    // Checkout script and calling an endpoint that can only return a 503.
    if (!configured) {
      setMessage("Card payments aren't switched on yet — get in touch and we'll set you up.");
      setStatus("error");
      return;
    }

    setStatus("starting");
    setMessage("");

    try {
      const scriptReady = await loadCheckout();
      if (!scriptReady || !window.Razorpay) {
        throw new Error("Checkout script did not load");
      }

      const isOrder = mode === "order";
      const createPath = isOrder ? "/api/create-order" : "/api/checkout";
      const verifyPath = isOrder ? "/api/verify-payment" : "/api/checkout/verify";

      const created = await fetch(createPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });

      const data = (await created.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        subscriptionId?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
        tierName?: string;
      };

      const reference = isOrder ? data.orderId : data.subscriptionId;
      if (!created.ok || !data.ok || !reference || !data.keyId) {
        setMessage(data.error ?? "We couldn't start the payment. Please get in touch.");
        setStatus("error");
        return;
      }

      const checkout = new window.Razorpay({
        key: data.keyId,
        // One or the other. Sending both makes Checkout ignore the order.
        ...(isOrder
          ? { order_id: reference, amount: data.amount, currency: data.currency ?? "INR" }
          : { subscription_id: reference }),
        name: companyName,
        description: `${data.tierName ?? tier}${isOrder ? " — one month" : " — monthly"}`,
        theme: { color: "#000000" },
        handler: async (result: Record<string, string>) => {
          // Confirms the browser is telling the truth. The webhook is what
          // actually records the payment, so a failure here is not the end of
          // the world — the money has already moved.
          const verified = await fetch(verifyPath, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...result, tier }),
          })
            .then((response) => response.json())
            .catch(() => ({ ok: false }));

          if (verified.ok) {
            setStatus("done");
          } else {
            setMessage(
              "Your payment went through, but we couldn't confirm it here. Please get in touch and we'll sort it out — do not pay again.",
            );
            setStatus("error");
          }
        },
        modal: {
          // Closed without paying. Back to idle silently — a cancellation is
          // a decision, not an error, and does not deserve a red message.
          ondismiss: () => setStatus("idle"),
        },
      });

      // A declined card. The modal stays open so they can try another method,
      // so this only records why, rather than tearing the checkout down.
      checkout.on("payment.failed", (response) => {
        console.error("[checkout] payment.failed", response?.error);
        setMessage(
          response?.error?.description
            ? `Payment failed: ${response.error.description} You can try another method.`
            : "That payment didn't go through. You can try another method.",
        );
        setStatus("error");
      });

      checkout.open();
    } catch (error) {
      console.error("[checkout]", error);
      setMessage("We couldn't open the payment window. Please get in touch.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-lg border border-steel-500/30 bg-steel-100 px-4 py-3 text-center text-sm font-medium text-ink-900"
      >
        You&rsquo;re subscribed — we&rsquo;ll be in touch today to get you set up.
      </div>
    );
  }

  return (
    <div>
      <Button
        type="button"
        onClick={start}
        variant={variant}
        size="lg"
        disabled={status === "starting"}
        className={cn("w-full", className)}
      >
        {status === "starting" ? "Opening…" : label}
      </Button>
      {message ? (
        <p role="alert" className="mt-2 text-sm text-carbon-700">
          {message}{" "}
          <Link href={fallbackHref} className="font-semibold underline underline-offset-4">
            Contact us
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}

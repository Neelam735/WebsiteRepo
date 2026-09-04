"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Starts a Razorpay subscription for one tier.
 *
 * The Checkout script is loaded on demand, the first time someone actually
 * clicks — visitors who never intend to buy do not pay for it.
 */

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
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

      const created = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });

      const data = (await created.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        subscriptionId?: string;
        keyId?: string;
        tierName?: string;
      };

      if (!created.ok || !data.ok || !data.subscriptionId || !data.keyId) {
        setMessage(data.error ?? "We couldn't start the payment. Please get in touch.");
        setStatus("error");
        return;
      }

      const checkout = new window.Razorpay({
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: companyName,
        description: `${data.tierName ?? tier} — monthly`,
        theme: { color: "#000000" },
        handler: async (result: Record<string, string>) => {
          // Confirms the browser is telling the truth. The webhook is what
          // actually records the payment, so a failure here is not the end of
          // the world — the money has already moved.
          const verified = await fetch("/api/checkout/verify", {
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
          ondismiss: () => setStatus("idle"),
        },
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

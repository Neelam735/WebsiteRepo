import { NextResponse } from "next/server";

import { deliverLead } from "@/lib/leads";
import { hasErrors, validateLead, type LeadInput } from "@/lib/lead-schema";
import { check, clientKey } from "@/lib/rate-limit";
import { contactFallbackPhrase, fallbackSentence } from "@/content/site";

/** Node runtime: `deliverLead` may use provider SDKs that expect it. */
export const runtime = "nodejs";
/** Never cached — it's a mutation. */
export const dynamic = "force-dynamic";

function trimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const limit = check(clientKey(request.headers));
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: contactFallbackPhrase
          ? `Too many messages from this connection. Try again in a few minutes, or ${contactFallbackPhrase}.`
          : "Too many messages from this connection. Please try again in a few minutes.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real visitor never sees this field, so anything in it is a bot.
  // Answer 200 so the bot believes it succeeded and doesn't retry differently.
  if (trimmed(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const lead: LeadInput = {
    name: trimmed(payload.name),
    business: trimmed(payload.business),
    businessType: trimmed(payload.businessType),
    email: trimmed(payload.email),
    phone: trimmed(payload.phone),
    interest: trimmed(payload.interest),
    locations: trimmed(payload.locations),
    message: trimmed(payload.message),
  };

  const errors = validateLead(lead);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  try {
    const result = await deliverLead(lead);

    if (!result.delivered) {
      return NextResponse.json(
        {
          ok: false,
          error: result.unconfigured
            ? // Not retryable: the form has no delivery channel configured, so
              // trying again changes nothing until someone sets one up.
              fallbackSentence(
                "This form isn't connected to an inbox yet, so your message wasn't sent.",
                { retryable: false },
              )
            : fallbackSentence("We couldn't send that just now."),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected failure:", error);
    return NextResponse.json(
      { ok: false, error: fallbackSentence("Something went wrong on our end.") },
      { status: 500 },
    );
  }
}

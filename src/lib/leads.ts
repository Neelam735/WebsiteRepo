import type { LeadInput } from "./lead-schema";

/**
 * Lead delivery.
 *
 * Two channels, either or both:
 *
 *   RESEND_API_KEY + LEAD_TO_EMAIL + LEAD_FROM_EMAIL
 *       Emails the enquiry to your inbox via Resend (resend.com). Called over
 *       plain fetch, so there's no SDK dependency to keep updated.
 *
 *   LEAD_WEBHOOK_URL
 *       POSTs the lead as JSON. Point it at a CRM, HubSpot, Zapier, Make,
 *       Slack — anything that accepts a webhook.
 *
 * To use a different provider (Postmark, SendGrid, Mailgun), replace
 * `sendViaResend` — the route only depends on `deliverLead`.
 *
 * If neither is configured, the lead is written to the server log so it is
 * recoverable, and the caller reports failure rather than pretending the
 * message was sent. A silently swallowed enquiry is worse than an error.
 */

export type DeliveryResult = {
  delivered: boolean;
  channels: string[];
  /** Set when no channel is configured — surfaced to the visitor as "call us instead". */
  unconfigured: boolean;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEmail(lead: LeadInput): { subject: string; html: string; text: string } {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Business", lead.business || "—"],
    ["Business type", lead.businessType],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Interested in", lead.interest || "—"],
    ["Locations", lead.locations || "—"],
  ];

  const subject = `New enquiry — ${lead.name}${lead.business ? ` (${lead.business})` : ""}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#241d18;max-width:640px">
      <h2 style="margin:0 0 16px">New enquiry from the website</h2>
      <table cellpadding="6" style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#6b5a4d;width:140px;vertical-align:top">${label}</td>` +
              `<td style="font-weight:600">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(lead.message)}</p>
    </div>
  `.trim();

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    lead.message,
  ].join("\n");

  return { subject, html, text };
}

async function sendViaResend(lead: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) throw new Error("Resend is not fully configured");

  const { subject, html, text } = renderEmail(lead);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      subject,
      html,
      text,
      // So hitting reply in the inbox replies to the business owner.
      reply_to: lead.email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

async function sendViaWebhook(lead: LeadInput): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) throw new Error("Webhook is not configured");

  const secret = process.env.LEAD_WEBHOOK_SECRET;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { "X-Webhook-Secret": secret } : {}),
    },
    body: JSON.stringify({
      source: "website-contact-form",
      submittedAt: new Date().toISOString(),
      ...lead,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}

export async function deliverLead(lead: LeadInput): Promise<DeliveryResult> {
  const tasks: { channel: string; run: () => Promise<void> }[] = [];

  if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL && process.env.LEAD_FROM_EMAIL) {
    tasks.push({ channel: "email", run: () => sendViaResend(lead) });
  }

  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push({ channel: "webhook", run: () => sendViaWebhook(lead) });
  }

  if (tasks.length === 0) {
    // Nothing wired up yet. Log it so the enquiry isn't lost, and tell the caller.
    console.warn(
      "[leads] No delivery channel configured. Set RESEND_API_KEY + LEAD_TO_EMAIL + " +
        "LEAD_FROM_EMAIL, or LEAD_WEBHOOK_URL. Lead follows:\n",
      JSON.stringify(lead, null, 2),
    );
    return { delivered: false, channels: [], unconfigured: true };
  }

  const results = await Promise.allSettled(tasks.map((task) => task.run()));

  const succeeded: string[] = [];
  results.forEach((result, index) => {
    const channel = tasks[index]!.channel;
    if (result.status === "fulfilled") {
      succeeded.push(channel);
    } else {
      console.error(`[leads] ${channel} delivery failed:`, result.reason);
    }
  });

  // One channel succeeding is enough — the enquiry reached a human.
  if (succeeded.length === 0) {
    console.error("[leads] All channels failed. Lead follows:\n", JSON.stringify(lead, null, 2));
  }

  return { delivered: succeeded.length > 0, channels: succeeded, unconfigured: false };
}

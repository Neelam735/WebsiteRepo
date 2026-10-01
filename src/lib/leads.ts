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
      <p style="white-space:pre-wrap;line-height:1.6">${
        lead.message ? escapeHtml(lead.message) : "<em style=\"color:#757575\">None given</em>"
      }</p>
    </div>
  `.trim();

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    lead.message || "None given",
  ].join("\n");

  return { subject, html, text };
}

/**
 * The email channel's settings, in one place so the three callers below cannot
 * disagree about whether it is configured.
 *
 * The addresses default in code because losing an environment variable should
 * not silently disconnect the enquiry form. The API KEY has no default and
 * never will — it is a secret, and a secret with a fallback is a secret that
 * ends up in a repository.
 *
 * NOTE ON `from`: Resend will only send from a domain verified in YOUR Resend
 * account. If bizwisetech.com is not verified there, this address is rejected
 * and the enquiry is lost — verify the domain, or override LEAD_FROM_EMAIL
 * with an address on a domain that is.
 */
function emailChannel() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    to: process.env.LEAD_TO_EMAIL ?? "support@bizwisetech.com",
    from: process.env.LEAD_FROM_EMAIL ?? "support@bizwisetech.com",
  };
}

async function sendViaResend(lead: LeadInput): Promise<void> {
  const { apiKey, to, from } = emailChannel();

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

/** True when at least one delivery channel is fully configured. */
export function hasDeliveryChannel(): boolean {
  const { apiKey, to, from } = emailChannel();
  const emailReady = Boolean(apiKey && to && from);
  return emailReady || Boolean(process.env.LEAD_WEBHOOK_URL);
}

export async function deliverLead(lead: LeadInput): Promise<DeliveryResult> {
  const tasks: { channel: string; run: () => Promise<void> }[] = [];

  const email = emailChannel();
  if (email.apiKey && email.to && email.from) {
    tasks.push({ channel: "email", run: () => sendViaResend(lead) });
  }

  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push({ channel: "webhook", run: () => sendViaWebhook(lead) });
  }

  if (tasks.length === 0) {
    // Nothing wired up yet. Name exactly which variables the server can and
    // cannot see: "configure something" sends people hunting, while a list of
    // set/MISSING turns it into one obvious fix. Only presence is logged, never
    // a value, so the API key never reaches the log.
    const seen = (name: string) => (process.env[name] ? "set" : "MISSING");
    console.warn(
      "[leads] No delivery channel configured, so this enquiry was not sent.\n" +
        "  Email channel needs the key; the addresses default in code:\n" +
        `    RESEND_API_KEY   ${seen("RESEND_API_KEY")}\n` +
        `    LEAD_TO_EMAIL    ${seen("LEAD_TO_EMAIL")} (defaults to ${emailChannel().to})\n` +
        `    LEAD_FROM_EMAIL  ${seen("LEAD_FROM_EMAIL")} (defaults to ${emailChannel().from})\n` +
        "  Or the webhook channel needs:\n" +
        `    LEAD_WEBHOOK_URL ${seen("LEAD_WEBHOOK_URL")}\n` +
        "  Note: these are server-side variables — a NEXT_PUBLIC_ prefix will " +
        "not work, and Vercel needs a redeploy after adding them.\n" +
        "  The enquiry follows so it is not lost:\n",
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

/**
 * Sends a plain notice through whichever lead channels are configured.
 *
 * Used for events that are not enquiries — a payment, for instance. There is
 * no database in this project, so a notification is how anyone finds out that
 * something happened. Returns true if at least one channel accepted it.
 */
/**
 * Sends one transactional email to a CUSTOMER, rather than to us.
 *
 * Separate from deliverNotice on purpose: that one always goes to our own
 * inbox, and quietly reusing it would mean a receipt intended for a customer
 * silently arriving at support@ instead. Returns false rather than throwing —
 * a receipt that fails to send must never fail a payment that has already
 * succeeded.
 */
export async function sendCustomerEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<boolean> {
  const { apiKey, from } = emailChannel();
  if (!apiKey || !from || !to) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html, text }),
    });

    if (!response.ok) {
      console.error(`[receipt] Resend rejected the send (${response.status}): ${await response.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[receipt] Could not send:", error);
    return false;
  }
}

export async function deliverNotice({
  subject,
  lines,
  payload,
}: {
  subject: string;
  lines: [string, string][];
  payload?: Record<string, unknown>;
}): Promise<boolean> {
  const tasks: Promise<void>[] = [];

  // Same settings as the enquiry path. Reading process.env directly here meant
  // payment notices ignored the defaults enquiries honour, so the two could
  // end up at different addresses the moment one variable was unset.
  const { apiKey, to, from } = emailChannel();

  if (apiKey && to && from) {
    const html = `
      <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#171717;max-width:640px">
        <h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>
        <table cellpadding="6" style="border-collapse:collapse;width:100%">
          ${lines
            .map(
              ([label, value]) =>
                `<tr><td style="color:#5c5c5c;width:180px;vertical-align:top">${escapeHtml(label)}</td>` +
                `<td style="font-weight:600">${escapeHtml(value)}</td></tr>`,
            )
            .join("")}
        </table>
      </div>
    `.trim();

    tasks.push(
      (async () => {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from,
            to: to.split(",").map((address) => address.trim()),
            subject,
            html,
            text: lines.map(([label, value]) => `${label}: ${value}`).join("\n"),
          }),
        });
        if (!response.ok) throw new Error(`Resend responded ${response.status}`);
      })(),
    );
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  if (url) {
    const secret = process.env.LEAD_WEBHOOK_SECRET;
    tasks.push(
      (async () => {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(secret ? { "X-Webhook-Secret": secret } : {}),
          },
          body: JSON.stringify({
            source: "website-notice",
            subject,
            at: new Date().toISOString(),
            ...Object.fromEntries(lines),
            ...payload,
          }),
        });
        if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
      })(),
    );
  }

  if (tasks.length === 0) {
    console.warn(`[notice] No delivery channel configured. ${subject}`, lines);
    return false;
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((result) => {
    if (result.status === "rejected") console.error("[notice] delivery failed:", result.reason);
  });
  return results.some((result) => result.status === "fulfilled");
}

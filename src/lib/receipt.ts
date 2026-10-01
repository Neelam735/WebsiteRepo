import { addressLines, site, tradesUnderAnotherName } from "@/content/site";

/**
 * The receipt a customer gets after a successful payment.
 *
 * WHAT THIS IS NOT: a tax invoice. While `site.gst.registered` is false we are
 * not registered for GST, so we cannot issue one and cannot show GST on it —
 * this is a bill of supply / payment receipt. Register, flip the flag, add the
 * GSTIN, and the wording and the tax line change with it.
 *
 * THE GATEWAY FEE depends on the fee-bearer setting in the Razorpay dashboard,
 * mirrored by `site.customerBearsGatewayFee`:
 *
 *   customer-borne  Razorpay adds its fee on top at checkout, so the customer
 *                   really did pay it and the receipt itemises it. The total
 *                   here is what left their account.
 *   merchant-borne  the fee is our cost. It must NOT appear here — the
 *                   customer paid the plan price and nothing more.
 *
 * Either way the fee also goes on our own copy of the notification, where it
 * is used to show the net settlement.
 *
 * Numbering: there is no database, so there is no serial invoice series. The
 * Razorpay payment id is used as the reference instead — unique, traceable in
 * the dashboard, and honest about what it is. If you need a numbered series
 * for your books, that needs persistence first.
 */

export type ReceiptInput = {
  /** Razorpay payment id — the reference printed on the receipt. */
  paymentId: string;
  /** Order or subscription id, whichever flow this was. */
  reference?: string;
  /** Total paid, in paise, exactly as Razorpay reports it. */
  amountPaise: number;
  /** Plan name, e.g. "Growth". */
  planName?: string;
  /** "one month" or "monthly" — what the payment bought. */
  period?: string;
  /** Payment method as Razorpay describes it (card, upi, netbanking…). */
  method?: string;
  /** Razorpay's fee in paise, from the payment entity. */
  feePaise?: number;
  /** GST on that fee, in paise. */
  feeTaxPaise?: number;
  paidAt?: Date;
};

const inr = (paise: number) =>
  `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Who the customer is contracting with, spelled out. */
function issuer(): string[] {
  const lines: string[] = [site.name];
  if (tradesUnderAnotherName) lines.push(`a trading name of ${site.legalName}`);
  lines.push(...addressLines);
  if (site.contact.email) lines.push(site.contact.email);
  if (site.contact.phoneDisplay) lines.push(site.contact.phoneDisplay);
  if (site.gst.registered && site.gst.gstin) lines.push(`GSTIN ${site.gst.gstin}`);
  return lines;
}

export function renderReceipt(input: ReceiptInput): {
  subject: string;
  html: string;
  text: string;
} {
  const paidAt = input.paidAt ?? new Date();
  const date = paidAt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // "Tax invoice" is a regulated term. Unregistered, this is a receipt.
  const title = site.gst.registered ? "Tax invoice" : "Payment receipt";
  const description = `${input.planName ?? "Subscription"}${input.period ? ` — ${input.period}` : ""}`;
  const total = inr(input.amountPaise);

  // With the customer bearing the fee, Razorpay's `amount` is plan + fee, so
  // the plan line has to be derived by subtracting it back out. Merchant-borne,
  // `amount` IS the plan price and the fee never appears.
  const feePaise =
    site.customerBearsGatewayFee && typeof input.feePaise === "number"
      ? input.feePaise + (typeof input.feeTaxPaise === "number" ? input.feeTaxPaise : 0)
      : 0;
  const planPaise = input.amountPaise - feePaise;

  const taxNote = site.gst.registered
    ? "Amounts shown include GST at the applicable rate."
    : "No tax has been added. We are not currently registered for GST, so this is a receipt rather than a tax invoice.";

  const rows: [string, string][] = [
    ["Date", date],
    ["Reference", input.paymentId],
    ...(input.reference ? ([["Order", input.reference]] as [string, string][]) : []),
    ...(input.method ? ([["Paid by", input.method]] as [string, string][]) : []),
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#171717;max-width:640px;line-height:1.6">
      <h1 style="margin:0 0 4px;font-size:22px">${escapeHtml(title)}</h1>
      <p style="margin:0 0 24px;color:#5c5c5c;font-size:14px">Thank you — your payment has gone through.</p>

      <div style="font-size:14px;color:#5c5c5c;margin-bottom:24px">
        ${issuer()
          .map((line, index) =>
            index === 0
              ? `<div style="font-weight:700;color:#171717;font-size:16px">${escapeHtml(line)}</div>`
              : `<div>${escapeHtml(line)}</div>`,
          )
          .join("")}
      </div>

      <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;margin-bottom:20px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="color:#5c5c5c;padding:3px 0;width:160px">${escapeHtml(label)}</td>` +
              `<td style="padding:3px 0;font-weight:600">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>

      <table cellpadding="0" cellspacing="0" style="width:100%;font-size:15px;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6">
        <tr>
          <td style="padding:14px 0 6px">${escapeHtml(description)}</td>
          <td style="padding:14px 0 6px;text-align:right;font-weight:600">${inr(planPaise)}</td>
        </tr>
        ${
          feePaise > 0
            ? `<tr>
          <td style="padding:0 0 14px;color:#5c5c5c">Payment gateway fee</td>
          <td style="padding:0 0 14px;text-align:right;color:#5c5c5c">${inr(feePaise)}</td>
        </tr>`
            : ""
        }
      </table>

      <table cellpadding="0" cellspacing="0" style="width:100%;font-size:17px;margin-top:12px">
        <tr>
          <td style="font-weight:700">Total paid</td>
          <td style="text-align:right;font-weight:800">${total}</td>
        </tr>
      </table>

      <p style="margin:24px 0 0;font-size:13px;color:#757575">${escapeHtml(taxNote)}</p>
      <p style="margin:10px 0 0;font-size:13px;color:#757575">
        Keep this email as your record of payment. To cancel, or if anything here looks wrong,
        reply to this message${site.contact.email ? ` or write to ${escapeHtml(site.contact.email)}` : ""}.
      </p>
    </div>
  `.trim();

  const text = [
    title.toUpperCase(),
    "",
    ...issuer(),
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `${description}   ${inr(planPaise)}`,
    ...(feePaise > 0 ? [`Payment gateway fee   ${inr(feePaise)}`] : []),
    `Total paid: ${total}`,
    "",
    taxNote,
    "Keep this email as your record of payment.",
  ].join("\n");

  return { subject: `${title} — ${site.name} (${total})`, html, text };
}

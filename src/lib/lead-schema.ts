/**
 * Shared contact-form contract.
 *
 * Validation lives here so the browser and the API route enforce the same
 * rules from the same source — the client copy is a convenience for the
 * visitor, the server copy is the one that counts.
 *
 * Hand-rolled rather than pulled from a schema library: the form has seven
 * fields, and this keeps the client bundle free of a validation dependency.
 */

export const businessTypes = [
  "Restaurant, cafe or bar",
  "Gym, studio or fitness business",
  "Both",
  "Something else",
] as const;

export const interestOptions = [
  "Restaurant management system",
  "Gym management system",
  "Moving off our current system",
  "Adding a module to what we run today",
  "Not sure yet — need advice",
] as const;

export const locationCounts = [
  "Not sure yet",
  "One location",
  "2–3 locations",
  "4–10 locations",
  "More than 10",
] as const;

export type LeadInput = {
  name: string;
  business: string;
  businessType: string;
  email: string;
  phone: string;
  interest: string;
  locations: string;
  message: string;
  /** Honeypot — must stay empty. Bots fill it in, humans never see it. */
  website?: string;
};

export type ValidationErrors = Partial<Record<keyof LeadInput, string>>;

/** Deliberately permissive: better to accept an odd address than reject a real lead. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLead(input: Partial<LeadInput>): ValidationErrors {
  const errors: ValidationErrors = {};

  const name = input.name?.trim() ?? "";
  if (name.length < 2) errors.name = "Please tell us your name.";
  else if (name.length > 100) errors.name = "That name is too long.";

  const business = input.business?.trim() ?? "";
  if (business.length > 120) errors.business = "That business name is too long.";

  const email = input.email?.trim() ?? "";
  if (!email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That email address doesn't look right.";
  else if (email.length > 254) errors.email = "That email address is too long.";

  const phone = input.phone?.trim() ?? "";
  if (phone && phone.replace(/\D/g, "").length < 7) {
    errors.phone = "That phone number looks too short.";
  }

  const businessType = input.businessType?.trim() ?? "";
  if (!businessType) errors.businessType = "Please pick the closest match.";

  // Optional — an enquiry with a name, email and business type is enough to
  // reply to. Still capped, so the endpoint cannot be used to post an essay.
  const message = input.message?.trim() ?? "";
  if (message.length > 5000) errors.message = "Please keep this under 5,000 characters.";

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

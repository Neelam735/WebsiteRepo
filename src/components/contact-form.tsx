"use client";

import { useId, useState } from "react";

import { trackLead } from "@/components/analytics";
import { Button } from "@/components/ui/button";
import { fallbackSentence, hasPhone, phoneLabel, site, telUrl } from "@/content/site";
import {
  businessTypes,
  hasErrors,
  interestOptions,
  locationCounts,
  validateLead,
  type LeadInput,
  type ValidationErrors,
} from "@/lib/lead-schema";
import { cn } from "@/lib/utils";

const EMPTY: LeadInput = {
  name: "",
  business: "",
  businessType: "",
  email: "",
  phone: "",
  interest: "",
  locations: "",
  message: "",
  website: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<LeadInput>(EMPTY);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const field = (key: keyof LeadInput) => ({
    id: `${formId}-${key}`,
    name: key,
    value: values[key] ?? "",
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${formId}-${key}-error` : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      setValues((current) => ({ ...current, [key]: event.target.value }));
      // Clear the error as soon as the visitor starts fixing it.
      setErrors((current) => {
        if (!current[key]) return current;
        const next = { ...current };
        delete next[key];
        return next;
      });
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    const clientErrors = validateLead(values);
    if (hasErrors(clientErrors)) {
      setErrors(clientErrors);
      setStatus("idle");
      // Move focus to the first problem so keyboard and screen-reader users
      // land on it rather than hunting.
      const firstKey = Object.keys(clientErrors)[0];
      document.getElementById(`${formId}-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: ValidationErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error ?? fallbackSentence("We couldn't send that."));
        setStatus("error");
        return;
      }

      trackLead();
      setStatus("success");
      setValues(EMPTY);
    } catch {
      setServerError(
        fallbackSentence("We couldn't reach the server. Please check your connection."),
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-steel-500/30 bg-steel-100 p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-steel-500">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-6 w-6 text-white">
            <path
              d="m5 10.5 3.5 3.5L15 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-ink-950">Thanks — that&rsquo;s with us.</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-700">
          {site.contact.responsePromise}
          {hasPhone ? (
            <>
              {" "}
              If it&rsquo;s urgent, call{" "}
              <a href={telUrl} className="font-semibold text-carbon-700 underline">
                {phoneLabel}
              </a>{" "}
              and you&rsquo;ll get a person, not a queue.
            </>
          ) : null}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-carbon-700 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website (leave blank)</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) =>
            setValues((current) => ({ ...current, website: event.target.value }))
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" required error={errors.name} htmlFor={`${formId}-name`}>
          <input {...field("name")} type="text" autoComplete="name" className={inputClass(errors.name)} />
        </Field>

        <Field label="Business name" error={errors.business} htmlFor={`${formId}-business`}>
          <input
            {...field("business")}
            type="text"
            autoComplete="organization"
            className={inputClass(errors.business)}
          />
        </Field>
      </div>

      <Field
        label="What kind of business?"
        required
        error={errors.businessType}
        htmlFor={`${formId}-businessType`}
      >
        <select {...field("businessType")} className={inputClass(errors.businessType)}>
          <option value="">Choose the closest match…</option>
          {businessTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" required error={errors.email} htmlFor={`${formId}-email`}>
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            className={inputClass(errors.email)}
          />
        </Field>

        <Field label="Phone" error={errors.phone} htmlFor={`${formId}-phone`} hint="Optional">
          <input
            {...field("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={inputClass(errors.phone)}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="What do you need?" htmlFor={`${formId}-interest`} hint="Optional">
          <select {...field("interest")} className={inputClass()}>
            <option value="">Not sure yet</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="How many locations?" htmlFor={`${formId}-locations`} hint="Optional">
          <select {...field("locations")} className={inputClass()}>
            {locationCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="What's going on?"
        required
        error={errors.message}
        htmlFor={`${formId}-message`}
        hint="A sentence or two is plenty"
      >
        <textarea
          {...field("message")}
          rows={5}
          className={cn(inputClass(errors.message), "resize-y")}
          placeholder="e.g. We run three studios on a spreadsheet and keep missing failed membership payments."
        />
      </Field>

      {serverError ? (
        <p
          role="alert"
          className="rounded-lg border border-carbon-300 bg-carbon-50 px-4 py-3 text-sm text-carbon-800"
        >
          {serverError}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="text-sm text-ink-500">{site.contact.responsePromise}</p>
      </div>

      <p className="text-xs leading-relaxed text-ink-500">
        We use your details only to reply to this enquiry. No newsletter, no sharing with anyone
        else. See our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-ink-700">
          privacy notice
        </a>
        .
      </p>
    </form>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-ink-900",
    "placeholder:text-ink-400 transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-carbon-600/30",
    error ? "border-carbon-500 focus:border-carbon-600" : "border-ink-200 focus:border-carbon-500",
  );
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-800">
          {label}
          {required ? (
            <span className="text-carbon-600" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
          {required ? <span className="sr-only"> (required)</span> : null}
        </label>
        {hint && !error ? <span className="text-xs text-ink-400">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm font-medium text-carbon-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

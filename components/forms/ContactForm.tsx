"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const field =
  "w-full border-b border-line bg-transparent py-3 text-[15px] text-primary placeholder:text-tertiary outline-none transition-colors focus:border-brand";

/**
 * Netlify Forms first (stored in Netlify, emailed via its form notifications);
 * the /api/contact route (SMTP / webhook) is the fallback, e.g. off Netlify or in local dev.
 */
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const LIMITS = { name: 120, email: 200, company: 160, message: 4000 };
const MIN_FILL_MS = 2500; // humans don't complete this form faster than this; bots usually do

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(d: Record<string, string>): Errors {
  const e: Errors = {};
  if (!d.name?.trim()) e.name = "Please enter your name.";
  if (!d.email?.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(d.email.trim())) e.email = "That email address doesn't look right.";
  if (!d.message?.trim()) e.message = "Please write a message.";
  else if (d.message.trim().length < 2) e.message = "Your message is a little short.";
  return e;
}

async function deliver(data: Record<string, string>) {
  try {
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "form-name": "contact", ...data }).toString(),
    });
    if (res.ok) return true;
  } catch {}
  try {
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return res.ok;
  } catch {
    return false;
  }
}

export function ContactForm({ reasons }: { reasons: string[] }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const opened = useRef(0);
  useEffect(() => {
    opened.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const found = validate(data);
    setErrors(found);
    const first = (["name", "email", "message"] as const).find((k) => found[k]);
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    // spam traps: filled honeypot or an impossibly fast submit → show success, send nothing
    if (data.company_website || Date.now() - opened.current < MIN_FILL_MS) {
      setState("sent");
      return;
    }
    setState("sending");
    setState((await deliver(data)) ? "sent" : "error");
  }

  // clear a field's error as soon as it's corrected
  const recheck = (name: keyof Errors, value: string) => {
    if (!errors[name]) return;
    const next = validate({ name: "x", email: "a@b.co", message: "ok", [name]: value });
    setErrors((cur) => ({ ...cur, [name]: next[name] }));
  };

  if (state === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col justify-center border-t border-line pt-8" role="status">
        <span className="tri !h-[18px] !w-[21px]" aria-hidden />
        <p className="font-display mt-6 text-[clamp(2rem,3.4vw,3rem)]">Message received.</p>
        <p className="t-lead mt-4 max-w-[42ch]">Thank you for contacting Axeract. We&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2" noValidate>
      <Field label="Name" name="name" autoComplete="name" required maxLength={LIMITS.name} error={errors.name} onInput={(v) => recheck("name", v)} />
      <Field label="Email" name="email" type="email" autoComplete="email" required maxLength={LIMITS.email} error={errors.email} onInput={(v) => recheck("email", v)} />
      <Field label="Company" name="company" autoComplete="organization" optional maxLength={LIMITS.company} />
      <label className="flex flex-col gap-1.5">
        <span className="t-label">Reason for Contact</span>
        <span className="relative">
          <select name="reason" defaultValue={reasons[0]} className={cn(field, "cursor-pointer appearance-none pr-8")}>
            {reasons.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <svg viewBox="0 0 10 10" className="pointer-events-none absolute right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-tertiary" aria-hidden>
            <path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
      </label>
      <label className="flex flex-col gap-1.5 sm:col-span-2">
        <span className="t-label">
          Message<span className="text-brand-text"> *</span>
        </span>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={LIMITS.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          onInput={(e) => recheck("message", e.currentTarget.value)}
          className={cn(field, "resize-none", errors.message && "border-red-500/70")}
        />
        <FieldError id="message-error" text={errors.message} />
      </label>
      {/* honeypot: hidden from people, bots fill it in */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="brand" size="lg" className="rounded-full" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send Message"}
        </Button>
        {state === "error" && (
          <span className="text-sm text-secondary" role="alert">
            Something went wrong while sending your message. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <span id={id} role="alert" className="text-[12.5px] text-red-600 [:root[data-theme=dark]_&]:text-red-400">
      {text}
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  autoComplete,
  maxLength,
  error,
  onInput,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  maxLength?: number;
  error?: string;
  onInput?: (value: string) => void;
}) {
  const errId = `${name}-error`;
  return (
    <label className="flex flex-col gap-1.5">
      <span className="t-label">
        {label}
        {required && <span className="text-brand-text"> *</span>}
        {optional && <span className="ml-2 normal-case tracking-normal text-tertiary">Optional</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onInput={onInput ? (e) => onInput(e.currentTarget.value) : undefined}
        className={cn(field, error && "border-red-500/70")}
      />
      <FieldError id={errId} text={error} />
    </label>
  );
}

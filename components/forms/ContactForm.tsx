"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const field =
  "w-full border-b border-line bg-transparent py-3 text-[15px] text-primary placeholder:text-tertiary outline-none transition-colors focus:border-brand";

export function ContactForm({ reasons }: { reasons: string[] }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const bad = {
      name: !data.name?.trim(),
      email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email ?? ""),
      message: !data.message?.trim(),
    };
    setInvalid(bad);
    if (Object.values(bad).some(Boolean)) {
      const first = Object.keys(bad).find((k) => bad[k as keyof typeof bad]);
      (form.elements.namedItem(first!) as HTMLElement | null)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

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
      <Field label="Name" name="name" autoComplete="name" required invalid={invalid.name} />
      <Field label="Email" name="email" type="email" autoComplete="email" required invalid={invalid.email} />
      <Field label="Company" name="company" autoComplete="organization" optional />
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
          aria-invalid={invalid.message || undefined}
          className={cn(field, "resize-none", invalid.message && "border-red-500/70")}
        />
      </label>
      {/* honeypot */}
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

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  autoComplete,
  invalid,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  invalid?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="t-label">
        {label}
        {required && <span className="text-brand-text"> *</span>}
        {optional && <span className="ml-2 normal-case tracking-normal text-tertiary">Optional</span>}
      </span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} aria-invalid={invalid || undefined} className={cn(field, invalid && "border-red-500/70")} />
    </label>
  );
}

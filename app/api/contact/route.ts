import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = Record<string, string>;

/**
 * Contact form submissions.
 *  1. Emailed to MAIL_TO over Microsoft 365 SMTP when SMTP_PASS is set (other SMTP_* default below).
 *  2. Optionally forwarded to CONTACT_WEBHOOK_URL.
 *  3. With neither configured, logged on the server so nothing is silently dropped in development.
 * The visitor sees success if at least one delivery route worked.
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // honeypot filled → silently accept
  if (body.company_website) return NextResponse.json({ ok: true });

  const { name, email, company, reason, message } = body;
  // links in a name field, or a message that is mostly links, is spam: accept quietly, deliver nothing
  const urlCount = (message?.match(/https?:\/\//gi) ?? []).length;
  if (/https?:\/\/|www\./i.test(name ?? "") || urlCount > 3) return NextResponse.json({ ok: true });
  if (!name?.trim() || !email?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message?.trim()) {
    return NextResponse.json({ ok: false, error: "Name, a valid email and a message are required." }, { status: 422 });
  }

  const payload = {
    source: "axeract.ai",
    receivedAt: new Date().toISOString(),
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    company: company?.trim().slice(0, 200) ?? "",
    reason: (reason ?? "Other").slice(0, 60),
    message: message.trim().slice(0, 4000),
  };

  let delivered = false;
  let attempted = false;

  // 1 — email
  // Microsoft 365 defaults; only the password must come from the environment (SMTP_PASS)
  const {
    SMTP_HOST = "smtp.office365.com",
    SMTP_PORT = "587",
    SMTP_USER = "sumair@axeract.ai",
    SMTP_PASS,
    MAIL_TO = "info@axeract.ai",
  } = process.env;
  if (SMTP_PASS) {
    attempted = true;
    try {
      const port = Number(SMTP_PORT);
      // 465 = implicit TLS; anything else (Microsoft 365 uses 587) must upgrade with STARTTLS
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        requireTLS: port !== 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });
      const label = `${payload.reason}`;
      await transporter.sendMail({
        from: `"Axeract Website" <${SMTP_USER}>`,
        to: `"Axeract Info" <${MAIL_TO}>`,
        replyTo: payload.email || undefined,
        // Outlook displays an alias under the mailbox owner's name, so spell the address out in the subject and body
        subject: `[${MAIL_TO}] ${label} from ${payload.name}`,
        text: toText(payload, label, MAIL_TO),
        html: toHtml(payload, label, MAIL_TO),
      });
      delivered = true;
    } catch (err) {
      console.error("[contact] email failed:", err instanceof Error ? err.message : err);
    }
  }

  // 2 — webhook
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    attempted = true;
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhook.includes("hooks.slack.com") ? { text: toText(payload, `New contact: ${payload.reason}`) } : payload),
      });
      if (res.ok) delivered = true;
    } catch (err) {
      console.error("[contact] webhook failed:", err instanceof Error ? err.message : err);
    }
  }

  // 3 — nothing configured: fine in development, but never fake a success in production
  if (!attempted) {
    console.error("[contact] no SMTP_PASS or CONTACT_WEBHOOK_URL configured", JSON.stringify(payload));
    if (process.env.NODE_ENV === "production") return NextResponse.json({ ok: false }, { status: 503 });
    return NextResponse.json({ ok: true });
  }

  if (!delivered) {
    console.error("[contact] NOT DELIVERED", JSON.stringify(payload));
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

function toText(p: Record<string, string>, title: string, to = "") {
  return [
    to && `Website enquiry to ${to}`,
    title,
    "",
    `Name: ${p.name}`,
    p.email && `Email: ${p.email}`,
    p.company && `Company: ${p.company}`,
    `Reason: ${p.reason}`,
    p.message && `\nMessage:\n${p.message}`,
    `\nReceived: ${p.receivedAt}`,
  ]
    .filter(Boolean)
    .join("\n");
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function toHtml(p: Record<string, string>, title: string, to = "") {
  const row = (k: string, v: string) => (v ? `<tr><td style="padding:6px 16px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>` : "");
  return `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
${to ? `<p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#155662">Website enquiry to ${esc(to)}</p>` : ""}
<h2 style="margin:0 0 12px">${esc(title)}</h2>
<table style="border-collapse:collapse">${row("Name", p.name)}${row("Email", p.email)}${row("Company", p.company)}${row("Reason", p.reason)}</table>
${p.message ? `<p style="margin:16px 0 4px;color:#666">Message</p><p style="margin:0;white-space:pre-wrap">${esc(p.message)}</p>` : ""}
<p style="margin-top:20px;color:#999;font-size:12px">Received ${esc(p.receivedAt)} via axeract.ai</p></div>`;
}

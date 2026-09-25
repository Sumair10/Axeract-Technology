import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = Record<string, string>;

/**
 * Contact form submissions.
 *  1. Emailed to MAIL_TO over SMTP (Hostinger Titan) when SMTP_* are set.
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
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    attempted = true;
    try {
      const port = Number(SMTP_PORT ?? 465);
      const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
      const label = `${payload.reason}`;
      await transporter.sendMail({
        from: `"Axeract website" <${SMTP_USER}>`,
        to: MAIL_TO || SMTP_USER,
        replyTo: payload.email || undefined,
        subject: `[Axeract] ${label} from ${payload.name}`,
        text: toText(payload, label),
        html: toHtml(payload, label),
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

  // 3 — nothing configured (development)
  if (!attempted) {
    console.log("[contact] (no SMTP/webhook configured)", JSON.stringify(payload));
    return NextResponse.json({ ok: true });
  }

  if (!delivered) {
    console.error("[contact] NOT DELIVERED", JSON.stringify(payload));
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

function toText(p: Record<string, string>, title: string) {
  return [
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

function toHtml(p: Record<string, string>, title: string) {
  const row = (k: string, v: string) => (v ? `<tr><td style="padding:6px 16px 6px 0;color:#666">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>` : "");
  return `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
<h2 style="margin:0 0 12px">${esc(title)}</h2>
<table style="border-collapse:collapse">${row("Name", p.name)}${row("Email", p.email)}${row("Company", p.company)}${row("Reason", p.reason)}</table>
${p.message ? `<p style="margin:16px 0 4px;color:#666">Message</p><p style="margin:0;white-space:pre-wrap">${esc(p.message)}</p>` : ""}
<p style="margin-top:20px;color:#999;font-size:12px">Received ${esc(p.receivedAt)} via axeract.ai</p></div>`;
}

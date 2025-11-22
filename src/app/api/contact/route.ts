// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

type Bucket = { hits: number[] };
const RATE: Record<string, Bucket> = {};
const WINDOW_MS = 60_000; // 60s
const MAX_HITS = 5;       // 5 requests per minute per IP

function clientIp(req: NextRequest) {
  const xf = req.headers.get("x-forwarded-for");
  const xr = req.headers.get("x-real-ip");
  return String(xf?.split(",")[0] || xr || "0.0.0.0").trim();
}

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = (RATE[ip] ||= { hits: [] });
  bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);
  if (bucket.hits.length >= MAX_HITS) return false;
  bucket.hits.push(now);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    const { name, email, subject, message, startedAt, hp } = await req.json();

    // 1) Honeypot
    if (hp && String(hp).trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 }); // pretend success
    }

    // 2) Submit speed gate
    const elapsed = Date.now() - Number(startedAt || 0);
    if (!Number.isFinite(elapsed) || elapsed < 1500 || elapsed > 24 * 60 * 60 * 1000) {
      return NextResponse.json(
        { ok: false, error: "Suspicious timing" },
        { status: 400 }
      );
    }

    // 3) Basic validation
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
    if (!emailOk) return NextResponse.json({ ok: false, error: "Bad email" }, { status: 400 });
    if (!name || !subject || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // 4) Content scoring
    const urlCount = (message.match(/https?:\/\/|www\./gi) || []).length;
    if (urlCount > 2) {
      return NextResponse.json({ ok: false, error: "Too many links" }, { status: 400 });
    }
    const banned = ["viagra", "casino", "crypto investment"];
    const lower = `${subject} ${message}`.toLowerCase();
    if (banned.some((w) => lower.includes(w))) {
      return NextResponse.json({ ok: true }, { status: 200 }); // silent drop
    }

    // 5) Optional: Cloudflare Turnstile check (enable when you add the widget)
    // const token = (await req.json()).turnstileToken;
    // if (process.env.TURNSTILE_SECRET && token) {
    //   const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    //     method: "POST",
    //     headers: { "content-type": "application/x-www-form-urlencoded" },
    //     body: new URLSearchParams({
    //       secret: process.env.TURNSTILE_SECRET,
    //       response: token,
    //       remoteip: ip,
    //     }),
    //   }).then((r) => r.json());
    //   if (!verify.success) {
    //     return NextResponse.json({ ok: false, error: "Captcha failed" }, { status: 400 });
    //   }
    // }

    const result = await sendMail({
      to: "jason@bluedot.it.com",
      subject: `Bluedot contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><b>From:</b> ${name} &lt;${email}&gt;</p><pre>${message}</pre>`,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, id: result.messageId });

    return NextResponse.json({ ok: true, id: crypto.randomUUID() }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

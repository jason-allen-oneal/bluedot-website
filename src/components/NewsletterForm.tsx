"use client";

import { useMemo, useState } from "react";

export default function NewsletterForm({
  title = "Get product + security updates",
  description = "A short email when we ship something new. No spam.",
}: {
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const disabled = useMemo(
    () => status === "loading" || email.trim().length === 0,
    [status, email]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error || "Could not subscribe. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data?.message || "Subscribed!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Could not subscribe. Please try again.");
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(5,12,26,0.28)] backdrop-blur-xl">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-base-content">{title}</h3>
        <p className="text-sm text-base-content/75">{description}</p>
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter_signup"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-full rounded-2xl border border-white/10 bg-[#070c16]/60 px-4 text-base-content placeholder:text-base-content/50 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
          aria-label="Email address"
          required
        />

        <button
          type="submit"
          disabled={disabled}
          className="h-12 rounded-2xl bg-primary px-5 font-semibold text-primary-content shadow-[0_16px_38px_rgba(15,159,225,0.26)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={
            "mt-3 text-sm " +
            (status === "success" ? "text-emerald-300" : "text-rose-300")
          }
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </div>
  );
}

"use client";
import { motion } from "framer-motion";
import type { SpotlightItem } from "@/lib/github";

function SpotlightCard({ title, blurb, pills, href }: SpotlightItem) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group card block p-6 relative overflow-hidden"
    >
      <div className="absolute inset-x-0 -top-12 h-24 opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ background: "radial-gradient(400px 120px at 20% 100%, color-mix(in oklab, var(--accent), transparent 70%), transparent 70%)" }} />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {blurb && <p className="text-sm text-muted mb-4">{blurb}</p>}
      <div className="flex flex-wrap gap-2">
        {pills?.map((p) => (
          <span key={p} className="text-xs px-2 py-1 rounded-sm border border-border">
            {p}
          </span>
        ))}
      </div>
      <div className="mt-4 text-primary text-sm">Open →</div>
    </motion.a>
  );
}

export default function Spotlight({ items }: { items: SpotlightItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-4">
      <h2 className="text-2xl font-semibold mb-6">Spotlight</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((it) => (
          <SpotlightCard key={it.href} {...it} />
        ))}
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroBadges from "./HeroBadges";
import BlueDot from "./BlueDot";

export default function Hero({ reposCount = 0 }: { reposCount?: number }) {
  return (
    <section className="relative mx-auto max-w-[1100px] px-6 pt-28 pb-10 md:pt-36 md:pb-20">
      {/* Decorative blue dots */}
      <div className="absolute top-20 right-10 opacity-30">
        <BlueDot size="lg" animated />
      </div>
      <div className="absolute top-40 left-8 opacity-20">
        <BlueDot size="sm" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-25">
        <BlueDot size="md" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
        className="space-y-6"
      >
        <h1 className="text-[clamp(36px,6vw,64px)] leading-tight font-semibold tracking-[-0.02em]">
          Security-minded TypeScript engineer.{" "}
          <span className="text-gradient">I ship clean, provable UI.</span>
        </h1>

        <p className="max-w-2xl text-muted text-[clamp(14px,2vw,18px)]">
          Security-minded full-stack: Next.js + TS, Prisma/Postgres, Python. I ship security tooling, LLM dataset pipelines, and production UI with pragmatic a11y.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-primary/12 px-5 py-3 font-medium hover:bg-primary/18 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            View projects <ArrowRight size={18} />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center rounded-md border border-border px-5 py-3 font-medium hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Get in touch
          </Link>
        </div>

        {/* Replace old <ul> with this */}
        <HeroBadges reposCount={reposCount} />
      </motion.div>
    </section>
  );
}

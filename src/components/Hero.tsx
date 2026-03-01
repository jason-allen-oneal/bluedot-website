'use client'
import { useRef } from 'react'
import useReveal from '@/hooks/useReveal'

export default function Hero() {
  const textRef = useRef<HTMLDivElement | null>(null)
  useReveal(textRef)

  return (
    <section className="relative overflow-hidden pt-24 pb-12 border-b border-white/5">
      <div className="page-shell">
        <div ref={textRef} className="reveal space-y-10 text-center md:text-left md:max-w-4xl">
          <div className="flex items-center gap-4 justify-center md:justify-start opacity-60">
             <span className="pill">Systems</span>
             <span className="pill">Security</span>
             <span className="pill">Machine Intelligence</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tighter md:text-8xl leading-[1.1]">
            Engineering for <br />
            <span className="text-primary">high-stakes</span> resilience.
          </h1>
          <p className="text-xl text-base-content/60 max-w-[60ch] font-medium leading-relaxed">
            BlueDot IT builds hardened infrastructure and precision software for organizations that require absolute stability. We don&apos;t just ship; we secure.
          </p>

          <div className="flex flex-wrap gap-6 justify-center md:justify-start pt-4">
            <a href="/contact" className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors">Start Engagement</a>
            <a href="/projects" className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">Technical Portfolio</a>
          </div>
        </div>
      </div>
    </section>
  )
}

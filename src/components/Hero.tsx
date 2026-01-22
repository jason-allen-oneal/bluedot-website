// Client-side hero component (Next.js + TypeScript). Uses DaisyUI classes + design tokens.
'use client'
import { useRef } from 'react'
import useReveal from '@/hooks/useReveal'

export default function Hero() {
  const textRef = useRef<HTMLDivElement | null>(null)
  const visualRef = useRef<HTMLDivElement | null>(null)
  useReveal(textRef)
  useReveal(visualRef)

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(77,216,255,0.22),transparent_35%),radial-gradient(circle_at_82%_12%,rgba(243,181,69,0.18),transparent_32%)] blur-3xl opacity-80" />
      <div className="page-shell hero-creative">
        <div ref={textRef} className="hero-panel reveal space-y-6">
          <span className="kicker">Bluedot IT • systems in motion</span>
          <h1 className="heading-accent">
            Reliable. Professional. Performance-driven.
          </h1>
          <p className="text-lg text-base-content/80 max-w-[62ch]">
            Crafting enterprise-grade systems, hardened security layers, clean AI solutions, and sleek front-ends.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="/projects" className="btn btn-primary btn-lg rounded-full px-7 btn-primary-ring">See the work</a>
            <a href="/contact" className="btn btn-outline btn-lg rounded-full px-7 border-white/20 hover:bg-white/10">Plan a build</a>
          </div>

          
        </div>

        
      </div>

      <svg className="section-divider" viewBox="0 0 1200 56" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0 L1200 18 L1200 56 L0 56 Z" fill="currentColor" opacity="0.08"></path>
      </svg>
    </section>
  )
}

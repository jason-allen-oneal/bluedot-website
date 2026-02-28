'use client'
import { useRef } from 'react'
import useReveal from '@/hooks/useReveal'

export default function Hero() {
  const textRef = useRef<HTMLDivElement | null>(null)
  useReveal(textRef)

  return (
    <section className="relative overflow-hidden pt-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(77,216,255,0.22),transparent_35%),radial-gradient(circle_at_82%_12%,rgba(243,181,69,0.18),transparent_32%)] blur-3xl opacity-80" />
      <div className="page-shell">
        <div ref={textRef} className="reveal space-y-8 text-center md:text-left md:max-w-3xl">
          <span className="pill">Systems • Security • AI</span>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
            Build fast. <span className="heading-accent">Stay secure.</span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-[50ch]">
            Engineering resilient systems and hardened security layers for teams that ship without compromise.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="/contact" className="btn btn-primary btn-lg rounded-full px-8">Plan a build</a>
            <a href="/projects" className="btn btn-outline btn-lg rounded-full px-8 border-white/20">See the work</a>
          </div>
        </div>
      </div>

      <svg className="mt-12 block w-full h-12 opacity-5" viewBox="0 0 1200 56" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0 L1200 18 L1200 56 L0 56 Z" fill="currentColor"></path>
      </svg>
    </section>
  )
}

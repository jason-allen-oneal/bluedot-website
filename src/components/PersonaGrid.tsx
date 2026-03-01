'use client'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import Reveal from '@/components/Reveal'

const personas = [
  {
    title: 'Consulting',
    description: 'System-level architecture reviews, performance optimization, and legacy modernization for growing organizations.',
    cta: 'Strategic Audit',
    href: '/services#startups'
  },
  {
    title: 'Hardening',
    description: 'Deep-stack security audits, zero-trust implementation, and automated threat-reduction gating for the enterprise.',
    cta: 'Audit Resilience',
    href: '/services#enterprise'
  },
  {
    title: 'Intelligence',
    description: 'Integration of LLMs and autonomous agents into internal workflows with strict data privacy and isolation.',
    cta: 'Augment Intelligence',
    href: '/services#developers'
  }
]

export default function PersonaGrid() {
  return (
    <section className="page-shell py-24 bg-white/[0.01] border-b border-white/5">
      <div className="grid gap-12 md:grid-cols-3">
        {personas.map((p) => (
          <Reveal key={p.title}>
            <div className="h-full space-y-6">
              <div className="w-12 h-0.5 bg-primary/40" />
              <h3 className="text-2xl font-bold tracking-tight text-white">{p.title}</h3>
              <p className="text-sm text-base-content/60 leading-relaxed font-medium">
                {p.description}
              </p>
              <Link href={p.href} className="inline-flex items-center text-primary text-xs font-bold tracking-widest uppercase hover:text-white transition-colors">
                {p.cta} <span className="ml-2">→</span>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

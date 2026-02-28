'use client'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import Reveal from '@/components/Reveal'

const personas = [
  {
    title: 'Startups',
    description: 'Custom IT foundations and product enhancements to help you scale fast without technical debt.',
    cta: 'Scale securely',
    href: '/services#startups'
  },
  {
    title: 'Enterprise',
    description: 'Robust scalability, deep security hardening, and performance optimization for mission-critical systems.',
    cta: 'Audit resilience',
    href: '/services#enterprise'
  },
  {
    title: 'Developers',
    description: 'Collaborative partnership for project development, specialist application support, and build logic.',
    cta: 'Partner up',
    href: '/services#developers'
  }
]

export default function PersonaGrid() {
  return (
    <section className="page-shell py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {personas.map((p) => (
          <Reveal key={p.title}>
            <Card className="h-full bg-white/5 border-white/10 hover:border-primary/30 transition-colors">
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-sm text-base-content/70 leading-relaxed">
                  {p.description}
                </p>
                <Link href={p.href} className="inline-flex items-center text-primary text-sm font-semibold hover:underline">
                  {p.cta} →
                </Link>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

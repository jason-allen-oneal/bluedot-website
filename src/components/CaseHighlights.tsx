'use client'
import Reveal from '@/components/Reveal'

const cases = [
  {
    metric: '70%',
    label: 'Attack Surface Reduction',
    description: 'Hardened infrastructure for a fintech startup through automated CI/CD security gating.'
  },
  {
    metric: '12ms',
    label: 'API Response P99',
    description: 'Optimized high-traffic backend for an enterprise partner using Rust and Go.'
  }
]

export default function CaseHighlights() {
  return (
    <section className="page-shell py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Selected Work</h2>
          <p className="text-base-content/70">
            Real outcomes for complex builds. We focus on evidence and impact, not just lines of code.
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 italic text-base-content/80">
            &quot;BlueDot IT transformed our deployment pipeline. Security is no longer a bottleneck.&quot;
            <span className="mt-4 block text-sm font-bold not-italic">— CTO, Enterprise Partner</span>
          </div>
        </div>
        <div className="grid gap-6">
          {cases.map((c) => (
            <Reveal key={c.label}>
              <div className="flex gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-4xl font-black text-primary">{c.metric}</div>
                <div className="space-y-1">
                  <div className="font-bold text-lg">{c.label}</div>
                  <div className="text-sm text-base-content/70">{c.description}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

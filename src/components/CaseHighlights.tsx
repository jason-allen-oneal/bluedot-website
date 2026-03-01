'use client'
import Reveal from '@/components/Reveal'

const methodology = [
  {
    label: 'Isolation',
    description: 'We treat every environment as hostile, implementing tiered isolation as a default.'
  },
  {
    label: 'Automation',
    description: 'If it can be codified, it must be. Our CI/CD pipelines are inherently security-aware.'
  },
  {
    label: 'Resilience',
    description: 'Systems are designed for failure. We prioritize mean-time-to-recovery (MTTR) as a primary KPI.'
  }
]

export default function CaseHighlights() {
  return (
    <section className="page-shell py-24">
      <div className="grid gap-24 lg:grid-cols-2">
        <div className="space-y-10">
          <div className="w-12 h-1 bg-white" />
          <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">Operating <br />Methodology</h2>
          <p className="text-lg text-base-content/60 leading-relaxed font-medium">
            BlueDot IT approaches software engineering as a discipline of hardening and risk reduction. We focus on verifiable evidence and high-assurance outcomes, not just delivery speed.
          </p>
          <div className="border-l border-white/10 bg-white/5 p-8 font-medium text-base-content/80">
            &quot;Our engineering philosophy is built on the belief that a system is only as strong as its weakest dependency.&quot;
            <span className="mt-6 block text-xs font-bold uppercase tracking-widest text-primary">— BlueDot IT Engineering Core</span>
          </div>
        </div>
        <div className="grid gap-12 self-center">
          {methodology.map((m) => (
            <Reveal key={m.label}>
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-white">{m.label}</div>
                <div className="text-base text-base-content/60 leading-relaxed font-medium">{m.description}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

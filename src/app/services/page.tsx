import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";

const services = [
  {
    title: "Penetration Testing",
    subtitle:
      "Web, API, and infrastructure testing that produces actionable fixes.",
    bullets: [
      "External and internal network assessments",
      "Web app and API testing (auth, access control, injection, logic flaws)",
      "Attack path discovery, privilege escalation, and lateral movement",
      "Evidence-backed findings with reproduction steps and remediation guidance",
    ],
    deliverables: [
      "Executive summary",
      "Technical report",
      "Risk-ranked findings",
      "Retest option",
    ],
  },
  {
    title: "Security Tooling and Automation",
    subtitle: "Build the tools that reduce toil and increase signal.",
    bullets: [
      "Custom scanners, recon automation, and reporting pipelines",
      "RAG knowledge bases for internal runbooks and security intel",
      "Agent workflows for repeatable assessments and triage",
      "Integrations with SIEM, ticketing, and CI/CD systems",
    ],
    deliverables: ["Source code", "Docs", "Runbook", "Deployment support"],
  },
  {
    title: "DevSecOps and Hardening",
    subtitle: "Raise the baseline: build secure defaults into delivery.",
    bullets: [
      "CI/CD security controls (SAST, dependency, secrets, container scanning)",
      "Infrastructure hardening reviews (Linux, Nginx, SSH, TLS, firewalls)",
      "Least privilege and identity design",
      "Secure deployment patterns and logging strategy",
    ],
    deliverables: [
      "Hardening checklist",
      "Config diffs",
      "Pipeline updates",
      "Verification notes",
    ],
  },
  {
    title: "Secure Software Development",
    subtitle:
      "Security-first feature delivery for teams that need velocity without regret.",
    bullets: [
      "Full-stack development (React/Next.js, Node, Python)",
      "Threat modeling and secure design reviews",
      "Security fixes, refactors, and tech debt clean-up",
      "Performance and reliability improvements with secure defaults",
    ],
    deliverables: [
      "PRs and releases",
      "Architecture notes",
      "Tests",
      "Maintenance plan",
    ],
  },
];

const faqs = [
  {
    q: "Do you offer fixed-price engagements?",
    a: "Yes. If the scope is clear, fixed-price is preferred. If the scope is evolving, I recommend a short discovery sprint first.",
  },
  {
    q: "How do you handle sensitive data?",
    a: "Principle of least privilege, encrypted storage where needed, and minimal retention. If you have compliance requirements, we align to them up front.",
  },
  {
    q: "What do you need from me to start?",
    a: "A target list, an engagement window, and any constraints (production impact, test accounts, IP allowlists). For dev work, access to repos and a basic product brief.",
  },
  {
    q: "Can you retest fixes?",
    a: "Yes. Retesting is included as an option and recommended for high-risk findings.",
  },
];

export default function ServicesPage() {
  return (
    <div className="page-shell space-y-14">
      <Reveal>
        <section className="text-center space-y-4">
          <div className="flex justify-center gap-2">
            <span className="kicker">Bluedot offerings</span>
          </div>
          <h1 className="heading-accent text-4xl font-bold md:text-5xl">
            Services that ship outcomes, not noise.
          </h1>
          <p className="text-lg text-base-content/80 max-w-3xl mx-auto">
            Assessments, automation, and delivery hardening with evidence, clear
            scope, and usable deliverables.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/contact">
              <Button>Book a scoping call</Button>
            </Link>
            <Link href="/projects">
              <Button style="outline">See related work</Button>
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <Card>
              <div className="p-4 sm:p-6 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-base-content">Offerings</h2>
                  <p className="text-sm text-base-content/80">
                    Pick a focused engagement or combine services for an end-to-end uplift.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {services.map((s) => (
                    <Reveal key={s.title} className="h-full">
                      <Card className="bg-white/5 border-white/10 h-full">
                        <div className="p-5 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-bold text-base-content">{s.title}</h3>
                            
                          </div>
                          <p className="text-sm text-base-content/75">{s.subtitle}</p>
                          <ul className="space-y-2 text-sm text-base-content/75">
                            {s.bullets.map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-accent" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <p className="text-xs font-semibold text-base-content/70">Deliverables</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {s.deliverables.map((d) => (
                                <Badge key={d} variant="secondary" className="bg-white/10 border-white/10">
                                  {d}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Link href="/contact">
                              <Button size="sm">Request</Button>
                            </Link>
                            <Link href="/projects">
                              <Button size="sm" style="outline">
                                See work
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <Card className="bg-white/5 border-white/10">
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-base-content">How I work</h2>
                  <ol className="space-y-3 text-sm text-base-content/80">
                    <li className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        1
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold text-base-content">Scope and constraints</p>
                        <p>Targets, rules of engagement, success criteria, safe boundaries.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        2
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold text-base-content">Execution and evidence</p>
                        <p>Validated findings only—no speculative filler.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                        3
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold text-base-content">Remediation support</p>
                        <p>Guidance, implementation help, and optional retest.</p>
                      </div>
                    </li>
                  </ol>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold text-base-content/80">Typical outputs</p>
                    <ul className="mt-2 list-disc pl-5 text-sm text-base-content/80 space-y-1.5">
                      <li>Risk-ranked findings with reproduction steps</li>
                      <li>Guidance that matches your stack</li>
                      <li>Optional code changes and hardening diffs</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal>
              <Card className="bg-white/5 border-white/10">
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-base-content">Engagement options</h3>
                  <div className="space-y-3 text-sm text-base-content/80">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1">
                      <p className="text-sm font-semibold text-base-content">Discovery Sprint</p>
                      <p>Fast scope validation and risk mapping.</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1">
                      <p className="text-sm font-semibold text-base-content">Fixed-Scope Project</p>
                      <p>Clear targets and deliverables—ideal for pentests and hardening packages.</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1">
                      <p className="text-sm font-semibold text-base-content">Retainer</p>
                      <p>Ongoing support for fixes, tooling, and secure delivery improvements.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href="/contact">
                      <Button size="sm">Book a scoping call</Button>
                    </Link>
                    <p className="text-xs text-base-content/80">
                      Scopes defined up front; you get a real quote.
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-base-content">FAQ</h2>
            <p className="text-sm text-base-content/80">Quick answers to common questions.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {faqs.map((f) => (
              <Reveal key={f.q} className="h-full">
                <Card className="h-full">
                  <div className="p-6 sm:p-8 space-y-2">
                    <h3 className="text-base font-bold text-base-content">{f.q}</h3>
                    <p className="text-sm leading-relaxed text-base-content/80">{f.a}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-base-content shadow-sm sm:p-8">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold">Ready to ship safer software?</h3>
              <p className="text-sm text-base-content/80">
                Send your scope and constraints. I will respond with next steps and a concrete proposal.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/contact">
                <Button>Contact</Button>
              </Link>
              <Link href="/resume">
                <Button style="outline">View resume</Button>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";

const groups = [
  {
    id: "startups",
    title: "Startup Foundations",
    description: "Build fast and lean without compromising on security or architecture.",
    services: [
      {
        name: "Custom IT Solutions",
        details: "Infrastructure as Code, CI/CD setup, and automated environment provisioning."
      },
      {
        name: "Product Enhancement",
        details: "Accelerate your feature roadmap with specialist engineering support."
      },
      {
        name: "Operational Streamlining",
        details: "Reduce technical toil through intelligent automation and RAG-based runbooks."
      }
    ]
  },
  {
    id: "enterprise",
    title: "Enterprise Resilience",
    description: "Scalable systems and proactive security for complex environments.",
    services: [
      {
        name: "Infrastructure Hardening",
        details: "Deep-dive security audits and automated remediation of network/OS layers."
      },
      {
        name: "Scalability Audits",
        details: "Bottleneck identification and performance tuning for high-traffic APIs."
      },
      {
        name: "DevSecOps Integration",
        details: "Embed security into the heartbeat of your delivery pipeline."
      }
    ]
  },
  {
    id: "developers",
    title: "Developer Partnerships",
    description: "Expert support and collaboration for independent builds.",
    services: [
      {
        name: "Application Support",
        details: "Specialist debugging and logic reviews for mission-critical apps."
      },
      {
        name: "Project Development",
        details: "Collaborative building of tools, modules, and security-first features."
      }
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="page-shell space-y-20 py-12">
      <Reveal>
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="pill">BlueDot Expertise</span>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Outcomes, <span className="heading-accent">not noise.</span>
          </h1>
          <p className="text-xl text-base-content/80">
            Hardened systems and secure delivery workflows tailored to your scale.
          </p>
        </section>
      </Reveal>

      {groups.map((g) => (
        <section key={g.id} id={g.id} className="space-y-8">
          <Reveal>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">{g.title}</h2>
              <p className="text-base-content/70 max-w-2xl">{g.description}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {g.services.map((s) => (
              <Reveal key={s.name}>
                <Card className="h-full bg-white/5 border-white/10 p-8 space-y-3 hover:bg-white/10 transition-colors">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="text-sm text-base-content/70 leading-relaxed">{s.details}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <Reveal>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold">How we work</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-primary font-bold text-xl">01. Scope</div>
              <p className="text-sm text-base-content/70">Clear boundaries and success criteria up front.</p>
            </div>
            <div className="space-y-2">
              <div className="text-primary font-bold text-xl">02. Build</div>
              <p className="text-sm text-base-content/70">Evidence-backed engineering with secure defaults.</p>
            </div>
            <div className="space-y-2">
              <div className="text-primary font-bold text-xl">03. Support</div>
              <p className="text-sm text-base-content/70">PRs, docs, and implementation guidance included.</p>
            </div>
          </div>
          <div className="pt-6">
             <Link href="/contact">
                <Button size="lg" special="wide">Start a build</Button>
             </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import React from "react";

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

function Badge({ children }: { children: any }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-700 bg-slate-900 px-3 py-1 text-xs font-medium text-white shadow-sm">
      {children}
    </span>
  );
}

function Panel({ header, content }: { header: string; content: string }) {
  return (
    <div className="rounded-2xl border border-blue-700 bg-slate-900 p-4 shadow-sm">
      <dt className="text-sm font-semibold text-white">{header}</dt>
      <dd className="mt-1 text-sm text-gray-400">{content}</dd>
    </div>
  );
}

function Button({
  children,
  href,
  variant = "primary",
}: {
  children: any;
  href: string;
  variant?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";
  return (
    <a className={`${base} ${styles}`} href={href}>
      {children}
    </a>
  );
}

export default function ServicesPage() {
	return (
    	<>
    		<section className="mx-auto max-w-6xl px-6 pb-10 pt-16">
        		<div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          			<div>
            			<div className="flex flex-wrap gap-2">
              				<Badge>Security-first engineering</Badge>
              				<Badge>Pentesting and tooling</Badge>
            			</div>

            			<h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              				Services that ship outcomes, not noise.
            			</h1>

            			<p className="mt-4 max-w-xl text-base leading-relaxed text-gray-400">
              				I help teams find and fix real security risk, harden delivery
              				pipelines, and build automation that saves time. You get clear
              				scope, clean deliverables, and work that stands up to scrutiny.
            			</p>

            			<div className="mt-8 flex flex-wrap gap-3">
              				<Button href="/contact" variant="primary">
                				Book a scoping call
              				</Button>
            			</div>

            			<dl className="mt-8 grid gap-4 sm:grid-cols-3">
							<Panel header="Engagements" content="Fixed scope or sprint-based" />
							<Panel header="Deliverables" content="Report, code, or both" />
							<Panel header="Turnaround" content="Fast, with documented results" />
              	
            			</dl>
          			</div>

          			<Card>
            			<div className="p-6 sm:p-8">
              				<h2 className="text-lg font-bold">How I work</h2>
              				<ol className="mt-4 space-y-3 text-sm text-white">
                				<li className="flex gap-3">
                  					<span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    					1
                  					</span>
                  					<div>
                    					<p className="font-semibold text-gray-400">
                      						Scope and constraints
                    					</p>
                    					<p>
                      						Targets, rules of engagement, success criteria, and safe
                      						testing boundaries.
                    					</p>
                  					</div>
                				</li>
                				<li className="flex gap-3">
                  					<span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    					2
                  					</span>
                  					<div>
                    					<p className="font-semibold text-gray-400">
                      						Execution and evidence
                    					</p>
                   						<p>
                      						Validated findings only. No speculative “may be
                      						vulnerable” filler.
                    					</p>
                  					</div>
                				</li>
                				<li className="flex gap-3">
                  					<span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    					3
                  					</span>
                  					<div>
                    					<p className="font-semibold text-gray-400">
                      						Remediation support
                    					</p>
                    					<p>
                      						Fix guidance, implementation help if desired, and optional
                      						retest.
                    					</p>
                  					</div>
                				</li>
              				</ol>


              				<div className="mt-6 rounded-2xl bg-slate-900 p-4">
                				<p className="text-sm font-semibold text-white">
                  					Typical outputs
                				</p>
                				<ul className="mt-2 list-disc pl-5 text-sm text-gray-400">
                  					<li>Risk-ranked findings and clear reproduction steps</li>
                  					<li>Remediation guidance that matches your stack</li>
                  					<li>Optional code changes and hardening diffs</li>
                				</ul>
              				</div>
            			</div>
          			</Card>
        		</div>
      		</section>

      		<section id="services" className="mx-auto max-w-6xl px-6 py-12">
        		<div className="flex items-end justify-between gap-6">
          			<div>
            			<h2 className="text-2xl font-extrabold tracking-tight">
              				Offerings
            			</h2>
            			<p className="mt-2 max-w-2xl text-sm text-gray-400">
              				Pick a focused engagement, or combine services for a complete
              				security and delivery uplift.
            			</p>
          			</div>
          			<div className="hidden sm:block">
            			<Button href="/contact" variant="secondary">
              				Get a quote
            			</Button>
          			</div>
        		</div>

        		<div className="mt-8 grid gap-6 lg:grid-cols-2">
          		{services.map((s) => (
            		<Card key={s.title}>
              			<div className="p-6 sm:p-8">
                			<div className="flex flex-wrap items-center justify-between gap-3">
                  				<h3 className="text-lg font-bold">{s.title}</h3>
                  				<div className="flex flex-wrap gap-2">
                    			{s.deliverables.slice(0, 2).map((d) => (
                      				<Badge key={d}>{d}</Badge>
                    			))}
                  				</div>
                			</div>

                			<p className="mt-2 text-sm text-white">{s.subtitle}</p>

                			<ul className="mt-4 space-y-2 text-sm text-gray-400">
							{s.bullets.map((b) => (
								<li key={b} className="flex gap-2">
									<span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-white" />
									<span>{b}</span>
								</li>
							))}
							</ul>

							<div className="mt-6 rounded-2xl bg-slate-900 p-4">
								<p className="text-sm font-semibold text-white">
									Deliverables
								</p>
								<div className="mt-2 flex flex-wrap gap-2">
								{s.deliverables.map((d) => (
									<Badge key={d}>{d}</Badge>
								))}
								</div>
							</div>

							<div className="mt-6 flex flex-wrap gap-3">
								<Button href="/contact">Request this service</Button>
								<Button href="/projects" variant="secondary">
									See related work
								</Button>
							</div>
              			</div>
            		</Card>
          		))}
        		</div>

        		<div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          			<h3 className="text-lg font-bold">Engagement options</h3>
          			<div className="mt-4 grid gap-4 md:grid-cols-3">
            			<div className="rounded-2xl bg-slate-50 p-5">
              				<p className="text-sm font-semibold text-slate-900">
                				Discovery Sprint
              				</p>
              				<p className="mt-1 text-sm text-slate-700">
                				Short, focused sprint to define scope, confirm assumptions, and
                				map risk.
              				</p>
            			</div>
            			<div className="rounded-2xl bg-slate-50 p-5">
              				<p className="text-sm font-semibold text-slate-900">
                				Fixed-Scope Project
              				</p>
              				<p className="mt-1 text-sm text-slate-700">
                				Clear targets and deliverables. Best for pentests and hardening
                				packages.
              				</p>
            			</div>
            			<div className="rounded-2xl bg-slate-50 p-5">
              				<p className="text-sm font-semibold text-slate-900">Retainer</p>
              				<p className="mt-1 text-sm text-slate-700">
                				Ongoing support for security fixes, tooling, and secure delivery
                				improvements.
              				</p>
            			</div>
          			</div>

          			<div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            			<p className="text-sm text-slate-700">
              				If you want a number, you need a scope. Book a call and I will
              				give you a real quote.
            			</p>
            			<Button href="/contact">Book a scoping call</Button>
          			</div>
        		</div>
      		</section>

      		<section className="mx-auto max-w-6xl px-6 pb-16 pt-6">
        		<h2 className="text-2xl font-extrabold tracking-tight">FAQ</h2>
        		<div className="mt-6 grid gap-6 lg:grid-cols-2">
          		{faqs.map((f) => (
        			<Card key={f.q}>
          				<div className="p-6 sm:p-8">
            				<h3 className="text-base font-bold">{f.q}</h3>
                			<p className="mt-2 text-sm leading-relaxed text-slate-700">
                  				{f.a}
                			</p>
              			</div>
            		</Card>
        		))}
    			</div>

        		<div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
          			<div className="grid gap-6 md:grid-cols-2 md:items-center">
        				<div>
          					<h3 className="text-xl font-extrabold">
            					Ready to ship safer software?
              				</h3>
              				<p className="mt-2 text-sm text-slate-200">
                				Send your scope and constraints. I will respond with next steps
                				and a concrete proposal.
            				</p>
        				</div>
        				<div className="flex flex-wrap gap-3 md:justify-end">
              				<Button href="/contact" variant="secondary">
                				Contact
              				</Button>
              				<Button href="/resume">View resume</Button>
            			</div>
        			</div>
    			</div>
  			</section>
    	</>
  	);
}

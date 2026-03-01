"use client"

import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import Button from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Download, FileText } from "lucide-react"

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: resumeRef })

  return (
    <div className="min-h-screen pb-20">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl space-y-6 text-base-content">

          {/* UI Header (screen only) */}
          <header className="flex items-start justify-between print:hidden">
            <h1 className="text-4xl font-bold">Resume</h1>
            <div className="flex gap-3">
              <a href="/resume.pdf" target="_blank" className="btn btn-primary btn-sm rounded-full">
                <FileText className="w-4 h-4" />
                View PDF
              </a>
              <Button size="sm" onClick={handlePrint}>
                <Download className="w-4 h-4" />
                Print/Save
              </Button>
            </div>
          </header>

          {/* ================= PRINTABLE RESUME ================= */}
          <Card ref={resumeRef} className="p-8 shadow-none ring-0">
            <CardContent className="p-0 space-y-6">

              {/* CONTACT HEADER */}
              <section>
                <h2 className="text-2xl font-bold">Jason O&apos;Neal</h2>
                <p>Security Engineer | Systems & Automation Specialist</p>

                <div className="mt-2 text-sm space-y-1">
                  <p>Lenoir, NC 28645</p>
                  <p>jason.allen.oneal@gmail.com | 828-215-6403</p>
                  <p>https://linkedin.com/in/jason-oneal</p>
                  <p>https://github.com/jason-allen-oneal</p>
                  <p>https://bluedot.it.com</p>
                </div>
              </section>

              {/* SUMMARY */}
              <section>
                <h3 className="font-semibold uppercase border-b">Summary</h3>
                <p className="mt-2">
                  Security-focused engineer with 24+ years of experience in full-stack development, systems administration, network security, and vulnerability research. Specializing in threat analysis, secure architecture design, automation, and AI-integrated security tooling. Hands-on background in incident response, risk assessment, and Linux-based security hardening. Strong communicator capable of translating technical risk into actionable strategy. Completing a B.S. in Cybersecurity to formalize deep practical expertise and pursue Security Engineering or Red/Blue Team roles.
                </p>
              </section>

              {/* SKILLS */}
              <section>
                <h3 className="font-semibold uppercase border-b">Technical Skills</h3>

                <p className="mt-2"><strong>Security Research:</strong> Penetration Testing (Kali Linux, Metasploit, Nmap), Vulnerability Assessment, Threat Intel (STIX/TAXII), OSINT</p>
                <p><strong>Full-Stack Development:</strong> TypeScript/JavaScript (Next.js, Node.js, React), Python (Django, Flask), PHP, Java, SQL (MySQL, PostgreSQL, MongoDB)</p>
                <p><strong>Systems & Infrastructure:</strong> Linux Administration (Debian, Ubuntu, Kali), NGINX, Docker, AWS, CI/CD (GitHub Actions), SSH/VPN/DNS Hardening</p>
                <p><strong>AI/ML Security:</strong> LLM Tooling, Autonomous Agent Orchestration, MCP Server Development, Prompt Engineering</p>
              </section>

              {/* EXPERIENCE */}
              <section>
                <h3 className="font-semibold uppercase border-b">Experience</h3>

                <div className="mt-2">
                  <p className="flex justify-between"><strong>Technical/Cybersecurity Consultant / Owner</strong> <span>January 2026 – Present</span></p>
                  <p className="italic text-sm">BlueDot IT — Lenoir, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Founded and launched a cybersecurity-focused consultancy delivering secure infrastructure design, web application hardening, and network defense services.</li>
                    <li>Architect and deploy hardened Linux/NGINX environments with SSH, firewall, and access control enforcement.</li>
                    <li>Lead full lifecycle development of secure web applications, from database schema design to production-grade deployment and monitoring.</li>
                    <li>Provide small-business security assessments, remediation planning, and risk reduction strategies.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="flex justify-between"><strong>Independent Technical Consultant</strong> <span>January 2002 – December 2025</span></p>
                  <p className="italic text-sm">Lenoir, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Designed, deployed, and maintained Linux-based infrastructure with continuous uptime, patch management, and access control enforcement.</li>
                    <li>Built custom web applications and automation tooling for independent clients, emphasizing secure coding and maintainable architecture.</li>
                    <li>Managed long-term hosting, backups, and system resilience across self-administered environments.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="flex justify-between"><strong>PSE Mail Processing Clerk</strong> <span>September 2023 – February 2025</span></p>
                  <p className="italic text-sm">United States Postal Service — Lenoir, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Managed high-volume logistics and time-sensitive processing in a high-pressure environment.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="flex justify-between"><strong>Security Guard</strong> <span>April 2021 – August 2022</span></p>
                  <p className="italic text-sm">AgTac / Allied Universal — Lenoir, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Monitored industrial and commercial perimeters; reported suspicious activity and maintained detailed incident logs.</li>
                  </ul>
                </div>
              </section>

              {/* PROJECTS */}
              <section>
                <h3 className="font-semibold uppercase border-b">Selected Projects</h3>

                <div className="mt-2">
                  <p><strong>Pentest-Agent</strong> | Python, Kali Linux, AI Orchestration</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Architected a modular, AI-assisted red-team framework that automates reconnaissance and vulnerability discovery.</li>
                  </ul>
                </div>

                <div className="mt-3">
                  <p><strong>GhostMCP</strong> | Python, MCP Protocol, Cybersecurity Tooling</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Developed a production-ready Model Context Protocol (MCP) server providing AI agents with high-integrity cybersecurity tools.</li>
                  </ul>
                </div>

                <div className="mt-3">
                  <p><strong>Sentry-Flow</strong> | Python, Threat Intelligence</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Built a threat intelligence sharing platform to collect, normalize, and score Indicators of Compromise (IOCs).</li>
                  </ul>
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <h3 className="font-semibold uppercase border-b">Education</h3>
                <p className="mt-2">
                  <strong>B.S. in Cybersecurity</strong><br />
                  DeVry University Online (Expected 2027)
                </p>
                <p className="mt-1">
                  <strong>A.S. in Cybersecurity</strong><br />
                  DeVry University Online (Expected Oct 2026)
                </p>
                <p className="mt-1 text-sm italic">
                  *Undergraduate Certificate in IT Essentials Completed Dec 2025.
                </p>
              </section>

            </CardContent>
          </Card>

          {/* PRINT NORMALIZATION */}
          <style jsx global>{`
            @media print {
              * {
                color: #000 !important;
                background: transparent !important;
                box-shadow: none !important;
              }
              body {
                background: white !important;
              }
              a {
                text-decoration: none;
              }
            }
          `}</style>

        </div>
      </div>
    </div>
  )
}

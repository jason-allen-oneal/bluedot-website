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
                <p>Systems Administrator | Security Engineer | Full-Stack Developer</p>

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
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>24+ years of systems administration and engineering experience (since 2002).</li>
                  <li>Specialist in infrastructure hardening, DevSecOps, and secure software delivery.</li>
                  <li>Architected and deployed secure full-stack applications for automotive, gaming, and SaaS.</li>
                  <li>Expertise in Linux systems (Kali, Debian, Parrot OS), automation, and AI integration.</li>
                  <li>Proven track record of managing end-to-end projects with high-reliability requirements.</li>
                </ul>
              </section>

              {/* SKILLS */}
              <section>
                <h3 className="font-semibold uppercase border-b">Technical Skills</h3>

                <p className="mt-2"><strong>Languages & Frameworks:</strong> TypeScript, JavaScript, Python, PHP, React, Next.js, Node.js, Django</p>
                <p><strong>DevOps & Infrastructure:</strong> Docker, Kubernetes, CI/CD pipelines, NGINX, SSH, TLS, AWS, Linode</p>
                <p><strong>Databases & ORMs:</strong> MySQL, PostgreSQL, MongoDB, Prisma, SQLAlchemy</p>
                <p><strong>Cybersecurity:</strong> Pentesting (OWASP), Hardening, Network Analysis (Nmap/Wireshark), Threat Modeling</p>
                <p><strong>Operational Tools:</strong> Git, GitHub, Linux CLI/Zsh, PM2, Agentic AI Tooling</p>
              </section>

              {/* EXPERIENCE */}
              <section>
                <h3 className="font-semibold uppercase border-b">Experience</h3>

                <div className="mt-2">
                  <p className="flex justify-between"><strong>Principal Systems Engineer & Developer</strong> <span>January 2002 – Present</span></p>
                  <p className="italic text-sm">BlueDot IT (The Realms Beyond) — Lenoir, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Deliver custom IT foundations and application development for 20+ diverse clients.</li>
                    <li>Design and maintain secure production environments with 99.9% uptime targets.</li>
                    <li>Automate complex workflows via custom tooling and intelligent agent integration.</li>
                    <li>Provide security audits, vulnerability remediation, and infrastructure hardening.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="flex justify-between"><strong>Customer Support Representative</strong> <span>March 2009 – December 2010</span></p>
                  <p className="italic text-sm">Convergys — Hickory, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Resolved Tier 1 and Tier 2 connectivity and device configuration issues.</li>
                    <li>Optimized documentation and troubleshooting procedures for mobile hardware.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p className="flex justify-between"><strong>Technical Support & Retention</strong> <span>June 2005 – December 2005</span></p>
                  <p className="italic text-sm">ClientLogic — Asheville, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Performed technical troubleshooting for ISP services and local network configurations.</li>
                  </ul>
                </div>
              </section>

              {/* PROJECTS */}
              <section>
                <h3 className="font-semibold uppercase border-b">Selected Projects</h3>

                <div className="mt-2">
                  <p><strong>ExploitRank (EIE)</strong> | Intelligence Engine</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Automated pipeline for vulnerability ingestion (NVD), GitHub exploit discovery, and ERS scoring.</li>
                  </ul>
                </div>

                <div className="mt-3">
                  <p><strong>BlueDot IT Platform</strong> | Next.js Portfolio & Service Delivery</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Persona-driven business platform featuring automated builds and secure delivery pipelines.</li>
                  </ul>
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <h3 className="font-semibold uppercase border-b">Education</h3>
                <p className="mt-2">
                  <strong>B.S. in Cybersecurity</strong><br />
                  DeVry University Online (Expected 2026)
                </p>
                <p className="mt-2 text-sm italic">
                  *Undergraduate Certificate in IT Essentials Completed Dec 2025.
                </p>
              </section>

            </CardContent>
          </Card>

          {/* PDF PREVIEW (screen only) */}
          <section className="print:hidden">
            <Card className="p-6">
              <CardContent className="p-0 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Latest Resume (PDF)</h3>
                    <p className="text-sm text-base-content/70">Mirroring the latest Jason_ONeal_Resume_2026.pdf version.</p>
                  </div>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium underline"
                  >
                    Open in tab
                  </a>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
                  <object
                    data="/resume.pdf"
                    type="application/pdf"
                    className="h-[80vh] w-full"
                    aria-label="Resume PDF preview"
                  >
                    <div className="p-4 text-sm text-center">
                      <p className="mb-4">PDF preview not available in this browser.</p>
                      <a href="/resume.pdf" className="btn btn-primary">
                        Download Latest Resume
                      </a>
                    </div>
                  </object>
                </div>
              </CardContent>
            </Card>
          </section>

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

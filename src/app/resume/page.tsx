"use client"

import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import Button from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { Download } from "lucide-react"

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: resumeRef })

  return (
    <div className="min-h-screen p-8 text-secondary-content">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-4 print:hidden">
          <div>
            <h1 className="text-4xl font-bold text-accent">Resume</h1>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-base-400">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <Button
              size="sm"
              onClick={handlePrint}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </header>

        {/* Resume Card */}
        <Card
          ref={resumeRef}
          className="rounded-2xl p-8 shadow-lg ring-1 ring-accent/10"
        >
          <CardContent className="p-0 space-y-10">
            {/* Contact Header */}
            <section>
              <h2 className="text-2xl font-semibold text-secondary">Jason O’Neal</h2>
              <p className="mt-1 text-sm text-secondary-content">
                Cybersecurity Student • Full-Stack Developer • Systems Builder
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-base-400">
                <span>📍 Lenoir, NC</span>
                <a href="mailto:jason.allen.oneal@gmail.com" className="hover:text-primary hover:underline">
                  jason.allen.oneal@gmail.com
                </a>
                <a href="tel:+18282156403" className="hover:text-primary hover:underline">
                  +1 (828) 215-6403
                </a>
                <a
                  href="https://github.com/jason-allen-oneal"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://bluedot.it.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary hover:underline"
                >
                  Portfolio
                </a>
              </div>
            </section>

            {/* Summary */}
            <section>
              <h3 className="mb-2 border-b border-accent/50 pb-1 text-sm font-semibold uppercase tracking-widest text-secondary">
                Summary
              </h3>
              <p className="text-secondary-content leading-relaxed">
                Aspiring cybersecurity professional and full-stack developer with over 15 years of freelance
                experience designing and deploying secure, scalable applications. Currently completing a degree in
                Cybersecurity while developing IoT security, pentesting, and AI-powered tools. Skilled across
                modern front-end frameworks and back-end systems with a deep focus on infrastructure, Linux, and
                secure design.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h3 className="mb-3 border-b border-accent/50 pb-1 text-sm font-semibold uppercase tracking-widest text-secondary">
                Technical Skills
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ["Languages & Frameworks", "TypeScript, JavaScript, Python, PHP, Java, React, Node.js, Django, Vue.js"],
                  ["Web & Systems", "HTML5, CSS3/SASS, REST/GraphQL, JSON, AJAX, Responsive Design"],
                  ["Databases", "MySQL, MongoDB, SQL, NoSQL, LAMP stack"],
                  ["Cybersecurity & Infrastructure", "Linux (Debian/Parrot OS/Kali/Ubuntu), MacOS, Windows, NGINX, Apache, SSH, TLS, DNS, Networking, AWS"],
                  ["Tools & Version Control", "Git/GitHub, Docker, Prisma, PM2, WordPress, CMS platforms"],
                  ["Other", "UI/UX design, debugging, software deployment, e-commerce systems"],
                ].map(([title, content]) => (
                  <div key={title}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-base-400">{title}</p>
                    <p className="mt-1 text-secondary-content">{content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h3 className="mb-3 border-b border-accent/50 pb-1 text-sm font-semibold uppercase tracking-widest text-secondary">
                Experience
              </h3>
              <div className="space-y-6">
                {[
                  {
                    role: "Freelance Full-Stack Developer",
                    years: "2002 – Present",
                    company: "The Realms Beyond — Lenoir, NC",
                    bullets: [
                      "Delivered custom software for automotive, gaming, and SaaS clients.",
                      "Built secure full-stack systems integrating APIs, databases, and payments.",
                      "Focused on security best practices: encryption, HTTPS, authentication, data protection.",
                    ],
                    stack: "React, Node.js, PHP, MySQL, Python, TypeScript, AWS",
                  },
                  {
                    role: "Customer Support Representative",
                    years: "2009 – 2010",
                    company: "Convergys — Hickory, NC",
                    bullets: [
                      "Tier-1/2 mobile support; connectivity and device troubleshooting.",
                      "Handled high-volume customer communications with precision and empathy.",
                    ],
                  },
                  {
                    role: "Customer Support Representative (Retention)",
                    years: "2005",
                    company: "Clientlogic — Asheville, NC",
                    bullets: [
                      "Supported Earthlink ISP customers with retention and escalations.",
                      "Handled service troubleshooting and account save strategies.",
                    ],
                  },
                ].map((job) => (
                  <div key={job.role}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-base font-semibold text-secondary">{job.role}</p>
                      <p className="text-sm text-base-400">{job.years}</p>
                    </div>
                    <p className="text-sm italic text-base-400">{job.company}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-secondary-content">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    {job.stack && (
                      <p className="mt-2 text-sm text-secondary-content">
                        <span className="font-semibold">Stack:</span> {job.stack}
                      </p>
                    )}
                    <Separator className="my-4 bg-accent/40" />
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="mb-3 border-b border-accent/50 pb-1 text-sm font-semibold uppercase tracking-widest text-secondary">
                Education
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-base font-semibold text-secondary">
                    Bachelor of Science, Cybersecurity{" "}
                    <span className="text-sm font-normal text-base-400">(in progress)</span>
                  </p>
                  <p className="text-sm text-base-400">DeVry University Online</p>
                </div>
                <div>
                  <p className="text-base font-semibold text-secondary">High School Diploma</p>
                  <p className="text-sm text-base-400">Normangee High School — Normangee, TX</p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        {/* Print overrides */}
        <style jsx global>{`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .print\\:hidden {
              display: none !important;
            }
            .bg-secondary\\/60,
            .bg-secondary\\/40,
            .bg-secondary\\/30,
            .bg-secondary\\/20 {
              background: #ffffff !important;
            }
            .border-accent\\/80,
            .border-accent\\/60,
            .border-accent\\/50 {
              border-color: #94a3b8 !important;
            }
            .text-secondary,
            .text-secondary-content,
            .text-base-400 {
              color: #0f172a !important;
            }
            .text-accent,
            .text-primary {
              color: #0e7490 !important;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

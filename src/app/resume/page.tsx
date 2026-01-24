"use client"

import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import Button from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Download } from "lucide-react"

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ contentRef: resumeRef })

  return (
    <div className="min-h-screen">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl space-y-6 text-base-content">

          {/* UI Header (screen only) */}
          <header className="flex items-start justify-between print:hidden">
            <h1 className="text-4xl font-bold">Resume</h1>
            <Button size="sm" onClick={handlePrint}>
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </header>

          {/* ================= PRINTABLE RESUME ================= */}
          <Card ref={resumeRef} className="p-8 shadow-none ring-0">
            <CardContent className="p-0 space-y-6">

              {/* CONTACT HEADER */}
              <section>
                <h2 className="text-2xl font-bold">Jason O&apos;Neal</h2>
                <p>Cybersecurity Student | Full-Stack Developer | Systems Builder</p>

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
                  <li>Cybersecurity student with 15+ years of freelance full-stack development experience</li>
                  <li>Designed and deployed secure applications for automotive, gaming, and SaaS clients</li>
                  <li>Builder of IoT security tools, penetration testing utilities, and AI-assisted systems</li>
                  <li>Strong Linux and infrastructure background across Kali, Parrot OS, Debian, and AWS</li>
                  <li>Unique blend of offensive security mindset and production systems engineering</li>
                </ul>
              </section>

              {/* SKILLS */}
              <section>
                <h3 className="font-semibold uppercase border-b">Technical Skills</h3>

                <p className="mt-2"><strong>Languages & Frameworks:</strong> TypeScript, JavaScript, Python, PHP, Java, React, Node.js, Django, Vue.js</p>
                <p><strong>Web & Systems:</strong> HTML5, CSS3/SASS, REST, GraphQL, JSON, Responsive Design</p>
                <p><strong>Databases:</strong> MySQL, MongoDB, LAMP stack</p>
                <p><strong>Cybersecurity:</strong> Kali Linux, Parrot OS, Metasploit, Burp Suite, Nmap, OWASP Top 10</p>
                <p><strong>Infrastructure:</strong> Linux, NGINX, Apache, SSH, TLS, DNS, AWS</p>
                <p><strong>Tools:</strong> Git, GitHub, Docker, Prisma, PM2</p>
              </section>

              {/* EXPERIENCE */}
              <section>
                <h3 className="font-semibold uppercase border-b">Experience</h3>

                <div className="mt-2">
                  <p><strong>Freelance Full-Stack Developer</strong> | January 2002 – Present</p>
                  <p className="italic">The Realms Beyond — Lenoir, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Delivered 20+ custom software solutions for automotive, gaming, and SaaS clients</li>
                    <li>Architected secure full-stack systems integrating APIs, databases, and payment processing</li>
                    <li>Implemented encryption, HTTPS, and authentication controls to reduce security risk</li>
                    <li>Managed projects end-to-end from requirements through deployment and support</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p><strong>Customer Support Representative</strong> | March 2009 – December 2010</p>
                  <p className="italic">Convergys — Hickory, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Resolved Tier 1 and Tier 2 mobile connectivity and device issues</li>
                    <li>Handled 60+ customer interactions daily while maintaining high satisfaction</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <p><strong>Customer Support Representative (Retention)</strong> | June 2005 – December 2005</p>
                  <p className="italic">ClientLogic — Asheville, NC</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Performed ISP technical troubleshooting and customer retention escalations</li>
                    <li>Executed account save strategies to reduce service churn</li>
                  </ul>
                </div>
              </section>

              {/* PROJECTS */}
              <section>
                <h3 className="font-semibold uppercase border-b">Projects</h3>

                <div className="mt-2">
                  <p><strong>AI-Powered Penetration Testing Assistant</strong> | 2024</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Developed AI-assisted penetration testing tool to automate vulnerability discovery</li>
                    <li>Integrated reconnaissance, analysis, and reporting workflows</li>
                    <li>Technologies: Python, Kali Linux, REST APIs, LLM tooling</li>
                  </ul>
                </div>

                <div className="mt-3">
                  <p><strong>IoT Security Assessment Toolkit</strong> | 2023</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Built Python-based toolkit to identify common IoT network vulnerabilities</li>
                    <li>Reduced manual testing effort by more than 50 percent</li>
                    <li>Technologies: Python, Linux, Nmap, Wireshark</li>
                  </ul>
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <h3 className="font-semibold uppercase border-b">Education</h3>
                <p className="mt-2">
                  <strong>Bachelor of Science in Cybersecurity</strong><br />
                  DeVry University Online<br />
                  Expected Graduation: 2026
                </p>
              </section>

            </CardContent>
          </Card>

          {/* CERTIFICATE PREVIEW (screen only) */}
          <section className="print:hidden">
            <Card className="p-6">
              <CardContent className="p-0 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Undergraduate Certificate</h3>
                    <p className="text-sm text-base-content/70">Preview is hidden when printing the resume.</p>
                  </div>
                  <a
                    href="/cert.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium underline"
                  >
                    Open PDF
                  </a>
                </div>

                <div className="overflow-hidden rounded-lg border border-base-300 bg-base-100">
                  <object
                    data="/cert.pdf"
                    type="application/pdf"
                    className="h-[70vh] w-full"
                    aria-label="Undergraduate certificate PDF preview"
                  >
                    <div className="p-4 text-sm">
                      PDF preview not available.{" "}
                      <a href="/cert.pdf" className="underline">
                        Download the certificate
                      </a>
                      .
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

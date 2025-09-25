"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Resume() {
    const resumeRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({ contentRef: resumeRef });
    return (
        <div className="h-full overflow-auto p-6 text-slate-100">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <header className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-cyan-200">Resume</h1>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-slate-400">
                            Last updated:{" "}
                            {new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <button onClick={handlePrint}>Download PDF</button>
                </header>


                {/* Card */}
                <div ref={resumeRef} id="resume-container" className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 shadow-xl ring-1 ring-white/5 backdrop-blur">
                    {/* Name + Title */}
                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold leading-tight text-white">Jason O’Neal</h2>
                        <p className="mt-1 text-sm text-slate-300">
                            Cybersecurity Student • Full-Stack Developer • Systems Builder
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                            <span>📍 Lenoir, NC</span>
                            <a
                                href="mailto:jason.allen.oneal@gmail.com"
                            className="hover:text-cyan-200 hover:underline"
                            >
                                jason.allen.oneal@gmail.com
                            </a>
                            <a href="tel:+18282156403" className="hover:text-cyan-200 hover:underline">
                                +1 (828) 215-6403
                            </a>
                
                            <a
                                className="hover:text-cyan-200 hover:underline"
                                href="https://github.com/jason-allen-oneal"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                            <a
                                className="hover:text-cyan-200 hover:underline"
                                href="https://bluedot.it"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Portfolio
                            </a>
                        </div>
                    </section>

                    {/* Summary */}
                    <section className="mb-8">
                        <h3 className="mb-2 border-b border-slate-700/60 pb-1 text-sm font-semibold uppercase tracking-widest text-slate-300">
                            Summary
                        </h3>
                        <p className="text-slate-200">
                            Aspiring cybersecurity professional and full-stack developer with 15+ years of freelance
                            experience designing and deploying secure, scalable web applications. Currently completing a
                            degree in Cybersecurity while building a portfolio of projects in IoT security, penetration testing,
                            and AI-powered tooling. Skilled in both front-end frameworks (React, TypeScript, Next.js) and
                            back-end systems (Node.js, Python, MySQL, Linux/NGINX, AWS), with a strong foundation in
                            networking, databases, and application security.
                        </p>
                    </section>

          {/* Technical Skills */}
          <section className="mb-8">
            <h3 className="mb-3 border-b border-slate-700/60 pb-1 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Technical Skills
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Languages & Frameworks
                </p>
                <p className="mt-1 text-slate-200">
                  TypeScript, JavaScript (ES6+), Python, PHP, Java, React, Node.js, Express.js, Django, Vue.js
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Web & Systems
                </p>
                <p className="mt-1 text-slate-200">
                  HTML5, CSS3/SASS, REST/GraphQL APIs, Bootstrap, JSON, AJAX, Responsive Design
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Databases</p>
                <p className="mt-1 text-slate-200">MySQL, MongoDB, SQL, NoSQL, LAMP stack</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Cybersecurity & Infrastructure
                </p>
                <p className="mt-1 text-slate-200">
                  Linux (Debian/Parrot OS), NGINX, Apache, SSH, SSL/TLS, DNS, Networking, AWS, SSO
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Tools & Version Control
                </p>
                <p className="mt-1 text-slate-200">Git/GitHub, Docker, Prisma, PM2, WordPress, CMS platforms</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Other</p>
                <p className="mt-1 text-slate-200">UI/UX design, debugging, software deployment, e-commerce systems</p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h3 className="mb-3 border-b border-slate-700/60 pb-1 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Experience
            </h3>

            <div className="space-y-6">
              {/* Job 1 */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-base font-semibold text-white">Freelance Full-Stack Developer</p>
                  <p className="text-sm text-slate-400">2002 – Present</p>
                </div>
                <p className="text-sm italic text-slate-400">The Realms Beyond — Lenoir, NC</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200">
                  <li>
                    Delivered custom software for automotive, gaming, e-commerce, and SaaS clients.
                  </li>
                  <li>
                    Built single-page apps and full-stack systems integrating APIs, databases, and secure payments.
                  </li>
                  <li>
                    Emphasized security-conscious development: encryption, HTTPS, auth, and secure data storage.
                  </li>
                </ul>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="font-semibold">Stack:</span> React, Node.js, PHP, MySQL, Python, Redux, TypeScript, AWS
                </p>
              </div>

              {/* Job 2 */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-base font-semibold text-white">Customer Support Representative</p>
                  <p className="text-sm text-slate-400">2009 – 2010</p>
                </div>
                <p className="text-sm italic text-slate-400">Convergys — Hickory, NC</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200">
                  <li>Tier-1/2 mobile support; connectivity and device troubleshooting.</li>
                  <li>High-volume customer communication and issue resolution.</li>
                </ul>
              </div>

              {/* Job 3 */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-base font-semibold text-white">
                    Customer Support Representative (Retention)
                  </p>
                  <p className="text-sm text-slate-400">2005</p>
                </div>
                <p className="text-sm italic text-slate-400">Clientlogic — Asheville, NC</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200">
                  <li>Supported Earthlink ISP customers with retention and escalations.</li>
                  <li>Service troubleshooting and account save strategies.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="mb-3 border-b border-slate-700/60 pb-1 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Education
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-base font-semibold text-white">
                  Bachelor of Science, Cybersecurity <span className="text-sm font-normal text-slate-400">(in progress)</span>
                </p>
                <p className="text-sm text-slate-400">DeVry University Online</p>
              </div>
              <div>
                <p className="text-base font-semibold text-white">High School Diploma</p>
                <p className="text-sm text-slate-400">Normangee High School — Normangee, TX</p>
              </div>
            </div>
          </section>
        </div>

        {/* Print styles */}
        <style jsx global>{`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .print\\:hidden {
              display: none !important;
            }
            .shadow-xl,
            .ring-1 {
              box-shadow: none !important;
              -webkit-box-shadow: none !important;
            }
            .border,
            .ring-1 {
              border-color: #94a3b8 !important; /* slate-400 for print legibility */
            }
            .bg-slate-900\\/50,
            .bg-slate-900 {
              background: #ffffff !important;
            }
            .text-slate-100,
            .text-white {
              color: #0f172a !important; /* slate-900 */
            }
            .text-slate-300,
            .text-slate-400 {
              color: #334155 !important; /* slate-700 */
            }
            .text-cyan-200 {
              color: #0e7490 !important; /* cyan-700 for print */
            }
          }
        `}</style>
      </div>
    </div>
  );
}

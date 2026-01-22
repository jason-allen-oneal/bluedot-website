import Badge from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import Reveal from "@/components/Reveal";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'About',
  description: 'Jason O\'Neal - Engineer, security enthusiast, and creative problem-solver. Expert in AI-powered cybersecurity tooling, full-stack development, and creative projects.',
  openGraph: {
    title: 'About Jason O\'Neal | BlueDot IT',
    description: 'Engineer, security enthusiast, and creative problem-solver',
    type: 'profile',
  }
}

export default function About() {
  return (
    <div className="page-shell space-y-12">
      <Reveal>
        <div className="text-center space-y-4">
          <span className="kicker">Behind Bluedot</span>
          <h1 className="heading-accent text-4xl md:text-5xl font-bold">Engineer, security enthusiast, and creative problem-solver</h1>
          <p className="text-base-content/80 max-w-3xl mx-auto">
            A career that blends security research, product delivery, and a maker mentality.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Reveal>
            <Card>
              <CardHeader className="pb-3">
                <p className="text-xl font-bold text-base-content">Technical focus</p>
              </CardHeader>
              <CardContent className="space-y-4 text-base-content/85">
                <p className="leading-relaxed mb-3">
                  I build{" "}
                  <span className="heading-accent font-semibold">
                    AI-powered cybersecurity tooling
                  </span>
                  , engineer infrastructure for rapid iteration, and tune performance so products feel frictionless. Strong in{" "}
                  <span className="heading-accent font-medium">TypeScript</span>,{" "}
                  <span className="heading-accent font-medium">Python</span>,{" "}
                  <span className="heading-accent font-medium">PHP</span>, Linux systems,
                  cloud platforms, and low-level debugging when required.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <Card>
              <CardHeader className="pb-3">
                <p className="text-xl font-bold text-base-content">Creative pursuits</p>
              </CardHeader>
              <CardContent className="space-y-4 text-base-content/85">
                <p className="leading-relaxed mb-3">
                  Music composition for{" "}
                  <span className="heading-accent font-medium">guitar</span>, world-building for
                  <span className="heading-accent font-medium"> TTRPG</span> campaigns and an upcoming novel, and the occasional wrench session on my{" "}
                  <span className="heading-accent font-medium">Jeep</span>. The same curiosity shapes how I prototype interfaces and systems.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal>
            <Card>
              <CardHeader className="pb-2">
                <p className="text-xl font-bold text-base-content">Core skills</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "Python", "PHP", "JavaScript"].map((lang) => (
                      <Badge key={lang} variant="accent" size="sm" className="px-3 py-2 bg-white/10 border border-white/10">{lang}</Badge>
                    ))}
                  </div>
                </div>

                <Separator className="bg-white/10" />

                <div className="pb-3">
                  <h3 className="font-semibold text-primary mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {["React", "Next.js", "Linux", "Docker"].map((tech) => (
                      <Badge key={tech} variant="accent" size="sm" className="px-3 py-2 bg-white/10 border border-white/10">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal>
            <Card>
              <CardHeader className="pb-2">
                <p className="text-xl font-bold text-base-content">Interests</p>
              </CardHeader>
              <CardContent className="space-y-3 text-base-content">
                {[
                  "Guitar performance & music composition",
                  "D&D world building & TTRPG design",
                  "Mechanical projects & vehicle work",
                  "Cybersecurity research & AI tools",
                ].map((interest) => (
                  <div key={interest} className="flex items-center space-x-3 mb-3 pb-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-base-content/85">{interest}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

import Badge from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";

export const dynamic = "force-dynamic";

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-accent">About Me</h1>
        <p className="text-lg text-base-400 max-w-2xl mx-auto">
          Engineer, security enthusiast, and creative problem-solver
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Technical Expertise */}
          <Card>
            <CardHeader>
              <p className="text-2xl font-bold text-secondary">
                Technical Expertise
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-base-content">
              <p className="leading-relaxed">
                I build{" "}
                <span className="text-primary font-semibold">
                  AI-powered cybersecurity tooling
                </span>
                , engineer infrastructure for rapid iteration, and write fantasy fiction. My
                technical expertise spans{" "}
                <span className="text-primary font-medium">TypeScript</span>,{" "}
                <span className="text-primary font-medium">Python</span>,{" "}
                <span className="text-primary font-medium">PHP</span>, Linux systems,
                cloud platforms, and low-level debugging when required.
              </p>
            </CardContent>
          </Card>

          {/* Creative Pursuits */}
          <Card>
            <CardHeader>
              <p className="text-2xl font-bold text-secondary">
                Creative Pursuits
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-base-content">
              <p className="leading-relaxed">
                Beyond engineering, I arrange and compose music with a focus on{" "}
                <span className="text-primary font-medium">guitar</span> performance,
                and I develop immersive worlds for{" "}
                <span className="text-primary font-medium">D&D</span> campaigns, my own
                novel, and an upcoming TTRPG project. I also apply a hands-on
                problem-solving mindset to mechanical projects, including work on my{" "}
                <span className="text-primary font-medium">Jeep</span>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Core Skills */}
          <Card>
            <CardHeader>
              <p className="text-2xl font-bold text-secondary">
                Core Skills
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["TypeScript", "Python", "PHP", "JavaScript"].map((lang) => (
                    <Badge key={lang} variant="accent" size="sm">{lang}</Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-primary mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Linux", "Docker"].map((tech) => (
                    <Badge key={tech} variant="accent" size="sm">{tech}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card>
            <CardHeader>
              <p className="text-2xl font-bold text-secondary">
                Interests
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-primary">
              {[
                "Guitar Performance & Music Composition",
                "D&D World Building & TTRPG Design",
                "Mechanical Projects & Vehicle Work",
                "Cybersecurity Research & AI Tools",
              ].map((interest) => (
                <div key={interest} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span>{interest}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">About Me</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Engineer, security enthusiast, and creative problem-solver
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Technical Expertise */}
          <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Technical Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                I build{" "}
                <span className="text-blue-400 font-semibold">
                  AI-powered cybersecurity tooling
                </span>
                , engineer infrastructure for rapid iteration, and write fantasy fiction. My
                technical expertise spans{" "}
                <span className="text-blue-400 font-medium">TypeScript</span>,{" "}
                <span className="text-blue-400 font-medium">Python</span>,{" "}
                <span className="text-blue-400 font-medium">PHP</span>, Linux systems,
                cloud platforms, and low-level debugging when required.
              </p>
            </CardContent>
          </Card>

          {/* Creative Pursuits */}
          <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Creative Pursuits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Beyond engineering, I arrange and compose music with a focus on{" "}
                <span className="text-blue-400 font-medium">guitar</span> performance,
                and I develop immersive worlds for{" "}
                <span className="text-blue-400 font-medium">D&D</span> campaigns, my own
                novel, and an upcoming TTRPG project. I also apply a hands-on
                problem-solving mindset to mechanical projects, including work on my{" "}
                <span className="text-blue-400 font-medium">Jeep</span>.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Core Skills */}
          <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Core Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["TypeScript", "Python", "PHP", "JavaScript"].map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="font-semibold text-blue-400 mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Linux", "Docker"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800/60 text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300">
              {[
                "Guitar Performance & Music Composition",
                "D&D World Building & TTRPG Design",
                "Mechanical Projects & Vehicle Work",
                "Cybersecurity Research & AI Tools",
              ].map((interest) => (
                <div key={interest} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
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

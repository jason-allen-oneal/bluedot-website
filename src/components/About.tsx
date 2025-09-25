import Section from "./Section";

export default function About() {
    return (
        <div className="h-full overflow-auto p-6">
            <Section title="About" subtitle="Security-minded builder with a taste for clean systems and sharp tools.">
                <div className="grid gap-8 md:grid-cols-[240px,1fr] items-start">
                    <div className="prose prose-invert prose-tech max-w-none">
                    <p>
  I build <span className="text-cyan-400 font-medium">AI-powered cybersecurity tooling</span>, engineer infrastructure for rapid iteration,
  and write fantasy fiction. My technical expertise spans <span className="text-blue-400">TypeScript</span>, <span className="text-green-400">Python</span>, <span className="text-cyan-300">PHP</span>,
  Linux systems, cloud platforms, and low-level debugging when required.
</p>
<p>
  Beyond engineering, I arrange and compose music with a focus on <span className="text-yellow-300">guitar</span> performance,
  and I develop immersive worlds for <span className="text-purple-300">D&D</span> campaigns, my own novel, and an upcoming TTRPG project.
  I also apply a hands-on problem-solving mindset to mechanical projects, including work on my <span className="text-orange-300">Jeep</span>.
</p>
                    </div>
                </div>
            </Section>
        </div>
    )
}
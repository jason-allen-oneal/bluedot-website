import Section from "@/components/Section";
import Image from "next/image";


export const metadata = { title: "About — bluedot.it.com" };


export default function AboutPage(){
    return (
        <div className="py-16">
            <Section title="About" subtitle="Security-minded builder with a taste for clean systems and sharp tools.">
                <div className="grid gap-8 md:grid-cols-[240px,1fr] items-start">
                    <div className="rounded-2xl overflow-hidden border border-neutral-800">
                        <Image src="/avatar.jpg" alt="Avatar" width={240} height={240}/>
                    </div>
                    <div className="prose prose-invert prose-tech max-w-none">
                        <p>I build AI-powered cybersecurity tooling (Pentest Agent, AgentRed), infra for fast iteration, and write about practical tradeoffs. I work primarily across {`{`}TypeScript, Python, Go{`}`}, Linux, cloud, and low-level debugging when needed.</p>
                        <p>Off the keyboard: music, world-building, and tinkering on my Jeep.</p>
                    </div>
                </div>
            </Section>
        </div>
    )
}
import Section from "@/components/Section";


export const metadata = { title: "Writing — bluedot.it.com" };


export default function WritingPage(){
    return (
        <div className="py-16">
            <Section title="Writing" subtitle="Essays on security, engineering, and craft.">
                <div className="prose prose-invert prose-tech max-w-none">
                    <p>Coming soon: curated essays and field notes. In the meantime, you’ll find thread summaries, build logs, and security write-ups here.</p>
                </div>
            </Section>
        </div>
    )
}
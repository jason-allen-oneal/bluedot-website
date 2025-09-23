import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";


export const metadata = { title: "Projects — bluedot.it.com" };


export default function ProjectsPage(){
    return (
        <div className="py-16">
            <Section title="Projects" subtitle="Agents, pentest tools, infra, and experiments.">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p: any) => <ProjectCard key={p.slug} project={p} />)}
                </div>
            </Section>
        </div>
    )
}
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { getGitHubRepos } from "@/lib/github";


export const metadata = { title: "Projects — bluedot.it.com" };


export default async function ProjectsPage(){
    const repos = await getGitHubRepos(120);
    const cards = repos.map((r) => ({
        slug: r.name,
        title: r.name,
        blurb: r.description,
        stack: [r.language],
        tags: r.features,
        href: r.link,
    }));

    return (
        <div className="py-16">
            <Section title="Projects" subtitle="Latest open-source work from GitHub">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((p: any) => <ProjectCard key={p.slug} project={p} />)}
                </div>
            </Section>
        </div>
    )
}
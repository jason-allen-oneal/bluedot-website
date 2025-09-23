import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


type Project = {
    slug: string;
    title: string;
    blurb: string;
    stack: string[];
    tags: string[];
    href?: string;
};


export default function ProjectCard({ project }: { project: Project }){
    return (
        <Link href={project.href || `/projects/${project.slug}`}>
            <Card className="group h-full border-neutral-800/80 hover:border-bluedot-500/50 transition-colors">
                <CardContent className="p-5 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold group-hover:text-bluedot-400">{project.title}</h3>
                    <p className="text-sm text-neutral-400">{project.blurb}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {project.tags.map(t => <Badge key={t} variant="secondary" className="bg-neutral-900 border-neutral-800">{t}</Badge>)}
                    </div>
                    <div className="mt-auto pt-2 text-xs text-neutral-500">{project.stack.join(" · ")}</div>
                </CardContent>
            </Card>
        </Link>
    );
}
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
    const lang = (project.stack?.[0] || "").toLowerCase();
    const getLangColorClass = (l: string) => (
        l === "typescript" ? "text-blue-400" :
        l === "javascript" ? "text-yellow-300" :
        l === "python" ? "text-green-300" :
        l === "go" ? "text-cyan-300" :
        l === "rust" ? "text-orange-400" :
        l === "java" ? "text-red-400" :
        l === "bash" ? "text-green-400" :
        "text-blue-400"
    );
    const languageDisplay = project.stack?.[0] || "";
    const restDisplay = (project.stack?.slice(1) || []).join(" · ");
    return (
        <Link href={project.href || `/projects/${project.slug}`}>
            <Card className="group h-full border-neutral-800/80 hover:border-bluedot-500/50 transition-colors">
                <CardContent className="p-5 flex flex-col gap-3">
                    <h3 className={`text-lg font-semibold tracking-tight text-cyan-400 group-hover:brightness-110 transition`}>{project.title}</h3>
                    <p className="text-sm text-neutral-400">{project.blurb}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {project.tags.map(t => <Badge key={t} variant="secondary" className="bg-neutral-900 border-neutral-800">{t}</Badge>)}
                    </div>
                    <div className="mt-auto pt-2 text-xs text-neutral-500">
                        {languageDisplay && (
                            <span className={`${getLangColorClass(lang)} font-medium`}>{languageDisplay}</span>
                        )}
                        {restDisplay && (
                            <>
                                <span> · </span>
                                <span>{restDisplay}</span>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
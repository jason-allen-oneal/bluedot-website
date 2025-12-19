import Link from "next/link"
import { getLanguageColor } from "@/lib/utility"
import { Card, CardContent } from "@/components/ui/Card"
import type { Project } from "@/types/project"

export default function RepoCard({ repo }: { repo: Project }) {
  const sourceLabel =
    repo.source === "github"
      ? "GitHub Repository"
      : repo.subtype === "space"
      ? "Hugging Face Space"
      : "Hugging Face Model"

  const cta =
    repo.source === "github"
      ? "View on GitHub"
      : repo.subtype === "space"
      ? "Open Space"
      : "View on Hugging Face"

  return (
    <Card
      className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/80 hover:shadow-lg hover:shadow-accent/20"
    >
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="space-y-1">
            <Link
              href={repo.url}
              className="text-xl font-bold text-secondary group-hover:text-accent transition-colors duration-200"
            >
              {repo.name}
            </Link>
            <div className="text-xs uppercase tracking-wide text-base-content">
              {sourceLabel}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-primary bg-primary/10 px-2 py-1 rounded-full text-sm font-medium">
              <span>★</span>
              <span>{repo.stars}</span>
            </div>
            <div className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/40">
              {repo.source === "github" ? "GH" : "HF"}
            </div>
          </div>
        </div>

        {/* Description */}
        {repo.description && (
          <p className="text-base-content mb-4 leading-relaxed line-clamp-3">
            {repo.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ring-1 ring-base-300/60 ${getLanguageColor(
                repo.language
              )}`}
            />
            <span className="text-sm text-base-content font-medium">
              {repo.language || "Unknown"}
            </span>
          </div>

          <Link
            href={repo.url}
            className="text-primary hover:text-accent text-sm font-medium group-hover:underline transition-colors duration-200 whitespace-nowrap"
          >
            {cta} →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

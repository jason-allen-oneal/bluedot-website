import Link from "next/link"
import type { Repo } from "@/lib/github"
import { getLanguageColor } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Card
      className="group bg-gray-950/60 backdrop-blur-md border border-white/90 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/20"
    >
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <Link
            href={repo.html_url}
            className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200"
          >
            {repo.name}
          </Link>
          <div className="flex items-center space-x-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full text-sm font-medium">
            <span>★</span>
            <span>{repo.stargazers_count}</span>
          </div>
        </div>

        {/* Description */}
        {repo.description && (
          <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
            {repo.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${getLanguageColor(
                repo.language
              )}`}
            />
            <span className="text-sm text-gray-400 font-medium">
              {repo.language || "Unknown"}
            </span>
          </div>

          <Link
            href={repo.html_url}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium group-hover:underline transition-colors duration-200"
          >
            View on GitHub →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

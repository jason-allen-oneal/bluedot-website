import RepoCard from "@/components/RepoCard"
import { fetchRepos } from "@/lib/github"
import { fetchHuggingFaceItems } from "@/lib/huggingface"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Project } from "@/types/project"

export const revalidate = 3600 // SSR w/ revalidation on server

export default async function Projects() {
  const githubUsername = process.env.GITHUB_USERNAME || "jason-allen-oneal"
  const huggingfaceUsername =
    process.env.HUGGINGFACE_USERNAME ||
    process.env.NEXT_PUBLIC_HUGGINGFACE_USERNAME ||
    githubUsername

  const [repos, hfItems] = await Promise.all([
    fetchRepos(githubUsername),
    fetchHuggingFaceItems(huggingfaceUsername),
  ])

  const projects: Project[] = [
    ...repos.map((repo) => ({
      id: `github:${repo.id}`,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      source: "github" as const,
      subtype: "repo" as const,
      updatedAt: repo.updated_at,
    })),
    ...hfItems.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      url: item.url,
      stars: item.likes,
      language: item.type === "space" ? "Space" : item.pipeline_tag || "Model",
      source: "huggingface" as const,
      subtype: item.type,
      updatedAt: item.lastModified,
    })),
  ].sort((a, b) => {
    const aDate = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
    const bDate = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
    if (aDate !== bDate) return bDate - aDate
    return b.stars - a.stars
  })

  const totalStars = projects.reduce((sum, repo) => sum + repo.stars, 0)
  const totalLangs = new Set(
    projects.map((r) => r.language).filter(Boolean)
  ).size

  const stats = [
    { label: "Total Projects", value: projects.length },
    { label: "Stars / Likes", value: totalStars },
    { label: "Tech / Pipelines", value: totalLangs },
  ]

  const hfCount = hfItems.length

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">My Projects</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A collection of open-source projects, tools, and experiments I&apos;ve built
        </p>
        {!hfCount && (
          <p className="text-sm text-amber-400">
            Add HUGGINGFACE_USERNAME (and token if needed) to include Hugging Face work.
          </p>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="bg-gray-950/60 backdrop-blur-md border border-white/90 text-center"
          >
            <CardContent className="pt-6 pb-5">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gray-950/60 backdrop-blur-md border border-white/90 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Want to collaborate?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I&apos;m always interested in new projects and collaborations.
            Feel free to reach out if you&apos;d like to work together!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
          >
            Get in Touch
          </a>
        </CardContent>
      </Card>
    </div>
  )
}

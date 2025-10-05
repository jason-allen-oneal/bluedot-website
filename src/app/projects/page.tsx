import { fetchRepos } from "@/lib/github"
import RepoCard from "@/components/RepoCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const revalidate = 3600 // SSR w/ revalidation on server

export default async function Projects() {
  const username = process.env.GITHUB_USERNAME || "jason-allen-oneal"
  const repos = await fetchRepos(username)

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalLangs = new Set(repos.map((r) => r.language).filter(Boolean)).size

  const stats = [
    { label: "Total Projects", value: repos.length },
    { label: "Total Stars", value: totalStars },
    { label: "Languages Used", value: totalLangs },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white">My Projects</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A collection of open-source projects, tools, and experiments I&apos;ve built
        </p>
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
        {repos.map((repo) => (
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

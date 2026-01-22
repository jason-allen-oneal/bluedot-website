import RepoCard from "@/components/RepoCard";
import { fetchRepos } from "@/lib/github";
import { fetchHuggingFaceItems } from "@/lib/huggingface";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import type { Project } from "@/types/project";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata:  Metadata = {
  title:  'Projects',
  description: 'Security work, product builds, and creative explorations across GitHub and Hugging Face.  View my open-source projects, AI models, and development tools.',
  openGraph: {
    title: 'Projects & Builds | BlueDot IT',
    description: 'Security work, product builds, and creative explorations',
    type: 'website',
  }
}

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
    return bDate - aDate
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

  return (
    <div className="page-shell space-y-14">
      <Reveal>
        <div className="text-center space-y-4">
          <span className="kicker">Bluedot builds</span>
          <h1 className="heading-accent text-4xl md:text-5xl font-bold">Projects, tools, and experiments.</h1>
          <p className="text-base-content/80 max-w-3xl mx-auto">
            Security work, product builds, and creative explorations across GitHub and Hugging Face.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Reveal key={stat.label} className="h-full">
              <Card
                className="text-center h-full"
              >
                <CardContent className="pt-6 pb-5 space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-base-content/70 text-xs uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Reveal>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((repo) => (
            <Reveal key={repo.id} className="h-full">
              <RepoCard repo={repo} />
            </Reveal>
          ))}
        </div>
      

      <Reveal>
        <Card className="text-center">
          <CardHeader>
            <p className="text-2xl font-bold text-base-content">
              Want to collaborate?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base-content/80 max-w-2xl mx-auto">
              I&apos;m always interested in new projects and collaborations.
              Feel free to reach out if you&apos;d like to work together!
            </p>
            <Link href="/contact">
              <Button>Get in Touch</Button>
            </Link>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  )
}

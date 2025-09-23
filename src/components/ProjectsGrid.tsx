import RepoCard from "@/components/RepoCard";
import { getGitHubRepos } from "@/lib/github";
import BlueDot from "./BlueDot";

export default async function ProjectsGrid() {
  const repos = await getGitHubRepos().catch(() => []);
  return (
    <section id="projects" className="relative mx-auto max-w-[1100px] px-6 py-16">
      {/* Decorative blue dots */}
      <div className="absolute top-8 left-12 opacity-20">
        <BlueDot size="md" />
      </div>
      <div className="absolute bottom-8 right-16 opacity-30">
        <BlueDot size="sm" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-6">Featured projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((r) => (
          <RepoCard key={r.name} {...r} />
        ))}
      </div>
    </section>
  );
}

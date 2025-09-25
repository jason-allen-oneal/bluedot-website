"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  features: string[];
  link: string;
  stars: number;
  updated: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        console.log('Fetching GitHub repos...');
        const response = await fetch('/api/github');
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data);
          setRepos(data);
        } else {
          const errorText = await response.text();
          console.error('API error:', response.status, errorText);
          setError(`Failed to fetch repositories: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        setError('Network error: Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Projects</h2>
        <p className="text-neutral-400">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Projects</h2>
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  const cards = repos.map((r) => ({
    slug: r.name,
    title: r.name,
    blurb: r.description,
    stack: [r.language],
    tags: r.features,
    href: r.link,
  }));

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Projects</h2>
        <p className="text-neutral-400">Latest open-source work from GitHub</p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((project: any) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

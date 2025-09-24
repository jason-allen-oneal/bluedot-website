// lib/github.ts
export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  fork: boolean;
  private: boolean;
  topics?: string[];
  created_at: string;
}

export interface FormattedRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastCommit: string; // e.g., "2 days ago"
  link: string;
  features: string[];
}

// lib/github.ts
export type SpotlightItem = {
  title: string;
  blurb: string;
  pills: string[];
  href: string;
};

export async function getPinnedRepos(
  username: string,
  count = 4
): Promise<SpotlightItem[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return []; // no token => no spotlight

  const query = `
    query($login:String!, $count:Int!) {
      user(login:$login) {
        pinnedItems(first:$count, types:[REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              repositoryTopics(first:6){ nodes{ topic{ name } } }
              languages(first:3, orderBy:{ field:SIZE, direction:DESC }){ nodes{ name } }
            }
          }
        }
      }
    }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username, count } }),
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];
  const nodes = (await res.json())?.data?.user?.pinnedItems?.nodes ?? [];
  return nodes.map((n: any) => ({
    title: n.name,
    blurb: n.description ?? "",
    pills: [
      ...new Set([
        ...(n.languages?.nodes?.map((l: any) => l.name) ?? []),
        ...(n.repositoryTopics?.nodes?.map((t: any) => t.topic?.name) ?? []),
        `★${n.stargazerCount}`,
      ]),
    ].slice(0, 6),
    href: n.url,
  }));
}


function relativeTimeFrom(dateStr: string): string {
  const then = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = then - now; // negative for past
  const abs = Math.abs(diff);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year",   1000 * 60 * 60 * 24 * 365],
    ["month",  1000 * 60 * 60 * 24 * 30],
    ["week",   1000 * 60 * 60 * 24 * 7],
    ["day",    1000 * 60 * 60 * 24],
    ["hour",   1000 * 60 * 60],
    ["minute", 1000 * 60],
  ];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, ms] of units) {
    const value = Math.floor(abs / ms);
    if (value >= 1) return rtf.format(-value, unit);
  }
  return "just now";
}

export async function getGitHubRepos(count = 3): Promise<FormattedRepo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    "https://api.github.com/users/jason-allen-oneal/repos?per_page=100",
    {
      headers,
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch repos");

  const repos: GitHubRepo[] = await res.json();
  const filtered = repos.filter((r) => !r.fork && !r.private);

  filtered.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count)
      return b.stargazers_count - a.stargazers_count;
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  });

  const limit = Number.isFinite(count) && count > 0 ? Math.floor(count) : 3;
  return filtered.slice(0, limit).map((repo) => ({
    name: repo.name,
    description: repo.description || "No description available",
    language: repo.language || "Unknown",
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lastCommit: relativeTimeFrom(repo.updated_at),
    link: repo.html_url,
    features: [
      repo.language || "Unknown",
      ...(repo.topics?.slice(0, 3) ?? []),
    ],
  }));
}


// lib/github.ts
export async function getGitHubStats(username: string) {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const u = await fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } })
    .then(r => r.ok ? r.json() : {}) as { public_repos?: number };

  return {
    publicRepos: u.public_repos ?? 0,
    // you can add stars/followers later if you want
  };
}

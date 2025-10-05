export type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics?: string[]
}
  
  
export async function fetchRepos(username: string): Promise<Repo[]> {
  const headers: HeadersInit = { 'Accept': 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  
  // SSR: no cache for always-fresh or revalidate every 3600s for balance
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers,
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) throw new Error(`GitHub error: ${res.status}`)
  
  const repos = await res.json() as Repo[]
  // filter out forks/archived noise
  
  return repos.filter((r: any) => !r.fork).sort((a,b) => b.stargazers_count - a.stargazers_count)
}
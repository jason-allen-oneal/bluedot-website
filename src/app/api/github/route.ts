import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Fetching GitHub repositories...');
    const response = await fetch('https://api.github.com/users/jason-allen-oneal/repos?per_page=100', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'bluedot-website'
      }
    });

    console.log('GitHub API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
    }

    const repos = await response.json();
    console.log('Raw GitHub API response:', repos.length, 'repositories');
    
    // Filter and format the repositories
    const filteredRepos = repos
      .filter((repo: any) => !repo.fork && !repo.private)
      .sort((a: any, b: any) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, 12)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'No description',
        language: repo.language || 'Unknown',
        features: repo.topics || [],
        link: repo.html_url,
        stars: repo.stargazers_count,
        updated: repo.updated_at
      }));

    console.log('Filtered repositories:', filteredRepos.length, 'repositories');
    return NextResponse.json(filteredRepos);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}

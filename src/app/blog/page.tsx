import { Metadata } from 'next';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on cybersecurity, programming, web development, and technology by Jason O\'Neal',
  openGraph: {
    title: 'Blog | bluedot.it.com',
    description: 'Articles on cybersecurity, programming, web development, and technology',
  },
};

async function getPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogListClient initialPosts={posts} />;
}

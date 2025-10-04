import { useEffect, useState } from "react";
import BlogPost from "./BlogPost";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<"list" | "post">("list");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentView("post");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="p-6 h-full overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-neutral-400">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto relative">
      {currentView === "list" ? (
        <>
          {/* list view */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">Blog</h2>
            <p className="text-neutral-400 mb-4">Latest posts and articles</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-neutral-700 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="cursor-pointer rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 hover:bg-neutral-800/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-cyan-400 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-3 line-clamp-3">{post.excerpt}</p>
                <div className="text-xs text-neutral-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-400">No posts found.</p>
            </div>
          )}
        </>
      ) : (
        selectedPost && (
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-neutral-800">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-cyan-400 transition-colors"
              >
                ← Back to Posts
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <BlogPost post={selectedPost} />
            </div>
          </div>
        )
      )}
    </div>
  );
}

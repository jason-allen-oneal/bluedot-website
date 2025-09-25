"use client";

import { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogProps {
  onClose?: () => void;
  onOpenPost?: (slug: string, title: string) => void;
}

export default function Blog({ onClose, onOpenPost }: BlogProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalPosition, setModalPosition] = useState({ x: 50, y: 50 });
  const [modalSize, setModalSize] = useState({ width: 60, height: 70 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [processedContent, setProcessedContent] = useState<string>("");

  const processMarkdown = async (content: string) => {
    try {
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize, {
          ...defaultSchema,
          tagNames: [
            ...(defaultSchema.tagNames || []),
            'figure', 'figcaption', 'caption', 'details', 'summary', 'input'
          ],
          attributes: {
            ...(defaultSchema.attributes || {}),
            a: [
              ...(defaultSchema.attributes?.a || []),
              ['target', 'string'],
              ['rel', 'space-separated']
            ],
            img: [
              ...(defaultSchema.attributes?.img || []),
              ['loading', 'string'], ['decoding', 'string'],
              ['width', 'number'], ['height', 'number']
            ],
            input: [
              ['type', 'checkbox'], ['checked', 'checked'], ['disabled', 'disabled']
            ],
            code: [
              ...(defaultSchema.attributes?.code || []),
              ['className', 'token list']
            ]
          }
        })
        .use(rehypeStringify);

      const file = await processor.process(content);
      return String(file);
    } catch (error) {
      console.error('Error processing markdown:', error);
      return content;
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostClick = async (post: Post) => {
    if (onOpenPost) {
      onOpenPost(post.slug, post.title);
    } else {
      setSelectedPost(post);
      const processed = await processMarkdown(post.content);
      setProcessedContent(processed);
    }
  };

  const handleModalClose = () => {
    setSelectedPost(null);
  };

  const handleModalMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.modal-window-bar')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleModalMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      const newX = Math.max(0, Math.min(80, modalPosition.x + (deltaX / window.innerWidth) * 100));
      const newY = Math.max(0, Math.min(70, modalPosition.y + (deltaY / window.innerHeight) * 100));
      setModalPosition({ x: newX, y: newY });
    }
  };

  const handleModalMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleModalMouseMove);
      document.addEventListener('mouseup', handleModalMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleModalMouseMove);
        document.removeEventListener('mouseup', handleModalMouseUp);
      };
    }
  }, [isDragging, dragStart]);

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
      {/* Blog Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Blog</h2>
        <p className="text-neutral-400 mb-4">Latest posts and articles</p>
        
        {/* Search */}
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

      {/* Posts Grid */}
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
            <p className="text-sm text-neutral-400 mb-3 line-clamp-3">
              {post.excerpt}
            </p>
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

      {/* Post Modal - Window-in-Window */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div
            className="absolute rounded-lg border border-neutral-700 bg-neutral-950 shadow-2xl"
            style={{
              left: `${modalPosition.x}%`,
              top: `${modalPosition.y}%`,
              width: `${modalSize.width}%`,
              height: `${modalSize.height}%`,
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleModalMouseDown}
          >
            {/* Modal Window Bar */}
            <div className="modal-window-bar flex items-center justify-between border-b border-neutral-700 px-4 py-2 cursor-move">
              <div className="flex gap-2">
                <button
                  onClick={handleModalClose}
                  title="Close"
                  className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500"
                />
                <button
                  title="Minimize"
                  className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500"
                />
                <button
                  title="Maximize"
                  className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-500"
                />
              </div>
              <div className="text-xs text-neutral-400 truncate">
                {selectedPost.title}
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-cyan-400 mb-2">
                  {selectedPost.title}
                </h1>
                <div className="text-sm text-neutral-500 mb-4">
                  {new Date(selectedPost.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div 
                className="prose prose-invert prose-tech max-w-none"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

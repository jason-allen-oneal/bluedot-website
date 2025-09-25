export default function AdminDesignPreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950">
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
              <p className="text-blue-200 mt-2">
                Welcome back! Here's what's happening with your blog.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Post
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-blue-400 hover:bg-blue-900 text-blue-200 rounded-md transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Comments
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-400 hover:bg-gray-800 text-gray-300 rounded-md transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-200">Total Posts</h3>
              <svg className="h-4 w-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-blue-300">2 added this month</p>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-200">Recent Posts</h3>
              <svg className="h-4 w-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-blue-300">Posts from last 7 days</p>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-200">Comments</h3>
              <svg className="h-4 w-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">5</div>
            <p className="text-xs text-blue-300">Awaiting moderation</p>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-200">Analytics</h3>
              <svg className="h-4 w-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">1.2k</div>
            <p className="text-xs text-blue-300">Monthly views</p>
          </div>
        </div>

        {/* Posts Management Section */}
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl shadow overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Blog Posts</h2>
                <p className="text-blue-200 text-sm mt-1">Manage and organize your blog content</p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Post
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-white/10">
            {/* Post 1 */}
            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-white truncate">Getting Started with Next.js and TypeScript</h3>
                  <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-md">Published</span>
                </div>
                <p className="text-sm text-blue-200 mb-2 line-clamp-2">
                  Learn how to set up a modern web application with Next.js, TypeScript, and Tailwind CSS for optimal developer experience.
                </p>
                <div className="flex items-center gap-4 text-xs text-blue-300">
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Jan 15, 2024
                  </span>
                  <span>/getting-started-nextjs-typescript</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="inline-flex items-center gap-2 px-3 py-1 text-blue-200 hover:bg-white/10 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1 text-blue-200 hover:bg-white/10 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1 text-red-300 hover:bg-red-500/20 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            {/* Post 2 */}
            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-white truncate">Modern React Patterns and Best Practices</h3>
                  <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-md">Published</span>
                </div>
                <p className="text-sm text-blue-200 mb-2 line-clamp-2">
                  Explore advanced React patterns including hooks, context, and state management techniques for scalable applications.
                </p>
                <div className="flex items-center gap-4 text-xs text-blue-300">
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Jan 10, 2024
                  </span>
                  <span>/modern-react-patterns</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="inline-flex items-center gap-2 px-3 py-1 text-blue-200 hover:bg-white/10 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1 text-blue-200 hover:bg-white/10 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1 text-red-300 hover:bg-red-500/20 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            {/* Post 3 */}
            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-white truncate">Building RESTful APIs with Prisma and Next.js</h3>
                  <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-md">Published</span>
                </div>
                <p className="text-sm text-blue-200 mb-2 line-clamp-2">
                  Complete guide to creating robust and type-safe APIs using Prisma ORM with Next.js API routes.
                </p>
                <div className="flex items-center gap-4 text-xs text-blue-300">
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Jan 5, 2024
                  </span>
                  <span>/restful-apis-prisma-nextjs</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="inline-flex items-center gap-2 px-3 py-1 text-blue-200 hover:bg-white/10 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1 text-blue-200 hover:bg-white/10 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1 text-red-300 hover:bg-red-500/20 rounded-md transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
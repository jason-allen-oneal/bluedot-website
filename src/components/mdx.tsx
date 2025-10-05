import { MDXComponents } from 'mdx/types'
import { ReactNode } from 'react'

interface ProseProps {
  children: ReactNode
  className?: string
}

export function Prose({ children, className = '' }: ProseProps) {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      {children}
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold mb-4 mt-8 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-semibold mb-3 mt-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold mb-2 mt-4" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a 
      href={href} 
      className="text-blue-400 hover:text-blue-300 underline" 
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4" {...props}>
      {children}
    </pre>
  ),
  hr: ({ ...props }) => (
    <hr className="border-gray-600 my-8" {...props} />
  ),
  img: ({ src, alt, ...props }) => (
    <img 
      src={src} 
      alt={alt} 
      className="max-w-full h-auto rounded-lg my-4" 
      {...props} 
    />
  ),
}

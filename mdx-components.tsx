import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Example: h1: (props) => <h1 className="text-3xl" {...props} />,
    ...components,
  };
}

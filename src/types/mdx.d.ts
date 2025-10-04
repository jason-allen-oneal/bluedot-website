// types/mdx.d.ts
declare module "next-mdx-remote/rsc" {
    import { ComponentType, ReactElement } from "react";
    export function compileMDX<T = Record<string, unknown>>(opts: {
      source: string;
      components?: Record<string, ComponentType<any>>;
      options?: any;
    }): Promise<{ content: ReactElement; frontmatter: T }>;
  }
  
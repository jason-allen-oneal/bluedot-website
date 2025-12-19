/**
 * React 19 compatible wrapper around next-mdx-remote's MDXRemote.
 * next-mdx-remote v5 still imports React as a default export, which is null in React 19.
 * This version mirrors their implementation but uses namespace imports and a local jsxRuntime.
 */
import * as React from "react";
import * as devJsxRuntime from "react/jsx-dev-runtime";
import * as prodJsxRuntime from "react/jsx-runtime";
import * as mdx from "@mdx-js/react";

type MDXRemoteProps = {
  compiledSource: string;
  frontmatter?: Record<string, any>;
  scope?: Record<string, any>;
  components?: Record<string, React.ComponentType<any>>;
  lazy?: boolean;
};

const jsxRuntime = process.env.NODE_ENV === "production" ? prodJsxRuntime : devJsxRuntime;

export function MDXRemoteCompat({
  compiledSource,
  frontmatter,
  scope,
  components = {},
  lazy,
}: MDXRemoteProps) {
  const [isReadyToRender, setIsReadyToRender] = React.useState(
    !lazy || typeof window === "undefined"
  );

  React.useEffect(() => {
    if (lazy) {
      const handle = window.requestIdleCallback(() => {
        setIsReadyToRender(true);
      });
      return () => window.cancelIdleCallback(handle);
    }
  }, [lazy]);

  const Content = React.useMemo(() => {
    const fullScope = Object.assign({ opts: { ...mdx, ...jsxRuntime } }, { frontmatter }, scope);
    const keys = Object.keys(fullScope);
    const values = Object.values(fullScope);
    const hydrateFn = Reflect.construct(Function, keys.concat(`${compiledSource}`));
    return hydrateFn.apply(hydrateFn, values).default;
  }, [scope, compiledSource, frontmatter]);

  if (!isReadyToRender) {
    return <div dangerouslySetInnerHTML={{ __html: "" }} suppressHydrationWarning />;
  }

  const content = (
    <mdx.MDXProvider components={components}>
      <Content />
    </mdx.MDXProvider>
  );

  return lazy ? <div>{content}</div> : content;
}

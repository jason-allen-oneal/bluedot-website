import Background from "@/components/Background";
import Nav from "@/components/Nav";
import { BlogGridSkeleton } from "@/components/LoadingSkeleton";

export default function BlogLoading() {
  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <section id="content" className="relative mx-auto max-w-[1100px] px-6 pt-28 pb-10 md:pt-36 md:pb-20">
        <div className="h-8 bg-muted rounded mb-6 w-24 animate-pulse"></div>
        <BlogGridSkeleton />
      </section>
    </div>
  );
}

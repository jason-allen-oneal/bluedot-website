import Background from "@/components/Background";
import Nav from "@/components/Nav";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <div className="relative mx-auto max-w-[1100px] px-6 pt-20 pb-10 md:pt-28 md:pb-20">
        <article className="card p-8 md:p-12">
          <LoadingSkeleton />
        </article>
      </div>
    </div>
  );
}

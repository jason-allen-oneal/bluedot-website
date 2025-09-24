import Section from "@/components/Section";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function BlogPostLoading() {
  return (
    <div className="py-16">
      <Section title="Blog" subtitle="Loading post…">
        <div className="rounded-lg border border-neutral-800/70 bg-neutral-950/70 p-6 md:p-10">
          <LoadingSkeleton />
        </div>
      </Section>
    </div>
  );
}

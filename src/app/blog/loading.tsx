import { BlogGridSkeleton } from "@/components/LoadingSkeleton";
import Section from "@/components/Section";

export default function BlogLoading() {
  return (
    <div className="py-16">
      <Section title="Blog" subtitle="Loading posts…">
        <BlogGridSkeleton />
      </Section>
    </div>
  );
}

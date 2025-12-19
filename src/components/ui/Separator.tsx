export function Separator({
  orientation = "horizontal",
  className = "",
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const base =
    orientation === "horizontal"
      ? "h-px w-full"
      : "w-px h-full";

  return (
    <div
      aria-hidden="true"
      className={`${base} bg-primary ${className}`}
    />
  );
}

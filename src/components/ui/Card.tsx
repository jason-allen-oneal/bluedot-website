import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`group relative overflow-hidden rounded-[26px] border text-base-content backdrop-blur-xl transition duration-300 ease-out ${className}`}
        style={{
          background: "var(--card-surface)",
          borderColor: "var(--card-stroke)",
          boxShadow: "var(--card-shadow)",
        }}
        {...props}
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-70 transition duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 18% 16%, rgba(77,216,255,0.12), transparent 32%), radial-gradient(circle at 82% 8%, rgba(243,181,69,0.12), transparent 28%)",
          }}
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen blur-3xl transition duration-700 group-hover:opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(142,246,197,0.22), transparent 40%)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    );
  }
);

Card.displayName = "Card";

/* =========================
   Sections
   ========================= */

type CardSectionProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className = "", ...props }: CardSectionProps) {
  return <div className={`px-4 py-4 pb-0 ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: CardSectionProps) {
  return <div className={`px-4 space-y-4 ${className}`} {...props} />;
}

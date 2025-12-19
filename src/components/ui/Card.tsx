import * as React from "react";

/* =========================
   Card (root)
   ========================= */

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`card border-accent/90 bg-secondary/20 text-neutral-content backdrop-blur-md border shadow-lg shadow-accent/10 ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

/* =========================
   CardHeader
   ========================= */

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className = "", ...props }: CardHeaderProps) {
  return (
    <div
      className={`card-body pb-0 ${className}`}
      {...props}
    />
  );
}

/* =========================
   CardContent
   ========================= */

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({ className = "", ...props }: CardContentProps) {
  return (
    <div
      className={`card-body pt-0 ${className}`}
      {...props}
    />
  );
}

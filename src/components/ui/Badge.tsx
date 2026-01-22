import * as React from "react";

type BadgeVariant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type BadgeSize = "xs" | "sm" | "md" | "lg";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;          // DaisyUI: badge-xs, badge-sm, badge-md, badge-lg
  outline?: boolean;         // DaisyUI: badge-outline
  className?: string;        // passthrough for custom utility classes
} & React.HTMLAttributes<HTMLSpanElement>;

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  outline = false,
  className = "p-2",
  ...props
}: BadgeProps) {
  const classes = [
    "pill",
    `badge-${variant}`,
    size !== "md" ? `badge-${size}` : "", // md is effectively default
    outline ? "badge-outline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

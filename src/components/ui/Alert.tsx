import * as React from "react";

type AlertVariant = "info" | "success" | "warning" | "error";
type AlertStyle = "default" | "soft" | "outline";
type AlertSize = "sm" | "md" | "lg";

type AlertProps = {
  children: React.ReactNode;
  variant?: AlertVariant;
  style?: AlertStyle;
  size?: AlertSize;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Alert({
  children,
  variant,
  style = "default",
  size = "md",
  icon,
  actions,
  className = "",
  ...props
}: AlertProps) {
  const sizeClass =
    size === "sm"
      ? "px-3 py-2 text-sm"
      : size === "lg"
      ? "px-5 py-4 text-base"
      : "px-4 py-3 text-sm"; // md

  const styleClass =
    style === "soft" ? "alert-soft" : style === "outline" ? "alert-outline" : "";

  const variantClass = variant ? `alert-${variant}` : "";

  const classes = [
    "alert",
    variantClass,
    styleClass,
    sizeClass,
    actions ? "justify-between" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="alert" className={classes} {...props}>
      {icon ? <div className="shrink-0">{icon}</div> : null}

      <div className="min-w-0">
        {children}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}

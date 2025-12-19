import * as React from "react";

type TextareaVariant = "bordered" | "ghost";
type TextareaSize = "xs" | "sm" | "md" | "lg";
type TextareaState =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type TextareaProps = {
  variant?: TextareaVariant;
  textareaSize?: TextareaSize;
  state?: TextareaState;

  /** passthrough utilities */
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
  variant = "bordered",
  textareaSize = "md",
  state = "default",
  className = "bg-accent/20 text-base-content",
  ...props
}: TextareaProps) {
  const base: string[] = ["textarea", "w-full"];

  if (variant === "bordered") base.push("textarea-bordered");
  if (variant === "ghost") base.push("textarea-ghost");

  if (textareaSize !== "md") base.push(`textarea-${textareaSize}`);

  if (state !== "default") base.push(`textarea-${state}`);

  const classes = [...base, className].filter(Boolean).join(" ");

  return <textarea className={classes} {...props} />;
}

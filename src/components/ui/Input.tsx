import * as React from "react";

type InputVariant = "bordered" | "ghost";
type InputSize = "xs" | "sm" | "md" | "lg";
type InputState =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type InputProps = {
  variant?: InputVariant;
  inputSize?: InputSize; // renamed on purpose
  state?: InputState;

  start?: React.ReactNode;
  end?: React.ReactNode;

  className?: string;
  wrapperClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export default function Input({
  variant = "bordered",
  inputSize = "md",
  state = "default",
  start,
  end,
  className = "",
  wrapperClassName = "",
  ...props
}: InputProps) {
  const base: string[] = ["input", "w-full"];

  if (variant === "bordered") base.push("input-bordered");
  if (variant === "ghost") base.push("input-ghost");

  if (inputSize !== "md") base.push(`input-${inputSize}`);
  if (state !== "default") base.push(`input-${state}`);

  const inputClassName = [...base, className].filter(Boolean).join(" ");

  if (!start && !end) {
    return <input className={inputClassName} {...props} />;
  }

  return (
    <div className={["join w-full", wrapperClassName].filter(Boolean).join(" ")}>
      {start && <span className="join-item flex items-center px-3">{start}</span>}
      <input className={["join-item", inputClassName].join(" ")} {...props} />
      {end && <span className="join-item flex items-center px-3">{end}</span>}
    </div>
  );
}

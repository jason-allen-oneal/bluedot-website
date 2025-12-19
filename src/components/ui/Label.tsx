import * as React from "react";

type LabelProps = {
  children: React.ReactNode;

  /** Standard label wiring */
  htmlFor?: string;

  /** DaisyUI label layout supports two sides */
  left?: React.ReactNode;
  right?: React.ReactNode;

  /** If true, styles like a “disabled” label */
  disabled?: boolean;

  /** Extra classes, no merge libraries */
  className?: string;
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "children">;

export default function Label({
  children,
  htmlFor,
  left,
  right,
  disabled = false,
  className = "",
  ...props
}: LabelProps) {
  const classes = [
    "label",
    disabled ? "opacity-60 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // DaisyUI “label-text” matches their component docs
  // We keep children as the primary text for shadcn-like usage.
  return (
    <label htmlFor={htmlFor} className={classes} {...props}>
      {left ? <span className="label-text">{left}</span> : null}
      <span className="label-text">{children}</span>
      {right ? <span className="label-text-alt">{right}</span> : null}
    </label>
  );
}

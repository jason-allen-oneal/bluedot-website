import * as React from "react";

type ButtonGroupOrientation = "horizontal" | "vertical";

type ButtonGroupProps = {
  children: React.ReactNode;
  orientation?: ButtonGroupOrientation;
  fullWidth?: boolean;
  className?: string;
  autoJoinItems?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function canAcceptClassName(
  element: React.ReactElement
): element is React.ReactElement<{ className?: string }> {
  return "className" in (element.props as object);
}

export default function ButtonGroup({
  children,
  orientation = "horizontal",
  fullWidth = false,
  className = "",
  autoJoinItems = true,
  ...props
}: ButtonGroupProps) {
  const rootClasses = [
    "join",
    orientation === "vertical" ? "join-vertical" : "",
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const enhancedChildren = autoJoinItems
    ? React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        if (!canAcceptClassName(child)) return child;

        const existing = child.props.className ?? "";
        const next = ["join-item", existing].filter(Boolean).join(" ");

        return React.cloneElement(child, {
          className: next,
        });
      })
    : children;

  return (
    <div className={rootClasses} {...props}>
      {enhancedChildren}
    </div>
  );
}

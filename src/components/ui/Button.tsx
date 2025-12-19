export default function Button({
    children,
    onClick,
    size = "default",
    color = "accent",
    style = "default",
    behavior = "default",
    special = "none",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    size?: "xs" | "sm" | "default" | "lg" | "xl";
    color?: "none" | "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
    style?: "default" | "soft" | "outline" | "dash" | "ghost" | "link";
    behavior?: "default" | "active" | "disabled";
    special?: "none" | "wide" | "block" | "circle" | "square";
}) {
    let classNames = ["btn"];

    if (size !== "default") classNames.push(`btn-${size}`);
    if (color !== "none") classNames.push(`btn-${color}`);
    if (style !== "default") classNames.push(`btn-${style}`);
    if (behavior !== "default") classNames.push(`btn-${behavior}`);
    if (special !== "none") classNames.push(`btn-${special}`);

    return (
        <button
            onClick={onClick}
            className={classNames.join(" ")}
        >
            {children}
        </button>
    );
}

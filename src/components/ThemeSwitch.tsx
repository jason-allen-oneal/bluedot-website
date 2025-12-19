"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeSwitchProps = {
  className?: string;
  /** Optional aria-label override */
  label?: string;
};

export default function ThemeSwitch({
  className = "",
  label = "Toggle theme",
}: ThemeSwitchProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted
    ? (theme === "system" ? resolvedTheme === "dark" : theme === "dark")
    : false;

  const handleToggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <label className={`swap swap-rotate btn btn-outline btn-sm btn-circle ${className}`}>
      <input
        type="checkbox"
        className="sr-only"
        checked={isDark}
        onChange={handleToggle}
        aria-label={label}
      />

      {/* Light icon when unchecked */}
      <Sun className="swap-off h-4 w-4" data-testid="sun-icon" />

      {/* Dark icon when checked */}
      <Moon className="swap-on h-4 w-4" data-testid="moon-icon" />
    </label>
  );
}

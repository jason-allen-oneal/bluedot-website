"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const LinkItem = ({ href, label }: { href: string; label: string }) => {
  const p = usePathname();
  const active = p === href || (href !== "/" && p.startsWith(href));
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-sm border border-transparent hover:border-border
      ${active ? "text-primary underline underline-offset-4" : "text-foreground/80 hover:text-foreground"}`}
    >
      {label}
    </Link>
  );
};

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    
    // Apply initial theme
    const root = document.documentElement;
    if (prefersDark) {
      root.style.setProperty('--background', '#0b0e11');
      root.style.setProperty('--surface', '#11161d');
      root.style.setProperty('--foreground', '#e5e7eb');
      root.style.setProperty('--muted', '#9ca3af');
      root.style.setProperty('--primary', '#7c9eff');
      root.style.setProperty('--accent', '#55d6be');
      root.style.setProperty('--border', '#1f2937');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--surface', '#f8fafc');
      root.style.setProperty('--foreground', '#0f0f0f');
      root.style.setProperty('--muted', '#525252');
      root.style.setProperty('--primary', '#1e40af');
      root.style.setProperty('--accent', '#0ea5a4');
      root.style.setProperty('--border', '#e5e7eb');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Override the CSS custom properties for theme
    const root = document.documentElement;
    if (newIsDark) {
      root.style.setProperty('--background', '#0b0e11');
      root.style.setProperty('--surface', '#11161d');
      root.style.setProperty('--foreground', '#e5e7eb');
      root.style.setProperty('--muted', '#9ca3af');
      root.style.setProperty('--primary', '#7c9eff');
      root.style.setProperty('--accent', '#55d6be');
      root.style.setProperty('--border', '#1f2937');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--surface', '#f8fafc');
      root.style.setProperty('--foreground', '#0f0f0f');
      root.style.setProperty('--muted', '#525252');
      root.style.setProperty('--primary', '#1e40af');
      root.style.setProperty('--accent', '#0ea5a4');
      root.style.setProperty('--border', '#e5e7eb');
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="rounded-sm border border-border px-2 py-2 hover:bg-accent transition-colors"
      >
        <Moon size={16} />
      </button>
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-sm border border-border px-2 py-2 hover:bg-accent transition-colors"
      onClick={toggleTheme}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur border-b border-border z-50">
      <div className="mx-auto max-w-[1100px] px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-foreground flex items-center gap-2">
          <div className="w-5 h-5 rounded-full shadow-lg" style={{backgroundColor: 'var(--primary)'}}></div>
          BlueDot Webworks
        </Link>
        <div className="flex items-center gap-1">
          <button
            className="md:hidden px-3 py-2 rounded-sm border border-border hover:bg-surface transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
          <div className={`flex-col md:flex-row md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:items-center gap-1`}>
            <LinkItem href="/" label="Home" />
            <LinkItem href="/#projects" label="Projects" />
            <LinkItem href="/blog" label="Blog" />
            <LinkItem href="/#contact" label="Contact" />
            {isMounted && <ThemeToggle />}
          </div>
        </div>
      </div>
    </nav>
  );
}

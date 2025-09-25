// src/app/page.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TerminalConsole from "@/components/TerminalConsole";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import BlogPost from "@/components/BlogPost";
import Contact from "@/components/Contact";
import LoginWindow from "@/components/LoginWindow";
import Privacy from "@/components/Privacy";
import Terms from "@/components/Terms";
import Resume from "@/components/Resume";

type DesktopIcon = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
};

type WindowType = {
  id: string;
  title: string;
  type:
    | "terminal"
    | "about"
    | "projects"
    | "blog"
    | "contact"
    | "resume"
    | "login"
    | "privacy"
    | "terms"
    | "blog-post";
  state: "normal" | "minimized" | "maximized";
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  slug?: string; // For blog posts
};

/* ---------- stable helpers (no hook deps) ---------- */
function getDefaultPosition(type: WindowType["type"]) {
  const positions: Record<WindowType["type"], { x: number; y: number }> = {
    terminal: { x: 25, y: 30 },
    about: { x: 15, y: 10 },
    projects: { x: 25, y: 25 },
    blog: { x: 20, y: 15 },
    contact: { x: 14, y: 20 },
    resume: { x: 10, y: 5 },
    login: { x: 25, y: 6 },
    privacy: { x: 10, y: 10 },
    terms: { x: 15, y: 15 },
    "blog-post": { x: 20, y: 20 },
  };
  return positions[type] || { x: 20, y: 20 };
}

function getDefaultSize(type: WindowType["type"]) {
  const sizes: Record<WindowType["type"], { width: number; height: number }> = {
    terminal: { width: 60, height: 50 },
    about: { width: 45, height: 60 },
    projects: { width: 70, height: 60 },
    blog: { width: 80, height: 70 },
    contact: { width: 60, height: 75 },
    resume: { width: 60, height: 80 },
    login: { width: 45, height: 85 },
    privacy: { width: 80, height: 80 },
    terms: { width: 80, height: 80 },
    "blog-post": { width: 80, height: 80 },
  };
  return sizes[type] || { width: 50, height: 40 };
}
/* --------------------------------------------------- */

export default function HomePage() {
  const [showStart, setShowStart] = useState(false);
  const [windows, setWindows] = useState<WindowType[]>([
    {
      id: "terminal",
      title: "Terminal",
      type: "terminal",
      state: "normal",
      position: { x: 25, y: 30 },
      size: { width: 60, height: 50 },
      zIndex: 1,
    },
  ]);

  // z-index counter as a ref so using it doesn't trigger re-renders or deps churn
  const zRef = useRef(2);

  const openWindow = useCallback(
    (
      type: WindowType["type"],
      title: string,
      customPosition?: { x: number; y: number },
      customSize?: { width: number; height: number },
      slug?: string
    ) => {
      // Use functional updates to avoid depending on `windows` in deps
      setWindows((prev) => {
        const existing = prev.find((w) => w.type === type && w.slug === slug);
        if (existing) {
          // bring to front & restore if minimized
          const newZ = zRef.current++;
          return prev.map((w) =>
            w.id === existing.id ? { ...w, state: "normal", zIndex: newZ } : w
          );
        } else {
          const newZ = zRef.current++;
          const newWindow: WindowType = {
            id: `${type}-${Date.now()}`,
            title,
            type,
            state: "normal",
            position: customPosition || getDefaultPosition(type),
            size: customSize || getDefaultSize(type),
            zIndex: newZ,
            slug,
          };
          return [...prev, newWindow];
        }
      });
    },
    []
  );

  const updateWindow = useCallback((id: string, updates: Partial<WindowType>) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)));
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  // Removed openWindowAt (was unused and tripping no-unused-vars)

  const openBlogPost = useCallback(
    (slug: string, title: string) => {
      openWindow("blog-post", title, undefined, undefined, slug);
    },
    [openWindow]
  );

  const icons: DesktopIcon[] = useMemo(
    () => [
      { id: "about", label: "About", icon: "👤", onClick: () => openWindow("about", "About") },
      { id: "projects", label: "Projects", icon: "💼", onClick: () => openWindow("projects", "Projects") },
      { id: "blog", label: "Blog", icon: "📝", onClick: () => openWindow("blog", "Blog") },
      { id: "contact", label: "Contact", icon: "📧", onClick: () => openWindow("contact", "Contact") },
      { id: "resume", label: "Resume.pdf", icon: "📄", onClick: () => openWindow("resume", "Resume") },
    ],
    [openWindow]
  );

  // Close Start when clicking anywhere else
  useEffect(() => {
    if (!showStart) return;
    const onDocClick = () => setShowStart(false);
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [showStart]);

  // Handle hash-based navigation for blog posts
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#blog-post-")) {
        const slug = hash.replace("#blog-post-", "");
        const postTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
        openBlogPost(slug, postTitle);
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [openBlogPost]);

  return (
    <div className="fixed inset-0 w-full h-full select-none overflow-hidden text-slate-100">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950" />

      {/* Single subtle accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl" />

      {/* Desktop icons */}
      <div className="relative z-0 flex flex-col gap-6 p-6 w-32">
        {icons.map((ic) => (
          <DesktopIconItem key={ic.id} {...ic} />
        ))}
      </div>

      {/* All windows */}
      {windows.map(
        (window) =>
          window.state !== "minimized" && (
            <Window
              key={window.id}
              window={window}
              onUpdate={(updates) => updateWindow(window.id, updates)}
              onClose={() => closeWindow(window.id)}
              onFocus={() => updateWindow(window.id, { zIndex: zRef.current++ })}
              onOpenBlogPost={openBlogPost}
            />
          )
      )}

      {/* Taskbar */}
      <Taskbar
        onStartToggle={() => setShowStart((v) => !v)}
        windows={windows}
        onWindowToggle={(windowId) => {
          setWindows((prev) =>
            prev.map((w) =>
              w.id === windowId
                ? {
                    ...w,
                    state: w.state === "minimized" ? "normal" : "minimized",
                    zIndex: zRef.current++,
                  }
                : w
            )
          );
        }}
      />

      {/* Start menu */}
      {showStart && (
        <StartMenu
          onOpenTerminal={() => openWindow("terminal", "Terminal")}
          onOpenLogin={() => openWindow("login", "Login")}
          onOpenPrivacy={() => openWindow("privacy", "Privacy Policy")}
          onOpenTerms={() => openWindow("terms", "Terms of Service")}
          items={[]}
        />
      )}
    </div>
  );
}

function DesktopIconItem({ label, icon, href, onClick }: DesktopIcon) {
  const content = (
    <div className="flex w-24 flex-col items-center gap-2 rounded-xl p-2 text-center hover:bg-white/5">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/30 bg-slate-900/60 shadow-[0_0_24px_rgba(34,211,238,.25)]">
        <span className="text-2xl">{icon}</span>
      </div>
      <span className="line-clamp-2 text-xs text-slate-200/90">{label}</span>
    </div>
  );

  return href ? (
    <a href={href} className="group" draggable={false} onClick={(e) => e.stopPropagation()}>
      {content}
    </a>
  ) : (
    <button
      type="button"
      className="group"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {content}
    </button>
  );
}

function Window({
  window,
  onUpdate,
  onClose,
  onFocus,
  onOpenBlogPost,
}: {
  window: WindowType;
  onUpdate: (updates: Partial<WindowType>) => void;
  onClose: () => void;
  onFocus: () => void;
  onOpenBlogPost: (slug: string, title: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".window-bar")) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      onFocus();
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      const newX = Math.max(0, Math.min(90, window.position.x + (deltaX / globalThis.innerWidth) * 100));
      const newY = Math.max(0, Math.min(80, window.position.y + (deltaY / globalThis.innerHeight) * 100));
      onUpdate({ position: { x: newX, y: newY } });
    },
    [isDragging, dragStart.x, dragStart.y, window.position.x, window.position.y, onUpdate]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getWindowContent = () => {
    switch (window.type) {
      case "terminal":
        return (
          <TerminalConsole
            windowState={window.state}
            onStateChange={(state) => onUpdate({ state })}
            onPositionChange={(pos) => onUpdate({ position: pos })}
            onSizeChange={(size) => onUpdate({ size })}
          />
        );
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "blog":
        return <Blog onOpenPost={onOpenBlogPost} />;
      case "contact":
        return <Contact />;
      case "login":
        return <LoginWindow />;
      case "privacy":
        return <Privacy />;
      case "terms":
        return <Terms />;
      case "blog-post":
        return <BlogPost slug={window.slug || ""} />;
      case "resume":
        return <Resume />;
      default:
        return <div className="p-4 text-white">Unknown window type</div>;
    }
  };

  return (
    <div
      className="fixed z-40"
      style={
        window.state === "maximized"
          ? {
              left: "20px",
              top: "50px",
              right: "20px",
              bottom: "60px",
              width: "auto",
              height: "auto",
              zIndex: window.zIndex,
            }
          : {
              left: `${window.position.x}%`,
              top: `${window.position.y}%`,
              width: `${window.size.width}%`,
              height: `${window.size.height}%`,
              zIndex: window.zIndex,
            }
      }
      onClick={(e) => e.stopPropagation()}
      onMouseDown={handleMouseDown}
    >
      <div className="flex h-full flex-col rounded-lg border border-neutral-800 bg-neutral-950/80 shadow-xl">
        {/* Window bar */}
        <div className="window-bar flex items-center justify-between border-b border-neutral-800 px-4 py-2 cursor-move">
          <div className="flex gap-2">
            <button onClick={onClose} title="Close" className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500" />
            <button
              onClick={() => onUpdate({ state: window.state === "minimized" ? "normal" : "minimized" })}
              title="Minimize"
              className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500"
            />
            <button
              onClick={() => onUpdate({ state: window.state === "maximized" ? "normal" : "maximized" })}
              title="Maximize"
              className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-500"
            />
          </div>
          <div className="text-xs text-neutral-500">{window.title}</div>
        </div>

        {/* Window content */}
        <div className="flex-1 min-h-0 overflow-hidden">{getWindowContent()}</div>
      </div>
    </div>
  );
}

function Taskbar({
  onStartToggle,
  windows,
  onWindowToggle,
}: {
  onStartToggle: () => void;
  windows: WindowType[];
  onWindowToggle: (windowId: string) => void;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex h-10 items-center gap-2 border-t border-cyan-400/20 bg-slate-950/80 px-2 backdrop-blur">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onStartToggle();
        }}
        className="flex items-center gap-2 rounded-md border border-cyan-400/30 bg-slate-900/60 px-3 py-1 text-sm font-medium hover:bg-slate-800"
      >
        <div className="flex items-center justify-center w-4 h-4">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
        </div>
        Start
      </button>
      {windows.map((window) => (
        <button
          key={window.id}
          onClick={(e) => {
            e.stopPropagation();
            onWindowToggle(window.id);
          }}
          className={`rounded-md border border-cyan-400/30 px-3 py-1 text-sm hover:bg-slate-800 ${
            window.state === "minimized" ? "bg-cyan-400/20 text-cyan-200" : "bg-slate-900/60"
          }`}
        >
          {window.title} {window.state === "minimized" && "(minimized)"}
        </button>
      ))}
      <div className="ml-auto rounded-md border border-cyan-400/20 bg-slate-900/50 px-2 py-1 text-xs text-slate-300">
        {time}
      </div>
    </div>
  );
}

function StartMenu({
  items,
  onOpenTerminal,
  onOpenLogin,
  onOpenPrivacy,
  onOpenTerms,
}: {
  items: { label: string; href: string }[];
  onOpenTerminal: () => void;
  onOpenLogin: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}) {
  const socialLinks = [
    { label: "GitHub", href: "https://github.com/jason-allen-oneal", icon: "🐙" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jason-allen-oneal", icon: "💼" },
    { label: "Twitter", href: "https://twitter.com/jason_allen_oneal", icon: "🐦" },
  ];

  return (
    <div
      className="fixed bottom-12 left-2 z-[60] w-80 overflow-hidden rounded-xl border border-cyan-400/30 bg-slate-900/90 shadow-2xl backdrop-blur"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="border-b border-cyan-400/20 p-3 text-sm font-semibold tracking-wide text-cyan-200">
        bluedot • menu
      </div>

      {/* Applications Section */}
      <div className="p-3">
        <div className="mb-2 text-xs font-medium text-cyan-300 uppercase tracking-wide">Applications</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenTerminal}
            className="rounded-lg border border-cyan-400/30 bg-slate-900/60 p-3 text-left text-sm hover:bg-slate-800"
          >
            <div className="mb-1 font-medium">Terminal</div>
            <div className="text-xs text-slate-400">Open the console</div>
          </button>
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              className="rounded-lg border border-cyan-400/30 bg-slate-900/60 p-3 text-left text-sm hover:bg-slate-800"
            >
              <div className="mb-1 font-medium">{it.label}</div>
              <div className="text-xs text-slate-400">{it.href.startsWith("/") ? "Internal" : "External"}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="border-t border-cyan-400/20 p-3">
        <div className="mb-2 text-xs font-medium text-cyan-300 uppercase tracking-wide">Social</div>
        <div className="grid grid-cols-1 gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-cyan-400/30 bg-slate-900/60 p-2 text-sm hover:bg-slate-800"
            >
              <span className="text-lg">{social.icon}</span>
              <div>
                <div className="font-medium">{social.label}</div>
                <div className="text-xs text-slate-400">External link</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Legal Section */}
      <div className="border-t border-cyan-400/20 p-3">
        <div className="mb-2 text-xs font-medium text-cyan-300 uppercase tracking-wide">Legal</div>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-3 rounded-lg border border-cyan-400/30 bg-slate-900/60 p-2 text-sm hover:bg-slate-800"
          >
            <span className="text-lg">🔒</span>
            <div>
              <div className="font-medium">Privacy Policy</div>
              <div className="text-xs text-slate-400">Data protection</div>
            </div>
          </button>
          <button
            onClick={onOpenTerms}
            className="flex items-center gap-3 rounded-lg border border-cyan-400/30 bg-slate-900/60 p-2 text-sm hover:bg-slate-800"
          >
            <span className="text-lg">📋</span>
            <div>
              <div className="font-medium">Terms of Service</div>
              <div className="text-xs text-slate-400">Usage guidelines</div>
            </div>
          </button>
        </div>
      </div>

      {/* Login Section */}
      <div className="border-t border-cyan-400/20 p-3">
        <div className="mb-2 text-xs font-medium text-cyan-300 uppercase tracking-wide">Account</div>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-3 rounded-lg border border-cyan-400/30 bg-slate-900/60 p-2 text-sm hover:bg-slate-800"
          >
            <span className="text-lg">🔐</span>
            <div>
              <div className="font-medium">Login / Register</div>
              <div className="text-xs text-slate-400">Authentication</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

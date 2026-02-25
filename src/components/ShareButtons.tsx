"use client";

import { Facebook, Linkedin, Rss, Twitter } from "lucide-react";

function openShare(url: string) {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ShareButtons({
  title,
  url,
}: {
  title: string;
  /** Canonical URL preferred (e.g. https://bluedot.it.com/blog/slug) */
  url: string;
}) {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const items = [
    {
      label: "Share on X",
      icon: Twitter,
      onClick: () =>
        openShare(
          `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`
        ),
    },
    {
      label: "Share on Facebook",
      icon: Facebook,
      onClick: () =>
        openShare(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`),
    },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      onClick: () =>
        openShare(
          `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
        ),
    },
    {
      label: "Share on Reddit",
      icon: Rss,
      onClick: () =>
        openShare(
          `https://www.reddit.com/submit?url=${shareUrl}&title=${shareTitle}`
        ),
    },
  ] as const;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-base-content">Share</div>
          <div className="text-xs text-base-content/70">Send this post to your network.</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#070c16]/45 px-3 py-2 text-sm text-base-content/85 transition hover:border-primary/40 hover:bg-[#070c16]/65"
                aria-label={item.label}
                title={item.label}
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">{item.label.replace("Share on ", "")}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

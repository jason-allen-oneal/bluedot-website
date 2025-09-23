"use client";
import { motion } from "framer-motion";

interface Props {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastCommit: string;
  link: string;
  features: string[];
}

export default function RepoCard(props: Props) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="card p-6 group relative overflow-hidden"
    >
      <div className="absolute inset-x-0 -top-12 h-24 opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ background: "radial-gradient(400px 120px at 20% 100%, color-mix(in oklab, var(--accent), transparent 70%), transparent 70%)" }} />
      <h3 className="text-lg font-medium mb-2">{props.name}</h3>
      <p className="text-sm text-muted mb-4">{props.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {props.features.map((f) => (
          <span key={f} className="text-xs px-2 py-1 rounded-sm border border-border">
            {f}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{props.language}</span>
        <span>⭐ {props.stars}</span>
        <span>🍴 {props.forks}</span>
        <span>{props.lastCommit}</span>
      </div>
      <div className="mt-4">
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          GitHub →
        </a>
      </div>
    </motion.article>
  );
}

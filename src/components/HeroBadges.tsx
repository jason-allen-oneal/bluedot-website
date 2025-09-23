"use client";
import { motion } from "framer-motion";
import { Github, ShieldHalf, MonitorCheck, Brain } from "lucide-react";

export default function HeroBadges({ reposCount }: { reposCount: number }) {
  const items = [
    { icon: <Github size={14} />, label: `OSS · ${reposCount} repos` },
    { icon: <ShieldHalf size={14} />, label: "Security tooling", title: "Raw-packet port scanner; Bash/Dart scanners" },
    { icon: <MonitorCheck size={14} />, label: "GUI security apps", title: "PySide6 monitor & HTTP Observatory client" },
    { icon: <Brain size={14} />, label: "LLM datasets", title: "Alpaca dataset builder (TypeScript)" },
  ];

  return (
    <ul className="badges-row">
      {items.map((b) => (
        <motion.li
          key={b.label}
          className="badge"
          title={b.title}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="dot" aria-hidden />
          {b.icon}
          <span>{b.label}</span>
        </motion.li>
      ))}
    </ul>
  );
}

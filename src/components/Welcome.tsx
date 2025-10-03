"use client";

import React from "react";

export default function Welcome({
  onOpenProjects,
  onOpenResume,
  onOpenTerminal,
}: {
  onOpenProjects: () => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900/50 to-blue-950/50">
      <div className="max-w-2xl text-center space-y-6">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_40px_rgba(34,211,238,0.6)] flex items-center justify-center">
            <span className="text-4xl">💻</span>
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Welcome to Bluedot OS
        </h1>
        
        <p className="text-xl text-slate-300 leading-relaxed">
          My portfolio desktop. Explore Projects, Resume, or open the Terminal.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={onOpenProjects}
            className="px-6 py-3 rounded-lg border border-cyan-400/40 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 font-medium transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] min-w-[140px]"
          >
            💼 Projects
          </button>
          
          <button
            onClick={onOpenResume}
            className="px-6 py-3 rounded-lg border border-blue-400/40 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] min-w-[140px]"
          >
            📄 Resume
          </button>
          
          <button
            onClick={onOpenTerminal}
            className="px-6 py-3 rounded-lg border border-green-400/40 bg-green-500/20 hover:bg-green-500/30 text-green-200 font-medium transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] min-w-[140px]"
          >
            💻 Terminal
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-6 border-t border-cyan-400/20">
          <p className="text-sm text-slate-400">
            Click on desktop icons or use the Start menu to explore more
          </p>
        </div>
      </div>
    </div>
  );
}

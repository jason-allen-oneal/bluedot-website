&apos;use client&apos;
import Reveal from &apos;@/components/Reveal&apos;
import Link from &apos;next/link&apos;

export default function CaseHighlights() {
  return (
    <section className=&quot;page-shell py-24 border-b border-white/5&quot;>
      <div className=&quot;grid gap-24 lg:grid-cols-2&quot;>
        <div className=&quot;space-y-10&quot;>
          <div className=&quot;flex items-center gap-3&quot;>
             <div className=&quot;w-12 h-0.5 bg-primary&quot; />
             <span className=&quot;text-xs font-bold uppercase tracking-widest text-primary&quot;>Featured System</span>
          </div>
          <h2 className=&quot;text-4xl font-bold tracking-tight text-white leading-tight&quot;>GhostMCP: <br />Audit-First Security Gateway</h2>
          <p className=&quot;text-lg text-base-content/60 leading-relaxed font-medium&quot;>
            A production-oriented Model Context Protocol (MCP) server designed for authorized red-team and security operations. GhostMCP enforces strict policy isolation and audit chaining for LLM-driven tool use.
          </p>
          
          <div className=&quot;grid grid-cols-2 gap-8 pt-4&quot;>
            <div className=&quot;space-y-2&quot;>
               <div className=&quot;text-2xl font-bold text-white tracking-tighter&quot;>mTLS + Token</div>
               <div className=&quot;text-xs font-bold uppercase tracking-widest text-base-content/40&quot;>Auth Architecture</div>
            </div>
            <div className=&quot;space-y-2&quot;>
               <div className=&quot;text-2xl font-bold text-white tracking-tighter&quot;>AppArmor</div>
               <div className=&quot;text-xs font-bold uppercase tracking-widest text-base-content/40&quot;>Binary Confinement</div>
            </div>
          </div>

          <div className=&quot;flex gap-6 pt-6&quot;>
            <Link href=&quot;/blog/building-ghostmcp-a-cybersecurity-mcp-server-for-agents&quot; className=&quot;text-primary text-xs font-bold tracking-widest uppercase hover:text-white transition-colors border-b border-primary/20 pb-1&quot;>
              Read Technical Breakdown →
            </Link>
            <a href=&quot;https://github.com/jason-allen-oneal/ghostmcp&quot; className=&quot;text-base-content/40 text-xs font-bold tracking-widest uppercase hover:text-white transition-colors border-b border-white/10 pb-1&quot;>
              View Source (GitHub)
            </a>
          </div>
        </div>

        <div className=&quot;relative group&quot;>
           <div className=&quot;absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-colors&quot; />
           <div className=&quot;relative p-8 border border-white/10 bg-black/40 rounded-2xl space-y-6 font-mono text-xs&quot;>
              <div className=&quot;flex items-center gap-2 border-b border-white/5 pb-4 opacity-40&quot;>
                 <div className=&quot;w-2 h-2 rounded-full bg-red-500/50&quot; />
                 <div className=&quot;w-2 h-2 rounded-full bg-yellow-500/50&quot; />
                 <div className=&quot;w-2 h-2 rounded-full bg-green-500/50&quot; />
                 <span className=&quot;ml-2&quot;>ghostmcp-audit.jsonl</span>
              </div>
              <div className=&quot;space-y-4 text-base-content/60&quot;>
                 <div className=&quot;text-primary/80&quot;>{&quot;{&quot;} &quot;event&quot;: &quot;tool_call&quot;, &quot;tool&quot;: &quot;nmap_raw_tool&quot; {&quot;}&quot;}</div>
                 <div>{&quot;{&quot;} &quot;policy&quot;: &quot;GHOSTMCP_MAX_TOOL_LEVEL&quot;, &quot;result&quot;: &quot;authorized&quot; {&quot;}&quot;}</div>
                 <div className=&quot;text-secondary/80&quot;>{&quot;{&quot;} &quot;audit_chain&quot;: &quot;sha256:8f3c...b2e4&quot; {&quot;}&quot;}</div>
                 <div>{&quot;{&quot;} &quot;status&quot;: &quot;executing&quot;, &quot;pid&quot;: 287503 {&quot;}&quot;}</div>
                 <div className=&quot;animate-pulse&quot;>_</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}

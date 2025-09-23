export const projects = [
    {
        slug: "pentest-agent",
        title: "Pentest Agent",
        blurb: "AI-powered offensive/defensive toolkit with modular executors, JSON grammar tool spec, and offline modes.",
        stack: ["TypeScript", "Python", "FastAPI", "Next.js"],
        tags: ["cybersecurity", "agents", "RAG", "LoRA"],
        href: "https://github.com/jason-allen-oneal/pentest-agent",
    },
    {
        slug: "agentred",
        title: "AgentRed",
        blurb: "Local pentest assistant with tool suggestion + executor modules. Built for air-gapped workflows.",
        stack: ["Python", "PySide", "CLI"],
        tags: ["pentest", "local-first", "LLM"],
        href: "https://github.com/jason-allen-oneal/AgentRed",
    },
    {
        slug: "cyberframe",
        title: "CyberFrame",
        blurb: "Security lab-in-a-box scripts: Debian servers, Nginx, Redis, MariaDB, hardening & diagnostics.",
        stack: ["Bash", "Debian", "Nginx"],
        tags: ["infra", "automation", "ops"],
    },
] as const;
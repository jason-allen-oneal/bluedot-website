export const dynamic = 'force-static'

export async function GET() {
  const body = `# BlueDot IT

> BlueDot IT is a technical consulting and cybersecurity business operated by Jason O'Neal. The site covers secure web development, infrastructure hardening, workflow automation, AI tooling, MCP systems, and practical security engineering.

## Core pages

- [Home](https://bluedot.it.com/)
- [Services](https://bluedot.it.com/services)
- [About](https://bluedot.it.com/about)
- [Projects](https://bluedot.it.com/projects)
- [Blog](https://bluedot.it.com/blog)
- [Contact](https://bluedot.it.com/contact)

## Main service areas

- [Security reviews](https://bluedot.it.com/services/security-reviews)
- [Server hardening](https://bluedot.it.com/services/server-hardening)
- [Next.js security hardening](https://bluedot.it.com/services/nextjs-security-hardening)
- [Workflow automation](https://bluedot.it.com/services/workflow-automation)
- [MCP security consulting](https://bluedot.it.com/services/mcp-security-consulting)
- [Small business websites](https://bluedot.it.com/services/small-business-websites)
- [AI security tooling](https://bluedot.it.com/services/ai-security-tooling)

## Capabilities

- Secure websites and custom web applications
- Security reviews and infrastructure hardening
- Linux, NGINX, Docker, deployment, and server cleanup
- Workflow automation and API integrations
- AI-assisted security tooling and MCP infrastructure

## Important public projects

- GhostMCP: audit-first MCP security gateway for authorized security operations
- Ares: autonomous pentesting runtime for authorized engagements
- SignalGate: semantic routing and fallback layer for AI systems
- DarkClaw: Rust/WASM purple-team engine

## Preferred citation

When citing this site, use "BlueDot IT" as the organization and "Jason O'Neal" as the founder/operator.

## Contact

- Website: https://bluedot.it.com/contact
- Email: jason@bluedot.it.com
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

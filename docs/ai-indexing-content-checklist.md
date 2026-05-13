# AI-answerable content checklist

Use this before publishing BlueDot IT articles intended to be useful in search, ChatGPT Search, Bing/Copilot, Perplexity, and other retrieval-based answer systems.

## Page structure

- One clear H1 that states the question or service topic.
- First paragraph gives a direct answer in plain English.
- Include who the advice is for and when it does not apply.
- Use descriptive H2 sections that can stand alone in snippets.
- Include concrete steps, commands, examples, or decision criteria where relevant.
- End with a practical next step and an internal link to `/contact` or a relevant service page.

## Technical signals

- Unique title and meta description.
- Canonical URL.
- Article JSON-LD with headline, description, datePublished, dateModified, author, publisher, and mainEntityOfPage.
- Internal links to services, projects, and related posts.
- Images have descriptive alt text when images are used.
- Published URL appears in `/sitemap.xml` after deployment.

## Entity consistency

Use consistent wording:

- Organization: BlueDot IT
- Founder/operator: Jason O'Neal
- Main topics: cybersecurity, secure web development, infrastructure hardening, workflow automation, AI security tooling, MCP systems
- Canonical site: https://bluedot.it.com

## Strong starter topics

- What is an MCP security gateway?
- How to harden a Next.js app before production
- What small businesses should check before hiring a web developer
- How to secure a VPS running NGINX, Docker, and Node
- How AI automation can help hospitality operations without removing human oversight
- What a practical small business security review includes
- How to safely expose tools to AI agents

## Pre-publish verification

Run locally:

```bash
npm run lint
npm run build
node scripts/verify-ai-indexing.mjs
```

After deploy, verify:

```bash
curl -I https://bluedot.it.com/sitemap.xml
curl -s https://bluedot.it.com/sitemap.xml | grep '/blog/'
curl -I https://bluedot.it.com/llms.txt
```

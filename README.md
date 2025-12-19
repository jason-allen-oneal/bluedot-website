# BluEdot — Personal Portfolio Website

Repo: [https://github.com/jason-allen-oneal/bluedot-website](https://github.com/jason-allen-oneal/bluedot-website)

A modern personal portfolio website built to showcase cybersecurity expertise, full‑stack development projects, writing, and professional experience. The site focuses on accessibility, SEO, performance, and a clean, responsive presentation of projects and posts.

Table of contents

- About
- Features
- Tech stack
- Demo / Screenshots
- Quick start (local)
- Environment variables
- Database & Prisma
- Admin panel
- Available scripts
- Deployment
- Project structure
- Contributing & tests
- Suggested improvements
- License

About
-----;
Bluedot is a professional portfolio and personal site that highlights technical work, security knowledge, and creative projects. It provides a blog platform for technical writing, a projects portfolio, a downloadable resume, and an admin panel for content management.

Features
--------;
Features include:

- Clean, responsive website layout optimized for desktop and mobile
- Projects portfolio with project pages and rich media support
- Blog with Markdown/MDX support and SEO-friendly routes (/blog/[slug])
- Resume download and structured experience section
- Admin panel for creating and managing blog posts and projects
- SEO-first setup: comprehensive metadata, sitemap, robots, and JSON-LD
- PWA manifest and basic offline support
- TypeScript-first codebase with linting and tooling to maintain quality

Tech stack
----------;
The framework:

- Next.js 15 (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Radix UI (accessible primitives)
- NextAuth.js (authentication)
- Prisma ORM + MySQL
- ESLint, PostCSS
- Vercel for hosted deployments (supported)
- PM2 for self-hosted process management

Demo
------------------;
See it live:

- [https://bluedot.it.com](https://bluedot.it.com)

Quick start — local development
-------------------------------;
Requirements

- Node.js 18+
- MySQL (local or remote)
- npm, yarn, or pnpm

1. Clone

   ```bash
   git clone https://github.com/jason-allen-oneal/bluedot-website.git
   cd bluedot-website
   ```

2. Install

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Environment

   Create `.env.local` (copy from `.env.example` if present) and set required variables (see next section).

4. Database & Prisma

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma db seed   # if a seed script exists
   ```

5. Start dev server

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000)

Environment variables
---------------------;
Create `.env.local` with the following values (example values shown — do not commit secrets):

```text
DATABASE_URL="mysql://user:password@localhost:3306/bluedot"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_USER="admin"
ADMIN_PASS="secure-password"
# Add any NEXT_PUBLIC_ keys or third-party API keys as required
```

If `.env.example` is missing, add one with sanitized keys to help contributors.

Database & Prisma
-----------------;

- Prisma schema lives in `prisma/` (ensure `schema.prisma` is committed).
- Typical workflow:
  - `npx prisma generate`
  - `npx prisma migrate dev` (local migrations)
  - `npx prisma db seed` (if seed script exists)
- Confirm models for posts, projects, users, and comments are present and documented.

Admin panel
-----------;

- Admin UI available at `/admin`
- Admin/author accounts managed via NextAuth or environment-backed default admin credentials (ADMIN_USER / ADMIN_PASS)
- Admin features: create/edit blog posts and projects, moderate comments, manage metadata

Available scripts
-----------------;

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run lint` — run ESLint
- Prisma helpers:
  - `npx prisma studio`
  - `npx prisma migrate`
  - `npx prisma generate`

Deployment
----------;
Vercel (recommended)

- Connect the repo to Vercel and set environment variables in project settings.
- Vercel will run `npm run build` and deploy the site.

Self-host (PM2)

1. Build

   ```bash
   npm run build
   ```

2. Start with PM2

   ```bash
   pm2 start ecosystem.config.js
   ```

3. Run migrations:

   ```bash
   npx prisma migrate deploy
   ```

Project structure
-----------------;
Top-level (simplified)

```text
bluedot-website/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # UI components
│   └── lib/            # utilities and configs
├── prisma/             # schema, migrations, seed
├── public/             # static assets and images
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

Contributing & tests
--------------------;

- Add a `CONTRIBUTING.md` to document the development workflow, code style, and PR guidelines.
- Add Github Actions for linting and build checks (CI).
- Consider adding unit/integration tests for critical components and API routes.

Suggested improvements
----------------------;

- Add `.env.example` with required variables (non-sensitive).
- Add screenshots/GIFs to README and the `public/` folder.
- Add `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and a simple issue/PR template.
- Document admin usage and any RBAC or manual admin creation steps.
- Add automated CI (GitHub Actions) that runs lint and build on PRs.
- Provide a short developer onboarding doc (how to run seed data, create admin accounts, etc.).
- Add accessibility checks and Lighthouse CI for performance monitoring.

License
-------;
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
-------;

- Site: [https://bluedot.it.com](https://bluedot.it.com)
- GitHub: [https://github.com/jason-allen-oneal](https://github.com/jason-allen-oneal)
- Email: [jason.allen.oneal@gmail.com](mailto:jason.allen.oneal@gmail.com)

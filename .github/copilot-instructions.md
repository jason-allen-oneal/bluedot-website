# BlueDot Website - Next.js Portfolio Application

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Overview

BlueDot Website is a modern portfolio/personal website built with Next.js 15, TypeScript, React 19, Tailwind CSS 4, and Prisma. It features a terminal-style interactive homepage, project showcase, blog functionality, and admin panel with authentication.

## Working Effectively

### Essential Dependencies and Setup
**NEVER CANCEL: Installation takes 20-30 seconds. Always wait for completion.**
```bash
npm install
```

**Required additional dependencies that are NOT in package.json by default:**
```bash
npm install remark remark-html sanitize-html marked @types/bcrypt @types/sanitize-html @types/marked
```

### Environment Setup
**Create `.env.local` file with minimal database configuration:**
```bash
echo 'DATABASE_URL="file:./dev.db"' > .env.local
```

**IMPORTANT:** The database schema uses SQLite for development (not MySQL as shown in schema.prisma). Change the provider in `prisma/schema.prisma` to:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### Development Server
**NEVER CANCEL: Dev server starts in 1.5-2 seconds. Always wait for "Ready" message.**
```bash
NEXT_TELEMETRY_DISABLED=1 npm run dev
```
- **Expected startup time:** 1.4-2 seconds
- **Port:** 3000 (or next available port like 3001, 3002)
- **URL:** http://localhost:3000

### Build Process
**CRITICAL BUILD ISSUES - Known workarounds required:**

**1. Network connectivity issues (fonts.googleapis.com, Prisma binaries):**
The build WILL FAIL in air-gapped environments due to:
- Google Fonts (Inter, JetBrains Mono) in `src/app/layout.tsx`
- Prisma binary downloads from binaries.prisma.sh

**Workaround for Google Fonts:**
Remove the Google Fonts imports from `src/app/layout.tsx`:
```typescript
// Remove these lines:
// import { Inter, JetBrains_Mono } from "next/font/google";
// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// const jet = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// Replace className with:
// className="font-sans min-h-screen"
```

**2. Linting errors prevent build:**
- Build fails due to TypeScript/ESLint strict rules
- Use `--no-lint` flag to bypass during development

**Build commands (expected times):**
```bash
# NEVER CANCEL: Compilation takes 5-8 seconds, but will fail due to Prisma client. Set timeout to 60+ seconds.
NEXT_TELEMETRY_DISABLED=1 npx next build --no-lint

# Production build (with linting):
# NEVER CANCEL: Build takes 15-25 seconds if all lint issues are fixed. Set timeout to 60+ seconds.
NEXT_TELEMETRY_DISABLED=1 npm run build
```

**Expected build behavior:**
- Compilation succeeds in 5-8 seconds
- Build fails during page data collection due to Prisma client not being generated
- Total process takes 10-15 seconds before failing

**3. Linting issues:**
Run linting separately:
```bash
npm run lint
```

**Common lint errors that WILL fail the build:**
- TypeScript `any` types in: `src/app/(portfolio)/projects/page.tsx`, `src/app/blog/page.tsx`, `src/components/TerminalConsole.tsx`, `src/lib/github.ts`
- Unused variables in `src/app/auth/page.tsx`
- `require()` style imports in `tailwind.config.ts`

**Fix linting before production builds:**
```bash
npm run lint -- --fix
```

### Testing
**No automated tests are configured in this repository.** Manual testing required.

## Validation Scenarios

**ALWAYS test these scenarios after making changes:**

### 1. Homepage Terminal Interface
1. Navigate to http://localhost:3000
2. Verify the terminal interface loads with animated blue dots background
3. Type `help` in the terminal input and press Enter
4. Verify the help menu displays available commands
5. Test at least 2-3 terminal commands like `projects`, `about`, `whoami`

### 2. Navigation and Pages
1. Test all navigation links: home(), view_projects(), about_me(), access_contact(), authenticate()
2. Verify projects page shows project cards with GitHub links
3. Test the command menu (Search ⌘K button)
4. Test theme toggle functionality

### 3. Blog Functionality (if modified)
1. Navigate to /blog
2. Verify blog posts load correctly
3. Test individual blog post pages

### 4. Admin Panel (if modified)
1. Navigate to /admin
2. Test authentication flow
3. Verify admin functions work (requires seeded database)

## Database Operations

**IMPORTANT:** Prisma operations require network access to download binaries and may fail in restricted environments.

**Database setup (if needed):**
```bash
# NEVER CANCEL: Prisma operations can take 30-60 seconds. Set timeout to 120+ seconds.
npx prisma generate  # May fail due to network restrictions
npx prisma db push   # Creates SQLite database
npx prisma db seed   # Seeds with sample data
```

**If Prisma fails due to network issues:**
- Database-dependent features (blog, admin, comments) will not work
- Static pages (homepage, projects, about) will still function
- Document this limitation in any changes that affect database functionality

## Common Issues and Troubleshooting

### Build Failures
1. **Google Fonts error:** Remove font imports from layout.tsx
2. **Prisma client error:** Run `npx prisma generate` or disable database features
3. **Missing dependencies:** Install remark, sanitize-html, marked packages
4. **Linting errors:** Use `--no-lint` flag or fix TypeScript issues

### Network Restrictions
- **fonts.googleapis.com blocked:** Remove Google Fonts (workaround provided above)
- **binaries.prisma.sh blocked:** Prisma will not work, disable DB features
- **npm registry issues:** Pre-install dependencies may be required

### Performance Notes
- **Dev server startup:** 1.4-2 seconds (very fast)
- **Build time:** 8-15 seconds without linting, 15-25 seconds with linting
- **Hot reload:** Very responsive, ~500-600ms for component changes

## Key Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (portfolio)/       # Portfolio pages (projects, about, contact)
│   ├── admin/             # Admin panel with authentication
│   ├── api/               # API routes (comments, auth, admin)
│   ├── auth/              # Authentication pages
│   ├── blog/              # Blog pages and individual posts
│   ├── layout.tsx         # Root layout (contains Google Fonts - remove if needed)
│   └── page.tsx           # Homepage with terminal interface
├── components/            # React components
│   ├── ui/                # Radix UI components
│   ├── CommandMenu.tsx    # Search command menu (⌘K)
│   ├── TerminalConsole.tsx # Interactive terminal interface
│   ├── NeonGrid.tsx       # Animated background
│   └── BlueDotField.tsx   # Blue dots animation
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── github.ts         # GitHub API integration
│   ├── prisma.ts         # Database client
│   ├── projects.ts       # Project data
│   └── constants.ts      # App constants and themes
prisma/
├── schema.prisma         # Database schema (change to SQLite)
└── seed.ts              # Database seeding script
```

## Technology Stack Details

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5
- **UI:** React 19, Tailwind CSS 4
- **Database:** Prisma (SQLite for dev, MySQL for prod)
- **Authentication:** NextAuth.js
- **Components:** Radix UI, custom components
- **Animations:** Framer Motion, custom CSS animations
- **Content:** Markdown processing with remark

## Before Committing Changes

**ALWAYS run these validation steps:**

1. **Start dev server and test functionality:**
   ```bash
   NEXT_TELEMETRY_DISABLED=1 npm run dev
   ```

2. **Test the homepage terminal interface:**
   - Navigate to homepage
   - Type `help` and verify commands work
   - Test navigation to projects and other pages

3. **Attempt a production build:**
   ```bash
   NEXT_TELEMETRY_DISABLED=1 npx next build --no-lint
   ```

4. **Run linting (fix issues if possible):**
   ```bash
   npm run lint
   ```

5. **Document any known issues or workarounds needed**

## Critical Reminders

- **NEVER CANCEL** build processes - they complete in under 30 seconds
- **ALWAYS test** the terminal interface after any homepage changes
- **NETWORK ISSUES** are common - use provided workarounds
- **PRISMA MAY FAIL** in restricted environments - static features still work
- **LINTING IS STRICT** - use `--no-lint` for development builds
- **GOOGLE FONTS** will fail without internet - remove imports if needed

**When in doubt:** The development server (`npm run dev`) is the most reliable way to test changes. The terminal interface and static pages should always work even if database features fail.
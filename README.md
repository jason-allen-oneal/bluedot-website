# bluedot.it.com

> **A modern portfolio website with a unique desktop-inspired interface showcasing cybersecurity expertise, full-stack development skills, and creative projects.**

This is the professional portfolio and self-marketing website for **Jason O'Neal**, a cybersecurity student specializing in IoT and full-stack developer. The site features an innovative desktop-style interface that provides an engaging, interactive experience while showcasing technical skills, projects, and professional background.

## 🌟 Key Features

### Unique Desktop Experience
- **Windows-like Desktop Interface**: Complete with taskbar, desktop icons, and draggable windows
- **Interactive Terminal**: Fully functional terminal emulator with custom commands
- **Multi-Window System**: Browse different sections simultaneously in separate windows
- **Responsive Design**: Seamlessly adapts from desktop to mobile experiences

### Professional Showcase
- **About Section**: Comprehensive background in cybersecurity, development, and creative pursuits
- **Projects Portfolio**: Interactive showcase of development projects and technical work
- **Blog Platform**: Technical writing and insights with Markdown support
- **Resume Access**: Downloadable PDF resume and detailed experience overview
- **Contact Integration**: Multiple ways to connect and collaborate

### Technical Excellence
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and cutting-edge web technologies
- **Performance Optimized**: Server-side rendering, automatic code splitting, and optimized assets
- **Database-Driven**: MySQL with Prisma ORM for dynamic content management
- **Admin Panel**: Content management system for blog posts and site updates

## 🚀 Technology Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### Backend & Database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[MySQL](https://www.mysql.com/)** - Reliable relational database
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution

### Development & Deployment
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[PM2](https://pm2.keymetrics.io/)** - Production process management
- **[Vercel](https://vercel.com/)** - Optimal deployment platform

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MySQL database (local or remote)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jason-allen-oneal/bluedot-website.git
   cd bluedot-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   ```
   
   Configure the following environment variables:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/bluedot"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ADMIN_EMAIL="your-admin@email.com"
   ADMIN_USER="admin"
   ADMIN_PASS="secure-password"
   ```

4. **Database Setup**
   ```bash
   # Run database migrations
   npx prisma migrate dev
   
   # Seed with initial data
   npx prisma db seed
   ```

5. **Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
bluedot-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin panel for content management
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── About.tsx         # About section component
│   │   ├── Blog.tsx          # Blog listing component
│   │   ├── Projects.tsx      # Projects showcase
│   │   ├── TerminalConsole.tsx # Interactive terminal
│   │   └── Resume.tsx        # Resume display
│   └── lib/                   # Utility functions and configurations
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── migrations/           # Database migrations
│   └── seed.ts               # Database seeding script
├── public/                    # Static assets
└── ecosystem.config.js        # PM2 deployment configuration
```

## 🎯 Key Interactions

### Terminal Commands
The interactive terminal supports various commands:
- `help` - Show available commands
- `about` - Display personal information  
- `projects` - List featured projects
- `contact` - Show contact information
- `open <section>` - Navigate to different sections
- `clear` - Clear terminal output
- `uname` - System information

### Desktop Interface
- **Desktop Icons**: Click to open different sections in windows
- **Taskbar**: Access start menu and manage open windows
- **Window Management**: Drag, resize, minimize, and close windows
- **Start Menu**: Quick access to all sections and external links

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run database migrations
npx prisma generate  # Generate Prisma client
```

### Content Management

Access the admin panel at `/admin` to:
- Create and edit blog posts
- Manage content and metadata
- Review and moderate comments
- Update project information

## 🌐 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Configure PM2** (production process management)
   ```bash
   pm2 start ecosystem.config.js
   ```

3. **Database Migration**
   ```bash
   npx prisma migrate deploy
   ```

### Vercel Deployment

The easiest deployment option:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jason-allen-oneal/bluedot-website)

## 💡 About the Developer

**Jason O'Neal** is a cybersecurity student specializing in IoT security and a versatile full-stack developer. With expertise spanning TypeScript, Python, PHP, Linux systems, and cloud platforms, Jason builds AI-powered cybersecurity tools and engineers infrastructure for rapid development iteration.

Beyond technical work, Jason is also a creative professional involved in:
- Music arrangement and composition with focus on guitar performance
- Fantasy fiction writing and D&D campaign development
- Mechanical projects and hands-on problem solving

## 🤝 Connect & Collaborate

- **Portfolio**: [bluedot.it.com](https://bluedot.it.com)
- **GitHub**: [@jason-allen-oneal](https://github.com/jason-allen-oneal)
- **LinkedIn**: [jason-allen-oneal](https://linkedin.com/in/jason-allen-oneal)
- **Email**: jason.allen.oneal@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ and modern web technologies • Showcasing the intersection of cybersecurity expertise and creative development**

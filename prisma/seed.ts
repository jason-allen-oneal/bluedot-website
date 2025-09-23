import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Clearing all tables...");
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("✅ All tables cleared");

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS || "admin123", 10);
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@bluedot.com" },
    update: {},
    create: {
      username: process.env.ADMIN_USER || "admin",
      email: process.env.ADMIN_EMAIL || "admin@bluedot.com",
      password: hashedPassword,
    },
  });
  console.log("✅ Admin user created");

  await prisma.post.create({
    data: {
      title: "Building bluedot.it.com: A Modern Web Development Journey",
      slug: "building-bluedot",
      excerpt: "Discover how I built this portfolio website using cutting-edge technologies like Next.js 15, TypeScript, and Tailwind CSS. A deep dive into modern web development practices and design decisions.",
      content: `## The Vision

When I set out to build this portfolio website, I wanted to create something that would **stand out** in today's crowded digital landscape. The goal wasn't just to showcase my technical skills, but to demonstrate my approach to problem-solving, attention to detail, and understanding of modern web development principles.

> "The best code is the code that never needs to be written." - This philosophy guided every decision in this project.

## Technology Stack

### Frontend Framework: Next.js 15

I chose **Next.js 15** for its exceptional developer experience and built-in optimizations. The App Router provides a clean, intuitive way to structure the application, while features like automatic code splitting and server-side rendering ensure lightning-fast loading times.

\`\`\`typescript
// Example of a Next.js 15 page component
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  // Server-side rendering at its finest
}
\`\`\`

### TypeScript: Type Safety First

TypeScript was a **no-brainer** for this project. It catches errors at compile time, provides excellent IDE support, and makes the codebase more maintainable. For a portfolio site that demonstrates professional development practices, type safety is essential.

### Styling: Tailwind CSS + Custom Design System

Instead of starting from scratch, I built on **Tailwind CSS's** utility-first approach. I created a custom design system with CSS custom properties that define colors, spacing, and other design tokens:

\`\`\`css
:root {
  --background: #0b0e11;
  --surface: #11161d;
  --foreground: #e5e7eb;
  --primary: #7c9eff;
  --accent: #55d6be;
}
\`\`\`

This approach ensures consistency across the entire application while maintaining flexibility.

### Database: MySQL with Prisma

For the blog functionality, I needed a reliable database. **MySQL** provides excellent performance and reliability, while **Prisma** offers a type-safe database client that integrates seamlessly with TypeScript.

## Key Features Implemented

### 1. Responsive Design

The website works beautifully on all devices, from mobile phones to large desktop screens. The layout adapts gracefully, and all interactive elements are touch-friendly.

**Key responsive features:**
- Mobile-first design approach
- Flexible grid systems
- Adaptive typography
- Touch-optimized interactions

### 2. Dark/Light Mode Support

I implemented a theme system that respects user preferences while allowing manual override. The color scheme automatically adjusts based on the user's system settings.

### 3. Blog System

A full-featured blog with:

- **Markdown support** for rich content
- **SEO-optimized URLs** with clean slugs
- **Admin interface** for content management
- **Automatic slug generation** from titles
- **Reading time estimation**
- **Beautiful typography** with custom styling

### 4. Authentication System

Secure admin access using **NextAuth.js** with credential-based authentication. The system includes:

- Proper password hashing with bcrypt
- Session management
- CSRF protection
- Environment-based configuration

### 5. Performance Optimizations

- **Image optimization** with Next.js Image component
- **Automatic code splitting** for faster initial loads
- **Efficient database queries** with Prisma
- **Minimal bundle sizes** through tree shaking
- **Server-side rendering** for better SEO

## Technical Challenges and Solutions

### Challenge 1: Theme System Architecture

**Problem**: Creating a consistent theme system that works across all components and respects user preferences.

**Solution**: Built a CSS custom properties system with fallbacks and proper TypeScript integration:

\`\`\`typescript
// Theme-aware component
const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');
  // Seamless theme switching
};
\`\`\`

### Challenge 2: Database Schema Design

**Problem**: Designing a flexible schema that could handle blog posts, categories, and tags while maintaining performance.

**Solution**: Used Prisma's schema-first approach to create a clean, normalized database structure:

\`\`\`prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   String   @db.Text
  excerpt   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
\`\`\`

### Challenge 3: Markdown Rendering

**Problem**: Implementing beautiful markdown rendering that matches the design system.

**Solution**: Server-side markdown parsing with custom CSS styling:

- **remark** for reliable markdown parsing
- **Custom prose classes** for consistent theming
- **Enhanced typography** with visual hierarchy
- **Code syntax highlighting** with proper styling

## Lessons Learned

### 1. Start Simple, Iterate Fast

The initial version was much simpler. I added features incrementally, testing each addition thoroughly before moving on. This approach prevented feature creep and kept the project focused.

### 2. TypeScript is Worth the Investment

The initial setup takes longer, but the benefits in development speed and error prevention are enormous. Type safety caught numerous potential bugs before they could reach production.

### 3. Design Systems Matter

Having a consistent design system from the start made the entire development process smoother and the final product more polished. The custom CSS properties made theme changes trivial.

### 4. Performance is a Feature

Users expect fast websites. Building performance into the architecture from the beginning is much easier than optimizing later. Next.js 15's built-in optimizations were a game-changer.

### 5. Documentation is Development

Writing this blog post helped me reflect on the development process and identify areas for improvement. Good documentation is as important as good code.

## What's Next?

This website is a **living project**. I plan to:

- [✅] Add more interactive features and animations
- [ ] Implement analytics to understand user behavior
- [ ] Create more technical content and tutorials
- [✅] Add a projects showcase section
- [✅] Integrate with external APIs for dynamic content
- [✅] Add social media sharing capabilities

## Conclusion

Building this portfolio website has been an excellent exercise in modern web development. It demonstrates my ability to:

- Work with current technologies and frameworks
- Solve complex problems with elegant solutions
- Deliver a polished, professional product
- Write maintainable, well-documented code
- Think about user experience and performance

The code is **open source** and available on GitHub, so feel free to explore the implementation details. If you're interested in working together or have questions about any of the technical decisions, don't hesitate to reach out.

---

*This post was written as part of documenting my development process. I believe in transparency and sharing knowledge, so I'm documenting not just what I built, but how and why I made the decisions I did.*

**Happy coding! 🚀**`,
    },
  });
  console.log("✅ Sample blog post created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
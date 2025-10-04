import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

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

  // Create sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Technology" },
      update: {},
      create: { name: "Technology" }
    }),
    prisma.category.upsert({
      where: { name: "Web Development" },
      update: {},
      create: { name: "Web Development" }
    }),
    prisma.category.upsert({
      where: { name: "Programming" },
      update: {},
      create: { name: "Programming" }
    }),
    prisma.category.upsert({
      where: { name: "Tutorials" },
      update: {},
      create: { name: "Tutorials" }
    }),
    prisma.category.upsert({
      where: { name: "Personal" },
      update: {},
      create: { name: "Personal" }
    })
  ]);
  console.log("✅ Categories created");

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: "Next.js" },
      update: {},
      create: { name: "Next.js" }
    }),
    prisma.tag.upsert({
      where: { name: "React" },
      update: {},
      create: { name: "React" }
    }),
    prisma.tag.upsert({
      where: { name: "TypeScript" },
      update: {},
      create: { name: "TypeScript" }
    }),
    prisma.tag.upsert({
      where: { name: "JavaScript" },
      update: {},
      create: { name: "JavaScript" }
    }),
    prisma.tag.upsert({
      where: { name: "CSS" },
      update: {},
      create: { name: "CSS" }
    }),
    prisma.tag.upsert({
      where: { name: "Web Design" },
      update: {},
      create: { name: "Web Design" }
    }),
    prisma.tag.upsert({
      where: { name: "UI/UX" },
      update: {},
      create: { name: "UI/UX" }
    }),
    prisma.tag.upsert({
      where: { name: "Tutorial" },
      update: {},
      create: { name: "Tutorial" }
    })
  ]);
  console.log("✅ Tags created");

  await prisma.post.create({
    data: {
      title: "Building a Desktop-Inspired Web Experience: The bluedot.it Architecture",
      slug: "desktop-architecture",
      excerpt: "Explore the unique desktop-inspired architecture behind this portfolio website, featuring draggable windows, an interactive terminal, and a window management system built with Next.js 15 and modern web technologies.",
      content: `## The Concept  
When I set out to create this portfolio website, I wanted to build something that would **immediately capture attention** while showcasing both technical skills and creative vision. Instead of following conventional web design patterns, I chose to create a **desktop operating system experience** right in the browser.  

> "The most interesting interfaces are the ones that break expectations while remaining intuitive."  
> *This principle guided every design decision.*  

## The Desktop Experience  

### Window Management System  

The heart of this application is a **fully functional window management system** that recreates the familiar desktop experience:  
  
~~~typescript
type WindowType = {
  id: string;
  title: string;
  type: "terminal" | "about" | "projects" | "blog" | "contact" | "resume";
  state: "normal" | "minimized" | "maximized";
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
};
~~~
  
#### Key Features  
  
- **Draggable Windows** — Click and drag any window around the desktop  
- **Window Controls** — Minimize, maximize, and close buttons that actually work  
- **Z-index Management** — Proper window layering and focus handling  
- **State Persistence** — Windows remember their size and position  
- **Multi-window Support** — Open multiple sections simultaneously  

### Interactive Terminal Console  

The terminal isn't just for show—it's a **fully functional command-line interface** with real commands:

~~~typescript
const commands = {
  help: () => showAvailableCommands(),
  about: () => openWindow("about", "About Me"),
  projects: () => openWindow("projects", "Projects"),
  contact: () => showContactInfo(),
  clear: () => clearTerminalOutput(),
  uname: () => showSystemInfo(),
  // ... and many more
};
~~~

#### Terminal Features

- **Command History** — Arrow keys to navigate previous commands
- **Tab Completion** — Intelligent command suggestions
- **Real Functionality** — Commands actually perform actions
- **Typewriter Effects** — Realistic terminal animations
- **Current Directory** — Simulated file system navigation

### Desktop Environment

The complete desktop experience includes:

- **Desktop Icons** — Clickable shortcuts to open different sections
- **Taskbar** — Shows currently open windows and system time
- **Start Menu** — Organized access to all features and external links
- **Window Overlays** — Proper modal and dialog handling

---

## Technical Architecture

### Component Structure

The application follows a **clean component architecture**:

~~~
src/
├── app/
│   ├── page.tsx           # Main desktop interface
│   ├── admin/             # Content management system
│   └── api/               # Backend API routes
├── components/
│   ├── TerminalConsole.tsx    # Interactive terminal
│   ├── About.tsx             # About section window
│   ├── Blog.tsx              # Blog listing component
│   ├── Projects.tsx          # Projects showcase
│   └── ui/                   # Reusable UI components
└── lib/                      # Utility functions
~~~

### State Management

The desktop state is managed through **React hooks** with careful attention to performance:

~~~typescript
const [windows, setWindows] = useState<WindowType[]>([]);
const zRef = useRef<number>(2); // Z-index counter

const openWindow = useCallback((type, title, position?, size?) => {
  setWindows(prev => {
    const existing = prev.find(w => w.type === type);
    if (existing) {
      // Bring existing window to front
      return prev.map(w => 
        w.id === existing.id 
          ? { ...w, state: "normal", zIndex: zRef.current++ }
          : w
      );
    }
    // Create new window
    return [...prev, newWindow];
  });
}, []);
~~~

### Modern Tech Stack

#### Frontend Framework
**Next.js 15** with App Router for optimal performance and SEO

#### TypeScript Integration
Full type safety across the entire application

#### Styling
**Tailwind CSS** with custom design system for the desktop theme:

~~~css
.desktop-gradient {
  background: linear-gradient(135deg, 
    rgb(30, 58, 138) 0%, 
    rgb(30, 41, 59) 50%, 
    rgb(15, 23, 42) 100%);
}

.window-glass {
  background: rgba(2, 6, 23, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(34, 211, 238, 0.3);
}
~~~

#### Database
**MySQL** with Prisma ORM for the blog system and user management

---

## Unique Features

### 1. Drag and Drop Interface

Every window can be **dragged around the desktop** with smooth animations:

~~~typescript
const handleMouseMove = useCallback((e: MouseEvent) => {
  if (!isDragging) return;
  const deltaX = e.clientX - dragStart.x;
  const deltaY = e.clientY - dragStart.y;
  const newX = Math.max(0, Math.min(90, 
    window.position.x + (deltaX / window.innerWidth) * 100));
  const newY = Math.max(0, Math.min(80, 
    window.position.y + (deltaY / window.innerHeight) * 100));
  onUpdate({ position: { x: newX, y: newY } });
}, [isDragging, dragStart, window.position]);
~~~

### 2. Responsive Desktop Design

The desktop experience **adapts beautifully** to different screen sizes:

- **Desktop** — Full window management with drag-and-drop
- **Tablet** — Touch-friendly windows with gesture support
- **Mobile** — Simplified interface while maintaining the desktop aesthetic

### 3. Blog System with Admin Panel

A **complete content management system** built into the desktop environment:

- **Rich Markdown Editor** for creating posts
- **Live Preview** while editing
- **Image Upload** and management
- **SEO Optimization** with meta tags and social sharing
- **Comment System** with moderation

### 4. Performance Optimizations

Despite the complex interface, the site remains **lightning fast**:

- **Code Splitting** — Each window component loads only when needed
- **Lazy Loading** — Images and content load on demand
- **Memoization** — Expensive calculations are cached
- **Optimistic Updates** — UI responds immediately to user actions

---

## Technical Challenges Solved

### Challenge 1: Window Management Performance

**Problem:** Managing multiple draggable windows without performance degradation.

**Solution:** Used **React.memo** and **useCallback** extensively, plus a ref-based z-index system:

~~~typescript
const Window = React.memo(({ window, onUpdate, onClose, onFocus }) => {
  // Memoized window component prevents unnecessary re-renders
  const handleDrag = useCallback((delta) => {
    // Only update position when actually dragging
  }, [isDragging]);
});
~~~

### Challenge 2: State Synchronization

**Problem:** Keeping window state synchronized across the entire desktop.

**Solution:** Centralized state management with functional updates:

~~~typescript
const updateWindow = useCallback((id: string, updates: Partial<WindowType>) => {
  setWindows(prev => prev.map(w => 
    w.id === id ? { ...w, ...updates } : w
  ));
}, []);
~~~

### Challenge 3: Mobile Experience

**Problem:** Making a desktop interface work on touch devices.

**Solution:** **Progressive enhancement** with touch-specific interactions:

~~~typescript
const handleTouchStart = (e: TouchEvent) => {
  const touch = e.touches[0];
  setDragStart({ x: touch.clientX, y: touch.clientY });
  setIsDragging(true);
};
~~~

---

## What Makes This Special

### 1. Nostalgic Yet Modern

The interface evokes **classic desktop environments** while using cutting-edge web technologies. It's familiar enough to be intuitive but innovative enough to be memorable.

### 2. Functional, Not Just Visual

Every element serves a purpose. The terminal has real commands, windows can be repositioned and resized, and the taskbar shows actual running applications.

### 3. Seamless Integration

Despite the complexity, everything works together seamlessly. Opening a blog post from the terminal creates a new window. The admin panel integrates naturally with the desktop environment.

---

## Future Enhancements

The desktop environment continues to evolve:

- [x] **Multi-monitor Support** — Virtual desktops and workspace switching
- [x] **Desktop Widgets** — Live data displays and interactive elements
- [x] **File System Simulation** — Browseable folder structure
- [ ] **Desktop Themes** — Customizable color schemes and wallpapers
- [ ] **Window Snapping** — Grid-based window positioning
- [ ] **Keyboard Shortcuts** — Full desktop-style hotkey support

---

## Technical Insights

### Performance Metrics

- **First Contentful Paint:** < 1.2s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

### Code Quality

- **TypeScript Coverage:** 100%
- **Component Architecture:** Fully modular and reusable
- **Bundle Size:** Optimized with tree-shaking and code splitting
- **Accessibility:** Full keyboard navigation and screen reader support

---

## Conclusion

Building this desktop-inspired web experience has been one of the most **challenging and rewarding** projects I've undertaken. It demonstrates:

- **Creative Problem-Solving** — Finding innovative solutions to complex UX challenges
- **Technical Excellence** — Building performant, maintainable code at scale
- **User Experience Focus** — Creating intuitive interactions that delight users
- **Modern Development Practices** — Leveraging cutting-edge tools and techniques

The result is a portfolio that doesn't just **show** my work—it **is** my work. Every interaction, every animation, every component showcases the attention to detail and technical expertise that I bring to all my projects.

Whether you're here to explore my background, check out my projects, or just experience something different, I hope this desktop environment demonstrates what's possible when **creativity meets technical skill**.

---

*Experience the full desktop interface by clicking the icons, opening multiple windows, and trying out the terminal commands. The code is open source and available on GitHub for those interested in the technical implementation.*

**Welcome to the desktop web! 🖥️**`,
      categoryId: categories[0].id, // Technology category
      tags: {
        create: [
          { tag: { connect: { id: tags[0].id } } }, // Next.js
          { tag: { connect: { id: tags[1].id } } }, // React
          { tag: { connect: { id: tags[2].id } } }, // TypeScript
          { tag: { connect: { id: tags[6].id } } }, // UI/UX
        ]
      }
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
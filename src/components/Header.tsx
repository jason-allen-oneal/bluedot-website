// src/components/Header.tsx
import Link from "next/link";
import { auth } from "@/lib/auth";
import { ThemeSwitch } from "./ThemeSwitch";

export default async function Header() {
  const session = await auth(); // ✅ SSR-safe
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-6">
        <Link href="/" className="font-semibold"><span className="text-blue-700">◎</span> BlueDot IT</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact" className="ml-auto">Contact</Link>
        <Link href="/resume">Resume</Link>

        {session ? (
          // v4 sign-out: POST to /api/auth/signout
          <form action="/api/auth/signout" method="post">
            <button className="rounded px-3 py-1 border border-white/20">Sign out</button>
          </form>
        ) : (
          // v4 sign-in: GET /api/auth/signin (or your custom /login)
          <Link href="/api/auth/signin" className="rounded px-3 py-1 border border-white/20">
            Sign in
          </Link>
        )}
        <ThemeSwitch />
      </nav>
    </header>
  );
}

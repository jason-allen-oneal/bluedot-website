// src/components/Header.tsx
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import ThemeSwitch from "./ThemeSwitch";

export default async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-accent/90 bg-secondary/20 text-base-content">
      <nav className="mx-auto max-w-6xl px-6 py-3 flex items-center gap-6">
        <Link href="/" className="font-semibold"><Image alt="logo" src="/bluedot-logo.png" width="48" height="48" /></Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/services">Services</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact" className="ml-auto">Contact</Link>
        <Link href="/resume">Resume</Link>

        {session ? (
          <form action="/api/auth/signout" method="post">
            <button className="rounded px-3 py-1 border border-base/20">Sign out</button>
          </form>
        ) : (
          // v4 sign-in: GET /api/auth/signin (or your custom /login)
          <Link href="/api/auth/signin" className="rounded px-3 py-1 border border-base/20">
            Sign in
          </Link>
        )}
        <ThemeSwitch />
      </nav>
    </header>
  );
}

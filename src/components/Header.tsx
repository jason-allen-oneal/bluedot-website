'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitch from '@/components/ThemeSwitch'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className={`absolute inset-0 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'}`} />
      <nav className="page-shell relative flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-colors group-hover:border-primary/50">
            <Image
              src="/bluedot-logo.png"
              alt="logo"
              fill
              className="object-contain p-2"
              sizes="48px"
            />
          </div>
          <div className="leading-none">
            <span className="block text-xl font-bold text-white tracking-tighter">BlueDot IT</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">Systems • Security</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-base-content/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-px h-4 bg-white/10" />
          <ThemeSwitch className="btn-ghost" />
          <Link
            href="/contact"
            className="px-6 py-2 bg-primary text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            Engagement
          </Link>
        </div>

        {/* Mobile menu toggle would go here */}
      </nav>
    </header>
  )
}

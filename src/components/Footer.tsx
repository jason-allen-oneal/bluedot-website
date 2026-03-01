'use client'
import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <section className="relative mt-20 border-t border-white/5 bg-black/40 text-base-content/60 backdrop-blur-xl">
      <div className="page-shell py-24 space-y-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4 group grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <div className="relative h-10 w-10 overflow-hidden rounded border border-white/10 bg-white/5">
                <Image
                  src="/bluedot-logo.png"
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tighter">BlueDot IT</span>
            </Link>
            <p className="max-w-md text-sm font-medium leading-relaxed">
              Engineering resilient systems and hardened security layers for organizations that require absolute stability. 
            </p>
            <div className="flex gap-6 items-center">
               <Link href="/api/auth/signin" className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-white transition-colors">
                  Reader Login
               </Link>
               <Link href="/api/auth/signin" className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-white transition-colors">
                  Admin
               </Link>
            </div>
          </div>

          <div className="grid gap-12 sm:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Navigation</h3>
              <ul className="grid grid-cols-2 gap-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
               <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Intelligence Updates</h3>
               <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
            © 2026 BlueDot IT • Hardened in North Carolina
          </p>
          <div className="flex gap-8">
             <Link href="/legal/privacy" className="text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Privacy</Link>
             <Link href="/legal/terms" className="text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

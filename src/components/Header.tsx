"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandMenu from "@/components/CommandMenu";
import ThemeToggle from "@/components/ThemeToggle";


const links = [
    { href: "/", label: "home()" },
    { href: "/projects", label: "view_projects()" },
    { href: "/about", label: "about_me()" },
    { href: "/contact", label: "access_contact()" },
    { href: "/auth", label: "authenticate()" }
];


export default function Header(){
    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/50 border-b border-neutral-800/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
                <Link href="/" className="font-mono text-sm tracking-wider text-bluedot-400">bluedot.it.com</Link>
                <nav className="hidden md:flex items-center gap-4 ml-4 text-sm">
                    {links.map(l => (
                        <Link key={l.href} href={l.href}
                              className={`hover:text-bluedot-400 ${pathname === l.href ? "text-bluedot-400" : "text-neutral-400"}`}>{l.label}</Link>
                    ))}
                </nav>
                <div className="ml-auto flex items-center gap-2">
                    <CommandMenu />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
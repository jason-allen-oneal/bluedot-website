import React from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'
import Providers from '@/components/Providers'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata:  Metadata = {
    title: {
        default: 'BlueDot IT | Jason O\'Neal - Cybersecurity & Development',
        template: '%s | BlueDot IT'
    },
    description: 'Expert in cybersecurity,  and full-stack development. Building secure, innovative solutions with TypeScript, Python, and modern web technologies.',
    metadataBase: new URL('https://bluedot.it.com'),
    keywords: ['cybersecurity', 'web development', 'AI', 'TypeScript', 'Python', 'security tools'],
    authors: [{ name: 'Jason O\'Neal' }],
    creator: 'Jason O\'Neal',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://bluedot.it.com',
        siteName: 'BlueDot IT',
        title: 'BlueDot IT | Jason O\'Neal',
        description: 'Expert in cybersecurity, AI-powered tooling, and full-stack development',
        images: [{
            url: '/bluedot-logo.png',
            width: 1200,
            height: 630,
            alt: 'BlueDot IT Logo'
        }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BlueDot IT | Jason O\'Neal',
        description: 'Expert in cybersecurity, AI-powered tooling, and full-stack development',
        images: ['/bluedot-logo.png'],
        // creator: '@yourhandle', // Add your Twitter handle
    }
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
            <html lang="en" data-theme="bluedot-aurora" suppressHydrationWarning>
                <body className="min-h-dvh flex flex-col">
                <Providers>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <GoogleAnalytics gaId="G-41SSBBDE6V" />
                </Providers>
                </body>
            </html>
    )
}

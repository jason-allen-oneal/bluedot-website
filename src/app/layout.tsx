import React from 'react'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'
import Providers from '@/components/Providers'
import { GoogleAnalytics } from '@next/third-parties/google'
import bgLight from "../../public/background-light.png"
import bgDark from "../../public/background-dark.png"


export const metadata: Metadata = {
    title: 'BlueDot IT',
    description: 'Engineer • Builder • Explorer',
    metadataBase: new URL('http://localhost:3000')
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const backgroundVars = {
        "--bg-light": `url(${bgLight.src})`,
        "--bg-dark": `url(${bgDark.src})`,
    } as React.CSSProperties

    return (
            <html lang="en" data-theme="forest" suppressHydrationWarning style={backgroundVars}>
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

import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Providers from "@/components/Providers";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jet = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
};

export const metadata = {
    metadataBase: new URL("https://bluedot.it.com"),
    title: {
        default: "bluedot.it.com - Jason O'Neal | Cybersecurity & Programming",
        template: "%s | bluedot.it.com"
    },
    description: "Jason O'Neal — Expert in cybersecurity, programming, and technology. Explore articles on security, development tutorials, and innovative projects.",
    keywords: ["cybersecurity", "programming", "web development", "security expert", "Jason O'Neal", "tech blog", "software engineering"],
    authors: [{ name: "Jason O'Neal" }],
    creator: "Jason O'Neal",
    publisher: "Jason O'Neal",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://bluedot.it.com",
        siteName: "bluedot.it.com",
        title: "bluedot.it.com - Jason O'Neal | Cybersecurity & Programming",
        description: "Expert in cybersecurity, programming, and technology. Explore articles on security, development tutorials, and innovative projects.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "bluedot.it.com - Jason O'Neal",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "bluedot.it.com - Jason O'Neal | Cybersecurity & Programming",
        description: "Expert in cybersecurity, programming, and technology. Explore articles on security, development tutorials, and innovative projects.",
        images: ["/og-image.png"],
        creator: "@bluedotit",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
        yandex: "your-yandex-verification-code",
    },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Jason O'Neal",
        "url": "https://bluedot.it.com",
        "jobTitle": "Cybersecurity Expert & Software Developer",
        "description": "Expert in cybersecurity, programming, and technology",
        "sameAs": [
            "https://github.com/jason-allen-oneal",
            "https://linkedin.com/in/jason-oneal",
            "https://twitter.com/bluedotit"
        ],
        "knowsAbout": ["Cybersecurity", "Web Development", "Programming", "Software Engineering"]
    };

    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </head>
        <body className={`${inter.variable} ${jet.variable} font-sans min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Providers>
                <div className="relative min-h-screen min-h-0">
                    <main className="flex-1 min-h-0">{children}</main>
                </div>
            </Providers>
        </ThemeProvider>
        </body>
        </html>
    );
}
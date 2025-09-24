import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NeonGrid from "@/components/NeonGrid";
import BlueDotField from "@/components/BlueDotField";
import Providers from "@/components/Providers";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jet = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });


export const metadata = {
    title: "bluedot.it.com",
    description: "Jason O'Neal — cybersecurity, programming, and fun.",
    metadataBase: new URL("https://bluedot.it.com"),
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${jet.variable} font-sans min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Providers>
                {/* Stacked tech backgrounds */}
                <NeonGrid />
                <BlueDotField />
                <div className="relative min-h-screen min-h-0 flex flex-col">
                    <Header />
                    <div className="flex-1 min-h-0 bg-black/80 text-neutral-300">
                        <main className="flex-1 min-h-0 container mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
                    </div>
                    <Footer />
                </div>
            </Providers>
        </ThemeProvider>
        </body>
        </html>
    );
}
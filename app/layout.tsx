import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { absoluteUrl, cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
    src: "../assets/fonts/CalSans-SemiBold.woff2",
    variable: "--font-heading",
})

interface RootLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        "Pixel Art",
        "AI",
        "Pixel Art AI Generation",
        "Pixels",
        "AI generated",
    ],
    authors: [
        {
            name: "Ty Harlacker",
            url: "https://tyhar.dev",
        },
    ],
    creator: "Ty Harlacker",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [`${siteConfig.url}/pixelfy-og.png`],
        creator: "@dparksdev",
    },
    icons: {
        icon: "/favicon.png",
        shortcut: "/favicon.png",
        apple: "/favicon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                    fontHeading.variable
                )}
            >
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8869788898421299"
                    crossOrigin="anonymous"
                    strategy="beforeInteractive"
                />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {/* <div className="w-full flex justify-center items-center py-2 px-4 text-center bg-primary-foreground">
                        <span className="text-sm">
                            🎉 Limited time Memorial Day special! Enter code{" "}
                            <strong>MEMORIALDAY</strong> for 50% off platform
                            credits.
                        </span>
                    </div> */}
                    {children}
                    <Analytics />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}

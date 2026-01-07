import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui-own/theme-provider"
import { Inter, Noto_Sans_JP } from "next/font/google"


import '../globals.css';
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'] })
const notosansjp = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "ぶんさんPay",
    description: "JPYCを活用した日本のブロックチェーン決済や利用を促進するためのwebアプリ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" suppressHydrationWarning >
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="JPYCを活用した日本のブロックチェーン決済や利用を促進するためのwebアプリ" />
                <meta name="theme-color" content="#000000" />
                <meta name="msapplication-TileColor" content="#000000" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
                <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={cn(inter.className, notosansjp.className)}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

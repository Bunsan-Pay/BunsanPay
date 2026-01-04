import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui-own/theme-provider"
import { Inter, Noto_Sans_JP } from "next/font/google"


import './globals.css';
import ContextProvider from '@/context'
import JpycAddressProvider from "@/context/jpyc-address";
import { ResponsiveAppKitTheme } from "@/components/wallet/ResponsiveAppKitTheme";
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
          <ContextProvider>
            <ResponsiveAppKitTheme />
            <JpycAddressProvider>
              {children}
            </JpycAddressProvider>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

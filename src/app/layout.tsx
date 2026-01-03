import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"


import './globals.css';
import ContextProvider from '@/context'
import JpycAddressProvider from "@/context/jpyc-address";

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
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider>
            <JpycAddressProvider>
              {children}
            </JpycAddressProvider>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useCurrentTheme = () => {
    const { theme } = useTheme()
    const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>("light")
    React.useEffect(() => {
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"
            setCurrentTheme(systemTheme)
        }
        if (theme === "light") {
            setCurrentTheme("light")
        }
        if (theme === "dark") {
            setCurrentTheme("dark")
        }
    }, [theme])
    return currentTheme
}
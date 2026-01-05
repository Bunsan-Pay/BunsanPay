'use client'
import { useEffect } from 'react'
import { useCurrentTheme } from '../ui-own/theme-provider'
import { useAppKitTheme } from '@reown/appkit/react'

export const ResponsiveAppKitTheme = () => {
    const theme = useCurrentTheme()
    const { setThemeMode } = useAppKitTheme()
    useEffect(() => {
        setThemeMode(theme)
    }, [theme, setThemeMode])
    return null
}
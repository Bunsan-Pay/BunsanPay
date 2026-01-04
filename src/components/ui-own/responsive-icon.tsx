'use client'
import Image from 'next/image'
import { useCurrentTheme } from './theme-provider'

type ResponsiveIconProps = {
    light: string
    dark: string
    width?: number
    height?: number
}

export const ResponsiveIcon = ({ light, dark, width = 24, height = 24 }: ResponsiveIconProps) => {
    const theme = useCurrentTheme()
    return (
        <>
            {theme === 'dark' ? <Image src={dark} alt="Icon" width={width} height={height} /> : <Image src={light} alt="Icon" width={width} height={height} />}
        </>
    )
}
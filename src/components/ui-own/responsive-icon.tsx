'use client'
import Image from 'next/image'
import { useCurrentTheme } from './theme-provider'

type ResponsiveIconProps = {
    light: string
    dark: string
    className?: string
    width?: number
    height?: number
}

export const ResponsiveIcon = ({ light, dark, className, width = 24, height = 24 }: ResponsiveIconProps) => {
    const theme = useCurrentTheme()
    return (
        <>
            {theme === 'dark' ? <Image src={dark} alt="Icon" width={width} height={height} className={className} /> : <Image src={light} alt="Icon" width={width} height={height} className={className} />}
        </>
    )
}
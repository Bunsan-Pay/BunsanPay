import { Separator } from '@/components/ui/separator'

import Logo from '@/components/ui-own/logo'
import { ResponsiveIcon } from '../ui-own/responsive-icon'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
                <Link href='/'>
                    <div className='flex items-center gap-3'>
                        <Logo className='gap-3' />
                    </div>
                </Link>

                <div className='flex items-center gap-5 whitespace-nowrap text-xs sm:text-sm md:text-base'>
                    <Link href="/about" className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        About
                    </Link>
                    <Link href="/terms" className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        Terms
                    </Link>
                    <Link href="/privacy-policy" className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        Privacy Policy
                    </Link>
                    <Link href="/sctl" className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        特定商取引法に基づく表記
                    </Link>
                </div>

                <div className='flex items-center gap-4'>
                    <a href='#'>
                        <ResponsiveIcon light='/github/github-mark.svg' dark='/github/github-mark-white.svg' />
                    </a>
                </div>
            </div>

            <Separator />

            <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
                <p className='text-center text-xs text-muted-foreground font-semibold text-balance px-2 py-2'>
                    {`© ${new Date().getFullYear()}`}{' '}
                    <Link href='/' className='hover:underline'>
                        ぶんさんPay
                    </Link>. All Rights Reserved
                </p>
                <p className='text-center text-xs text-muted-foreground font-semibold text-balance px-2 py-2'>
                    Portions © 2025 Reown, Inc. All Rights Reserved <a href='https://github.com/reown-com/appkit/blob/main/LICENSE.md' className='hover:underline font-normal opacity-80 transition-opacity duration-300 hover:opacity-100'>LICENSE</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer

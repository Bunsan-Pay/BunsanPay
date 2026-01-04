import { Separator } from '@/components/ui/separator'

import Logo from '@/components/ui-own/logo'
import { ResponsiveIcon } from '../ui-own/responsive-icon'

const Footer = () => {
    return (
        <footer>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
                <a href='#'>
                    <div className='flex items-center gap-3'>
                        <Logo className='gap-3' />
                    </div>
                </a>

                <div className='flex items-center gap-5 whitespace-nowrap'>
                    <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        About
                    </a>
                    <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        Features
                    </a>
                    <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        Works
                    </a>
                    <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        Career
                    </a>
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
                    <a href='#' className='hover:underline'>
                        ぶんさんPay
                    </a>. All Rights Reserved
                </p>
                <p className='text-center text-xs text-muted-foreground font-semibold text-balance px-2 py-2'>
                    Portions © 2025 Reown, Inc. All Rights Reserved <a href='https://github.com/reown-com/appkit/blob/main/LICENSE.md' className='hover:underline font-normal opacity-80 transition-opacity duration-300 hover:opacity-100'>LICENSE</a>
                </p>
            </div>
        </footer>
    )
}

export default Footer

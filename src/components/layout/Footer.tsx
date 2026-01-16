import { Separator } from '@/components/ui/separator'

import Logo from '@/components/ui-own/logo'
import { ResponsiveIcon } from '../ui-own/responsive-icon'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='flex flex-col'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
                <Link href='/'>
                    <div className='flex items-center gap-3'>
                        <Logo className='gap-3' />
                    </div>
                </Link>

                <div className='flex flex-wrap justify-center items-center gap-5 whitespace-nowrap text-xs sm:text-sm md:text-base'>
                    <a href="/about" className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        About
                    </a>
                    <a href="/terms" className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        Terms
                    </a>
                    <a href="/privacy-policy" className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        Privacy Policy
                    </a>
                    <a href="/sctl" className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                        特定商取引法に基づく表記
                    </a>
                </div>

                <div className='flex items-center gap-4'>
                    <a href='https://github.com/Bunsan-Pay' target='_blank' rel='noopener noreferrer'>
                        <ResponsiveIcon light='/github/github-mark.svg' dark='/github/github-mark-white.svg' />
                    </a>
                </div>
            </div>

            <Separator />

            <p className='text-start w-fit self-center text-xs text-muted-foreground font-semibold text-wrap px-6 py-4'>
                ※ 本サービス（コンテンツ・作品等）はJPYC株式会社による公式コンテンツではありません。<br />
                ※ 「JPYC」はJPYC株式会社の提供するステーブルコインです。<br />
                ※ JPYC及びJPYCロゴは、JPYC株式会社の登録商標です。
            </p>

            <div className='mx-auto flex max-w-7xl justify-center px-4 sm:px-6'>
                <p className='text-center text-xs text-muted-foreground font-semibold text-balance px-2 py-2'>
                    {`© ${new Date().getFullYear()}`}{' '}
                    <Link href='/' className='hover:underline'>
                        ぶんさんPay
                    </Link>. — <a href='https://github.com/Bunsan-Pay/BunsanPay/blob/main/LICENSE' target='_blank' className='hover:underline font-normal opacity-80 transition-opacity duration-300 hover:opacity-100'>MIT License</a>
                </p>
                <p className='text-center text-xs text-muted-foreground font-semibold text-balance px-2 py-2'>
                    Portions © 2025 Reown, Inc. All Rights Reserved
                </p>
            </div>
            <a href='/license' target='_blank' className='self-center text-center text-xs text-muted-foreground text-balance px-2 pt-2 pb-8 hover:underline font-normal opacity-80 transition-opacity duration-300 hover:opacity-100'>LICENSE</a>
        </footer>
    )
}

export default Footer

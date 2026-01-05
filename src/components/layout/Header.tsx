import { ModeToggle } from '@/components/ui-own/color-mode-toggle'
import { ConnectButton } from '@/components/wallet/ConnectButton'
import { ResponsiveIcon } from '../ui-own/responsive-icon'
import Link from 'next/link'

export const Header = () => {
    return (
        <header className="flex items-center justify-between">
            <Link href='/' className="flex items-center p-4 gap-2.5">
                <ResponsiveIcon light='/logo-light.svg' dark='/logo-dark.svg' width={32} height={32} />
                <h1 className="md:text-2xl hidden sm:block font-bold">ぶんさんPay</h1>
            </Link>
            <div className="flex items-center p-4">
                <div className="mr-2">
                    <ModeToggle />
                </div>
                <ConnectButton />
            </div>
        </header>
    )
}

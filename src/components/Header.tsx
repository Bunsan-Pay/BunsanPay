import { ModeToggle } from '@/components/color-mode-toggle'
import { ConnectButton } from '@/components/ConnectButton'

export const Header = () => {
    return (
        <header className="flex items-center justify-between">
            <h1 className="md:text-2xl sm:text-xl font-bold p-4">ぶんさんPay</h1>
            <div className="flex items-center p-4">
                <div className="mr-2">
                    <ModeToggle />
                </div>
                <ConnectButton />
            </div>
        </header>
    )
}

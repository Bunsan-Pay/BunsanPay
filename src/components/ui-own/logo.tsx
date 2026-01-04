import Image from 'next/image'
// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center gap-2.5', className)}>
            <Image src='/reown.svg' alt='Logo' width={32} height={32} />
            <span className='text-xl font-semibold'>ぶんさんPay</span>
        </div>
    )
}

export default Logo

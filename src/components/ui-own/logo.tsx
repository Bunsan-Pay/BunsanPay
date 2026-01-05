// Util Imports
import { cn } from '@/lib/utils'
import { ResponsiveIcon } from './responsive-icon'

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center gap-2.5', className)}>
            <ResponsiveIcon light='/logo-light.svg' dark='/logo-dark.svg' width={32} height={32} />
            <span className='text-xl font-semibold'>ぶんさんPay</span>
        </div>
    )
}

export default Logo

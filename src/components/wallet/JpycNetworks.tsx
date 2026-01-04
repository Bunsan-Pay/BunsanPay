'use client'

import { AppKitNetworkButton } from "@reown/appkit/react"
import { useJpycAddress } from "@/context/jpyc-address"

export const JpycNetworks = () => {
    const jpycAddress = useJpycAddress()
    return (
        <div className="flex flex-col self-end">
            <AppKitNetworkButton className="self-end" />
            <p className="text-xs text-muted-foreground font-semibold self-end">JPYC contract address</p>
            <p className="text-xs text-muted-foreground font-semibold self-end">{jpycAddress}</p>
        </div>
    )
}

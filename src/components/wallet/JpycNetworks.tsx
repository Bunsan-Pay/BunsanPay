'use client'

import { AppKitNetworkButton } from "@reown/appkit/react"
import { useJpycAddress } from "@/context/jpyc-address"
import { CopyButton } from "../ui-own/clipboard"

export const JpycNetworks = () => {
    const jpycAddress = useJpycAddress()
    return (
        <div className="flex flex-col self-end">
            <AppKitNetworkButton className="self-end" />
            <p className="text-xs text-muted-foreground font-semibold self-end">JPYC contract address</p>
            <CopyButton copyText={jpycAddress} className="text-xs text-muted-foreground font-semibold self-end" />
        </div>
    )
}

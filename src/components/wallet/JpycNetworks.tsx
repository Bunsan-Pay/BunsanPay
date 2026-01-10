'use client'

import { AppKitNetworkButton } from "@reown/appkit/react"
import { CopyButton } from "../ui-own/clipboard"
import { JpycNetworkGuard } from "@/lib/JpycAddress"
import { useAppKitNetwork } from "@reown/appkit/react"
import { useState, useEffect } from "react"

export const JpycNetworks = () => {
    const { caipNetworkId } = useAppKitNetwork()
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true) }, []);
    return (
        <div className="flex flex-col self-end">
            <AppKitNetworkButton className="self-end" />
            <p className="text-xs text-muted-foreground font-semibold self-end">JPYC contract address</p>
            <CopyButton copyText={mounted ? JpycNetworkGuard(caipNetworkId) : JpycNetworkGuard(undefined)} className="text-xs text-muted-foreground font-semibold self-end" />
        </div>
    )
}

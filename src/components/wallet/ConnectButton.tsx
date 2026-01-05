'use client'

import { useAppKit, useAppKitNetwork } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Wallet, UserRoundCheck } from "lucide-react"

export function ConnectButton() {
  const { open, close } = useAppKit()
  const { isConnected, address } = useAppKitAccount()
  const { caipNetworkId } = useAppKitNetwork()
  const [shrinkAddress, setShrinkAddress] = useState(address)
  useEffect(() => {
    close()
  }, [caipNetworkId, close])
  useEffect(() => {
    if (address) {
      setShrinkAddress(address.slice(0, 6) + "..." + address.slice(-4))
    }
  }, [address])
  if (!isConnected) {
    return (
      <Button variant="outline" size="sm" onClick={() => open()}>
        <Wallet /> Connect
      </Button>
    )
  } else {
    return (
      <Button variant="outline" size="sm" className="w-fit text-xs" onClick={() => open()}>
        <UserRoundCheck /> {shrinkAddress}
      </Button>
    )
  }
}
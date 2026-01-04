'use client'

import { useBalance, useReadContract } from "wagmi"
import { useAppKitAccount } from "@reown/appkit/react"
import { useCallback } from "react"
import { erc20Abi, formatUnits } from "viem"
import { useJpycAddress } from "@/context/jpyc-address"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const WalletInfo = () => {
    const { address, isConnected } = useAppKitAccount()
    const jpycAddress = useJpycAddress()

    const { data: nativeBalance } = useBalance({
        address: address as `0x${string}`,
        query: {
            enabled: !!address
        }
    })
    const { data: jpycBalance } = useReadContract({
        abi: erc20Abi,
        address: jpycAddress,
        functionName: 'balanceOf',
        args: address ? [address as `0x${string}`] : undefined,
        query: {
            enabled: !!address
        }
    })
    const formatNativeBalance = useCallback(() => {
        if (!nativeBalance) return
        return formatUnits(nativeBalance.value, nativeBalance.decimals)
    }, [nativeBalance])
    const formatJPYCBalance = useCallback(() => {
        if (!jpycBalance) return 0
        return formatUnits(jpycBalance, 18)
    }, [jpycBalance])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Wallet Info</CardTitle>
                <CardDescription>Wallet information</CardDescription>
            </CardHeader>
            <CardContent>
                {(nativeBalance !== undefined) && (
                    <p>Gasトークン保有額: {formatNativeBalance()} {nativeBalance.symbol}</p>
                )}
                {(jpycBalance !== undefined) && (
                    <p>JPYC保有額: {formatJPYCBalance()} JPYC</p>
                )}
                {!isConnected && (
                    <p>ウォレット接続していません</p>
                )}
            </CardContent>
        </Card>
    )
}
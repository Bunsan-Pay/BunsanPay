'use client'

import { useBalance, useReadContract } from "wagmi"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { useCallback } from "react"
import { erc20Abi, formatUnits } from "viem"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Fuel, CircleQuestionMark } from "lucide-react"
import { ResponsiveIcon } from "@/components/ui-own/responsive-icon"
import { JpycNetworkGuard } from "@/lib/JpycAddress"

export const WalletInfo = () => {
    const { address, isConnected } = useAppKitAccount()
    const { caipNetworkId } = useAppKitNetwork()

    const { data: nativeBalance, refetch: refetchNativeBalance } = useBalance({
        address: address as `0x${string}`,
        query: {
            enabled: !!address
        }
    })
    const { data: jpycBalance, refetch: refetchJPYCBalance } = useReadContract({
        abi: erc20Abi,
        address: JpycNetworkGuard(caipNetworkId),
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
        <>
            {isConnected && (
                <Card className="w-full">
                    <Button onClick={() => {
                        refetchNativeBalance()
                        refetchJPYCBalance()
                    }} variant="outline" className="w-fit ml-6">更新</Button>
                    <CardHeader>
                        <CardTitle>残高情報</CardTitle>
                        <CardDescription>Gasトークン<br />JPYC</CardDescription>
                        <CardAction>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="text-xs text-muted-foreground">
                                        <CircleQuestionMark />Gasトークンとは
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="p-0 sm:max-w-lg gap-0">
                                    <DialogHeader className="sticky top-0 z-10 border-b bg-background px-6 pt-4 pb-4 mt-2">
                                        <DialogTitle className="flex gap-2"><Fuel />Gasトークンとは</DialogTitle>
                                    </DialogHeader>
                                    <ScrollArea className="h-[250px] px-6">
                                        <div className="space-y-2 pt-2">
                                            <h3 className="text-md font-semibold">Gasとは</h3>
                                            <p className="text-sm">ネットワークに取引を承認してもらうための手数料のことです。</p>
                                            <p className="text-sm">基本料金と優先手数料があり、優先手数料が高いほど取引が早く確実に承認されます。</p>
                                            <p className="text-sm">基本料金はネットワークによって異なり、優先手数料は取引のサイズによって異なります。</p>
                                        </div>
                                        <div className="space-y-2 pb-4">
                                            <h3 className="text-md font-semibold">Gasトークンとは</h3>
                                            <p className="text-sm">Gas代を支払うために使われるネットワーク固有のトークンで、ネイティブトークンとも呼びます。</p>
                                            <p className="text-sm">ethereumはETH、polygonはPOL、avalancheはAVAXなどです。</p>
                                            <p className="text-sm">原則として、他のネットワークのコインでGasを支払うことはできません。</p>
                                            <h4 className="text-md font-semibold">⚠️注意⚠️</h4>
                                            <p className="text-sm">L2(最終的にethereumのスマートコントラクトに記録する)ネットワークでは、<b>ethereum mainnet上にも同名のトークンが存在する可能性があります</b>。</p>
                                            <p className="text-sm">しかし、これらのトークンは<b>L2ネットワークでGasとして利用できません</b>。Gasトークン調達時には<b>ネットワークをよく確認してください</b>。</p>
                                            <p className="text-sm italic">例: ethereum上のPOL(polygon ecosystem token)は、polygonネットワーク上では利用できません。</p>
                                        </div>
                                    </ScrollArea>
                                </DialogContent>
                            </Dialog>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {(nativeBalance !== undefined) && (
                            <div className="flex items-center">
                                <Fuel className="mr-2" />
                                <p>{formatNativeBalance()} {nativeBalance.symbol}</p>
                            </div>
                        )}
                        {(jpycBalance !== undefined) && (
                            <div className="flex items-center">
                                <ResponsiveIcon className="mr-3" dark="/jpyc/jpyc_logo_symbol_mono-reverse.svg" light="/jpyc/jpyc_logo_symbol_color.svg" width={20} height={20} />
                                <p>{formatJPYCBalance()} JPYC</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </>
    )
}
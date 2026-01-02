import { useEffect, useState, FC, ReactElement } from "react"
import { JPYCAddress as mainJPYCAddress, sepoliaJPYCAddress } from "../config"
import { AppKitNetworkButton, useAppKitNetwork } from "@reown/appkit/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
    renderItem: (props: { jpycAddress: `0x${string}` }) => ReactElement
}
export const JPYCApps: FC<Props> = ({ renderItem }) => {
    const [jpycAddress, setJpycAddress] = useState<`0x${string}`>(mainJPYCAddress)
    const { caipNetworkId } = useAppKitNetwork()
    useEffect(() => {
        if (caipNetworkId === 'eip155:11155111') {
            setJpycAddress(sepoliaJPYCAddress)
        } else {
            setJpycAddress(mainJPYCAddress)
        }
    }, [caipNetworkId])

    return (
        <Tabs defaultValue="home" className="px-4 pt-4 min-w-0">
            <AppKitNetworkButton className="self-end" />
            <div className="flex flex-col self-end">
                <p className="text-xs text-muted-foreground font-semibold self-end">JPYC contract address</p>
                <p className="text-xs text-muted-foreground font-semibold self-end">{jpycAddress}</p>
            </div>
            <TabsList className="self-center">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="receiveHistory">JPYC受取履歴</TabsTrigger>
            </TabsList>
            <TabsContent value="home" className="self-center">Home</TabsContent>
            <TabsContent value="receiveHistory" forceMount={true}>{renderItem({ jpycAddress })}</TabsContent>
        </Tabs>
    )
}
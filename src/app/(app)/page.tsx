'use client'
// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { TabModule } from "@/components/ui-own/TabModule";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { JpycNetworks } from "@/components/wallet/JpycNetworks";
import { PageScaffold } from "@/components/layout/scaffold";
import dynamic from "next/dynamic";
import { useAppKitAccount } from "@reown/appkit/react";
import { WalletInfo } from "@/components/wallet/apps/WalletInfo";

export default function Home() {
  const { isConnected } = useAppKitAccount()
  const TransferEventList = dynamic(async () => {
    const { TransferEventList } = await import("@/components/wallet/apps/TransferEventList")
    return { default: TransferEventList }
  }, { ssr: false })
  return (
    <PageScaffold>
      <JpycNetworks />
      <TabModule
        defaultValue="balance"
        triggers={
          <>
            <TabsTrigger value="balance">残高</TabsTrigger>
            <TabsTrigger value="receiveHistory">受取履歴</TabsTrigger>
          </>
        }
        contents={
          <>
            <TabsContent forceMount={true} className="w-full flex justify-center" value="balance">
              <WalletInfo />
            </TabsContent>
            <TabsContent forceMount={true} className="w-full self-stretch min-w-0" value="receiveHistory">
              <TransferEventList />
            </TabsContent>
          </>
        }
      />
      {!isConnected && (
        <div className="w-full flex justify-center">
          <p>ウォレットに接続してください。</p>
        </div>
      )}
    </PageScaffold>
  );
}
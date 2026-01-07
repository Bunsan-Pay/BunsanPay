'use client'
// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { TabModule } from "@/components/ui-own/TabModule";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { JpycNetworks } from "@/components/wallet/JpycNetworks";
import { TransferEventList } from "@/components/wallet/apps/TransferEventList";
import { WalletInfo } from "@/components/wallet/apps/WalletInfo";
import { PageScaffold } from "@/components/layout/scaffold";

export default function Home() {
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
    </PageScaffold>
  );
}
'use client'
// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { TabModule } from "@/components/ui-own/TabModule";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { JpycNetworks } from "@/components/wallet/JpycNetworks";
import { TransferEventList } from "@/components/wallet/apps/TransferEventList";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WalletInfo } from "@/components/wallet/apps/WalletInfo";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="p-4 min-w-0">
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
      </main>
      <Footer />
    </div>
  );
}
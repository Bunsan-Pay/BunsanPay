'use client'
// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { TabModule } from "@/components/TabModule";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { JpycNetworks } from "@/components/JpycNetworks";
import { TransferEventList } from "@/components/TransferEventList";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="p-4 min-w-0">
        <JpycNetworks />
        <TabModule
          defaultValue="home"
          triggers={
            <>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="receiveHistory">受取履歴</TabsTrigger>
            </>
          }
          contents={
            <>
              <TabsContent value="home">Home</TabsContent>
              <TabsContent forceMount={true} value="receiveHistory">
                <TransferEventList />
              </TabsContent>
            </>
          }
        />
      </main>
    </div>
  );
}
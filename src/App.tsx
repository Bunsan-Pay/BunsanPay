import { createAppKit } from '@reown/appkit/react'
import { useCallback } from 'react'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { projectId, metadata, networks, wagmiAdapter } from './config'

import "./styles/globals.css"
import { ThemeProvider } from './components/theme-provider'
import { TransferEventList } from './components/TransferEventList'
import { JPYCApps } from './components/JPYCApps'
import { Header } from '@/components/Header'

const queryClient = new QueryClient()

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'dark' as const,
  themeVariables: {
    '--w3m-accent': '#000000',
  }
}

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  featuredWalletIds: [
    '38633830ef578a1249c345848a8d6487551a346b923d21ce197ea57f423f3113',
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'
  ],
  termsConditionsUrl: 'https://github.com/reown-com/appkit/blob/main/LICENSE.md',
  privacyPolicyUrl: 'https://www.yourwebsite.com/privacy',
  features: {
    connectMethodsOrder: ['wallet', 'social', 'email'],
    legalCheckbox: true,
    swaps: false,
    onramp: false,
    send: false,
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function App() {
  return (
    <ThemeProvider>
      <div className={"pages min-h-screen grid grid-rows-[auto_1fr_auto]"}>
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <JPYCApps renderItem={useCallback(
              (props: { jpycAddress: `0x${string}` }) => {
                return (
                  <>
                    <TransferEventList {...props} />
                  </>
                )
              }, []
            )} />
          </QueryClientProvider>
        </WagmiProvider>


        <footer className="bg-neutral-primary-soft rounded-base shadow-xs border border-default m-4">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-body sm:text-center pr-2">© 2025 VinoVolare. All Rights Reserved.
            </span>
            <span className="text-sm text-body sm:text-center">Portions © 2025 Reown, Inc. All Rights Reserved. <a href="https://github.com/reown-com/appkit/blob/main/LICENSE.md" className='hover:underline'>LICENSE</a>
            </span>
          </div>
        </footer>

      </div>
    </ThemeProvider>
  )
}

export default App

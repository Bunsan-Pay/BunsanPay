'use client'

import { wagmiAdapter, projectId, networks } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

// Set up metadata
const metadata = {
  name: 'bunsan-pay',
  description: 'bunsan-pay',
  url: 'https://vino-volare.github.io/bunsan-pay', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'light',
  featuredWalletIds: [
    '38633830ef578a1249c345848a8d6487551a346b923d21ce197ea57f423f3113',
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'
  ],
  features: {
    connectMethodsOrder: ["wallet", "social", "email"],
    swaps: false,
    onramp: false,
    send: false,
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
    "--apkt-font-family": "Inter"
  }
})

function ContextProvider({ children }: { children: ReactNode }) {

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider

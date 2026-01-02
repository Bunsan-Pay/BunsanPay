import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, avalanche, sepolia } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'

// Get projectId from https://dashboard.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID// || "b56e18d47c72ab683b10814fe9495694" // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const metadata = {
  name: 'ぶんさんPay',
  description: 'ぶんさんPay',
  url: 'https://reown.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [mainnet, polygon, avalanche, sepolia] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

export const config = wagmiAdapter.wagmiConfig

export const JPYCAddress = "0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29"
export const sepoliaJPYCAddress = "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB"
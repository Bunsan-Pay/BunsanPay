'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { CaipNetworkId, useAppKitNetwork } from "@reown/appkit/react";

const jpycAddress = '0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29'
const sepoliaJpycAddress = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB'

const JpycAddressContext = createContext<`0x${string}`>(jpycAddress)

export default function JpycAddressProvider({ children }: { children: React.ReactNode }) {
    const [address, setAddress] = useState<`0x${string}`>(jpycAddress)
    const { caipNetworkId } = useAppKitNetwork()

    const changeAddress = useCallback((chainId: CaipNetworkId | undefined) => {
        if (chainId === 'eip155:11155111') {
            setAddress(sepoliaJpycAddress)
        } else {
            setAddress(jpycAddress)
        }
    }, [])

    useEffect(() => {
        changeAddress(caipNetworkId)
    }, [caipNetworkId])

    return (
        <JpycAddressContext value={address}>
            {children}
        </JpycAddressContext>
    )
}

export const useJpycAddress = () => useContext(JpycAddressContext)
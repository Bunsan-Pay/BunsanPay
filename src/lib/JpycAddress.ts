import { CaipNetworkId } from "@reown/appkit/react"

const jpycAddress = '0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29'
const sepoliaJpycAddress = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB'

export const JpycNetworkGuard = (network: CaipNetworkId | undefined) => {
    switch (network) {
        case 'eip155:11155111':
            return sepoliaJpycAddress
        default:
            return jpycAddress
    }
}
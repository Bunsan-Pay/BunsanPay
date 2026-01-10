import { JpycTransferParams, JpycTransferResult } from "./ApiParams";

const reqBody: JpycTransferParams = {
    toAddress: '0x53CC570738e8057469567f86d46208DB4Cf023D1',
    contractAddresses: ['0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB'],
    order: 'desc'
}

const response = await fetch(`http://localhost:8787/api/getJPYCTransfer/eth-sepolia`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)
})

if (!response.ok) {
    const errorText = await response.text()
    console.error(`Error: ${response.status} ${response.statusText}`, errorText)
} else {
    const data = await response.json() as JpycTransferResult
    console.log(data)
}
import { Hono } from "hono"
import { env } from "hono/adapter"
import { HTTPException } from "hono/http-exception"
import { AlchemyGetAssetTransfersParams, AlchemyGetAssetTransfersResult1 } from "./AlchemyApi"
import { JpycTransferParams, JpycTransferResult } from "./ApiParams"

type ApiEnv = {
    ALCHEMY_API_KEY: string
    NEXT_PUBLIC_PROJECT_ID: string
}


const app = new Hono().basePath("/api")

const alchemy_base_url = (network: string) => `https://${network}.g.alchemy.com/v2/`

const networkGuard = (network: string) => {
    switch (network) {
        case 'eth-mainnet':
            return 'eth-mainnet'
        case 'eth-sepolia':
            return 'eth-sepolia'
        case 'polygon-mainnet':
            return 'polygon-mainnet'
        case 'avax-mainnet':
            return 'avax-mainnet'
        default:
            return null
    }
}


app.post("/getJPYCTransfer/:network", async (c) => {
    const { ALCHEMY_API_KEY } = env<ApiEnv>(c)
    if (!ALCHEMY_API_KEY) throw new HTTPException(500, { message: "ALCHEMY_API_KEY is not defined" })
    const network = networkGuard(c.req.param("network"))
    if (!network) throw new HTTPException(400, { message: "Invalid network" })

    const url = alchemy_base_url(network) + ALCHEMY_API_KEY

    const body: JpycTransferParams = await c.req.json()
    if (
        !body ||
        (!body.fromAddress && !body.toAddress) ||
        !body.contractAddresses
    ) throw new HTTPException(400, { message: "Missing required parameters in request body" })

    const requestBody: AlchemyGetAssetTransfersParams = {
        jsonrpc: "2.0",
        id: 2,
        method: "alchemy_getAssetTransfers",
        params: [
            {
                fromBlock: body.fromBlock,
                toBlock: body.toBlock,
                fromAddress: body.fromAddress,
                toAddress: body.toAddress,
                contractAddresses: body.contractAddresses,
                order: body.order,
                pageKey: body.pageKey,
                excludeZeroValue: true,
                category: ['erc20'],
                withMetadata: true
            }
        ]
    }

    console.log(requestBody.params[0])

    let apiResponse: Response
    try {
        apiResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
    } catch (cause) {
        throw new HTTPException(500, { message: "API response is not ok", cause })
    }
    const transfersResult: AlchemyGetAssetTransfersResult1 = await apiResponse.json()
    console.log(transfersResult)
    if (
        !transfersResult ||
        !transfersResult.result ||
        !transfersResult.result.transfers
    ) throw new HTTPException(404, { message: "Transfers data not found" })

    const response: JpycTransferResult = {
        pageKey: transfersResult.result.pageKey,
        transfers: transfersResult.result.transfers.map((transfer) => {
            return {
                blockNum: transfer.blockNum,
                from: transfer.from,
                to: transfer.to,
                value: transfer.value,
                asset: transfer.asset,
                uniqueId: transfer.uniqueId,
                hash: transfer.hash,
                rawContract: transfer.rawContract,
                metadata: transfer.metadata
            }
        })
    }
    return c.json(response)
})

export default app
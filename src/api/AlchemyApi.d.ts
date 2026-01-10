export type AlchemyGetAssetTransfersParams = {
    jsonrpc: "2.0"
    id: number
    method: "alchemy_getAssetTransfers"
    params: [
        {
            fromBlock?: string
            toBlock?: string
            fromAddress?: `0x${string}`
            toAddress?: `0x${string}`
            excludeZeroValue?: boolean
            category?: ('external' | 'internal' | 'erc20' | 'erc721' | 'erc1155' | 'specialnft')[],
            contractAddresses?: `0x${string}`[],
            order?: 'asc' | 'desc',
            withMetadata?: boolean,
            maxCount?: `0x${string}`,
            pageKey?: `0x${string}`
        }
    ]
}

export type AlchemyGetAssetTransfersResult1 = {
    jsonrpc: "2.0"
    id: number
    result: {
        pageKey: string | null,
        transfers: {
            category: ('external' | 'internal' | 'erc20' | 'erc721' | 'erc1155' | 'specialnft') | null,
            blockNum: `0x${string}` | null,
            from: `0x${string}` | null,
            to: `0x${string}` | null,
            value: number | null,
            erc721TokenId: string | null,
            erc1155Metadata: {
                tokenId: string | null,
                value: string | null
            }[] | null,
            tokenId: string | null,
            asset: string | null,
            uniqueId: string | null,
            hash: `0x${string}` | null,
            rawContract: {
                value: string | null,
                address: `0x${string}` | null,
                decimal: `0x${string}` | null
            } | null,
            metadata: {
                blockTimestamp: string | null,
            } | null
        }[] | null
    }
}
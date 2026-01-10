export type JpycTransferParams = {
    fromBlock?: string
    toBlock?: string
    fromAddress?: `0x${string}`
    toAddress?: `0x${string}`
    contractAddresses: `0x${string}`[],
    order?: 'asc' | 'desc',
    pageKey?: `0x${string}`
}

export type JpycTransferResult = {
    pageKey: string | null,
    transfers: {
        blockNum: `0x${string}` | null,
        from: `0x${string}` | null,
        to: `0x${string}` | null,
        value: number | null,
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
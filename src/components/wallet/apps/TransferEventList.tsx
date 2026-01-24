"use client"
import { usePublicClient } from "wagmi";
import { CaipNetworkId, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toHex, fromHex } from "viem";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui-own/clipboard";
import { JpycTransferParams, JpycTransferResult } from "@/api/ApiParams";
import { useInView } from 'react-intersection-observer'
import { JpycNetworkGuard } from "@/lib/JpycAddress";
import { Delete } from "lucide-react";

type Network = 'eth-mainnet' | 'eth-sepolia' | 'polygon-mainnet' | 'avax-mainnet'

const networkGuard = (network: CaipNetworkId | undefined): Network | null => {
    if (!network) return null
    switch (network) {
        case 'eip155:1':
            return 'eth-mainnet'
        case 'eip155:11155111':
            return 'eth-sepolia'
        case 'eip155:137':
            return 'polygon-mainnet'
        case 'eip155:43114':
            return 'avax-mainnet'
        default:
            return null
    }
}

type Event = {
    blockNumber: bigint,
    timestamp: number | string,
    from: `0x${string}`,
    to: `0x${string}`,
    txid: `0x${string}`,
    value: number
}

export const TransferEventList = () => {
    const [ref, inView] = useInView({ triggerOnce: true })
    const [events, setEvents] = useState<Event[]>([])
    const [fromAddress, setFromAddress] = useState<string>('')
    const { address } = useAppKitAccount()
    const { caipNetworkId } = useAppKitNetwork()
    const newestBlockNumberRef = useRef<bigint | null>(null)
    const oldestBlockNumberRef = useRef<bigint | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const publicClient = usePublicClient()
    const timePerBlockRef = useRef<bigint>(0n)

    const refresh = useCallback(() => {
        setEvents([])
        newestBlockNumberRef.current = null
        oldestBlockNumberRef.current = null
        timePerBlockRef.current = 0n
        setIsLoading(false)
        console.log("refreshed")
    }, [])
    useEffect(() => {
        refresh()
    }, [caipNetworkId, refresh])

    const estimateTimePerBlock = useCallback(async () => {
        if (!publicClient) return
        const currentBlock = await publicClient.getBlock()
        const sampleBlock = await publicClient.getBlock({
            blockNumber: currentBlock.number - 1000n
        })
        const timePerBlock = (currentBlock.timestamp - sampleBlock.timestamp) / 1000n
        timePerBlockRef.current = timePerBlock
    }, [publicClient])

    const getTransferEvents = useCallback(async (fromBlock: bigint, toBlock: bigint) => {
        setIsLoading(true)
        if (!publicClient) {
            setIsLoading(false)
            return
        }
        const network = networkGuard(caipNetworkId)
        if (!network) {
            setIsLoading(false)
            return
        }
        const reqBody: JpycTransferParams = {
            fromBlock: toHex(fromBlock),
            toBlock: toHex(toBlock),
            toAddress: address as `0x${string}`,
            contractAddresses: [JpycNetworkGuard(caipNetworkId) as `0x${string}`],
            order: 'desc'
        }
        console.log('fetching...')
        const response = await fetch(`/api/getJPYCTransfer/${network}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Error: ${response.status} ${response.statusText}`, errorText)
            setIsLoading(false)
            return
        } else {
            const data = await response.json() as JpycTransferResult
            console.log('fetched')
            console.log(data)
            const result: Event[] = []
            if (data.transfers) {
                for (let i = 0; i < data.transfers.length; i++) {
                    const element = data.transfers[i];
                    const blockNumber = fromHex(element.blockNum!, 'bigint')
                    const timestamp = element.metadata && element.metadata.blockTimestamp ? element.metadata.blockTimestamp : Number((await publicClient.getBlock({ blockNumber })).timestamp) * 1000
                    const res: Event = {
                        blockNumber,
                        timestamp,
                        from: element.from!,
                        to: element.to!,
                        txid: element.hash!,
                        value: element.value!
                    }
                    result.push(res)
                }
            }
            setIsLoading(false)
            return result
        }
    }, [publicClient, address, caipNetworkId])

    const calcFromBlock = useCallback((toBlock: bigint, days: number = 7) => {
        return toBlock - (BigInt(days * 24 * 60 * 60) / timePerBlockRef.current)
    }, [])

    const initBlockNumber = useCallback(async () => {
        if (publicClient && (!newestBlockNumberRef.current || !oldestBlockNumberRef.current)) {
            const blockNumber = await publicClient.getBlockNumber()
            console.log('blockNumber', blockNumber)
            newestBlockNumberRef.current = blockNumber
            oldestBlockNumberRef.current = blockNumber
        }
    }, [publicClient])

    const getOlderEvents = useCallback(async () => {
        if (!publicClient) return
        await initBlockNumber()
        console.log('getOlderEvents', oldestBlockNumberRef.current)
        if (!timePerBlockRef.current) {
            await estimateTimePerBlock()
        }
        const toBlock = oldestBlockNumberRef.current!
        const fromBlock = calcFromBlock(toBlock)
        oldestBlockNumberRef.current = fromBlock
        const events = await getTransferEvents(fromBlock, toBlock)
        if (!events) return
        setEvents((prev) => [...prev, ...events])
    }, [publicClient, calcFromBlock, getTransferEvents])

    const updateNewEvents = useCallback(async () => {
        if (!publicClient) return
        await initBlockNumber()
        const toBlock = await publicClient.getBlockNumber()
        if (!timePerBlockRef.current) {
            await estimateTimePerBlock()
        }
        const fromBlock = newestBlockNumberRef.current!
        newestBlockNumberRef.current = toBlock
        const events = await getTransferEvents(fromBlock, toBlock)
        if (!events) return
        setEvents((prev) => [...events, ...prev])
    }, [publicClient, getTransferEvents])

    useEffect(() => {
        if (publicClient && caipNetworkId && address && inView) {
            getOlderEvents()
        }
    }, [publicClient, caipNetworkId, address, inView])


    return (
        <>
            {publicClient && address && (
                <>
                    <div className="flex items-center gap-6">
                        <Button variant="outline" size="sm" onClick={updateNewEvents} className="self-start">更新</Button>
                        <form className="flex items-center gap-2">
                            <Input type="text" placeholder="送金元アドレス: 0x..." id="fromAddress" defaultValue={''} onChange={(e) => setFromAddress(e.target.value)} />
                            <Button variant="outline" onClick={() => setFromAddress('')} type="reset" size="sm"><Delete /></Button>
                        </form>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-25">金額</TableHead>
                                <TableHead>送金確定時刻</TableHead>
                                <TableHead>送金元アドレス</TableHead>
                                <TableHead>送金先アドレス</TableHead>
                                <TableHead>トランザクションID</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.filter(e => {
                                if (fromAddress === '') return true
                                return e.from.toLowerCase() === fromAddress.toLowerCase()
                            }).map(e => (
                                <TableRow key={e.txid}>
                                    <TableCell className="font-medium">{e.value} JPYC</TableCell>
                                    <TableCell>{new Date(e.timestamp).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <CopyButton copyText={e.from} />
                                    </TableCell>
                                    <TableCell>
                                        <CopyButton copyText={e.to} />
                                    </TableCell>
                                    <TableCell>
                                        <CopyButton copyText={e.txid} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex flex-col items-center">
                        <div ref={ref} className="w-full" />
                        {isLoading && (
                            <div>
                                <div className="p-4">
                                    <p>Loading...</p>
                                </div>
                            </div>
                        )}
                        {!isLoading && oldestBlockNumberRef.current && (
                            <div className="p-4">
                                <Button variant="outline" size="sm" onClick={getOlderEvents}>もっと見る</Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}
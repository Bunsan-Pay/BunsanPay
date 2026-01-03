"use client"
import { usePublicClient } from "wagmi";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { parseAbiItem, formatUnits } from "viem";
import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useJpycAddress } from "@/context/jpyc-address";


type Event = {
    blockNumber: bigint,
    timestamp: bigint,
    from: `0x${string}`,
    to: `0x${string}`,
    value: bigint
}


const chunkSize = 2000n

export const TransferEventList = () => {
    const [events, setEvents] = useState<Event[]>([])
    const jpycAddress = useJpycAddress()
    const { address } = useAppKitAccount()
    const { caipNetworkId } = useAppKitNetwork()
    const refreshed = useRef<boolean>(false)
    const lastBlockNumberRef = useRef<bigint>(0n)
    const nextBlockNumberRef = useRef<bigint>(0n)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isMore, setIsMore] = useState<boolean>(true)
    const publicClient = usePublicClient()
    const blockRange = useRef<bigint>(0n)
    const { ref, inView } = useInView()



    const estimateBlockRange = useCallback(async (days: bigint = 7n) => {
        if (!publicClient) return 0n
        const currentBlock = await publicClient.getBlock()
        const pastBlock = await publicClient.getBlock({
            blockNumber: currentBlock.number - 1000n
        })
        const deltaTime = currentBlock.timestamp - pastBlock.timestamp
        const deltaBlock = currentBlock.number - pastBlock.number
        return (deltaTime / deltaBlock) * (days * 24n * 60n * 60n)
    }, [publicClient])

    const fetch = useCallback(async () => {
        if (!publicClient) return
        setIsLoading(true)
        if (refreshed.current) {
            refreshed.current = false
            const currentBlockNumber = await publicClient.getBlockNumber()
            console.log(`fetched current block number: ${currentBlockNumber}`)
            nextBlockNumberRef.current = currentBlockNumber
            blockRange.current = await estimateBlockRange()
            lastBlockNumberRef.current = currentBlockNumber
        }

        console.log(`initialized block number: ${nextBlockNumberRef.current}`)

        if (lastBlockNumberRef.current - nextBlockNumberRef.current > blockRange.current!) {
            (true)
            setIsLoading(false)
            return
        }
        const fromBlockNumber = nextBlockNumberRef.current - chunkSize
        const toBlockNumber = nextBlockNumberRef.current
        nextBlockNumberRef.current = fromBlockNumber
        const logs = (await publicClient.getLogs({
            address: jpycAddress,
            event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
            args: {
                to: address as `0x${string}`
            },
            fromBlock: fromBlockNumber,
            toBlock: toBlockNumber,
            strict: true
        })).map(l => {
            if (!l.blockTimestamp) return null
            const data = {
                ...l.args,
                timestamp: l.blockTimestamp,
                blockNumber: l.blockNumber
            }
            console.log(data)
            return data
        }).filter(l => !!l).sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
        setEvents(prev => [...prev, ...logs])
        console.log(`updated block number: ${nextBlockNumberRef.current}`)
        setIsLoading(false)
    }, [publicClient, jpycAddress, address, estimateBlockRange])

    useEffect(() => {
        if (inView && !isLoading && isMore) {
            fetch()
        }
    }, [inView, isLoading, isMore, , fetch])

    const refresh = useCallback(() => {
        setEvents([])
        lastBlockNumberRef.current = 0n
        nextBlockNumberRef.current = 0n
        refreshed.current = true
        blockRange.current = 0n
        setIsLoading(false)
        setIsMore(true)
        console.log("refreshed")
    }, [caipNetworkId, publicClient, address])
    useEffect(() => {
        if (isMore) {
            setTimeout(() => {
                setIsMore(false)
            }, 5000)
        }
    }, [isMore])
    useEffect(() => {
        refresh()
    }, [caipNetworkId])
    return (
        <div>
            {(!publicClient || !address) && (
                <div>
                    <p>You must connect to a wallet</p>
                </div>
            )}
            {publicClient && address && (
                <>
                    <Button variant="outline" size="sm" onClick={() => refresh()}>Refresh</Button>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">金額</TableHead>
                                <TableHead>送金確定時刻</TableHead>
                                <TableHead>送金元アドレス</TableHead>
                                <TableHead>送金先アドレス</TableHead>
                                <TableHead>ブロックナンバー</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map(e => (
                                <TableRow key={e.blockNumber.toString()}>
                                    <TableCell className="font-medium">{formatUnits(e.value, 18)} JPYC</TableCell>
                                    <TableCell>{new Date(Number(e.timestamp) * 1000).toLocaleString()}</TableCell>
                                    <TableCell>{e.from}</TableCell>
                                    <TableCell>{e.to}</TableCell>
                                    <TableCell>{e.blockNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {isMore && (
                        <>
                            <div ref={ref} className="h-4 w-full" />
                            <div className="flex justify-center p-4">
                                <p>Loading...</p>
                            </div>
                        </>
                    )}
                    {!isMore && (
                        <div className="flex justify-center p-4">
                            <Button variant="outline" size="sm" onClick={() => { setIsMore(true) }}>More</Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
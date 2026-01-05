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
    const { ref, inView } = useInView()


    const fetch = useCallback(async () => {
        if (!publicClient) return
        setIsLoading(true)
        if (refreshed.current) {
            refreshed.current = false
            const currentBlockNumber = await publicClient.getBlockNumber()
            console.log(`fetched current block number: ${currentBlockNumber}`)
            nextBlockNumberRef.current = currentBlockNumber
            lastBlockNumberRef.current = currentBlockNumber
        }

        console.log(`initialized block number: ${nextBlockNumberRef.current}`)

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
    }, [publicClient, jpycAddress, address])

    useEffect(() => {
        if (inView && !isLoading && isMore) {
            fetch()
        }
    }, [inView, isLoading, isMore, fetch])

    const refresh = useCallback(() => {
        setEvents([])
        lastBlockNumberRef.current = 0n
        nextBlockNumberRef.current = 0n
        refreshed.current = true
        setIsLoading(false)
        setIsMore(true)
        console.log("refreshed")
    }, [])
    useEffect(() => {
        if (isMore) {
            setTimeout(() => {
                setIsMore(false)
            }, 5000)
        }
    }, [isMore])
    useEffect(() => {
        refresh()
    }, [caipNetworkId, refresh])
    return (
        <>
            {(!publicClient || !address) && (
                <div>
                    <p>You must connect to a wallet</p>
                </div>
            )}
            {publicClient && address && (
                <>
                    <Button variant="outline" size="sm" onClick={() => refresh()} className="self-start">更新</Button>
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
                    <div className="flex justify-center">
                        {isMore && (
                            <div>
                                <div ref={ref} className="h-4 w-full" />
                                <div className="p-4">
                                    <p>Loading...</p>
                                </div>
                            </div>
                        )}
                        {!isMore && (
                            <div className="p-4">
                                <Button variant="outline" size="sm" onClick={() => { setIsMore(true) }}>もっと見る</Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}
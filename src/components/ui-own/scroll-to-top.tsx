'use client'
import { ArrowUp } from "lucide-react"
import { Button } from "../ui/button"
import { useCallback } from "react"

export const ScrollToTop = () => {
    const func = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])
    return (
        <Button variant="outline" size="icon" className="rounded-full fixed bottom-8 right-4 z-50 opacity-70" onClick={func}>
            <ArrowUp />
        </Button>
    )
}
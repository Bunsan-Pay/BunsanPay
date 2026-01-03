import { Tabs, TabsList } from "@/components/ui/tabs"
import { useCallback } from "react"

export const TabModule = ({ defaultValue, triggers, contents }: { defaultValue: string, triggers: React.ReactNode, contents: React.ReactNode }) => {
    const contentBuffer = useCallback(() => {
        return contents
    }, [])
    return (
        <Tabs defaultValue={defaultValue} className="pt-4">
            <TabsList className="self-center">
                {triggers}
            </TabsList>
            {contentBuffer()}
        </Tabs>
    )
}
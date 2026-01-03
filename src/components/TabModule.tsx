import { Tabs, TabsList } from "@/components/ui/tabs"

export const TabModule = ({ defaultValue, triggers, contents }: { defaultValue: string, triggers: React.ReactNode, contents: React.ReactNode }) => {
    return (
        <Tabs defaultValue={defaultValue} className="pt-4">
            <TabsList className="self-center">
                {triggers}
            </TabsList>
            {contents}
        </Tabs>
    )
}
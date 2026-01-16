import { PageScaffold } from "@/components/layout/scaffold";
import { readMd } from "@/lib/readMd";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("@/components/layout/markdown").then((mod) => mod.Markdown));

export default async function Sctl() {
    const readmeContent = await readMd('sctl.md');
    return (
        <PageScaffold>
            <Markdown markdown={readmeContent} title="Specific Commercial Transaction Act." />
        </PageScaffold>
    )
}
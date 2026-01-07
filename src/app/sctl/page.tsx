import { PageScaffold } from "@/components/layout/scaffold";
import { readMd } from "@/lib/readMd";
import { Markdown } from "@/components/layout/markdown";

export default async function Sctl() {
    const readmeContent = await readMd('sctl.md');
    return (
        <PageScaffold>
            <Markdown markdown={readmeContent} title="Specific Commercial Transaction Act." />
        </PageScaffold>
    )
}
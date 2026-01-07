import { PageScaffold } from "@/components/layout/scaffold";
import { readMd } from "@/lib/readMd";
import { Markdown } from "@/components/layout/markdown";

export default async function Terms() {
    const readmeContent = await readMd('terms.md');
    return (
        <PageScaffold>
            <Markdown markdown={readmeContent} title="Terms" />
        </PageScaffold>
    )
}
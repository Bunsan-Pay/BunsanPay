import { Markdown } from "@/components/layout/markdown";
import { PageScaffold } from "@/components/layout/scaffold";
import { readMd } from "@/lib/readMd";

export default async function About() {
    const readmeContent = await readMd('README.md');
    return (
        <PageScaffold>
            <Markdown markdown={readmeContent} title="About" />
        </PageScaffold>
    )
}
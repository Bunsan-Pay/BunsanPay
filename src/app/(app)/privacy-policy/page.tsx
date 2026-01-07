import { PageScaffold } from "@/components/layout/scaffold";
import { readMd } from "@/lib/readMd";
import { Markdown } from "@/components/layout/markdown";

export default async function PrivacyPolicy() {
    const readmeContent = await readMd('privacy-policy.md');
    return (
        <PageScaffold>
            <Markdown markdown={readmeContent} title="Privacy Policy" />
        </PageScaffold>
    )
}
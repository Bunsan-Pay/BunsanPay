import { PageScaffold } from "@/components/layout/scaffold";
import { readMd } from "@/lib/readMd";
import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("@/components/layout/markdown").then((mod) => mod.Markdown));

export default async function PrivacyPolicy() {
    const readmeContent = await readMd('privacy-policy.md');
    return (
        <PageScaffold>
            <Markdown markdown={readmeContent} title="Privacy Policy" />

        </PageScaffold>
    )
}
import Footer from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import path from "path"
import { promises as fs } from 'fs';
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import "katex/dist/katex.min.css";

export default async function About() {
    const projectRoot = process.cwd();
    const filePath = path.join(projectRoot, 'README.md');

    let readmeContent = '読み込み中...';

    try {
        // ファイルを非同期で読み込む
        readmeContent = await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.error('README.mdの読み込みに失敗しました', error);
        readmeContent = 'ファイルが見つからないか、読み込めませんでした。';
    }
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <main className="p-4 min-w-0">
                <article className={`prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-semibold prose-blockquote:opacity-70`}>
                    <div className="text-4xl pb-6">About</div>
                    <div className="px-6">
                        <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
                            {readmeContent}
                        </ReactMarkdown>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    )
}
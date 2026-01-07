import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export const Markdown = ({ markdown, title }: { markdown: string; title?: string }) => {
    return (
        <article className="prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h1:font-semibold prose-h2:font-semibold prose-h3:font-semibold prose-blockquote:opacity-70">
            {title && <div className="text-4xl pb-6">{title}</div>}
            <div className="px-6">
                <ReactMarkdown
                    remarkPlugins={[[remarkRehype, { allowDangerousHtml: true }], remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex]}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        </article>
    );
};
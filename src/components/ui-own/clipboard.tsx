'use client'
import { useState } from "react";
import { Check, ClipboardIcon } from "lucide-react";

interface Props extends React.ComponentProps<"button"> {
    copyText?: string;
}

export const CopyButton = (props: Props) => {
    const { copyText = "", className, ...args } = props;
    const [isCopied, setCopied] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleClick = async () => {
        setCopied(true);
        await global.navigator.clipboard.writeText(copyText);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <button
            {...args}
            className={className + " relative"}
            onClick={() => !isCopied && handleClick()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {copyText}
            {isHovered &&
                (isCopied ?
                    <Check size={16} className="absolute right-1 top-1/2 -translate-y-1/2 bg-background rounded-b-xs opacity-80" />
                    :
                    <ClipboardIcon size={16} className="absolute right-1 top-1/2 -translate-y-1/2 bg-background rounded-b-xs opacity-80" />
                )
            }
        </button>
    );
};
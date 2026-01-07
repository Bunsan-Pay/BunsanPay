'use client'
import { useState } from "react";
import { Check, ClipboardIcon } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props extends React.ComponentProps<"button"> {
    copyText?: string;
}

export const CopyButton = (props: Props) => {
    const { copyText = "", className, ...args } = props;
    const [isCopied, setCopied] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = async () => {
        setCopied(true);
        await global.navigator.clipboard.writeText(copyText);
        setTimeout(() => {
            setCopied(false);
            setOpen(false);
        }, 2000);
    };

    return (
        <TooltipProvider>
            <Tooltip defaultOpen={false} open={open}>
                <TooltipTrigger asChild>
                    <button
                        {...args}
                        className={className}
                        onClick={() => !isCopied && handleClick()}
                        onMouseOver={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        {copyText}
                    </button>
                </TooltipTrigger>
                {open && (
                    <TooltipContent className="">
                        <div className="color-foreground dark:color-background py-0.5">
                            {isCopied ? (
                                <Check size={16} />
                            ) : (
                                <ClipboardIcon size={16} />
                            )}
                        </div>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
};
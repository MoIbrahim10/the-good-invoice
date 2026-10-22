import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../custom/tooltip';
import { ErrorIcon } from './ErrorIcon';

type ErrorIconWithTooltipProps = {
    message: string;
    className?: string;
    id?: string;
};

function ensureTooltipNotEndsWithPeriod(text: string): string {
    const trimmed = text.trimEnd();
    if (trimmed.length === 0) return trimmed;
    return trimmed.endsWith('.') ? trimmed.slice(0, -1) : trimmed;
}

export function ErrorIconWithTooltip({
    message,
    className,
    id,
}: ErrorIconWithTooltipProps) {
    const displayMessage = ensureTooltipNotEndsWithPeriod(message);
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.div
                    id={id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 28,
                    }}
                    className={cn(
                        'flex size-6 shrink-0 items-center justify-center rounded-[4px] bg-[#FFEFEF] p-[5px] dark:bg-[#401B1D]',
                        className,
                    )}
                    style={{
                        width: 24,
                        height: 24,
                    }}
                    role="img"
                    aria-label={`Error: ${displayMessage}`}
                >
                    <ErrorIcon size={14} />
                </motion.div>
            </TooltipTrigger>
            <TooltipContent
                side="top"
                sideOffset={6}
                className="max-w-[200px] items-start text-wrap wrap-break-word"
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05 }}
                    className="block min-w-0"
                >
                    {displayMessage}
                </motion.span>
            </TooltipContent>
        </Tooltip>
    );
}

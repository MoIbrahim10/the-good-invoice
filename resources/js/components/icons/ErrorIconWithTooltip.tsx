import { motion } from 'motion/react';
import { ErrorIcon } from './ErrorIcon';
import { Tooltip, TooltipContent, TooltipTrigger } from '../custom/tooltip';
import { cn } from '@/lib/utils';

type ErrorIconWithTooltipProps = {
    message: string;
    className?: string;
    id?: string;
};

export function ErrorIconWithTooltip({
    message,
    className,
    id,
}: ErrorIconWithTooltipProps) {
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
                        'flex size-5 shrink-0 items-center justify-center rounded-[4px] bg-[#FFEFEF] p-[3px]',
                        className,
                    )}
                    style={{
                        width: 20,
                        height: 20,
                    }}
                    role="img"
                    aria-label={`Error: ${message}`}
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
                    {message}
                </motion.span>
            </TooltipContent>
        </Tooltip>
    );
}

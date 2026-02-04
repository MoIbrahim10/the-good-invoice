import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon } from '../icons/ExternalLinkIcon';

interface FeedbackItemProps {
    avatar: string;
    username: string;
    href: string;
}

function FeedbackItem({ avatar, username, href }: FeedbackItemProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'group flex w-full items-center justify-between rounded-[4px] border border-transparent py-[6px] pr-[6px] pl-[8px] transition-all',
                'hover:border-dropdown-bg-item-stroke hover:bg-dropdown-bg-item-hover',
            )}
        >
            <div className="flex items-center gap-2">
                <Avatar className="size-5 border border-[rgba(0,0,0,0.1)]">
                    <AvatarImage src={avatar} alt={username} />
                    <AvatarFallback className="text-[8px]">
                        {username.slice(1, 3).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className="text-[14px] font-normal text-white">
                    {username}
                </span>
            </div>
            <ExternalLinkIcon className="text-white opacity-60 transition-opacity group-hover:opacity-100" />
        </a>
    );
}

export function FeedbackPopover({
    children,
}: {
    children: React.ReactElement<{ className?: string }>;
}) {
    const [open, setOpen] = React.useState(false);
    const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const handleOpen = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpen(true);
    };

    const handleClose = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setOpen(false);
        }, 150);
    };

    React.useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                asChild
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            >
                {React.cloneElement(children, {
                    className: cn(
                        children.props.className,
                        open && 'shadow-none [&_span]:opacity-50',
                    ),
                })}
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align="center"
                sideOffset={8}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                className={cn(
                    'flex w-[200px] flex-col items-start gap-1 p-1',
                    'border-stroke-weak rounded-[4px] backdrop-blur-[2px] bg-feedback-glass',
                )}
            >
                <div className="py-[4px] pr-[6px] pl-[8px]">
                    <span className="text-[12px] font-medium text-gray-50">
                        Share feedback
                    </span>
                </div>
                <div className="flex w-full flex-col gap-0.5">
                    <FeedbackItem
                        avatar="https://unavatar.io/twitter/faydesignsstuff"
                        username="@faydesignsstuff"
                        href="https://twitter.com/faydesignsstuff"
                    />
                    <FeedbackItem
                        avatar="https://unavatar.io/twitter/m0code"
                        username="@m0code"
                        href="https://twitter.com/m0code"
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}

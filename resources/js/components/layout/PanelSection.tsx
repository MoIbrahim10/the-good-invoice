import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

type PanelSectionProps = {
    children: React.ReactNode;
    className?: string;
};

const SCROLL_THRESHOLD = 1;

export function PanelSection({ children, className = '' }: PanelSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollState, setScrollState] = useState({
        canScrollLeft: false,
        canScrollRight: false,
    });

    const updateScrollIndicators = useCallback(() => {
        const el = scrollRef.current;
        if (!el) {
            return;
        }
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const canScrollLeft = scrollLeft > SCROLL_THRESHOLD;
        const canScrollRight =
            scrollWidth > clientWidth &&
            scrollLeft < scrollWidth - clientWidth - SCROLL_THRESHOLD;
        setScrollState((prev) => {
            if (
                prev.canScrollLeft === canScrollLeft &&
                prev.canScrollRight === canScrollRight
            ) {
                return prev;
            }
            return { canScrollLeft, canScrollRight };
        });
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) {
            return;
        }
        updateScrollIndicators();
        const resizeObserver = new ResizeObserver(updateScrollIndicators);
        resizeObserver.observe(el);
        el.addEventListener('scroll', updateScrollIndicators, { passive: true });
        return () => {
            resizeObserver.disconnect();
            el.removeEventListener('scroll', updateScrollIndicators);
        };
    }, [updateScrollIndicators]);

    return (
        <div
            className={cn(
                'relative flex shrink-0 border-y-layered',
                className,
            )}
        >
            <div
                className="scrollbar-none flex min-w-0 overflow-x-auto px-3 py-2.5"
                ref={scrollRef}
            >
                {children}
            </div>
            <div
                className={cn(
                    'pointer-events-none absolute left-0 top-0 z-20 h-full w-32 shrink-0 transition-opacity duration-500 ease-out',
                    scrollState.canScrollLeft ? 'opacity-100' : 'opacity-0',
                )}
                style={{
                    background: `linear-gradient(to left, transparent 0%, var(--bg-default) 100%)`,
                }}
                aria-hidden
            />
            <div
                className={cn(
                    'pointer-events-none absolute right-0 top-0 z-20 h-full w-32 shrink-0 transition-opacity duration-500 ease-out',
                    scrollState.canScrollRight ? 'opacity-100' : 'opacity-0',
                )}
                style={{
                    background: `linear-gradient(to right, transparent 0%, var(--bg-default) 100%)`,
                }}
                aria-hidden
            />
        </div>
    );
}

import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { Children, useEffect, useRef, useState } from 'react';
import { useIsLg } from '@/hooks/use-is-lg';
import { cn } from '@/lib/utils';
import type { SharedData } from '@/types';

type InvoiceLayoutProps = {
    children: React.ReactNode;
};

type ViewTab = 'form' | 'preview';

const viewTabs: { id: ViewTab; label: string }[] = [
    { id: 'form', label: 'Form' },
    { id: 'preview', label: 'Preview' },
];

const VIEW_ORDER: ViewTab[] = ['form', 'preview'];

const bubbleTransition = {
    type: 'spring',
    bounce: 0.2,
    duration: 0.5,
} as const;

const SLIDE_PX = 18;
const BLUR_PX = 3;
const EASE_OUT_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

const contentEnter = {
    type: 'tween' as const,
    duration: 0.4,
    ease: EASE_OUT_SMOOTH,
};

const contentExit = {
    type: 'tween' as const,
    duration: 0.25,
    ease: EASE_OUT_SMOOTH,
};

export function InvoiceLayout({ children }: InvoiceLayoutProps) {
    const [viewTab, setViewTab] = useState<ViewTab>('form');
    const [previewExited, setPreviewExited] = useState(true);
    const isLg = useIsLg();
    const tabsAnimation = usePage<SharedData>().props.tabsAnimation;
    const tabsContentAnimation =
        usePage<SharedData>().props.tabsContentAnimation;
    const childArray = Children.toArray(children);
    const [inputPanel, previewPanel] = childArray as [
        React.ReactNode,
        React.ReactNode | undefined,
    ];

    const activeIndex = VIEW_ORDER.indexOf(viewTab);
    const prevIndexRef = useRef(activeIndex);
    const direction =
        activeIndex > prevIndexRef.current
            ? 1
            : activeIndex < prevIndexRef.current
              ? -1
              : 0;

    useEffect(() => {
        prevIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
        if (viewTab === 'preview') {
            setPreviewExited(false);
        } else if (!tabsContentAnimation && viewTab === 'form') {
            setPreviewExited(true);
        }
    }, [viewTab, tabsContentAnimation]);

    const containerCanClip = viewTab === 'form' && previewExited;

    const fromRight = direction > 0;
    const slideIn = fromRight ? SLIDE_PX : -SLIDE_PX;
    const slideOut = fromRight ? -SLIDE_PX : SLIDE_PX;

    return (
        <div
            className={cn(
                'flex w-full flex-col gap-4 overflow-hidden px-6 max-lg:py-8 md:px-12 lg:grid lg:max-h-[650px] lg:grid-cols-[446px_1fr] lg:items-center lg:justify-items-center lg:gap-6 lg:px-16 xl:px-20',
                'max-lg:min-h-[min(100svh,720px)] max-lg:overflow-y-auto',
            )}
        >
            <div className="flex shrink-0 justify-center lg:hidden">
                <div className="flex w-fit gap-1 rounded-[6px] bg-bg-strong p-1">
                    {viewTabs.map((tab) =>
                        tabsAnimation ? (
                            <motion.button
                                key={tab.id}
                                type="button"
                                onClick={() => setViewTab(tab.id)}
                                className={cn(
                                    'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    viewTab === tab.id
                                        ? 'text-text-strong'
                                        : 'text-text-default hover:text-text-strong',
                                )}
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                }}
                                aria-current={
                                    viewTab === tab.id ? 'page' : undefined
                                }
                            >
                                {viewTab === tab.id && (
                                    <motion.span
                                        layoutId="view-tab-bubble"
                                        className="absolute inset-0 z-0 rounded-md bg-bg-stronger"
                                        transition={bubbleTransition}
                                    />
                                )}
                                <span className="relative z-10">
                                    {tab.label}
                                </span>
                            </motion.button>
                        ) : (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setViewTab(tab.id)}
                                className={cn(
                                    'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    viewTab === tab.id
                                        ? 'text-text-strong'
                                        : 'text-text-default hover:text-text-strong',
                                )}
                                aria-current={
                                    viewTab === tab.id ? 'page' : undefined
                                }
                            >
                                {viewTab === tab.id && (
                                    <span
                                        className="absolute inset-0 z-0 rounded-md bg-bg-stronger"
                                        aria-hidden
                                    />
                                )}
                                <span className="relative z-10">
                                    {tab.label}
                                </span>
                            </button>
                        ),
                    )}
                </div>
            </div>

            {/* Small screens: single content area with optional slide/fade/blur animation */}
            {!isLg && (
                <div
                    className={cn(
                        'relative',
                        containerCanClip
                            ? 'min-h-0 flex-1 overflow-hidden'
                            : 'flex-none overflow-visible',
                    )}
                >
                    {tabsContentAnimation ? (
                        <AnimatePresence
                            mode="wait"
                            initial={false}
                            onExitComplete={() => {
                                if (viewTab === 'form') {
                                    setPreviewExited(true);
                                }
                            }}
                        >
                            {viewTab === 'form' && (
                                <motion.div
                                    key="form"
                                    initial={{
                                        opacity: 0,
                                        x: slideIn,
                                        filter: `blur(${BLUR_PX}px)`,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: slideOut,
                                        filter: `blur(${BLUR_PX}px)`,
                                        transition: contentExit,
                                    }}
                                    transition={contentEnter}
                                    className="flex h-full min-h-0 flex-1 flex-col items-center overflow-hidden"
                                >
                                    {inputPanel}
                                </motion.div>
                            )}
                            {viewTab === 'preview' && (
                                <motion.div
                                    key="preview"
                                    initial={{
                                        opacity: 0,
                                        x: slideIn,
                                        filter: `blur(${BLUR_PX}px)`,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: slideOut,
                                        filter: `blur(${BLUR_PX}px)`,
                                        transition: contentExit,
                                    }}
                                    transition={contentEnter}
                                    className="flex min-h-0 flex-none flex-col items-center"
                                >
                                    {previewPanel}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ) : (
                        <>
                            {viewTab === 'form' && (
                                <div className="flex h-full min-h-0 flex-1 flex-col items-center overflow-hidden">
                                    {inputPanel}
                                </div>
                            )}
                            {viewTab === 'preview' && (
                                <div className="flex min-h-0 flex-none flex-col items-center">
                                    {previewPanel}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Large screens: two columns, no animation */}
            {isLg && (
                <>
                    <div className="min-h-0 flex-1 overflow-hidden lg:contents">
                        {inputPanel}
                    </div>
                    <div className="min-h-0 flex-none lg:contents">
                        {previewPanel}
                    </div>
                </>
            )}
        </div>
    );
}

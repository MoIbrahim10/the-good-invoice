import { motion } from 'motion/react';
import { Children, useState } from 'react';
import { cn } from '@/lib/utils';

type InvoiceLayoutProps = {
    children: React.ReactNode;
};

type ViewTab = 'form' | 'preview';

const viewTabs: { id: ViewTab; label: string }[] = [
    { id: 'form', label: 'Form' },
    { id: 'preview', label: 'Preview' },
];

const bubbleTransition = {
    type: 'spring',
    bounce: 0.2,
    duration: 0.5,
} as const;

export function InvoiceLayout({ children }: InvoiceLayoutProps) {
    const [viewTab, setViewTab] = useState<ViewTab>('form');
    const childArray = Children.toArray(children);
    const [inputPanel, previewPanel] = childArray as [
        React.ReactNode,
        React.ReactNode | undefined,
    ];

    return (
        <div
            className={cn(
                'flex w-full flex-col gap-4 overflow-hidden px-6 md:px-12 lg:grid lg:max-h-[650px] lg:grid-cols-[446px_1fr] lg:items-center lg:justify-items-center lg:gap-6 lg:px-16 xl:px-20 max-lg:py-8',
                'max-lg:min-h-[min(100svh,720px)] max-lg:overflow-y-auto',
            )}
        >
            <div className="flex shrink-0 justify-center lg:hidden">
                <div className="flex w-fit gap-1 rounded-[6px] bg-bg-strong p-1">
                    {viewTabs.map((tab) => (
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
                            style={{ WebkitTapHighlightColor: 'transparent' }}
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
                    ))}
                </div>
            </div>
            <div
                className={cn(
                    'flex min-h-0 flex-1 flex-col overflow-hidden max-lg:items-center lg:contents',
                    viewTab !== 'form' && 'max-lg:hidden',
                )}
            >
                {inputPanel}
            </div>
            <div
                className={cn(
                    'flex min-h-0 flex-col lg:contents max-lg:items-center',
                    viewTab !== 'preview' && 'max-lg:hidden',
                    'max-lg:flex-none',
                )}
            >
                {previewPanel}
            </div>
        </div>
    );
}

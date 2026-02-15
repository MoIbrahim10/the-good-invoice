import { Children } from 'react';
import { useIsLg } from '@/hooks/use-is-lg';
import { cn } from '@/lib/utils';
import { PanelFooter } from './PanelFooter';

type InvoiceLayoutProps = {
    children: React.ReactNode;
};

export function InvoiceLayout({ children }: InvoiceLayoutProps) {
    const isLg = useIsLg();
    const childArray = Children.toArray(children);
    const [inputPanel, previewPanel] = childArray as [
        React.ReactNode,
        React.ReactNode | undefined,
    ];

    return (
        <div
            className={cn(
                'flex w-full flex-col gap-4 overflow-hidden px-6 max-lg:py-8 md:px-12 lg:grid lg:min-h-[min(90svh,1200px)] lg:grid-cols-[446px_1fr] lg:items-center lg:justify-items-center lg:gap-24 lg:overflow-visible lg:px-16 xl:px-20',
                'max-lg:min-h-[min(100svh,720px)] max-lg:overflow-y-auto',
            )}
        >
            {/* Small screens: stacked form → preview → footer, no Form/Preview tabs */}
            {!isLg && (
                <div className="flex flex-1 flex-col gap-6">
                    <div className="flex flex-none flex-col items-center">
                        {inputPanel}
                    </div>
                    <div className="flex flex-none flex-col items-center">
                        {previewPanel}
                    </div>
                    <div className="flex shrink-0 justify-center">
                        <div className="w-full max-w-[446px]">
                            <PanelFooter />
                        </div>
                    </div>
                </div>
            )}

            {/* Large screens: two columns */}
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

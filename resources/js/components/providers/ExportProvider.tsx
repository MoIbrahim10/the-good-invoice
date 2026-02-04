import { AnimatePresence, motion } from 'motion/react';
import { createContext, type ReactNode, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { InvoicePreviewContent } from '@/components/panels/preview/InvoicePreviewContent';
import { useExportPdf } from '@/hooks/use-export-pdf';

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

type ExportContextValue = {
    /** Primary: vector PDF (high quality, selectable text). */
    exportPdf: () => Promise<void>;
    /** Backup: raster PDF from on-screen preview (image-based). */
    exportPdfBackup: () => Promise<void>;
    isExporting: boolean;
    exportSuccess: boolean;
};

export const ExportContext = createContext<ExportContextValue | null>(null);

type ExportProviderProps = {
    children: ReactNode;
};

export function ExportProvider({ children }: ExportProviderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { exportPdf, exportPdfBackup, isExporting, exportSuccess } =
        useExportPdf(containerRef);

    const value: ExportContextValue = {
        exportPdf: useCallback(() => exportPdf(), [exportPdf]),
        exportPdfBackup: useCallback(
            () => exportPdfBackup(),
            [exportPdfBackup],
        ),
        isExporting,
        exportSuccess,
    };

    const exportTarget =
        typeof document !== 'undefined' ? (
            <div
                ref={containerRef}
                className="fixed top-0 left-[-9999px] z-[-1] flex items-center justify-center overflow-hidden bg-bg-default"
                style={{
                    width: A4_WIDTH_PX,
                    height: A4_HEIGHT_PX,
                }}
                aria-hidden
            >
                <div
                    className="overflow-visible"
                    style={{
                        width: A4_WIDTH_PX,
                        height: A4_HEIGHT_PX,
                    }}
                >
                    <InvoicePreviewContent
                        forExport
                        wrapperClassName="h-full w-full"
                    />
                </div>
            </div>
        ) : null;

    return (
        <ExportContext.Provider value={value}>
            {children}
            {typeof document !== 'undefined' &&
                createPortal(exportTarget, document.body)}
            <AnimatePresence>
                {(isExporting || exportSuccess) && (
                    <ExportOverlay
                        isExporting={isExporting}
                        exportSuccess={exportSuccess}
                    />
                )}
            </AnimatePresence>
        </ExportContext.Provider>
    );
}

function ExportOverlay({
    isExporting,
    exportSuccess,
}: {
    isExporting: boolean;
    exportSuccess: boolean;
}) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="flex flex-col items-center gap-4 rounded-2xl border border-stroke-default bg-bg-weak p-8 shadow-xl"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 28,
                }}
            >
                {isExporting && (
                    <>
                        <motion.div
                            className="h-12 w-12 rounded-full border-2 border-stroke-strong border-t-text-strong"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: 'linear',
                            }}
                        />
                        <p className="text-[14px] font-medium text-text-strong">
                            Preparing PDF...
                        </p>
                    </>
                )}
                {exportSuccess && !isExporting && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 24,
                        }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-600 dark:text-green-400"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                        >
                            <title>Success</title>
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                )}
                {exportSuccess && !isExporting && (
                    <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[14px] font-medium text-text-strong"
                    >
                        Downloaded!
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
}

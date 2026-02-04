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
        </ExportContext.Provider>
    );
}

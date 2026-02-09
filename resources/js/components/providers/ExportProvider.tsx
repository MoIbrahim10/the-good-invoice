import { createContext, type ReactNode, useCallback } from 'react';
import { useExportPdf } from '@/hooks/use-export-pdf';

type ExportContextValue = {
    exportPdf: () => Promise<void>;
    isExporting: boolean;
    exportSuccess: boolean;
};

export const ExportContext = createContext<ExportContextValue | null>(null);

type ExportProviderProps = {
    children: ReactNode;
};

export function ExportProvider({ children }: ExportProviderProps) {
    const { exportPdf, isExporting, exportSuccess } = useExportPdf();

    const value: ExportContextValue = {
        exportPdf: useCallback(() => exportPdf(), [exportPdf]),
        isExporting,
        exportSuccess,
    };

    return (
        <ExportContext.Provider value={value}>
            {children}
        </ExportContext.Provider>
    );
}

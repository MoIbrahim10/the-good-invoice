import { pdf } from '@react-pdf/renderer';
import type React from 'react';
import { createElement, useCallback, useRef, useState } from 'react';
import { InvoicePdfDocument } from '@/components/panels/preview/InvoicePdfDocument';
import { useInvoiceState } from './use-invoice-state';

function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function getExportFilename(invoiceNumber: string | undefined): string {
    const trimmed = invoiceNumber?.trim();
    return trimmed
        ? `invoice-${trimmed.replace(/[^a-zA-Z0-9-_]/g, '-')}.pdf`
        : 'invoice.pdf';
}

export function useExportPdf() {
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);
    const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { state } = useInvoiceState();

    const setSuccessFeedback = useCallback(() => {
        setExportSuccess(true);
        if (successTimeoutRef.current) {
            clearTimeout(successTimeoutRef.current);
        }
        successTimeoutRef.current = setTimeout(() => {
            setExportSuccess(false);
            successTimeoutRef.current = null;
        }, 2000);
    }, []);

    const exportPdf = useCallback(async () => {
        setIsExporting(true);
        setExportSuccess(false);

        try {
            const docElement = createElement(InvoicePdfDocument, {
                data: state.data,
                placeholders: state.placeholders,
            });
            type DocumentProps = import('@react-pdf/renderer').DocumentProps;
            const instance = pdf(
                docElement as React.ReactElement<DocumentProps>,
            );
            const blob = await instance.toBlob();
            const filename = getExportFilename(
                state.data.details.invoiceNumber,
            );
            downloadBlob(blob, filename);
            setSuccessFeedback();
        } catch (err) {
            console.error('Export failed:', err);
        } finally {
            setIsExporting(false);
        }
    }, [state, setSuccessFeedback]);

    return { exportPdf, isExporting, exportSuccess };
}

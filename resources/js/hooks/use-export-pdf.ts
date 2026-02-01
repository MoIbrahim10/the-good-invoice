import { pdf } from '@react-pdf/renderer';
import { formatHex, parse } from 'culori';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type React from 'react';
import { createElement, useCallback, useRef, useState } from 'react';
import { InvoicePdfDocument } from '@/components/panels/InvoicePdfDocument';
import { useInvoiceState } from './use-invoice-state';

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;
/** Scale factor for html2canvas backup; 2x gives sharper text. */
const EXPORT_SCALE = 2;

function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

const COLOR_PROPS: { js: string; css: string }[] = [
    { js: 'color', css: 'color' },
    { js: 'backgroundColor', css: 'background-color' },
    { js: 'borderColor', css: 'border-color' },
    { js: 'borderTopColor', css: 'border-top-color' },
    { js: 'borderRightColor', css: 'border-right-color' },
    { js: 'borderBottomColor', css: 'border-bottom-color' },
    { js: 'borderLeftColor', css: 'border-left-color' },
    { js: 'outlineColor', css: 'outline-color' },
];

function colorToHex(value: string): string | null {
    if (!value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)') {
        return null;
    }
    const lower = value.toLowerCase();
    if (
        lower.includes('oklch') ||
        lower.includes('oklab') ||
        lower.includes('lch') ||
        lower.includes('lab')
    ) {
        try {
            const parsed = parse(value);
            return parsed ? formatHex(parsed) : null;
        } catch {
            return null;
        }
    }
    return value;
}

function replaceOklchInClone(
    originalRoot: HTMLElement,
    clonedRoot: HTMLElement,
    clonedDoc: Document,
): void {
    clonedDoc
        .querySelectorAll('link[rel="stylesheet"], style')
        .forEach((el) => {
            el.remove();
        });

    const originalEls = [
        originalRoot,
        ...Array.from(originalRoot.querySelectorAll('*')),
    ];
    const clonedEls = [
        clonedRoot,
        ...Array.from(clonedRoot.querySelectorAll('*')),
    ];

    const colorPropNames = new Set(COLOR_PROPS.map((p) => p.css));

    for (let i = 0; i < originalEls.length && i < clonedEls.length; i++) {
        const orig = originalEls[i] as HTMLElement;
        const clone = clonedEls[i] as HTMLElement;
        const computed = window.getComputedStyle(orig);
        const cloneStyle = clone.style as unknown as Record<string, string>;

        for (let j = 0; j < computed.length; j++) {
            const cssProp = computed.item(j);
            const value = computed.getPropertyValue(cssProp);
            if (!value) continue;

            const isColorProp =
                colorPropNames.has(cssProp) ||
                /color|background|border|outline|fill|stroke/.test(cssProp);
            const needsConvert = /oklch|oklab|lch\s*\(|lab\s*\(/i.test(value);

            let setValue = value;
            if (isColorProp && needsConvert) {
                const hex = colorToHex(value.trim());
                if (hex) setValue = hex;
            }

            const jsProp = cssProp.replace(/-([a-z])/g, (_, l) =>
                l.toUpperCase(),
            );
            cloneStyle[jsProp] = setValue;
        }
    }
}

function getExportFilename(invoiceNumber: string | undefined): string {
    const trimmed = invoiceNumber?.trim();
    return trimmed
        ? `invoice-${trimmed.replace(/[^a-zA-Z0-9-_]/g, '-')}.pdf`
        : 'invoice.pdf';
}

export function useExportPdf(
    containerRef: React.RefObject<HTMLElement | null>,
) {
    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);
    const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );
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

    /** Primary: vector PDF via @react-pdf/renderer (high quality, selectable text). */
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

    /** Backup: raster PDF via html2canvas + jsPDF (matches on-screen preview). */
    const exportPdfBackup = useCallback(async () => {
        const el = containerRef.current;
        if (!el) return;

        setIsExporting(true);
        setExportSuccess(false);

        try {
            const canvas = await html2canvas(el, {
                scale: EXPORT_SCALE,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                width: A4_WIDTH_PX,
                height: A4_HEIGHT_PX,
                windowWidth: A4_WIDTH_PX,
                windowHeight: A4_HEIGHT_PX,
                onclone: (clonedDoc, clonedElement) => {
                    replaceOklchInClone(
                        el,
                        clonedElement as HTMLElement,
                        clonedDoc,
                    );
                },
            });

            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

            const filename = getExportFilename(
                state.data.details.invoiceNumber,
            );
            doc.save(filename);
            setSuccessFeedback();
        } catch (err) {
            console.error('Backup export failed:', err);
        } finally {
            setIsExporting(false);
        }
    }, [containerRef, state.data.details.invoiceNumber, setSuccessFeedback]);

    return { exportPdf, exportPdfBackup, isExporting, exportSuccess };
}

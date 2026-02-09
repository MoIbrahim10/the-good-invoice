import { motion } from 'motion/react';
import { currencies } from '@/data/currencies';
import { useInvoiceState } from '@/hooks/use-invoice-state';
import { formatCurrencyForDisplay } from '@/lib/utils';
import type { InvoiceItem } from '@/types/invoice';
import { LogoIcon } from '../../icons/LogoIcon';
import { PreviewHeader } from './content/PreviewHeader';
import { PreviewItemsTable } from './content/PreviewItemsTable';
import { PreviewNotes } from './content/PreviewNotes';
import { PreviewSummary } from './content/PreviewSummary';
import { PreviewAddresses } from './content/PreviewAddresses';

type InvoicePreviewContentProps = {
    forExport?: boolean;
    wrapperClassName?: string;
    wrapperStyle?: React.CSSProperties;
};

export function InvoicePreviewContent({
    forExport = false,
    wrapperClassName = '',
    wrapperStyle,
}: InvoicePreviewContentProps) {
    const { state } = useInvoiceState();
    const { data, placeholders } = state;
    const {
        issuer,
        billTo,
        details,
        items,
        tax,
        taxType,
        discount,
        discountType,
        notes,
        display,
    } = data;

    const currency =
        currencies.find((c) => c.code === details.currency) || currencies[0];

    const formatAmount = (amount: number) =>
        formatCurrencyForDisplay(amount, currency.symbol);

    const subtotal = items.reduce(
        (sum: number, item: InvoiceItem) => sum + item.quantity * item.rate,
        0,
    );

    const discountAmount =
        discountType === 'percentage' ? (subtotal * discount) / 100 : discount;

    const taxAmount =
        taxType === 'percentage'
            ? ((subtotal - discountAmount) * tax) / 100
            : tax;

    const total = subtotal - discountAmount + taxAmount;

    const LogoWrapper = forExport ? 'div' : motion.div;
    const RowWrapper = forExport ? 'tr' : motion.tr;

    const logoBox = (
        <div className="shrink-0 overflow-hidden">
            <div
                className="flex aspect-square! size-[28px] items-center justify-center rounded-[4px] border border-dashed bg-preview-0"
                style={{
                    borderColor: 'var(--preview-200)',
                }}
            >
                {issuer.logo ? (
                    <img
                        src={issuer.logo}
                        alt="Logo"
                        className="h-full w-full object-contain"
                        crossOrigin="anonymous"
                    />
                ) : (
                    <LogoIcon size={12} />
                )}
            </div>
        </div>
    );

    const previewColor = display?.color ?? 'gray';
    const previewStyle = display?.style ?? 'solid';

    return (
        <div
            className={wrapperClassName}
            style={wrapperStyle}
            data-export-root={forExport ? 'true' : undefined}
            data-preview-color={previewColor}
            data-preview-style={previewStyle}
        >
            <div className="bg-preview-stripes relative h-full w-full overflow-visible rounded-[8px] p-[8px] shadow-preview-frame">
                <div className="relative z-10 flex h-full min-h-0 w-full flex-col overflow-visible rounded-[6px] border border-preview-100 bg-preview-0 inside-preview-frame">
                    <div className="flex min-h-0 flex-1 flex-col overflow-auto text-[10px]">
                        <PreviewHeader
                            forExport={forExport}
                            issuer={issuer}
                            details={details}
                            placeholders={placeholders}
                            logoBox={logoBox}
                            LogoWrapper={LogoWrapper}
                        />
                        <PreviewAddresses
                            issuer={issuer}
                            billTo={billTo}
                            placeholders={placeholders}
                        />
                        <PreviewItemsTable
                            forExport={forExport}
                            items={items}
                            placeholders={placeholders}
                            formatAmount={formatAmount}
                            RowWrapper={RowWrapper}
                        />
                        <PreviewSummary
                            forExport={forExport}
                            subtotal={subtotal}
                            discountAmount={discountAmount}
                            discount={discount}
                            discountType={discountType}
                            taxAmount={taxAmount}
                            tax={tax}
                            taxType={taxType}
                            total={total}
                            formatAmount={formatAmount}
                        />
                        <PreviewNotes
                            notes={notes}
                            placeholder={placeholders.notes}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

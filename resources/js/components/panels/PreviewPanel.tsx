import { currencies } from '@/data/currencies';
import { useInvoiceState } from '@/hooks/use-invoice-state';
import { usePreviewScale } from '@/hooks/use-preview-scale';
import {
    formatCurrencyForDisplay,
    formatCurrencyFull,
} from '@/lib/utils';
import type { InvoiceItem } from '@/types/invoice';
import { LogoIcon } from '../icons/LogoIcon';
import { PreviewAddresses } from './preview/content/PreviewAddresses';
import { PreviewHeader } from './preview/content/PreviewHeader';
import { PreviewItemsTable } from './preview/content/PreviewItemsTable';
import { PreviewNotes } from './preview/content/PreviewNotes';
import { PreviewSummary } from './preview/content/PreviewSummary';

const PREVIEW_BASE_WIDTH = 436;
const PREVIEW_BASE_HEIGHT = 618;
const PREVIEW_FRAME_BUFFER = 16;

export function PreviewPanel() {
    const scale = usePreviewScale();
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
    const formatSummaryAmount = (amount: number) =>
        formatCurrencyFull(amount, currency.symbol);

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

    const logoBox = (
        <div className="shrink-0 overflow-hidden">
            {issuer.logo ? (
                <div
                    className="flex aspect-square! size-[36px] items-center justify-center rounded-[4px]  bg-preview-0"
                    style={{
                        borderColor: 'var(--preview-200)',
                    }}
                >
                    <img
                        src={issuer.logo}
                        alt="Logo"
                        className="h-full w-full object-contain rounded-[4px]"
                        crossOrigin="anonymous"
                    />
                </div>
            ) : (
                <div
                    className="flex aspect-square! size-[36px] items-center justify-center rounded-[4px] border border-dashed bg-preview-0"
                    style={{
                        borderColor: 'var(--preview-200)',
                    }}
                >
                    <LogoIcon size={12} />
                </div>
            )}
        </div>
    );

    const previewColor = display?.color ?? 'gray';
    const previewStyle = display?.style ?? 'solid';

    const scaledWidth = PREVIEW_BASE_WIDTH * scale;
    const scaledHeight = PREVIEW_BASE_HEIGHT * scale;
    const wrapperWidth = scaledWidth + PREVIEW_FRAME_BUFFER * 2;
    const wrapperHeight = scaledHeight + PREVIEW_FRAME_BUFFER * 2;
    const bufferPx = PREVIEW_FRAME_BUFFER / scale;

    return (
        <div
            className="flex shrink-0 items-start justify-center lg:h-full lg:p-4"
            data-preview-color={previewColor}
            data-preview-style={previewStyle}
        >
            <div className="shrink-0 w-fit h-fit overflow-visible">
                <div
                    className="overflow-visible"
                    style={{ width: wrapperWidth, height: wrapperHeight }}
                >
                    <div
                        className="origin-top-left overflow-visible"
                        style={{
                            width: PREVIEW_BASE_WIDTH,
                            height: PREVIEW_BASE_HEIGHT,
                            transform: `scale(${scale}) translate(${bufferPx}px, ${bufferPx}px)`,
                        }}
                    >
                    <div className="bg-preview-stripes relative h-full w-full overflow-visible rounded-[8px] p-[8px] shadow-preview-frame">
                        <div className="relative z-10 flex h-full min-h-0 w-full flex-col overflow-visible rounded-[6px] border border-preview-100 bg-preview-0 inside-preview-frame">
                            <div className="flex min-h-0 flex-1 flex-col overflow-auto text-[10px]">
                                <PreviewHeader
                                    issuer={issuer}
                                    details={details}
                                    placeholders={placeholders}
                                    logoBox={logoBox}
                                />
                                <PreviewAddresses
                                    issuer={issuer}
                                    billTo={billTo}
                                    placeholders={placeholders}
                                />
                                <PreviewItemsTable
                                    items={items}
                                    placeholders={placeholders}
                                    formatAmount={formatAmount}
                                />
                                <PreviewSummary
                                    subtotal={subtotal}
                                    discountAmount={discountAmount}
                                    discount={discount}
                                    discountType={discountType}
                                    taxAmount={taxAmount}
                                    tax={tax}
                                    taxType={taxType}
                                    total={total}
                                    formatAmount={formatSummaryAmount}
                                />
                                <PreviewNotes
                                    notes={notes}
                                    placeholder={placeholders.notes}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

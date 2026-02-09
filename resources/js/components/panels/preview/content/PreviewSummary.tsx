type AmountType = 'percentage' | 'currency';

type PreviewSummaryProps = {
    forExport: boolean;
    subtotal: number;
    discountAmount: number;
    discount: number;
    discountType: AmountType;
    taxAmount: number;
    tax: number;
    taxType: AmountType;
    total: number;
    formatAmount: (amount: number) => string;
};

export function PreviewSummary({
    forExport,
    subtotal,
    discountAmount,
    discount,
    discountType,
    taxAmount,
    tax,
    taxType,
    total,
    formatAmount,
}: PreviewSummaryProps) {
    const amountClass = forExport
        ? 'shrink-0 text-right text-preview-500'
        : 'min-w-0 overflow-hidden text-right text-preview-500';
    const totalAmountClass = forExport
        ? 'shrink-0 text-right'
        : 'min-w-0 overflow-hidden text-right';

    const summaryAllZero =
        subtotal === 0 && discountAmount === 0 && taxAmount === 0;

    return (
        <div
            className={`${forExport ? 'ml-auto flex w-[220px] flex-col gap-2 py-3 pe-4 text-preview-400' : 'ml-auto flex w-[196px] flex-col gap-2 py-3 pe-4 text-preview-400'} ${summaryAllZero ? 'opacity-50' : ''}`}
        >
            <div
                className={`flex min-w-0 justify-between gap-2 ${subtotal === 0 && !summaryAllZero ? 'opacity-50' : ''}`}
            >
                <span className="shrink-0">Subtotal</span>
                <span
                    className={amountClass}
                    dir="ltr"
                    title={formatAmount(subtotal)}
                >
                    {formatAmount(subtotal)}
                </span>
            </div>

            <div
                className={`flex min-w-0 justify-between gap-2 ${discountAmount === 0 && !summaryAllZero ? 'opacity-50' : ''}`}
            >
                <span className="shrink-0">
                    Discount
                    {discountType === 'percentage' && ` (${discount}%)`}
                </span>
                <span
                    className={amountClass}
                    dir="ltr"
                    title={formatAmount(-discountAmount)}
                >
                    {formatAmount(-discountAmount)}
                </span>
            </div>

            <div
                className={`flex min-w-0 justify-between gap-2 ${taxAmount === 0 && !summaryAllZero ? 'opacity-50' : ''}`}
            >
                <span className="shrink-0">
                    Tax
                    {taxType === 'percentage' && ` (${tax}%)`}
                </span>
                <span
                    className={amountClass}
                    dir="ltr"
                    title={formatAmount(taxAmount)}
                >
                    {formatAmount(taxAmount)}
                </span>
            </div>

            <div
                className={`flex min-w-0 justify-between gap-2 font-semibold text-preview-700 ${total === 0 && !summaryAllZero ? 'opacity-50' : ''}`}
            >
                <span className="shrink-0">Total</span>
                <span
                    className={totalAmountClass}
                    dir="ltr"
                    title={formatAmount(total)}
                >
                    {formatAmount(total)}
                </span>
            </div>
        </div>
    );
}

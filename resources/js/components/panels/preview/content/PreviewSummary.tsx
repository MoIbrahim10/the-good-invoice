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
        ? 'shrink-0 text-right text-text-default'
        : 'min-w-0 overflow-hidden text-right text-text-default';
    const totalAmountClass = forExport
        ? 'shrink-0 text-right'
        : 'min-w-0 overflow-hidden text-right';

    return (
        <div
            className={
                forExport
                    ? 'ml-auto flex w-[220px] flex-col gap-2 py-3 pe-4 text-[12px] text-text-weak'
                    : 'ml-auto flex w-[190px] flex-col gap-2 py-3 pe-4 text-[12px] text-text-weak'
            }
        >
            <div className="flex min-w-0 justify-between gap-2">
                <span className="shrink-0">Subtotal</span>
                <span
                    className={amountClass}
                    dir="ltr"
                    title={formatAmount(subtotal)}
                >
                    {formatAmount(subtotal)}
                </span>
            </div>

            <div className="flex min-w-0 justify-between gap-2">
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

            <div className="flex min-w-0 justify-between gap-2">
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

            <div className="flex min-w-0 justify-between gap-2 font-medium text-text-strong">
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

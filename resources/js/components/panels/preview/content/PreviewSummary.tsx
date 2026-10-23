import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { summaryLineAnimation } from '@/lib/itemRowAnimation';

type AmountType = 'percentage' | 'currency';

type PreviewSummaryProps = {
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
    const amountClass = 'min-w-0 overflow-hidden text-right text-preview-500';
    const totalAmountClass = 'min-w-0 overflow-hidden text-right';

    const summaryAllZero =
        subtotal === 0 && discountAmount === 0 && taxAmount === 0;

    return (
        <div
            className={`ml-auto flex w-[202px] flex-col gap-2 py-3 pe-4 text-preview-400 ${summaryAllZero ? 'opacity-50' : ''}`}
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

            <AnimatePresence initial={false} mode="sync">
                {discountAmount !== 0 && (
                    <motion.div
                        key="discount"
                        className="flex min-w-0 justify-between gap-2"
                        layout
                        initial={summaryLineAnimation.initial}
                        animate={summaryLineAnimation.animate}
                        exit={summaryLineAnimation.exit}
                        transition={summaryLineAnimation.transition}
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
                    </motion.div>
                )}
                {taxAmount !== 0 && (
                    <motion.div
                        key="tax"
                        className="flex min-w-0 justify-between gap-2"
                        layout
                        initial={summaryLineAnimation.initial}
                        animate={summaryLineAnimation.animate}
                        exit={summaryLineAnimation.exit}
                        transition={summaryLineAnimation.transition}
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
                    </motion.div>
                )}
            </AnimatePresence>

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

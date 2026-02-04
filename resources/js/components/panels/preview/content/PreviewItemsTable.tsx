import type { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { itemRowAnimation } from '@/lib/itemRowAnimation';
import { formatNumberForDisplay } from '@/lib/utils';
import type { InvoiceItem } from '@/types/invoice';
import { PreviewText } from './PreviewText';

type Placeholders = {
    items: { description: string; quantity: string };
};

type PreviewItemsTableProps = {
    forExport: boolean;
    items: InvoiceItem[];
    placeholders: Placeholders;
    formatAmount: (amount: number) => string;
    RowWrapper: 'tr' | typeof motion.tr;
};

export function PreviewItemsTable({
    forExport,
    items,
    placeholders,
    formatAmount,
    RowWrapper,
}: PreviewItemsTableProps) {
    return (
        <div>
            <table className="w-full table-fixed text-left">
                <colgroup>
                    <col
                        style={{
                            width: `${(220 / 406) * 100}%`,
                        }}
                    />
                    <col
                        style={{
                            width: `${(62 / 406) * 100}%`,
                        }}
                    />
                    <col
                        style={{
                            width: `${(62 / 406) * 100}%`,
                        }}
                    />
                    <col
                        style={{
                            width: `${(62 / 406) * 100}%`,
                        }}
                    />
                </colgroup>
                <thead>
                    <tr className="border-y border-preview-200 bg-preview-style-bg text-[12px] text-text-weak transition-colors duration-150 ease-in-out">
                        <th className="py-2 ps-4">Item</th>
                        <th className="py-2">QTY</th>
                        <th className="py-2">Rate</th>
                        <th className="py-2 pe-4 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody className="relative text-[12px] text-text-strong">
                    {items.length > 0 ? (
                        forExport ? (
                            items.map((item: InvoiceItem, index) => {
                                const isFirst = index === 0;
                                const isLast = index === items.length - 1;
                                const rowPadding =
                                    isFirst && isLast
                                        ? 'pt-4 pb-4'
                                        : isFirst
                                          ? 'pt-4 pb-1'
                                          : isLast
                                            ? 'pt-1 pb-4'
                                            : 'py-1';
                                return (
                                    <tr key={item.id}>
                                        <td
                                            className={`${rowPadding} min-w-0 overflow-visible ps-4`}
                                        >
                                            <p
                                                className={
                                                    forExport
                                                        ? 'wrap-break-word'
                                                        : 'truncate'
                                                }
                                            >
                                                <PreviewText
                                                    value={item.description}
                                                    placeholder={
                                                        placeholders.items
                                                            .description
                                                    }
                                                />
                                            </p>
                                        </td>
                                        <td
                                            className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`}
                                        >
                                            {item.quantity === 0 ? (
                                                <span className="opacity-50">
                                                    {
                                                        placeholders.items
                                                            .quantity
                                                    }
                                                </span>
                                            ) : (
                                                formatNumberForDisplay(
                                                    item.quantity,
                                                )
                                            )}
                                        </td>
                                        <td
                                            className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`}
                                        >
                                            {item.rate === 0 ? (
                                                <span className="opacity-50">
                                                    {formatAmount(0)}
                                                </span>
                                            ) : (
                                                formatAmount(item.rate)
                                            )}
                                        </td>
                                        <td
                                            className={`${rowPadding} min-w-0 overflow-hidden pe-4 text-right`}
                                        >
                                            {item.quantity * item.rate === 0 ? (
                                                <span className="opacity-50">
                                                    {formatAmount(0)}
                                                </span>
                                            ) : (
                                                formatAmount(
                                                    item.quantity * item.rate,
                                                )
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <AnimatePresence initial={false} mode="popLayout">
                                {items.map(
                                    (item: InvoiceItem, index: number) => {
                                        const isFirst = index === 0;
                                        const isLast =
                                            index === items.length - 1;
                                        const rowPadding =
                                            isFirst && isLast
                                                ? 'pt-4 pb-4'
                                                : isFirst
                                                  ? 'pt-4 pb-1'
                                                  : isLast
                                                    ? 'pt-1 pb-4'
                                                    : 'py-1';
                                        return (
                                            <RowWrapper
                                                key={item.id}
                                                layout
                                                initial={
                                                    itemRowAnimation.initial
                                                }
                                                animate={
                                                    itemRowAnimation.animate
                                                }
                                                exit={itemRowAnimation.exit}
                                                transition={
                                                    itemRowAnimation.transition
                                                }
                                            >
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden ps-4`}
                                                >
                                                    <p className="truncate">
                                                        <PreviewText
                                                            value={
                                                                item.description
                                                            }
                                                            placeholder={
                                                                placeholders
                                                                    .items
                                                                    .description
                                                            }
                                                        />
                                                    </p>
                                                </td>
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {item.quantity === 0 ? (
                                                        <span
                                                            className="opacity-50"
                                                            title={
                                                                placeholders
                                                                    .items
                                                                    .quantity
                                                            }
                                                        >
                                                            {
                                                                placeholders
                                                                    .items
                                                                    .quantity
                                                            }
                                                        </span>
                                                    ) : (
                                                        formatNumberForDisplay(
                                                            item.quantity,
                                                        )
                                                    )}
                                                </td>
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`}
                                                >
                                                    {item.rate === 0 ? (
                                                        <span
                                                            className="opacity-50"
                                                            title={formatAmount(
                                                                0,
                                                            )}
                                                        >
                                                            {formatAmount(0)}
                                                        </span>
                                                    ) : (
                                                        formatAmount(item.rate)
                                                    )}
                                                </td>
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden pe-4 text-right`}
                                                >
                                                    {item.quantity *
                                                        item.rate ===
                                                    0 ? (
                                                        <span className="opacity-50">
                                                            {formatAmount(0)}
                                                        </span>
                                                    ) : (
                                                        formatAmount(
                                                            item.quantity *
                                                                item.rate,
                                                        )
                                                    )}
                                                </td>
                                            </RowWrapper>
                                        );
                                    },
                                )}
                            </AnimatePresence>
                        )
                    ) : (
                        <tr>
                            <td className="ps-4 pt-4 pb-4">
                                No items added yet...
                            </td>
                            <td className="pt-4 pb-4">-</td>
                            <td className="pt-4 pb-4">-</td>
                            <td className="pe-4 pt-4 pb-4 text-right">-</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

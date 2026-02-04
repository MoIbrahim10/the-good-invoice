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
    const isDescriptionFilled = (i: InvoiceItem) => {
        const t = i.description?.trim();
        return Boolean(t && t !== placeholders.items.description);
    };
    const hasItemDescription = items.some(isDescriptionFilled);
    const hasQuantity = items.some((i) => i.quantity !== 0);
    const hasRate = items.some((i) => i.rate !== 0);
    const hasAmount = items.some((i) => i.quantity * i.rate !== 0);

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
                    <tr className="border-y border-preview-200 bg-preview-style-bg text-[10px] text-preview-400 transition-colors duration-150 ease-in-out">
                        <th
                            className={`py-2 ps-4 ${hasItemDescription ? 'opacity-100' : 'opacity-50'}`}
                        >
                            Item
                        </th>
                        <th
                            className={`py-2 ${hasQuantity ? 'opacity-100' : 'opacity-50'}`}
                        >
                            QTY
                        </th>
                        <th
                            className={`py-2 ${hasRate ? 'opacity-100' : 'opacity-50'}`}
                        >
                            Rate
                        </th>
                        <th
                            className={`py-2 pe-4 text-right ${hasAmount ? 'opacity-100' : 'opacity-50'}`}
                        >
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody className="relative text-[10px] text-preview-700">
                    {items.length > 0 ? (
                        forExport ? (
                            items.map((item: InvoiceItem, index) => {
                                const isFirst = index === 0;
                                const isLast = index === items.length - 1;
                                const rowPadding =
                                    isFirst && isLast
                                        ? 'pt-3 pb-3'
                                        : isFirst
                                          ? 'pt-3 pb-2'
                                          : isLast
                                            ? 'pt-2 pb-3'
                                            : 'py-2';
                                const descriptionEmpty =
                                    !item.description?.trim() ||
                                    item.description?.trim() ===
                                        placeholders.items.description;
                                return (
                                    <tr key={item.id}>
                                        <td
                                            className={`${rowPadding} min-w-0 overflow-visible ps-4 ${descriptionEmpty ? 'opacity-50' : ''}`}
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
                                                    suppressPlaceholderOpacity
                                                />
                                            </p>
                                        </td>
                                        <td
                                            className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${item.quantity === 0 ? 'opacity-50' : ''}`}
                                        >
                                            {item.quantity === 0
                                                ? placeholders.items.quantity
                                                : formatNumberForDisplay(
                                                      item.quantity,
                                                  )}
                                        </td>
                                        <td
                                            className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${item.rate === 0 ? 'opacity-50' : ''}`}
                                        >
                                            {formatAmount(item.rate)}
                                        </td>
                                        <td
                                            className={`${rowPadding} min-w-0 overflow-hidden pe-4 text-right ${item.quantity * item.rate === 0 ? 'opacity-50' : ''}`}
                                        >
                                            {formatAmount(
                                                item.quantity * item.rate,
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
                                                ? 'pt-3 pb-3'
                                                : isFirst
                                                  ? 'pt-3 pb-2'
                                                  : isLast
                                                    ? 'pt-2 pb-3'
                                                    : 'py-2';
                                        const descriptionEmpty =
                                            !item.description?.trim() ||
                                            item.description?.trim() ===
                                                placeholders.items.description;
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
                                                    className={`${rowPadding} min-w-0 overflow-hidden ps-4 ${descriptionEmpty ? 'opacity-50' : ''}`}
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
                                                            suppressPlaceholderOpacity
                                                        />
                                                    </p>
                                                </td>
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${item.quantity === 0 ? 'opacity-50' : ''}`}
                                                    title={
                                                        item.quantity === 0
                                                            ? placeholders.items
                                                                  .quantity
                                                            : undefined
                                                    }
                                                >
                                                    {item.quantity === 0
                                                        ? placeholders.items
                                                              .quantity
                                                        : formatNumberForDisplay(
                                                              item.quantity,
                                                          )}
                                                </td>
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${item.rate === 0 ? 'opacity-50' : ''}`}
                                                    title={formatAmount(
                                                        item.rate,
                                                    )}
                                                >
                                                    {formatAmount(item.rate)}
                                                </td>
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden pe-4 text-right ${item.quantity * item.rate === 0 ? 'opacity-50' : ''}`}
                                                >
                                                    {formatAmount(
                                                        item.quantity *
                                                            item.rate,
                                                    )}
                                                </td>
                                            </RowWrapper>
                                        );
                                    },
                                )}
                            </AnimatePresence>
                        )
                    ) : (
                        <tr className="opacity-50">
                            <td className="ps-4 pt-3 pb-3">
                                No items added yet...
                            </td>
                            <td className="pt-3 pb-3">-</td>
                            <td className="pt-3 pb-3">-</td>
                            <td className="pe-4 pt-3 pb-3 text-right">-</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

import type { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { itemRowAnimation } from '@/lib/itemRowAnimation';
import { formatNumberForDisplay } from '@/lib/utils';
import type { InvoiceItem } from '@/types/invoice';
import { PreviewText } from './PreviewText';

type Placeholders = {
    items: { description: string; quantity: string };
};

function getRowPadding(index: number, total: number): string {
    const isFirst = index === 0;
    const isLast = index === total - 1;
    if (isFirst && isLast) return 'pt-3 pb-3';
    if (isFirst) return 'pt-3 pb-2';
    if (isLast) return 'pt-2 pb-3';
    return 'py-2';
}

function isDescriptionEmpty(
    item: InvoiceItem,
    placeholderDescription: string,
): boolean {
    const trimmed = item.description?.trim();
    return !trimmed || trimmed === placeholderDescription;
}

type RowCellsProps = {
    item: InvoiceItem;
    rowPadding: string;
    descriptionEmpty: boolean;
    forExport: boolean;
    placeholders: Placeholders;
    formatAmount: (amount: number) => string;
};

function RowCells({
    item,
    rowPadding,
    descriptionEmpty,
    forExport,
    placeholders,
    formatAmount,
}: RowCellsProps) {
    const descriptionCellClass = `${rowPadding} min-w-0 overflow-visible ps-4 pe-[2px] ${descriptionEmpty ? 'opacity-50' : ''}`;
    const descriptionParagraphClass = 'min-w-0 wrap-break-word';
    const quantityCellClass = `${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap px-[2px] ${item.quantity === 0 ? 'opacity-50' : ''}`;
    const rateCellClass = `${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap px-[2px] ${item.rate === 0 ? 'opacity-50' : ''}`;
    const amountCellClass = `${rowPadding} min-w-0 overflow-hidden ps-[2px] pe-4 text-right ${item.quantity * item.rate === 0 ? 'opacity-50' : ''}`;

    return (
        <>
            <td className={descriptionCellClass}>
                <p className={descriptionParagraphClass}>
                    <PreviewText
                        value={item.description}
                        placeholder={placeholders.items.description}
                        suppressPlaceholderOpacity
                    />
                </p>
            </td>
            <td
                className={quantityCellClass}
                title={
                    forExport
                        ? undefined
                        : item.quantity === 0
                          ? placeholders.items.quantity
                          : undefined
                }
            >
                {item.quantity === 0
                    ? placeholders.items.quantity
                    : formatNumberForDisplay(item.quantity)}
            </td>
            <td
                className={rateCellClass}
                title={forExport ? undefined : formatAmount(item.rate)}
            >
                {formatAmount(item.rate)}
            </td>
            <td className={amountCellClass}>
                {formatAmount(item.quantity * item.rate)}
            </td>
        </>
    );
}

type PreviewItemsTableBodyProps = {
    forExport: boolean;
    items: InvoiceItem[];
    placeholders: Placeholders;
    formatAmount: (amount: number) => string;
    RowWrapper: 'tr' | typeof motion.tr;
};

export function PreviewItemsTableBody({
    forExport,
    items,
    placeholders,
    formatAmount,
    RowWrapper,
}: PreviewItemsTableBodyProps) {
    const renderRow = (item: InvoiceItem, index: number) => {
        const rowPadding = getRowPadding(index, items.length);
        const descriptionEmpty = isDescriptionEmpty(
            item,
            placeholders.items.description,
        );
        const cells = (
            <RowCells
                item={item}
                rowPadding={rowPadding}
                descriptionEmpty={descriptionEmpty}
                forExport={forExport}
                placeholders={placeholders}
                formatAmount={formatAmount}
            />
        );

        if (forExport) {
            return <tr key={item.id}>{cells}</tr>;
        }

        return (
            <RowWrapper
                key={item.id}
                layout
                initial={itemRowAnimation.initial}
                animate={itemRowAnimation.animate}
                exit={itemRowAnimation.exit}
                transition={itemRowAnimation.transition}
            >
                {cells}
            </RowWrapper>
        );
    };

    if (forExport) {
        return <>{items.map((item, index) => renderRow(item, index))}</>;
    }

    return (
        <AnimatePresence initial={false} mode="sync">
            {items.map((item, index) => renderRow(item, index))}
        </AnimatePresence>
    );
}

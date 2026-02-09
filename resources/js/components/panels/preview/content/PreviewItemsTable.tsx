import type { motion } from 'motion/react';
import type { InvoiceItem } from '@/types/invoice';
import { PreviewItemsTableBody } from './PreviewItemsTableBody';
import { PreviewItemsTableEmptyState } from './PreviewItemsTableEmptyState';

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
                    <col style={{ width: '51%' }} />
                    <col style={{ width: '12.5%' }} />
                    <col style={{ width: '18.5%' }} />
                    <col style={{ width: '18.5%' }} />
                </colgroup>
                <thead>
                    <tr className="border-y border-preview-200 bg-preview-style-bg text-preview-400 transition-colors duration-150 ease-in-out">
                        <th
                            className={`py-2 ps-4 pe-[2px] ${hasItemDescription ? 'opacity-100' : 'opacity-50'}`}
                        >
                            Item
                        </th>
                        <th
                            className={`py-2 px-[2px] ${hasQuantity ? 'opacity-100' : 'opacity-50'}`}
                        >
                            QTY
                        </th>
                        <th
                            className={`py-2 px-[2px] ${hasRate ? 'opacity-100' : 'opacity-50'}`}
                        >
                            Rate
                        </th>
                        <th
                            className={`py-2 ps-[2px] pe-4 text-right ${hasAmount ? 'opacity-100' : 'opacity-50'}`}
                        >
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody className="relative text-preview-700">
                    {items.length > 0 ? (
                        <PreviewItemsTableBody
                            forExport={forExport}
                            items={items}
                            placeholders={placeholders}
                            formatAmount={formatAmount}
                            RowWrapper={RowWrapper}
                        />
                    ) : (
                        <PreviewItemsTableEmptyState />
                    )}
                </tbody>
            </table>
        </div>
    );
}

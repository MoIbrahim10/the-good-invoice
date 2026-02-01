import { format } from 'date-fns';
import { currencies } from '@/data/currencies';
import { useInvoiceState } from '@/hooks/use-invoice-state';
import {
    formatCurrencyForDisplay,
    formatNumberForDisplay,
} from '@/lib/utils';
import type { InvoiceItem } from '@/types/invoice';
import { LogoIcon } from '../icons/LogoIcon';

export function PreviewPanel() {
    const { state } = useInvoiceState();
    const { data } = state;
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

    return (
        <div className="h-full overflow-hidden bg-bg-weak p-8">
            {/* Airmail Frame Container */}
            <div className="relative h-full w-full rounded-[8px] bg-preview-stripes p-[14px] shadow-preview-frame">
                {/* Invoice Card */}
                <div className="h-full w-full overflow-auto rounded-[6px] border border-gray-100 bg-gray-0 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-2.5 p-4 border-b-layered">
                        <div className="flex aspect-square w-[36px] items-center justify-center rounded-[6px] border border-dashed border-stroke-strong bg-bg-strong px-3 py-2">
                            {issuer.logo ? (
                                <img
                                    src={issuer.logo}
                                    alt="Logo"
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <LogoIcon size={18} />
                            )}
                        </div>

                        <div className="flex w-full flex-col justify-center gap-[2px]">
                            <h1 className="text-[12px] text-text-strong">
                                Invoice from {issuer.name || 'Jane Doe'}
                            </h1>
                            <div className="flex items-center justify-between">
                                <p className="text-[12px] text-text-weak">
                                    Due{' '}
                                    {details.dueDate
                                        ? format(
                                              new Date(details.dueDate),
                                              'dd/MM/yyyy',
                                          )
                                        : 'DD/MM/YYYY'}
                                </p>
                                <p className="text-[12px] text-text-weaker">
                                    {details.invoiceNumber || 'INV00-001'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="grid grid-cols-2 gap-2.5 p-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-[12px] text-text-default">
                                Bill from
                            </h3>
                            <p className="text-[12px] text-text-strong">
                                {issuer.name || 'Jane Doe'}
                            </p>
                            <p className="text-[12px] text-text-strong">
                                {issuer.address || 'Street, city, country'}
                            </p>
                            <p className="text-[12px] text-text-strong">
                                {issuer.email || 'jane@example.com'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-[12px] text-text-default">
                                Bill to
                            </h3>
                            <p className="text-[12px] text-text-strong">
                                {billTo.address || 'Street, city, country'}
                            </p>

                            <p className="text-[12px] text-text-strong">
                                {billTo.email || 'john@example.com'}
                            </p>
                        </div>
                    </div>

                    {/* Items Table */}
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
                                <tr className="text-[12px] text-text-weak border-b-layered border-t-layered">
                                    <th className="py-2 ps-4">Item</th>
                                    <th className="py-2">QTY</th>
                                    <th className="py-2">Rate</th>
                                    <th className="py-2 pe-4 text-right">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px] text-text-strong">
                                {items.length > 0 ? (
                                    items.map((item: InvoiceItem, index) => {
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
                                            <tr key={item.id}>
                                                <td
                                                    className={`${rowPadding} ps-4 min-w-0 overflow-hidden`}
                                                >
                                                    <p
                                                        className="truncate"
                                                        title={
                                                            item.description ||
                                                            'Description'
                                                        }
                                                    >
                                                        {item.description ||
                                                            'Description'}
                                                    </p>
                                                </td>
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`}
                                                    title={String(
                                                        item.quantity,
                                                    )}
                                                >
                                                    {formatNumberForDisplay(
                                                        item.quantity,
                                                    )}
                                                </td>
                                                <td
                                                    className={`${rowPadding} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`}
                                                    title={formatAmount(
                                                        item.rate,
                                                    )}
                                                >
                                                    {formatAmount(item.rate)}
                                                </td>
                                                <td
                                                    className={`${rowPadding} pe-4 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-right`}
                                                    title={formatAmount(
                                                        item.quantity *
                                                            item.rate,
                                                    )}
                                                >
                                                    {formatAmount(
                                                        item.quantity *
                                                            item.rate,
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td className="ps-4 pt-4 pb-4">
                                            No items added yet...
                                        </td>
                                        <td className="pt-4 pb-4">-</td>
                                        <td className="pt-4 pb-4">-</td>
                                        <td className="pe-4 pt-4 pb-4 text-right">
                                            -
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="ml-auto w-[190px] py-3 pe-4 flex flex-col gap-2 text-[12px] text-text-weak">
                        <div className="flex justify-between gap-2 min-w-0">
                            <span className="shrink-0">
                                Subtotal
                            </span>
                            <span
                                className="text-text-default min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-right"
                                title={formatAmount(subtotal)}
                            >
                                {formatAmount(subtotal)}
                            </span>
                        </div>

                        <div className="flex justify-between gap-2 min-w-0">
                            <span className="shrink-0">
                                Discount
                                {discountType === 'percentage' &&
                                    ` (${discount}%)`}
                            </span>
                            <span
                                className="text-text-default min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-right"
                                title={formatAmount(discountAmount)}
                            >
                                -{formatAmount(discountAmount)}
                            </span>
                        </div>

                        <div className="flex justify-between gap-2 min-w-0">
                            <span className="shrink-0">
                                Tax
                                {taxType === 'percentage' && ` (${tax}%)`}
                            </span>
                            <span
                                className="text-text-default min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-right"
                                title={formatAmount(taxAmount)}
                            >
                                {formatAmount(taxAmount)}
                            </span>
                        </div>

                        <div className="flex justify-between gap-2 min-w-0 text-text-strong font-medium">
                            <span className="shrink-0">Total</span>
                            <span
                                className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-right"
                                title={formatAmount(total)}
                            >
                                {formatAmount(total)}
                            </span>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="pb-3 px-4 mt-auto">
                        <h4 className="mb-1 text-[10px] text-text-weak">
                            Notes
                        </h4>
                        <p className="text-[10px] text-text-default">
                            {notes || 'IBAN No: 287126'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { format } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import { currencies } from '@/data/currencies';
import { useInvoiceState } from '@/hooks/use-invoice-state';
import { itemRowAnimation } from '@/lib/itemRowAnimation';
import { formatCurrencyForDisplay, formatNumberForDisplay } from '@/lib/utils';
import type { InvoiceItem } from '@/types/invoice';
import { LogoIcon } from '../icons/LogoIcon';

function PreviewText({
    value,
    placeholder,
    className = '',
}: {
    value: string | number;
    placeholder: string;
    className?: string;
}) {
    const isEmpty =
        value === '' ||
        value === 0 ||
        (typeof value === 'string' && value.trim() === '');
    const displayValue = isEmpty ? placeholder : String(value);
    return (
        <span
            className={isEmpty ? `opacity-50 ${className}` : className}
            title={displayValue}
        >
            {displayValue}
        </span>
    );
}

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

    const isAccent = display?.style === 'accent';

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
            <div className="flex aspect-square w-[36px] items-center justify-center rounded-[6px] border border-dashed border-stroke-strong bg-bg-strong">
                {issuer.logo ? (
                    <img
                        src={issuer.logo}
                        alt="Logo"
                        className="h-full w-full object-contain"
                        crossOrigin="anonymous"
                    />
                ) : (
                    <LogoIcon size={18} />
                )}
            </div>
        </div>
    );

    return (
        <div
            className={wrapperClassName}
            style={wrapperStyle}
            data-export-root={forExport ? 'true' : undefined}
        >
            <div className="relative h-full w-full rounded-[8px] bg-preview-stripes p-[14px] shadow-preview-frame">
                <div className="flex h-full w-full flex-col overflow-auto rounded-[6px] border border-gray-100 bg-gray-0">
                    {/* Header */}
                    <div
                        className={`flex items-center gap-2.5 p-4 border-b-layered transition-colors  duration-150 ease-in-out ${isAccent ? 'bg-bg-default' : 'bg-gray-0'}`}
                    >
                        {forExport ? (
                            issuer.includeLogo !== false && logoBox
                        ) : (
                            <AnimatePresence initial={false}>
                                {issuer.includeLogo !== false && (
                                    <LogoWrapper
                                        key="preview-logo"
                                        initial={{
                                            width: 0,
                                            opacity: 0,
                                            filter: 'blur(8px)',
                                            scale: 0.85,
                                        }}
                                        animate={{
                                            width: 36,
                                            opacity: 1,
                                            filter: 'blur(0px)',
                                            scale: 1,
                                        }}
                                        exit={{
                                            width: 0,
                                            opacity: 0,
                                            filter: 'blur(6px)',
                                            scale: 0.9,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 260,
                                            damping: 26,
                                        }}
                                        className="shrink-0 overflow-hidden"
                                    >
                                        {logoBox}
                                    </LogoWrapper>
                                )}
                            </AnimatePresence>
                        )}

                        <div className="flex w-full flex-col justify-center gap-[2px]">
                            <h1 className="text-[12px] text-text-strong">
                                Invoice from{' '}
                                <PreviewText
                                    value={issuer.name}
                                    placeholder={placeholders.issuer.name}
                                />
                            </h1>
                            <div className="flex items-center justify-between">
                                <p className="text-[12px] text-text-weak">
                                    Due{' '}
                                    {details.dueDateInput?.trim() ? (
                                        <span className="opacity-100">
                                            {details.dueDateInput}
                                        </span>
                                    ) : details.dueDate ? (
                                        <span className="opacity-100">
                                            {format(
                                                details.dueDate instanceof Date
                                                    ? details.dueDate
                                                    : new Date(details.dueDate),
                                                'dd/MM/yyyy',
                                            )}
                                        </span>
                                    ) : (
                                        <span className="opacity-50">
                                            {placeholders.details.dueDate}
                                        </span>
                                    )}
                                </p>
                                <p className="text-[12px] text-text-weaker">
                                    <PreviewText
                                        value={details.invoiceNumber}
                                        placeholder={
                                            placeholders.details.invoiceNumber
                                        }
                                    />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div
                        className={
                            forExport
                                ? 'grid min-w-0 grid-cols-2 gap-2.5 p-4'
                                : 'grid grid-cols-2 gap-2.5 p-4'
                        }
                    >
                        <div
                            className={
                                forExport
                                    ? 'flex min-w-0 flex-col gap-1 overflow-visible'
                                    : 'flex flex-col gap-1'
                            }
                        >
                            <h3 className="text-[12px] text-text-default">
                                Bill from
                            </h3>
                            <p
                                className={
                                    forExport
                                        ? 'min-w-0 text-[12px] text-text-strong wrap-break-word overflow-visible'
                                        : 'text-[12px] text-text-strong'
                                }
                            >
                                <PreviewText
                                    value={issuer.name}
                                    placeholder={placeholders.issuer.name}
                                />
                            </p>
                            <p
                                className={
                                    forExport
                                        ? 'min-w-0 text-[12px] text-text-strong wrap-break-word overflow-visible'
                                        : 'text-[12px] text-text-strong'
                                }
                            >
                                <PreviewText
                                    value={issuer.address}
                                    placeholder={placeholders.issuer.address}
                                />
                            </p>
                            <p
                                className={
                                    forExport
                                        ? 'min-w-0 text-[12px] text-text-strong wrap-break-word overflow-visible'
                                        : 'text-[12px] text-text-strong'
                                }
                            >
                                <PreviewText
                                    value={issuer.email}
                                    placeholder={placeholders.issuer.email}
                                />
                            </p>
                        </div>
                        <div
                            className={
                                forExport
                                    ? 'flex min-w-0 flex-col gap-1 overflow-visible'
                                    : 'flex flex-col gap-1'
                            }
                        >
                            <h3 className="text-[12px] text-text-default">
                                Bill to
                            </h3>
                            <p
                                className={
                                    forExport
                                        ? 'min-w-0 text-[12px] text-text-strong wrap-break-word overflow-visible'
                                        : 'text-[12px] text-text-strong'
                                }
                            >
                                <PreviewText
                                    value={billTo.name}
                                    placeholder={placeholders.billTo.name}
                                />
                            </p>
                            <p
                                className={
                                    forExport
                                        ? 'min-w-0 text-[12px] text-text-strong wrap-break-word overflow-visible'
                                        : 'text-[12px] text-text-strong'
                                }
                            >
                                <PreviewText
                                    value={billTo.address}
                                    placeholder={placeholders.billTo.address}
                                />
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
                                <tr
                                    className={`text-[12px] text-text-weak border-b-layered border-t-layered transition-colors duration-150 ease-in-out ${isAccent ? 'bg-bg-default' : 'bg-gray-0'}`}
                                >
                                    <th className="py-2 ps-4">Item</th>
                                    <th className="py-2">QTY</th>
                                    <th className="py-2">Rate</th>
                                    <th className="py-2 pe-4 text-right">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="relative text-[12px] text-text-strong">
                                {items.length > 0 ? (
                                    forExport ? (
                                        items.map(
                                            (item: InvoiceItem, index) => {
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
                                                            {item.quantity ===
                                                            0 ? (
                                                                <span className="opacity-50">
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
                                                                <span className="opacity-50">
                                                                    {formatAmount(
                                                                        0,
                                                                    )}
                                                                </span>
                                                            ) : (
                                                                formatAmount(
                                                                    item.rate,
                                                                )
                                                            )}
                                                        </td>
                                                        <td
                                                            className={`${rowPadding} min-w-0 overflow-hidden pe-4 text-right`}
                                                        >
                                                            {item.quantity *
                                                                item.rate ===
                                                            0 ? (
                                                                <span className="opacity-50">
                                                                    {formatAmount(
                                                                        0,
                                                                    )}
                                                                </span>
                                                            ) : (
                                                                formatAmount(
                                                                    item.quantity *
                                                                        item.rate,
                                                                )
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            },
                                        )
                                    ) : (
                                        <AnimatePresence
                                            initial={false}
                                            mode="popLayout"
                                        >
                                            {items.map(
                                                (
                                                    item: InvoiceItem,
                                                    index: number,
                                                ) => {
                                                    const isFirst = index === 0;
                                                    const isLast =
                                                        index ===
                                                        items.length - 1;
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
                                                            exit={
                                                                itemRowAnimation.exit
                                                            }
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
                                                                {item.quantity ===
                                                                0 ? (
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
                                                                {item.rate ===
                                                                0 ? (
                                                                    <span
                                                                        className="opacity-50"
                                                                        title={formatAmount(
                                                                            0,
                                                                        )}
                                                                    >
                                                                        {formatAmount(
                                                                            0,
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    formatAmount(
                                                                        item.rate,
                                                                    )
                                                                )}
                                                            </td>
                                                            <td
                                                                className={`${rowPadding} min-w-0 overflow-hidden pe-4 text-right`}
                                                            >
                                                                {item.quantity *
                                                                    item.rate ===
                                                                0 ? (
                                                                    <span className="opacity-50">
                                                                        {formatAmount(
                                                                            0,
                                                                        )}
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
                                        <td className="pe-4 pt-4 pb-4 text-right">
                                            -
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
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
                                className={
                                    forExport
                                        ? 'shrink-0 text-right text-text-default'
                                        : 'min-w-0 overflow-hidden text-right text-text-default'
                                }
                                dir="ltr"
                                title={formatAmount(subtotal)}
                            >
                                {formatAmount(subtotal)}
                            </span>
                        </div>

                        <div className="flex min-w-0 justify-between gap-2">
                            <span className="shrink-0">
                                Discount
                                {discountType === 'percentage' &&
                                    ` (${discount}%)`}
                            </span>
                            <span
                                className={
                                    forExport
                                        ? 'shrink-0 text-right text-text-default'
                                        : 'min-w-0 overflow-hidden text-right text-text-default'
                                }
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
                                className={
                                    forExport
                                        ? 'shrink-0 text-right text-text-default'
                                        : 'min-w-0 overflow-hidden text-right text-text-default'
                                }
                                dir="ltr"
                                title={formatAmount(taxAmount)}
                            >
                                {formatAmount(taxAmount)}
                            </span>
                        </div>

                        <div className="flex min-w-0 justify-between gap-2 font-medium text-text-strong">
                            <span className="shrink-0">Total</span>
                            <span
                                className={
                                    forExport
                                        ? 'shrink-0 text-right'
                                        : 'min-w-0 overflow-hidden text-right'
                                }
                                dir="ltr"
                                title={formatAmount(total)}
                            >
                                {formatAmount(total)}
                            </span>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mt-auto px-4 pb-3">
                        <h4 className="mb-1 text-[10px] text-text-weak">
                            Notes
                        </h4>
                        <p className="text-[10px] text-text-default">
                            <PreviewText
                                value={notes}
                                placeholder={placeholders.notes}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

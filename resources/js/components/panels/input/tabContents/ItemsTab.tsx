import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import { currencies } from '@/data/currencies';
import {
    ITEM_DESCRIPTION_MAX_LENGTH,
    QUANTITY_INPUT_MAX_LENGTH,
    QUANTITY_MAX,
    RATE_INPUT_MAX_LENGTH,
    RATE_MAX,
} from '@/lib/invoiceLimits';
import { itemRowAnimation } from '@/lib/itemRowAnimation';
import { cn } from '@/lib/utils';
import { useInvoiceActions } from '../../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../../hooks/use-invoice-state';
import { useInvoiceValidation } from '../../../../hooks/use-invoice-validation';
import { CustomButton } from '../../../custom/button';
import { LabeledAdjustableInput } from '../../../custom/labeled-adjustable-input';
import { DeleteIcon } from '../../../icons/DeleteIcon';
import { ErrorIconWithTooltip } from '../../../icons/ErrorIconWithTooltip';
import { PlusIcon } from '../../../icons/PlusIcon';
import { useInvoiceTouched } from '../../../providers/InvoiceTouchedProvider';
import { Input } from '../../../ui/input';

const QUANTITY_MIN = 0;
const RATE_MIN = 0;

export function ItemsTab() {
    const { state } = useInvoiceState();
    const { addItem, updateItem, removeItem, updateTax, updateDiscount } =
        useInvoiceActions();
    const { fieldErrors } = useInvoiceValidation();
    const { touchField, clearTouched, isTouched, markDirty, isDirty } =
        useInvoiceTouched();

    const items = state.data.items;
    const currencyCode = state.data.details.currency;
    const placeholders = state.placeholders.items;
    const selectedCurrency = useMemo(
        () => currencies.find((c) => c.code === currencyCode) || currencies[0],
        [currencyCode],
    );

    const handleAddItem = () => {
        if (items.length < 5) {
            addItem({
                id: crypto.randomUUID(),
                description: '',
                quantity: 0,
                rate: 0,
            });
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <table className="w-full table-fixed border-separate border-spacing-0 px-3 pt-3">
                <colgroup>
                    <col style={{ width: `${(207 / 398) * 100}%` }} />
                    <col style={{ width: `${(66 / 398) * 100}%` }} />
                    <col style={{ width: `${(93 / 398) * 100}%` }} />
                    <col style={{ width: `${(32 / 398) * 100}%` }} />
                </colgroup>
                <thead>
                    <tr>
                        <th className="pe-2 pb-2 text-left text-[14px] font-normal text-text-default">
                            Item
                        </th>
                        <th className="pe-2 pb-2 text-left text-[14px] font-normal text-text-default">
                            QTY
                        </th>
                        <th className="pe-2 pb-2 text-left text-[14px] font-normal text-text-default">
                            Rate
                        </th>
                        <th className="pb-2"></th>
                    </tr>
                </thead>
                <tbody className="relative">
                    <AnimatePresence initial={false} mode="sync">
                        {items.map((item, index) => (
                            <motion.tr
                                key={item.id}
                                layout
                                initial={itemRowAnimation.initial}
                                animate={itemRowAnimation.animate}
                                exit={itemRowAnimation.exit}
                                transition={itemRowAnimation.transition}
                            >
                                {/* Description */}
                                <td className="pe-2 pb-2">
                                    <div
                                        className={cn(
                                            'flex h-[32px] items-center gap-1.5 rounded-[6px] border border-stroke-default bg-bg-weak pl-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong focus-within:ring-offset-0',
                                            isTouched(`items.${item.id}.description`) &&
                                                isDirty(`items.${item.id}.description`) &&
                                                fieldErrors[`items.${item.id}.description`]
                                                ? 'pr-[6px]'
                                                : 'pr-3',
                                        )}
                                    >
                                        <label
                                            className="sr-only"
                                            htmlFor={`item-${item.id}-description`}
                                        >
                                            Item {index + 1} description
                                        </label>
                                        <Input
                                            id={`item-${item.id}-description`}
                                            name={`item-${index}-description`}
                                            maxLength={
                                                ITEM_DESCRIPTION_MAX_LENGTH
                                            }
                                            value={item.description}
                                            onChange={(e) => {
                                                markDirty(
                                                    `items.${item.id}.description`,
                                                );
                                                updateItem(item.id, {
                                                    description: e.target.value,
                                                });
                                            }}
                                            onFocus={() =>
                                                clearTouched(
                                                    `items.${item.id}.description`,
                                                )
                                            }
                                            onBlur={() =>
                                                touchField(
                                                    `items.${item.id}.description`,
                                                )
                                            }
                                            placeholder={
                                                placeholders.description
                                            }
                                            aria-invalid={
                                                !!(
                                                    isTouched(
                                                        `items.${item.id}.description`,
                                                    ) &&
                                                    isDirty(
                                                        `items.${item.id}.description`,
                                                    ) &&
                                                    fieldErrors[
                                                        `items.${item.id}.description`
                                                    ]
                                                )
                                            }
                                            className="min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-[14px] font-normal whitespace-nowrap text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                                        />
                                        {isTouched(
                                            `items.${item.id}.description`,
                                        ) &&
                                        isDirty(`items.${item.id}.description`) &&
                                        fieldErrors[
                                            `items.${item.id}.description`
                                        ] ? (
                                            <ErrorIconWithTooltip
                                                message={
                                                    fieldErrors[
                                                        `items.${item.id}.description`
                                                    ]
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </td>

                                {/* QTY */}
                                <td className="pe-2 pb-2">
                                    <div
                                        className={cn(
                                            'flex h-[32px] items-center gap-1.5 rounded-[6px] border border-stroke-default bg-bg-weak pl-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong focus-within:ring-offset-0',
                                            isTouched(`items.${item.id}.quantity`) &&
                                                isDirty(`items.${item.id}.quantity`) &&
                                                fieldErrors[`items.${item.id}.quantity`]
                                                ? 'pr-[6px]'
                                                : 'pr-3',
                                        )}
                                    >
                                        <label
                                            className="sr-only"
                                            htmlFor={`item-${item.id}-quantity`}
                                        >
                                            Item {index + 1} quantity
                                        </label>
                                        <Input
                                            id={`item-${item.id}-quantity`}
                                            name={`item-${index}-quantity`}
                                            type="number"
                                            min={QUANTITY_MIN}
                                            max={QUANTITY_MAX}
                                            value={
                                                item.quantity === 0
                                                    ? ''
                                                    : item.quantity
                                            }
                                            onChange={(e) => {
                                                markDirty(
                                                    `items.${item.id}.quantity`,
                                                );
                                                const val =
                                                    e.target.value.slice(
                                                        0,
                                                        QUANTITY_INPUT_MAX_LENGTH,
                                                    );
                                                const raw = Number(val);
                                                const clamped = Math.max(
                                                    QUANTITY_MIN,
                                                    Math.min(
                                                        QUANTITY_MAX,
                                                        Number.isNaN(raw)
                                                            ? 0
                                                            : Math.floor(raw),
                                                    ),
                                                );
                                                updateItem(item.id, {
                                                    quantity: clamped,
                                                });
                                            }}
                                            onFocus={() =>
                                                clearTouched(
                                                    `items.${item.id}.quantity`,
                                                )
                                            }
                                            onBlur={() =>
                                                touchField(
                                                    `items.${item.id}.quantity`,
                                                )
                                            }
                                            placeholder={placeholders.quantity}
                                            aria-invalid={
                                                !!(
                                                    isTouched(
                                                        `items.${item.id}.quantity`,
                                                    ) &&
                                                    isDirty(
                                                        `items.${item.id}.quantity`,
                                                    ) &&
                                                    fieldErrors[
                                                        `items.${item.id}.quantity`
                                                    ]
                                                )
                                            }
                                            className="min-w-0 flex-1 [appearance:textfield] rounded-none border-0 bg-transparent p-0 text-left text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[14px] dark:bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        {isTouched(`items.${item.id}.quantity`) &&
                                        isDirty(`items.${item.id}.quantity`) &&
                                        fieldErrors[
                                            `items.${item.id}.quantity`
                                        ] ? (
                                            <ErrorIconWithTooltip
                                                message={
                                                    fieldErrors[
                                                        `items.${item.id}.quantity`
                                                    ]
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </td>

                                {/* Rate */}
                                <td className="pe-2 pb-2">
                                    <div
                                        className={cn(
                                            'flex h-[32px] items-center gap-1.5 rounded-[6px] border border-stroke-default bg-bg-weak pl-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong',
                                            isTouched(`items.${item.id}.rate`) &&
                                                isDirty(`items.${item.id}.rate`) &&
                                                fieldErrors[`items.${item.id}.rate`]
                                                ? 'pr-[6px]'
                                                : 'pr-3',
                                        )}
                                    >
                                        <label
                                            className="sr-only"
                                            htmlFor={`item-${item.id}-rate`}
                                        >
                                            Item {index + 1} rate
                                        </label>
                                        <span
                                            className="shrink-0 text-[14px] text-text-weak"
                                            aria-hidden="true"
                                        >
                                            {selectedCurrency.symbol}
                                        </span>
                                        <Input
                                            id={`item-${item.id}-rate`}
                                            name={`item-${index}-rate`}
                                            type="number"
                                            min={RATE_MIN}
                                            max={RATE_MAX}
                                            step="0.01"
                                            value={
                                                item.rate === 0 ? '' : item.rate
                                            }
                                            onChange={(e) => {
                                                markDirty(
                                                    `items.${item.id}.rate`,
                                                );
                                                const val =
                                                    e.target.value.slice(
                                                        0,
                                                        RATE_INPUT_MAX_LENGTH,
                                                    );
                                                const raw = Number(val);
                                                const clamped = Math.max(
                                                    RATE_MIN,
                                                    Math.min(
                                                        RATE_MAX,
                                                        Number.isNaN(raw)
                                                            ? 0
                                                            : raw,
                                                    ),
                                                );
                                                updateItem(item.id, {
                                                    rate: clamped,
                                                });
                                            }}
                                            onFocus={() =>
                                                clearTouched(
                                                    `items.${item.id}.rate`,
                                                )
                                            }
                                            onBlur={() =>
                                                touchField(
                                                    `items.${item.id}.rate`,
                                                )
                                            }
                                            placeholder={placeholders.rate}
                                            aria-invalid={
                                                !!(
                                                    isTouched(
                                                        `items.${item.id}.rate`,
                                                    ) &&
                                                    isDirty(
                                                        `items.${item.id}.rate`,
                                                    ) &&
                                                    fieldErrors[
                                                        `items.${item.id}.rate`
                                                    ]
                                                )
                                            }
                                            className="min-w-0 flex-1 [appearance:textfield] rounded-none border-0 bg-transparent p-0 text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[14px] dark:bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        {isTouched(`items.${item.id}.rate`) &&
                                        isDirty(`items.${item.id}.rate`) &&
                                        fieldErrors[`items.${item.id}.rate`] ? (
                                            <ErrorIconWithTooltip
                                                message={
                                                    fieldErrors[
                                                        `items.${item.id}.rate`
                                                    ]
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </td>

                                {/* Action Button */}
                                <td className="pb-2">
                                    <div className="flex justify-center">
                                        {index === 0 ? (
                                            <CustomButton
                                                icon={<PlusIcon size={18} />}
                                                size="default"
                                                onClick={handleAddItem}
                                                disabled={items.length >= 5}
                                                tooltips={{
                                                    disabled: {
                                                        content: 'Maximum reached',
                                                    },
                                                }}
                                                className="aspect-square h-[32px] w-[32px] p-[7px]"
                                                ariaLabel="Add item"
                                            />
                                        ) : (
                                            <CustomButton
                                                icon={<DeleteIcon size={18} />}
                                                size="default"
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                                className="aspect-square h-[32px] w-[32px] p-[7px]"
                                                ariaLabel="Remove item"
                                            />
                                        )}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>

            {/* Global Tax & Discount - same grid as table so Tax aligns with description column, Discount fills remaining */}
            <div
                className="grid p-3 border-y-layered"
                style={{
                    gridTemplateColumns: `${(207 / 398) * 100}% ${(66 / 398) * 100}% ${(93 / 398) * 100}% ${(32 / 398) * 100}%`,
                }}
            >
                <div className="pe-2">
                    <LabeledAdjustableInput
                        label="Tax"
                        name="invoice-tax"
                        value={state.data.tax}
                        type={state.data.taxType}
                        onValueChange={(value) => updateTax({ value })}
                        onTypeChange={(type) => updateTax({ type })}
                        currencyIcon={selectedCurrency.symbolIcon}
                    />
                </div>
                <div className="col-span-3 min-w-0">
                    <LabeledAdjustableInput
                        label="Discount"
                        name="invoice-discount"
                        value={state.data.discount}
                        type={state.data.discountType}
                        onValueChange={(value) =>
                            updateDiscount({ value })
                        }
                        onTypeChange={(type) =>
                            updateDiscount({ type })
                        }
                        currencyIcon={selectedCurrency.symbolIcon}
                    />
                </div>
            </div>
        </div>
    );
}

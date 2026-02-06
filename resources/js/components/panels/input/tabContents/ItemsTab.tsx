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
                                initial={itemRowAnimation.initial}
                                animate={itemRowAnimation.animate}
                                exit={itemRowAnimation.exit}
                                transition={itemRowAnimation.transition}
                            >
                                {/* Description */}
                                <td className="pe-2 pb-2">
                                    <div className="flex h-[32px] items-center gap-1.5 rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong focus-within:ring-offset-0">
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
                                                    `items.${index}.description`,
                                                );
                                                updateItem(item.id, {
                                                    description: e.target.value,
                                                });
                                            }}
                                            onFocus={() =>
                                                clearTouched(
                                                    `items.${index}.description`,
                                                )
                                            }
                                            onBlur={() =>
                                                touchField(
                                                    `items.${index}.description`,
                                                )
                                            }
                                            placeholder={
                                                placeholders.description
                                            }
                                            aria-invalid={
                                                !!(
                                                    isTouched(
                                                        `items.${index}.description`,
                                                    ) &&
                                                    isDirty(
                                                        `items.${index}.description`,
                                                    ) &&
                                                    fieldErrors[
                                                        `items.${index}.description`
                                                    ]
                                                )
                                            }
                                            className="min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-[14px] font-normal whitespace-nowrap text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                                        />
                                        {isTouched(
                                            `items.${index}.description`,
                                        ) &&
                                        isDirty(`items.${index}.description`) &&
                                        fieldErrors[
                                            `items.${index}.description`
                                        ] ? (
                                            <ErrorIconWithTooltip
                                                message={
                                                    fieldErrors[
                                                        `items.${index}.description`
                                                    ]
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </td>

                                {/* QTY */}
                                <td className="pe-2 pb-2">
                                    <div className="flex h-[32px] items-center gap-1.5 rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong focus-within:ring-offset-0">
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
                                                    `items.${index}.quantity`,
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
                                                    `items.${index}.quantity`,
                                                )
                                            }
                                            onBlur={() =>
                                                touchField(
                                                    `items.${index}.quantity`,
                                                )
                                            }
                                            placeholder={placeholders.quantity}
                                            aria-invalid={
                                                !!(
                                                    isTouched(
                                                        `items.${index}.quantity`,
                                                    ) &&
                                                    isDirty(
                                                        `items.${index}.quantity`,
                                                    ) &&
                                                    fieldErrors[
                                                        `items.${index}.quantity`
                                                    ]
                                                )
                                            }
                                            className="min-w-0 flex-1 [appearance:textfield] rounded-none border-0 bg-transparent p-0 text-left text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[14px] dark:bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        {isTouched(`items.${index}.quantity`) &&
                                        isDirty(`items.${index}.quantity`) &&
                                        fieldErrors[
                                            `items.${index}.quantity`
                                        ] ? (
                                            <ErrorIconWithTooltip
                                                message={
                                                    fieldErrors[
                                                        `items.${index}.quantity`
                                                    ]
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </td>

                                {/* Rate */}
                                <td className="pe-2 pb-2">
                                    <div className="flex h-[32px] items-center gap-1.5 rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong">
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
                                                    `items.${index}.rate`,
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
                                                    `items.${index}.rate`,
                                                )
                                            }
                                            onBlur={() =>
                                                touchField(
                                                    `items.${index}.rate`,
                                                )
                                            }
                                            placeholder={placeholders.rate}
                                            aria-invalid={
                                                !!(
                                                    isTouched(
                                                        `items.${index}.rate`,
                                                    ) &&
                                                    isDirty(
                                                        `items.${index}.rate`,
                                                    ) &&
                                                    fieldErrors[
                                                        `items.${index}.rate`
                                                    ]
                                                )
                                            }
                                            className="min-w-0 flex-1 [appearance:textfield] rounded-none border-0 bg-transparent p-0 text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 md:text-[14px] dark:bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                        {isTouched(`items.${index}.rate`) &&
                                        isDirty(`items.${index}.rate`) &&
                                        fieldErrors[`items.${index}.rate`] ? (
                                            <ErrorIconWithTooltip
                                                message={
                                                    fieldErrors[
                                                        `items.${index}.rate`
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

            {/* Global Tax & Discount */}
            <div className="flex gap-2 p-3 border-y-layered">
                <LabeledAdjustableInput
                    label="Tax"
                    name="invoice-tax"
                    value={state.data.tax}
                    type={state.data.taxType}
                    onValueChange={(value) => updateTax({ value })}
                    onTypeChange={(type) => updateTax({ type })}
                    currencyIcon={selectedCurrency.symbolIcon}
                    containerClassName="flex-none w-[calc(207/398*100%)]"
                />

                <LabeledAdjustableInput
                    label="Discount"
                    name="invoice-discount"
                    value={state.data.discount}
                    type={state.data.discountType}
                    onValueChange={(value) => updateDiscount({ value })}
                    onTypeChange={(type) => updateDiscount({ type })}
                    currencyIcon={selectedCurrency.symbolIcon}
                />
            </div>
        </div>
    );
}

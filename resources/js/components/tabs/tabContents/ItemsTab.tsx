import { useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { currencies } from '@/data/currencies';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { CustomButton } from '../../custom/button';
import { DeleteIcon } from '../../icons/DeleteIcon';
import { PlusIcon } from '../../icons/PlusIcon';
import { Input } from '../../ui/input';
import { LabeledAdjustableInput } from '../../custom/labeled-adjustable-input';

const QUANTITY_MIN = 0;
const QUANTITY_MAX = 999_999;
const RATE_MIN = 0;
const RATE_MAX = 999_999_999;

export function ItemsTab() {
    const { state } = useInvoiceState();
    const { addItem, updateItem, removeItem, updateTax, updateDiscount } =
        useInvoiceActions();

    const items = state.data.items;
    const currencyCode = state.data.details.currency;
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
                        <th className="pe-2 pb-2 text-left text-[14px] leading-[17px] font-normal text-text-default">
                            Item
                        </th>
                        <th className="pe-2 pb-2 text-left text-[14px] leading-[17px] font-normal text-text-default">
                            QTY
                        </th>
                        <th className="pe-2 pb-2 text-left text-[14px] leading-[17px] font-normal text-text-default">
                            Rate
                        </th>
                        <th className="pb-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence initial={false}>
                        {items.map((item, index) => (
                            <motion.tr
                                key={item.id}
                                layout
                                initial={{
                                    opacity: 0,
                                    y: 8,
                                    filter: 'blur(4px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.98,
                                    filter: 'blur(4px)',
                                    transition: { duration: 0.15 },
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 28,
                                    mass: 0.6,
                                }}
                            >
                                {/* Description */}
                                <td className="pe-2 pb-2">
                                    <Input
                                        value={item.description}
                                        onChange={(e) =>
                                            updateItem(item.id, {
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Description"
                                        className="min-h-[32px] rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 text-sm leading-[17px] font-normal whitespace-nowrap text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-1 focus-visible:ring-stroke-strong focus-visible:ring-offset-0"
                                    />
                                </td>

                                {/* QTY */}
                                <td className="pe-2 pb-2">
                                    <Input
                                        type="number"
                                        min={QUANTITY_MIN}
                                        max={QUANTITY_MAX}
                                        value={
                                            item.quantity === 0
                                                ? ''
                                                : item.quantity
                                        }
                                        onChange={(e) => {
                                            const raw = Number(
                                                e.target.value,
                                            );
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
                                        placeholder="0"
                                        className="h-[32px] [appearance:textfield] rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 text-left text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-1 focus-visible:ring-stroke-strong focus-visible:ring-offset-0 md:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                </td>

                                {/* Rate */}
                                <td className="pe-2 pb-2">
                                    <div className="flex h-[32px] items-center rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong">
                                        <span className="mr-2 text-sm text-text-weak">
                                            {selectedCurrency.symbol}
                                        </span>
                                        <Input
                                            type="number"
                                            min={RATE_MIN}
                                            max={RATE_MAX}
                                            step="0.01"
                                            value={
                                                item.rate === 0 ? '' : item.rate
                                            }
                                            onChange={(e) => {
                                                const raw = Number(
                                                    e.target.value,
                                                );
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
                                            placeholder="0"
                                            className="h-auto [appearance:textfield] rounded-none border-0 bg-transparent p-0 text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                        />
                                    </div>
                                </td>

                                {/* Action Button */}
                                <td className="pb-2">
                                    <div className="flex justify-center">
                                        {index === 0 ? (
                                            <CustomButton
                                                icon={<PlusIcon size={16} />}
                                                size="default"
                                                onClick={handleAddItem}
                                                disabled={items.length >= 5}
                                                className="aspect-square h-[32px] p-2"
                                                ariaLabel="Add item"
                                            />
                                        ) : (
                                            <CustomButton
                                                icon={<DeleteIcon size={16} />}
                                                size="default"
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                                className="aspect-square h-[32px] p-2"
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
            <div className="flex gap-2 p-3 border-b-layered border-t-layered">
                <LabeledAdjustableInput
                    label="Tax"
                    value={state.data.tax}
                    type={state.data.taxType}
                    onValueChange={(value) => updateTax({ value })}
                    onTypeChange={(type) => updateTax({ type })}
                    currencyIcon={selectedCurrency.symbolIcon}
                />

                <LabeledAdjustableInput
                    label="Discount"
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

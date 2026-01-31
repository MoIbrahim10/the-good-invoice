import { useMemo } from 'react';
import { currencies } from '@/data/currencies';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { CustomButton } from '../../custom/button';
import { DeleteIcon } from '../../icons/DeleteIcon';
import { PlusIcon } from '../../icons/PlusIcon';
import { Input } from '../../ui/input';
import { LabeledAdjustableInput } from '../../custom/labeled-adjustable-input';

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
                unitPrice: 0,
            });
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <table className="w-full border-separate border-spacing-0 px-3 pt-3">
                <thead>
                    <tr>
                        <th className="pe-2 pb-2 text-left text-[14px] leading-[17px] font-normal text-text-default">
                            Item
                        </th>
                        <th className="w-[80px] pe-2 pb-2 text-left text-[14px] leading-[17px] font-normal text-text-default">
                            QTY
                        </th>
                        <th className="w-[140px] pe-2 pb-2 text-left text-[14px] leading-[17px] font-normal text-text-default">
                            Rate
                        </th>
                        <th className="w-[40px] pb-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
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
                            <td className="w-[80px] pe-2 pb-2">
                                <Input
                                    type="number"
                                    value={
                                        item.quantity === 0 ? '' : item.quantity
                                    }
                                    onChange={(e) =>
                                        updateItem(item.id, {
                                            quantity: Number(e.target.value),
                                        })
                                    }
                                    placeholder="0"
                                    className="h-[32px] [appearance:textfield] rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 text-left text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-1 focus-visible:ring-stroke-strong focus-visible:ring-offset-0 md:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                            </td>

                            {/* Rate */}
                            <td className="w-[140px] pe-2 pb-2">
                                <div className="flex h-[32px] items-center rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong">
                                    <span className="mr-2 text-sm text-text-weak">
                                        {selectedCurrency.symbol}
                                    </span>
                                    <Input
                                        type="number"
                                        value={
                                            item.unitPrice === 0
                                                ? ''
                                                : item.unitPrice
                                        }
                                        onChange={(e) =>
                                            updateItem(item.id, {
                                                unitPrice: Number(
                                                    e.target.value,
                                                ),
                                            })
                                        }
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
                                            onClick={() => removeItem(item.id)}
                                            className="aspect-square h-[32px] p-2"
                                            ariaLabel="Remove item"
                                        />
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
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

import { cloneElement, isValidElement, type ReactNode, useId } from 'react';
import { CustomButton } from '@/components/custom/button';
import { PercentageIcon } from '@/components/icons/PercentageIcon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TAX_DISCOUNT_MAX } from '@/lib/invoiceLimits';
import { cn } from '@/lib/utils';

interface LabeledAdjustableInputProps {
    label: string;
    value: number;
    type: 'percentage' | 'currency';
    onValueChange: (value: number) => void;
    onTypeChange: (type: 'percentage' | 'currency') => void;
    currencyIcon: ReactNode;
    placeholder?: string;
    containerClassName?: string;
    id?: string;
    name?: string;
}

export function LabeledAdjustableInput({
    label,
    value,
    type,
    onValueChange,
    onTypeChange,
    currencyIcon,
    placeholder = '0',
    containerClassName,
    id,
    name,
}: LabeledAdjustableInputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;

    const renderedCurrencyIcon = isValidElement(currencyIcon)
        ? cloneElement(currencyIcon as React.ReactElement<{ size?: number }>, {
              size: 14,
          })
        : currencyIcon;

    const isPercentage = type === 'percentage';
    const min = 0;
    const max = isPercentage ? 100 : TAX_DISCOUNT_MAX;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = Number(e.target.value);
        const clamped = Math.max(
            min,
            Math.min(max, Number.isNaN(raw) ? 0 : raw),
        );
        onValueChange(clamped);
    };

    return (
        <div
            className={cn(
                'flex h-[32px] min-h-[32px] flex-1 items-center rounded-[6px] border border-stroke-default bg-bg-weak py-2 ps-3 pe-1.5 shadow-none transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong',
                containerClassName,
            )}
        >
            <Label
                htmlFor={inputId}
                className="mr-2 text-[14px] font-normal whitespace-nowrap text-text-default"
            >
                {label}
            </Label>
            <Input
                id={inputId}
                name={name}
                type="number"
                min={min}
                max={max}
                step={isPercentage ? 1 : 0.01}
                value={value === 0 ? '' : value}
                onChange={handleChange}
                placeholder={placeholder}
                className="h-auto flex-1 [appearance:textfield] rounded-none border-0 bg-transparent p-0 text-left text-[14px] text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <CustomButton
                icon={
                    type === 'percentage' ? (
                        <PercentageIcon size={14} />
                    ) : (
                        renderedCurrencyIcon
                    )
                }
                size="sm"
                className="ml-2 flex items-center justify-center border-0 bg-transparent p-[3px] text-text-strong shadow-none transition-all hover:bg-bg-strong hover:[&_span]:opacity-100 active:[&_span]:opacity-100"
                onClick={() =>
                    onTypeChange(
                        type === 'percentage' ? 'currency' : 'percentage',
                    )
                }
                tooltips={{
                    default: {
                        content:
                            type === 'percentage'
                                ? 'Switch to currency.'
                                : 'Switch to percentage.',
                    },
                }}
            />
        </div>
    );
}

import { cloneElement, isValidElement, type ReactNode } from 'react';
import { CustomButton } from '@/components/custom/button';
import { PercentageIcon } from '@/components/icons/PercentageIcon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
}: LabeledAdjustableInputProps) {
    const renderedCurrencyIcon = isValidElement(currencyIcon)
        ? cloneElement(currencyIcon as React.ReactElement<{ size?: number }>, {
              size: 14,
          })
        : currencyIcon;

    const isPercentage = type === 'percentage';
    const min = 0;
    const max = isPercentage ? 100 : 999_999_999;

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
                'flex min-h-[33px] flex-1 items-center rounded-[6px] border border-stroke-default bg-bg-weak py-2 ps-3 pe-1.5 shadow-none transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong',
                containerClassName,
            )}
        >
            <Label className="mr-2 text-sm leading-[17px] font-normal whitespace-nowrap text-text-default">
                {label}
            </Label>
            <Input
                type="number"
                min={min}
                max={max}
                step={isPercentage ? 1 : 0.01}
                value={value === 0 ? '' : value}
                onChange={handleChange}
                placeholder={placeholder}
                className="h-auto flex-1 [appearance:textfield] rounded-none border-0 bg-transparent p-0 text-left text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                                ? 'Switch to currency'
                                : 'Switch to percentage',
                    },
                }}
            />
        </div>
    );
}

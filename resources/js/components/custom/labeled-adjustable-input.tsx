import type { ReactNode } from 'react';
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
    return (
        <div
            className={cn(
                'flex min-h-[33px] flex-1 items-center rounded-[6px] border border-stroke-default bg-bg-weak ps-3 pe-1.5 py-2 shadow-none transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong',
                containerClassName,
            )}
        >
            <Label className="mr-2 whitespace-nowrap text-sm font-normal leading-[17px] text-text-default">
                {label}
            </Label>
            <Input
                type="number"
                value={value === 0 ? '' : value}
                onChange={(e) => onValueChange(Number(e.target.value))}
                placeholder={placeholder}
                className="h-auto flex-1 rounded-none border-0 bg-transparent p-0 text-left text-text-strong shadow-none [appearance:textfield] placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <CustomButton
                icon={
                    type === 'percentage' ? (
                        <PercentageIcon size={14} />
                    ) : (
                        currencyIcon
                    )
                }
                size="sm"
                className={cn(
                    'ml-2 flex h-[20px] w-[20px] items-center justify-center border-0 bg-transparent p-0 text-text-strong shadow-none transition-all hover:bg-bg-strong hover:[&_span]:opacity-100 active:[&_span]:opacity-100',
                    type === 'percentage'
                        ? '[&_path]:stroke-none [&_path]:fill-current'
                        : '[&_path]:stroke-current [&_path]:fill-none',
                )}
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

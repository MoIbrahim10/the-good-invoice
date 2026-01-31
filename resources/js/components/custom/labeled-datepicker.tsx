import * as React from 'react';
import { DateInput } from '@/components/ui/datepicker';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface LabeledDatePickerProps extends React.ComponentProps<
    typeof DateInput
> {
    label: string;
    labelClassName?: string;
    containerClassName?: string;
    format?: 'MM/DD/YYYY' | 'DD/MM/YYYY';
}

const LabeledDatePicker = React.forwardRef<
    HTMLInputElement,
    LabeledDatePickerProps
>(
    (
        {
            label,
            labelClassName,
            containerClassName,
            className,
            id,
            format = 'MM/DD/YYYY',
            placeholder,
            ...props
        },
        ref,
    ) => {
        const generatedId = React.useId();
        const inputId = id || generatedId;
        const defaultPlaceholder =
            format === 'MM/DD/YYYY' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';

        return (
            <div
                className={cn(
                    'flex flex-row items-center gap-[10px] rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong focus-within:outline-none',
                    containerClassName,
                )}
            >
                <Label
                    htmlFor={inputId}
                    className={cn(
                        'text-sm leading-[17px] font-normal whitespace-nowrap text-text-default',
                        labelClassName,
                    )}
                >
                    {label}
                </Label>
                <DateInput
                    id={inputId}
                    ref={ref}
                    dateFormat={format}
                    className={cn(
                        'h-auto border-0 bg-transparent p-0 text-text-strong shadow-none placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 md:text-sm',
                        className,
                    )}
                    placeholder={placeholder || defaultPlaceholder}
                    {...props}
                />
            </div>
        );
    },
);
LabeledDatePicker.displayName = 'LabeledDatePicker';

export { LabeledDatePicker };

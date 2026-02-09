import * as React from 'react';
import { ErrorIconWithTooltip } from '@/components/icons/ErrorIconWithTooltip';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface LabeledTextareaProps extends React.ComponentProps<'textarea'> {
    label: string;
    labelClassName?: string;
    containerClassName?: string;
    error?: string;
}

const LabeledTextarea = React.forwardRef<
    HTMLTextAreaElement,
    LabeledTextareaProps
>(
    (
        {
            label,
            labelClassName,
            containerClassName,
            className,
            id,
            error,
            ...props
        },
        ref,
    ) => {
        const generatedId = React.useId();
        const inputId = id || generatedId;

        return (
            <div
                className={cn(
                    'flex flex-row items-start gap-[10px] rounded-[6px] border border-stroke-default bg-bg-weak pl-3 py-2 transition-shadow focus-within:ring-1 focus-within:ring-stroke-strong focus-within:outline-none',
                    error ? 'pr-[4px]' : 'pr-3',
                    containerClassName,
                )}
            >
                <Label
                    htmlFor={inputId}
                    className={cn(
                        'text-[14px] font-normal whitespace-nowrap text-text-default',
                        labelClassName,
                    )}
                >
                    {label}
                </Label>
                <Textarea
                    id={inputId}
                    ref={ref}
                    className={cn(
                        'field-sizing-content max-h-[68px] min-h-[68px] min-w-0 flex-1 resize-none overflow-y-auto rounded-none border-0 bg-transparent p-0 text-[14px] text-text-strong shadow-none  leading-tight placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent',
                        className,
                    )}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    {...props}
                />
                {error ? (
                    <ErrorIconWithTooltip
                        message={error}
                        id={`${inputId}-error`}
                        className="mt-0.5"
                    />
                ) : null}
            </div>
        );
    },
);
LabeledTextarea.displayName = 'LabeledTextarea';

export { LabeledTextarea };

import * as SwitchPrimitive from '@radix-ui/react-switch';
import type * as React from 'react';

import { cn } from '@/lib/utils';

interface RectangularSwitchProps extends React.ComponentProps<
    typeof SwitchPrimitive.Root
> {
    size?: 'sm' | 'default' | 'lg';
}

function RectangularSwitch({
    className,
    size = 'default',
    ...props
}: RectangularSwitchProps) {
    const sizeClasses = {
        sm: {
            root: 'h-[16px] w-[22px] p-[1.5px]',
            thumb: 'h-[13px] w-[9px] data-[state=checked]:translate-x-[8px]',
        },
        default: {
            root: 'h-[20px] w-[28px] p-[1px]',
            thumb: 'h-[16px] w-[12px] data-[state=checked]:translate-x-[12px]',
        },
        lg: {
            root: 'h-[28px] w-[40px] p-[3px]',
            thumb: 'h-[22px] w-[17px] data-[state=checked]:translate-x-[15px]',
        },
    };

    return (
        <SwitchPrimitive.Root
            data-slot="switch"
            className={cn(
                'peer inline-flex shrink-0 items-center rounded-[4px] border border-stroke-default bg-bg-weak transition-all outline-none focus-visible:ring-1 focus-visible:ring-stroke-strong focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
                sizeClasses[size].root,
                className,
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                data-slot="switch-thumb"
                className={cn(
                    'pointer-events-none block rounded-xs transition-transform data-[state=unchecked]:translate-x-0',
                    'data-[state=checked]:bg-text-default',
                    'data-[state=unchecked]:bg-text-default/50',
                    sizeClasses[size].thumb,
                )}
            />
        </SwitchPrimitive.Root>
    );
}

export { RectangularSwitch };

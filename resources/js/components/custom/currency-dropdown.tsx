import {
    cloneElement,
    isValidElement,
    type ReactElement,
    useState,
} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { currencies } from '@/data/currencies';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface CurrencyDropdownProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    labelClassName?: string;
    containerClassName?: string;
}

export function CurrencyDropdown({
    value,
    onChange,
    label,
    labelClassName,
    containerClassName,
}: CurrencyDropdownProps) {
    const [open, setOpen] = useState(false);
    const selectedCurrency =
        currencies.find((c) => c.code === value) || currencies[0];

    return (
        <div className={cn('flex flex-col gap-2', containerClassName)}>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            'flex h-[32px] flex-row items-center gap-[10px] rounded-[6px] border border-stroke-default bg-bg-weak py-2 ps-3 pe-2 text-left transition-shadow focus:ring-1 focus:ring-stroke-strong focus:outline-none',
                            'group',
                        )}
                    >
                        <Label
                            className={cn(
                                'cursor-default text-[14px] font-normal whitespace-nowrap text-text-default',
                                labelClassName,
                            )}
                        >
                            {label}
                        </Label>
                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-center gap-[6px]">
                                {selectedCurrency.flagIcon}
                                <span className="text-[14px] font-normal text-text-strong">
                                    {selectedCurrency.code}
                                </span>
                            </div>
                            <ChevronDownIcon
                                size={18}
                                className={cn(
                                    'shrink-0 transition-transform duration-200',
                                    open && 'rotate-180',
                                )}
                            />
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    sideOffset={6}
                    className={cn(
                        'flex w-(--radix-dropdown-menu-trigger-width) flex-col items-start p-[2px]',
                        'rounded-[6px] border-stroke-weak bg-feedback-glass backdrop-blur-[2px]',
                    )}
                >
                    {currencies.map((currency) => (
                        <DropdownMenuItem
                            key={currency.code}
                            onClick={() => onChange(currency.code)}
                            className={cn(
                                'group flex w-full cursor-default items-center justify-between rounded-[4px] border border-transparent py-[6px] pr-[9px] pl-[8px] transition-all',
                                'hover:border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.25)]',
                                'focus:bg-[rgba(255,255,255,0.25)] focus:text-white',
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex size-5 items-center justify-center">
                                    {currency.flagIcon}
                                </div>
                                <span className="text-[14px] font-normal text-white">
                                    {currency.name}
                                </span>
                            </div>
                            <div className="flex items-center justify-center text-[12px] text-white">
                                {isValidElement(currency.symbolIcon)
                                    ? cloneElement(
                                          currency.symbolIcon as ReactElement<{
                                              className?: string;
                                              size?: number;
                                          }>,
                                          {
                                              className: cn(
                                                  (
                                                      currency.symbolIcon
                                                          .props as {
                                                          className?: string;
                                                      }
                                                  ).className,
                                                  'size-3.5 text-white',
                                              ),
                                              size: 14,
                                          },
                                      )
                                    : currency.symbolIcon}
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

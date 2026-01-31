import { cloneElement, isValidElement, type ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { currencies } from '@/data/currencies';

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
    const selectedCurrency =
        currencies.find((c) => c.code === value) || currencies[0];

    return (
        <div className={cn('flex flex-col gap-2', containerClassName)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            'flex flex-row items-center gap-[10px] rounded-[6px] border border-stroke-default bg-bg-weak px-3 py-2 text-left transition-shadow focus:ring-1 focus:ring-stroke-strong focus:outline-none',
                            'group',
                        )}
                    >
                        <Label
                            className={cn(
                                'cursor-pointer text-sm leading-[17px] font-normal whitespace-nowrap text-text-default',
                                labelClassName,
                            )}
                        >
                            {label}
                        </Label>
                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-center gap-[6px]">
                                {selectedCurrency.flagIcon}
                                <span className="text-sm leading-[17px] font-normal text-text-strong">
                                    {selectedCurrency.code}
                                </span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-text-weak transition-colors group-hover:text-text-strong" />
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className={cn(
                        'flex w-[200px] flex-col items-start gap-1 p-1',
                        'border-stroke-weak rounded-md shadow-[0px_3px_3px_rgba(0,0,0,0.05),0px_4px_4px_rgba(0,0,0,0.03)] backdrop-blur-[2px] bg-feedback-glass',
                    )}
                >
                    {currencies.map((currency) => (
                        <DropdownMenuItem
                            key={currency.code}
                            onClick={() => onChange(currency.code)}
                            className={cn(
                                'group flex w-full cursor-pointer items-center justify-between rounded-[4px] border border-transparent py-[6px] pr-[6px] pl-[8px] transition-all',
                                'hover:border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.25)]',
                                'focus:bg-[rgba(255,255,255,0.25)] focus:text-white',
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <div className="flex size-5 items-center justify-center">
                                    {currency.flagIcon}
                                </div>
                                <span className="text-sm font-normal text-white">
                                    {currency.name}
                                </span>
                            </div>
                            <div className="flex items-center justify-center text-xs text-white">
                                {isValidElement(currency.symbolIcon)
                                    ? cloneElement(
                                          currency.symbolIcon as ReactElement<{
                                              className?: string;
                                          }>,
                                          {
                                              className: cn(
                                                  (
                                                      currency.symbolIcon
                                                          .props as {
                                                          className?: string;
                                                      }
                                                  ).className,
                                                  'text-white',
                                              ),
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

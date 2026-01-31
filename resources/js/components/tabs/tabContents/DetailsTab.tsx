import { useEffect, useId, useState } from 'react';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { CurrencyDropdown } from '../../custom/currency-dropdown';
import { LabeledDatePicker } from '../../custom/labeled-datepicker';
import { LabeledInput } from '../../custom/labeled-input';
import { formatDate, parseDateString } from '../../ui/datepicker';

export function DetailsTab() {
    const { state } = useInvoiceState();
    const { updateDetails } = useInvoiceActions();

    const details = state.data.details;

    const numberId = useId();
    const dueId = useId();

    const [dueValue, setDueValue] = useState(() =>
        formatDate(
            details.dueDate instanceof Date ? details.dueDate : undefined,
            undefined,
            'DD/MM/YYYY',
        ),
    );

    // Update local state if global state changes (e.g. from elsewhere)
    useEffect(() => {
        if (details.dueDate instanceof Date) {
            const formatted = formatDate(
                details.dueDate,
                undefined,
                'DD/MM/YYYY',
            );
            if (
                formatted !== dueValue &&
                parseDateString(dueValue, 'DD/MM/YYYY')?.getTime() !==
                    details.dueDate.getTime()
            ) {
                setDueValue(formatted);
            }
        }
    }, [details.dueDate, dueValue]);

    const handleDueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDueValue(val);

        const parsedDate = parseDateString(val, 'DD/MM/YYYY');
        if (parsedDate) {
            updateDetails({ dueDate: parsedDate });
        }
    };

    return (
        <div className="flex flex-col gap-2 p-3 border-b-layered">
            {/* First Row: Currency and Invoice Number */}
            <div className="flex items-center gap-2">
                <CurrencyDropdown
                    label="Currency"
                    containerClassName="flex-1"
                    value={details.currency}
                    onChange={(value: string) =>
                        updateDetails({ currency: value })
                    }
                />
                <LabeledInput
                    id={numberId}
                    label="Invoice no."
                    containerClassName="flex-1"
                    value={details.invoiceNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateDetails({ invoiceNumber: e.target.value })
                    }
                    placeholder="INV00-001"
                />
            </div>

            {/* Second Row: Due Date */}
            <LabeledDatePicker
                id={dueId}
                label="Due date"
                value={dueValue}
                onChange={handleDueChange}
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
            />
        </div>
    );
}

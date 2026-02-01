import { useEffect, useId, useState } from 'react';
import { INVOICE_NUMBER_MAX_LENGTH } from '@/lib/invoiceLimits';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { useInvoiceValidation } from '../../../hooks/use-invoice-validation';
import { CurrencyDropdown } from '../../custom/currency-dropdown';
import { LabeledDatePicker } from '../../custom/labeled-datepicker';
import { LabeledInput } from '../../custom/labeled-input';
import { useInvoiceTouched } from '../../providers/InvoiceTouchedProvider';
import { formatDate, parseDateString } from '../../ui/datepicker';

export function DetailsTab() {
    const { state } = useInvoiceState();
    const { updateDetails } = useInvoiceActions();
    const { fieldErrors } = useInvoiceValidation();
    const { touchField, clearTouched, isTouched, markDirty, isDirty } =
        useInvoiceTouched();

    const details = state.data.details;
    const placeholders = state.placeholders.details;

    const numberId = useId();
    const dueId = useId();

    const [dueValue, setDueValue] = useState(() =>
        formatDate(
            details.dueDate instanceof Date ? details.dueDate : undefined,
            undefined,
            'DD/MM/YYYY',
        ),
    );

    // Sync from global state when it changes elsewhere; do not overwrite partial typing
    useEffect(() => {
        if (details.dueDate instanceof Date) {
            const formatted = formatDate(
                details.dueDate,
                undefined,
                'DD/MM/YYYY',
            );
            const parsed = parseDateString(dueValue, 'DD/MM/YYYY');
            if (parsed !== null || dueValue === '') {
                if (formatted !== dueValue) {
                    setDueValue(formatted);
                }
            }
        } else if (
            details.dueDate === null &&
            (details.dueDateInput ?? '') === '' &&
            dueValue !== ''
        ) {
            setDueValue('');
        }
    }, [details.dueDate, details.dueDateInput, dueValue]);

    const handleDueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        markDirty('details.dueDate');
        const val = e.target.value;
        setDueValue(val);

        if (val === '') {
            updateDetails({ dueDate: null, dueDateInput: '' });
        } else {
            const parsedDate = parseDateString(val, 'DD/MM/YYYY');
            updateDetails({
                dueDate: parsedDate ?? null,
                dueDateInput: val,
            });
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
                    name="invoice-number"
                    label="Invoice no."
                    containerClassName="flex-1"
                    maxLength={INVOICE_NUMBER_MAX_LENGTH}
                    value={details.invoiceNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        markDirty('details.invoiceNumber');
                        updateDetails({ invoiceNumber: e.target.value });
                    }}
                    onFocus={() => clearTouched('details.invoiceNumber')}
                    onBlur={() => touchField('details.invoiceNumber')}
                    placeholder={placeholders.invoiceNumber}
                    error={
                        isTouched('details.invoiceNumber') &&
                        isDirty('details.invoiceNumber')
                            ? fieldErrors['details.invoiceNumber']
                            : undefined
                    }
                />
            </div>

            {/* Second Row: Due Date */}
            <LabeledDatePicker
                id={dueId}
                name="invoice-due-date"
                label="Due date"
                value={dueValue}
                onChange={handleDueChange}
                onFocus={() => clearTouched('details.dueDate')}
                onBlur={() => touchField('details.dueDate')}
                placeholder={placeholders.dueDate}
                format="DD/MM/YYYY"
                error={
                    isTouched('details.dueDate') && isDirty('details.dueDate')
                        ? fieldErrors['details.dueDate']
                        : undefined
                }
            />
        </div>
    );
}

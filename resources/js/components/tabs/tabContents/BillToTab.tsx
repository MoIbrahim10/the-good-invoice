import { useId } from 'react';
import { ADDRESS_MAX_LENGTH, NAME_MAX_LENGTH } from '@/lib/invoiceLimits';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { useInvoiceValidation } from '../../../hooks/use-invoice-validation';
import { LabeledInput } from '../../custom/labeled-input';
import { LabeledTextarea } from '../../custom/labeled-textarea';
import { useInvoiceTouched } from '../../providers/InvoiceTouchedProvider';

export function BillToTab() {
    const { state } = useInvoiceState();
    const { updateBillTo } = useInvoiceActions();
    const { fieldErrors } = useInvoiceValidation();
    const { touchField, clearTouched, isTouched, markDirty, isDirty } =
        useInvoiceTouched();

    const billTo = state.data.billTo;
    const placeholders = state.placeholders.billTo;
    const nameId = useId();
    const addressId = useId();

    return (
        <div className="flex flex-col gap-2 p-3 border-b-layered">
            {/* Name Field */}
            <LabeledInput
                id={nameId}
                name="billto-name"
                label="Name"
                labelClassName="w-14 shrink-0"
                type="text"
                maxLength={NAME_MAX_LENGTH}
                value={billTo.name}
                onChange={(e) => {
                    markDirty('billTo.name');
                    updateBillTo({ name: e.target.value });
                }}
                onFocus={() => clearTouched('billTo.name')}
                onBlur={() => touchField('billTo.name')}
                placeholder={placeholders.name}
                error={
                    isTouched('billTo.name') && isDirty('billTo.name')
                        ? fieldErrors['billTo.name']
                        : undefined
                }
            />

            {/* Address Field */}
            <LabeledTextarea
                id={addressId}
                name="billto-address"
                label="Address"
                labelClassName="w-14 shrink-0"
                maxLength={ADDRESS_MAX_LENGTH}
                value={billTo.address}
                onChange={(e) => {
                    markDirty('billTo.address');
                    updateBillTo({ address: e.target.value });
                }}
                onFocus={() => clearTouched('billTo.address')}
                onBlur={() => touchField('billTo.address')}
                placeholder={placeholders.address}
                error={
                    isTouched('billTo.address') && isDirty('billTo.address')
                        ? fieldErrors['billTo.address']
                        : undefined
                }
            />
        </div>
    );
}

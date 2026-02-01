import { useId } from 'react';
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
    const { touchField, isTouched } = useInvoiceTouched();

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
                value={billTo.name}
                onChange={(e) => updateBillTo({ name: e.target.value })}
                onBlur={() => touchField('billTo.name')}
                placeholder={placeholders.name}
                error={
                    isTouched('billTo.name')
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
                value={billTo.address}
                onChange={(e) => updateBillTo({ address: e.target.value })}
                onBlur={() => touchField('billTo.address')}
                placeholder={placeholders.address}
                error={
                    isTouched('billTo.address')
                        ? fieldErrors['billTo.address']
                        : undefined
                }
            />
        </div>
    );
}

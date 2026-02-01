import { useId } from 'react';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { LabeledInput } from '../../custom/labeled-input';
import { LabeledTextarea } from '../../custom/labeled-textarea';

export function BillToTab() {
    const { state } = useInvoiceState();
    const { updateBillTo } = useInvoiceActions();

    const billTo = state.data.billTo;
    const emailId = useId();
    const addressId = useId();

    return (
        <div className="flex flex-col gap-2 p-3 border-b-layered">
            {/* Email Field */}
            <LabeledInput
                id={emailId}
                label="Email"
                labelClassName="w-14 shrink-0"
                type="email"
                value={billTo.email}
                onChange={(e) => updateBillTo({ email: e.target.value })}
                placeholder="john@example.com"
            />

            {/* Address Field */}
            <LabeledTextarea
                id={addressId}
                label="Address"
                labelClassName="w-14 shrink-0"
                value={billTo.address}
                onChange={(e) => updateBillTo({ address: e.target.value })}
                placeholder="Street, city, country"
            />
        </div>
    );
}

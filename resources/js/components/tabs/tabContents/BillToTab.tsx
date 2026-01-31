import { useId } from 'react';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { LabeledInput } from '../../custom/labeled-input';
import { LabeledTextarea } from '../../custom/labeled-textarea';


export function BillToTab() {

    const { state } = useInvoiceState();
    const { updateIssuer } = useInvoiceActions();

    const issuer = state.data.issuer;
    const nameId = useId();
    const addressId = useId();

    return (
        <div className="flex flex-col gap-2 p-3 border-b-layered">
        {/* Name Field */}
        <LabeledInput
            id={nameId}
            label="Name"
            labelClassName="w-14 shrink-0"
            value={issuer.companyName}
            onChange={(e) =>
                updateIssuer({ companyName: e.target.value })
            }
            placeholder="Jane Doe"
        />


        {/* Address Field */}
        <LabeledTextarea
            id={addressId}
            label="Address"
            labelClassName="w-14 shrink-0"
            value={issuer.address.line1}
            onChange={(e) =>
                updateIssuer({
                    address: {
                        ...issuer.address,
                        line1: e.target.value,
                    },
                })
            }
            placeholder="Street, city, country"
        />
    </div>
    );
}

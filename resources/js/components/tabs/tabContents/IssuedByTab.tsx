import { useId } from 'react';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { LabeledInput } from '../../custom/labeled-input';
import { LabeledTextarea } from '../../custom/labeled-textarea';
import { LogoUpload } from '../components/LogoUpload';

export function IssuedByTab() {
    const { state } = useInvoiceState();
    const { updateIssuer } = useInvoiceActions();

    const issuer = state.data.issuer;
    const nameId = useId();
    const emailId = useId();
    const addressId = useId();

    return (
        <div className="flex flex-col">
            <LogoUpload
                logo={issuer.logo ?? null}
                onUpload={(logo) => updateIssuer({ logo })}
            />

            {/* Input Fields Section */}
            <div className="flex flex-col gap-2 p-3">
                {/* Name Field */}
                <LabeledInput
                    id={nameId}
                    label="Name"
                    labelClassName="w-14 shrink-0"
                    value={issuer.name}
                    onChange={(e) => updateIssuer({ name: e.target.value })}
                    placeholder="Jane Doe"
                />

                {/* Email Field */}
                <LabeledInput
                    id={emailId}
                    label="Email"
                    labelClassName="w-14 shrink-0"
                    type="email"
                    value={issuer.email}
                    onChange={(e) => updateIssuer({ email: e.target.value })}
                    placeholder="jane@example.com"
                />

                {/* Address Field */}
                <LabeledTextarea
                    id={addressId}
                    label="Address"
                    labelClassName="w-14 shrink-0"
                    value={issuer.address}
                    onChange={(e) => updateIssuer({ address: e.target.value })}
                    placeholder="Street, city, country"
                />
            </div>
        </div>
    );
}

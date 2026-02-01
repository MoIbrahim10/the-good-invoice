import { useId } from 'react';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { useInvoiceTouched } from '../../providers/InvoiceTouchedProvider';
import { useInvoiceValidation } from '../../../hooks/use-invoice-validation';
import { LabeledInput } from '../../custom/labeled-input';
import { LabeledTextarea } from '../../custom/labeled-textarea';
import { LogoUpload } from '../components/LogoUpload';

export function IssuedByTab() {
    const { state } = useInvoiceState();
    const { updateIssuer } = useInvoiceActions();
    const { fieldErrors } = useInvoiceValidation();
    const { touchField, isTouched } = useInvoiceTouched();

    const issuer = state.data.issuer;
    const placeholders = state.placeholders.issuer;
    const nameId = useId();
    const emailId = useId();
    const addressId = useId();

    return (
        <div className="flex flex-col">
            <LogoUpload
                logo={issuer.logo ?? null}
                includeLogo={issuer.includeLogo ?? true}
                onUpload={(logo) => updateIssuer({ logo })}
                onIncludeLogoChange={(includeLogo) =>
                    updateIssuer({ includeLogo })
                }
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
                    onBlur={() => touchField('issuer.name')}
                    placeholder={placeholders.name}
                    error={
                        isTouched('issuer.name')
                            ? fieldErrors['issuer.name']
                            : undefined
                    }
                />

                {/* Email Field */}
                <LabeledInput
                    id={emailId}
                    label="Email"
                    labelClassName="w-14 shrink-0"
                    type="email"
                    value={issuer.email}
                    onChange={(e) => updateIssuer({ email: e.target.value })}
                    onBlur={() => touchField('issuer.email')}
                    placeholder={placeholders.email}
                    error={
                        isTouched('issuer.email')
                            ? fieldErrors['issuer.email']
                            : undefined
                    }
                />

                {/* Address Field */}
                <LabeledTextarea
                    id={addressId}
                    label="Address"
                    labelClassName="w-14 shrink-0"
                    value={issuer.address}
                    onChange={(e) => updateIssuer({ address: e.target.value })}
                    onBlur={() => touchField('issuer.address')}
                    placeholder={placeholders.address}
                    error={
                        isTouched('issuer.address')
                            ? fieldErrors['issuer.address']
                            : undefined
                    }
                />
            </div>
        </div>
    );
}

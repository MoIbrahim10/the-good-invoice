import { useId } from 'react';
import {
    ADDRESS_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
} from '@/lib/invoiceLimits';
import { useInvoiceActions } from '../../../hooks/use-invoice-actions';
import { useInvoiceState } from '../../../hooks/use-invoice-state';
import { useInvoiceValidation } from '../../../hooks/use-invoice-validation';
import { LabeledInput } from '../../custom/labeled-input';
import { LabeledTextarea } from '../../custom/labeled-textarea';
import { useInvoiceTouched } from '../../providers/InvoiceTouchedProvider';
import { LogoUpload } from '../components/LogoUpload';

export function IssuedByTab() {
    const { state } = useInvoiceState();
    const { updateIssuer } = useInvoiceActions();
    const { fieldErrors } = useInvoiceValidation();
    const { touchField, clearTouched, isTouched, markDirty, isDirty } =
        useInvoiceTouched();

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
                    name="issuer-name"
                    label="Name"
                    labelClassName="w-14 shrink-0"
                    maxLength={NAME_MAX_LENGTH}
                    value={issuer.name}
                    onChange={(e) => {
                        markDirty('issuer.name');
                        updateIssuer({ name: e.target.value });
                    }}
                    onFocus={() => clearTouched('issuer.name')}
                    onBlur={() => touchField('issuer.name')}
                    placeholder={placeholders.name}
                    error={
                        isTouched('issuer.name') && isDirty('issuer.name')
                            ? fieldErrors['issuer.name']
                            : undefined
                    }
                />

                {/* Email Field */}
                <LabeledInput
                    id={emailId}
                    name="issuer-email"
                    label="Email"
                    labelClassName="w-14 shrink-0"
                    type="email"
                    maxLength={EMAIL_MAX_LENGTH}
                    value={issuer.email}
                    onChange={(e) => {
                        markDirty('issuer.email');
                        updateIssuer({ email: e.target.value });
                    }}
                    onFocus={() => clearTouched('issuer.email')}
                    onBlur={() => touchField('issuer.email')}
                    placeholder={placeholders.email}
                    error={
                        isTouched('issuer.email') && isDirty('issuer.email')
                            ? fieldErrors['issuer.email']
                            : undefined
                    }
                />

                {/* Address Field */}
                <LabeledTextarea
                    id={addressId}
                    name="issuer-address"
                    label="Address"
                    labelClassName="w-14 shrink-0"
                    maxLength={ADDRESS_MAX_LENGTH}
                    value={issuer.address}
                    onChange={(e) => {
                        markDirty('issuer.address');
                        updateIssuer({ address: e.target.value });
                    }}
                    onFocus={() => clearTouched('issuer.address')}
                    onBlur={() => touchField('issuer.address')}
                    placeholder={placeholders.address}
                    error={
                        isTouched('issuer.address') && isDirty('issuer.address')
                            ? fieldErrors['issuer.address']
                            : undefined
                    }
                />
            </div>
        </div>
    );
}

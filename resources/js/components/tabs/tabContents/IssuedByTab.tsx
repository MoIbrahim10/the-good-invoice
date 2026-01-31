import { useId } from 'react';
import { useInvoiceActions } from '../../../hooks/useInvoiceActions';
import { useInvoiceState } from '../../../hooks/useInvoiceState';
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
                <div className="flex items-center gap-4">
                    <label
                        htmlFor={nameId}
                        className="w-20 shrink-0 text-sm leading-none font-normal text-text-strong"
                    >
                        Name
                    </label>
                    <input
                        id={nameId}
                        type="text"
                        value={issuer.companyName}
                        onChange={(e) =>
                            updateIssuer({ companyName: e.target.value })
                        }
                        placeholder="Jane Doe"
                        className="flex-1 rounded-md border border-stroke-default bg-bg-default px-3 py-2 text-sm text-text-strong placeholder:text-text-weak focus:ring-1 focus:ring-stroke-strong focus:outline-none"
                    />
                </div>

                {/* Email Field */}
                <div className="flex items-center gap-4">
                    <label
                        htmlFor={emailId}
                        className="w-20 shrink-0 text-sm leading-none font-normal text-text-strong"
                    >
                        Email
                    </label>
                    <input
                        id={emailId}
                        type="email"
                        value={issuer.contact.email || ''}
                        onChange={(e) =>
                            updateIssuer({
                                contact: {
                                    ...issuer.contact,
                                    email: e.target.value,
                                },
                            })
                        }
                        placeholder="jane@example.com"
                        className="flex-1 rounded-md border border-stroke-default bg-bg-default px-3 py-2 text-sm text-text-strong placeholder:text-text-weak focus:ring-1 focus:ring-stroke-strong focus:outline-none"
                    />
                </div>

                {/* Address Field */}
                <div className="flex items-start gap-4">
                    <label
                        htmlFor={addressId}
                        className="w-20 shrink-0 pt-2 text-sm leading-none font-normal text-text-strong"
                    >
                        Address
                    </label>
                    <textarea
                        id={addressId}
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
                        rows={3}
                        className="flex-1 resize-none rounded-md border border-stroke-default bg-bg-default px-3 py-2 text-sm text-text-strong placeholder:text-text-weak focus:ring-1 focus:ring-stroke-strong focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
}

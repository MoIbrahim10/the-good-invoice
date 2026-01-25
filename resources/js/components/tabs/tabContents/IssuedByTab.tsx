import { LogoIcon } from '../../icons/LogoIcon';
import { Button } from '../../layout/Button';
import { useInvoiceState } from '../../../hooks/useInvoiceState';
import { useInvoiceActions } from '../../../hooks/useInvoiceActions';

export function IssuedByTab() {
    const { state } = useInvoiceState();
    const { updateIssuer } = useInvoiceActions();

    const issuer = state.data.issuer;

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                updateIssuer({ logo: result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-3 py-3">
            {/* Logo Upload Section */}
            <div className="flex items-stretch gap-2.5">
                {/* Logo Placeholder */}
                <div
                    className="flex aspect-square min-h-[55px] flex-row items-center justify-center self-stretch rounded-md border border-dashed border-stroke-strong bg-bg-strong px-3 py-2"
                >
                    <div>
                        {issuer.logo ? (
                            <img
                                src={issuer.logo}
                                alt="Logo"
                                className="rounded-md object-contain"
                            />
                        ) : (
                            <LogoIcon size={18} />
                        )}
                    </div>
                </div>

                {/* Logo Info and Upload */}
                <div className="flex h-fit items-end justify-between gap-2.5">
                    <div className="flex flex-col gap-1">
                        <h3 className="flex items-center text-sm leading-[17px] font-normal text-text-default">
                            Your logo
                        </h3>
                        <p className="flex items-center text-sm leading-[17px] font-normal text-text-weaker">
                            Square (1:1) format only. SVG preferred, PNG and
                            JPEG supported.
                        </p>
                    </div>

                    <label className="shrink-0 cursor-pointer">
                        <input
                            type="file"
                            accept="image/svg+xml,image/png,image/jpeg,image/jpg"
                            onChange={handleLogoUpload}
                            className="hidden"
                        />
                        <Button>Upload</Button>
                    </label>
                </div>
            </div>

            {/* Input Fields Section */}
            <div className="flex flex-col gap-2">
                {/* Name Field */}
                <div className="flex items-center gap-4">
                    <label className="w-20 shrink-0 text-sm leading-none font-normal text-text-strong">
                        Name
                    </label>
                    <input
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
                    <label className="w-20 shrink-0 text-sm leading-none font-normal text-text-strong">
                        Email
                    </label>
                    <input
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
                    <label className="w-20 shrink-0 pt-2 text-sm leading-none font-normal text-text-strong">
                        Address
                    </label>
                    <textarea
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

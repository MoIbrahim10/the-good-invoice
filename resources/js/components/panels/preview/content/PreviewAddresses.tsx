import type { BillToData, IssuerData } from '@/types/invoice';
import { PreviewText } from './PreviewText';

type Placeholders = {
    issuer: { name: string; address: string; email: string };
    billTo: { name: string; address: string };
};

type PreviewAddressesProps = {
    issuer: IssuerData;
    billTo: BillToData;
    placeholders: Placeholders;
};

export function PreviewAddresses({
    issuer,
    billTo,
    placeholders,
}: PreviewAddressesProps) {
    const issuerAllEmpty =
        !issuer.name?.trim() &&
        !issuer.address?.trim() &&
        !issuer.email?.trim();
    const billToAllEmpty =
        !billTo.name?.trim() && !billTo.address?.trim();

    return (
        <div className="grid min-w-0 grid-cols-2 gap-2.5 p-4 text-[10px] text-preview-700">
            <div
                className={`flex min-w-0 flex-col gap-1 overflow-visible ${issuerAllEmpty ? 'opacity-50' : ''}`}
            >
                <h3 className="text-preview-500">Bill from</h3>
                <p
                    className={`min-w-0 wrap-break-word ${!issuer.name?.trim() && !issuerAllEmpty ? 'opacity-50' : ''}`}
                >
                    <PreviewText
                        value={issuer.name}
                        placeholder={placeholders.issuer.name}
                        suppressPlaceholderOpacity
                    />
                </p>
                <p
                    className={`min-w-0 wrap-break-word ${!issuer.address?.trim() && !issuerAllEmpty ? 'opacity-50' : ''}`}
                >
                    <PreviewText
                        value={issuer.address}
                        placeholder={placeholders.issuer.address}
                        suppressPlaceholderOpacity
                    />
                </p>
                <p
                    className={`min-w-0 wrap-break-word ${!issuer.email?.trim() && !issuerAllEmpty ? 'opacity-50' : ''}`}
                >
                    <PreviewText
                        value={issuer.email}
                        placeholder={placeholders.issuer.email}
                        suppressPlaceholderOpacity
                    />
                </p>
            </div>
            <div
                className={`flex min-w-0 flex-col gap-1 overflow-visible ${billToAllEmpty ? 'opacity-50' : ''}`}
            >
                <h3 className="text-preview-500">Bill to</h3>
                <p
                    className={`min-w-0 wrap-break-word ${!billTo.name?.trim() && !billToAllEmpty ? 'opacity-50' : ''}`}
                >
                    <PreviewText
                        value={billTo.name}
                        placeholder={placeholders.billTo.name}
                        suppressPlaceholderOpacity
                    />
                </p>
                <p
                    className={`min-w-0 wrap-break-word ${!billTo.address?.trim() && !billToAllEmpty ? 'opacity-50' : ''}`}
                >
                    <PreviewText
                        value={billTo.address}
                        placeholder={placeholders.billTo.address}
                        suppressPlaceholderOpacity
                    />
                </p>
            </div>
        </div>
    );
}

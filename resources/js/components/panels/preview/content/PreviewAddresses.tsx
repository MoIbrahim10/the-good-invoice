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
    return (
        <div className="grid min-w-0 grid-cols-2 gap-2.5 p-4">
            <div className="flex min-w-0 flex-col gap-1 overflow-visible">
                <h3 className="text-[12px] text-text-default">Bill from</h3>
                <p className="min-w-0 text-[12px] wrap-break-word text-text-strong">
                    <PreviewText
                        value={issuer.name}
                        placeholder={placeholders.issuer.name}
                    />
                </p>
                <p className="min-w-0 text-[12px] wrap-break-word text-text-strong">
                    <PreviewText
                        value={issuer.address}
                        placeholder={placeholders.issuer.address}
                    />
                </p>
                <p className="min-w-0 text-[12px] wrap-break-word text-text-strong">
                    <PreviewText
                        value={issuer.email}
                        placeholder={placeholders.issuer.email}
                    />
                </p>
            </div>
            <div className="flex min-w-0 flex-col gap-1 overflow-visible">
                <h3 className="text-[12px] text-text-default">Bill to</h3>
                <p className="min-w-0 text-[12px] wrap-break-word text-text-strong">
                    <PreviewText
                        value={billTo.name}
                        placeholder={placeholders.billTo.name}
                    />
                </p>
                <p className="min-w-0 text-[12px] wrap-break-word text-text-strong">
                    <PreviewText
                        value={billTo.address}
                        placeholder={placeholders.billTo.address}
                    />
                </p>
            </div>
        </div>
    );
}

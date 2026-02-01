import type { Currency } from './currency';

export type IssuerData = {
    logo?: string; // Base64 data URL or URL string
    name: string;
    email: string;
    address: string;
};

export type BillToData = {
    email: string;
    address: string;
};

export type InvoiceDetails = {
    invoiceNumber: string;
    dueDate: Date;
    currency: Currency['code'];
};

export type InvoiceItem = {
    id: string;
    description: string;
    quantity: number;
    rate: number;
};

export type DisplayStyle = 'solid' | 'accent';
export type DisplayColorValue = 'gray' | 'cream' | 'blue' | 'green';

export type DisplayOptions = {
    style: DisplayStyle;
    color: DisplayColorValue;
};

export type AmountType = 'percentage' | 'currency';

export type InvoiceData = {
    issuer: IssuerData;
    billTo: BillToData;
    details: InvoiceDetails;
    items: InvoiceItem[];
    tax: number;
    taxType: AmountType;
    discount: number;
    discountType: AmountType;
    notes: string;
    display: DisplayOptions;
};

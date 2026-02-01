import type { Currency } from './currency';

export type IssuerData = {
    logo?: string; // Base64 data URL or URL string
    includeLogo?: boolean;
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
    dueDate: Date | null;
    /** Raw due date input string; used for preview while typing and validation */
    dueDateInput?: string;
    currency: Currency['code'];
};

export type InvoicePlaceholders = {
    issuer: { name: string; email: string; address: string };
    billTo: { email: string; address: string };
    details: { invoiceNumber: string; dueDate: string };
    items: { description: string; quantity: string; rate: string };
    notes: string;
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

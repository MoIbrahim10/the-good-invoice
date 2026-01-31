import type { Currency } from './currency';

export type Address = {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
};

export type ContactInfo = {
    email?: string;
    phone?: string;
    website?: string;
};

export type IssuerData = {
    companyName: string;
    address: Address;
    contact: ContactInfo;
    logo?: string; // Base64 data URL or URL string
};

export type BillToData = {
    clientName: string;
    address: Address;
    contact: ContactInfo;
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
    unitPrice: number;
};

export type DisplayOptions = {
    style: 'solid' | 'accent';
    color: 'gray' | 'cream' | 'blue' | 'green';
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

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
    issueDate: Date;
    dueDate: Date;
    paymentTerms: string;
};

export type InvoiceItem = {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate?: number;
};

export type DisplayOptions = {
    currency: string;
    locale: string;
    dateFormat: string;
};

export type InvoiceData = {
    issuer: IssuerData;
    billTo: BillToData;
    details: InvoiceDetails;
    items: InvoiceItem[];
    notes: string;
    display: DisplayOptions;
};

import type {
    InvoiceData,
    IssuerData,
    BillToData,
    InvoiceDetails,
    InvoiceItem,
    DisplayOptions,
} from './invoice';

export type InvoiceState = {
    data: InvoiceData;
    meta: {
        lastUpdated: number;
        version: number;
        isDirty: boolean;
    };
};

export type InvoiceAction =
    | { type: 'UPDATE_ISSUER'; payload: Partial<IssuerData> }
    | { type: 'UPDATE_BILL_TO'; payload: Partial<BillToData> }
    | { type: 'UPDATE_DETAILS'; payload: Partial<InvoiceDetails> }
    | { type: 'ADD_ITEM'; payload: InvoiceItem }
    | {
          type: 'UPDATE_ITEM';
          payload: { id: string; data: Partial<InvoiceItem> };
      }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'REORDER_ITEMS'; payload: { from: number; to: number } }
    | { type: 'UPDATE_NOTES'; payload: string }
    | { type: 'UPDATE_DISPLAY'; payload: Partial<DisplayOptions> }
    | { type: 'RESET_INVOICE' }
    | { type: 'LOAD_INVOICE'; payload: InvoiceData };

export type InvoiceContextValue = {
    state: InvoiceState;
    dispatch: React.Dispatch<InvoiceAction>;
};

export type Selector<T> = (state: InvoiceState) => T;

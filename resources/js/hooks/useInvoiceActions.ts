import { useMemo } from 'react';
import { useInvoiceState } from './useInvoiceState';
import type {
    IssuerData,
    BillToData,
    InvoiceDetails,
    InvoiceItem,
    DisplayOptions,
    InvoiceData,
} from '../types/invoice';

export function useInvoiceActions() {
    const { dispatch } = useInvoiceState();

    return useMemo(
        () => ({
            updateIssuer: (data: Partial<IssuerData>) => {
                dispatch({ type: 'UPDATE_ISSUER', payload: data });
            },
            updateBillTo: (data: Partial<BillToData>) => {
                dispatch({ type: 'UPDATE_BILL_TO', payload: data });
            },
            updateDetails: (data: Partial<InvoiceDetails>) => {
                dispatch({ type: 'UPDATE_DETAILS', payload: data });
            },
            addItem: (item: InvoiceItem) => {
                dispatch({ type: 'ADD_ITEM', payload: item });
            },
            updateItem: (id: string, data: Partial<InvoiceItem>) => {
                dispatch({ type: 'UPDATE_ITEM', payload: { id, data } });
            },
            removeItem: (id: string) => {
                dispatch({ type: 'REMOVE_ITEM', payload: id });
            },
            reorderItems: (from: number, to: number) => {
                dispatch({ type: 'REORDER_ITEMS', payload: { from, to } });
            },
            updateNotes: (notes: string) => {
                dispatch({ type: 'UPDATE_NOTES', payload: notes });
            },
            updateDisplay: (options: Partial<DisplayOptions>) => {
                dispatch({ type: 'UPDATE_DISPLAY', payload: options });
            },
            resetInvoice: () => {
                dispatch({ type: 'RESET_INVOICE' });
            },
            loadInvoice: (data: InvoiceData) => {
                dispatch({ type: 'LOAD_INVOICE', payload: data });
            },
        }),
        [dispatch],
    );
}

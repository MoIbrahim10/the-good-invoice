import { useContext } from 'react';
import { InvoiceContext } from '../components/providers/InvoiceProvider';
import type { Selector } from '../types/state';

export function useInvoiceState() {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoiceState must be used within InvoiceProvider');
    }
    return context;
}

export function useInvoiceSelector<T>(selector: Selector<T>): T {
    const { state } = useInvoiceState();
    return selector(state);
}

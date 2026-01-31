import { createContext, useMemo, useReducer } from 'react';
import {
    initialInvoiceState,
    invoiceReducer,
} from '../../store/invoiceReducer';
import type { InvoiceContextValue } from '../../types/state';

export const InvoiceContext = createContext<InvoiceContextValue | null>(null);

type InvoiceProviderProps = {
    children: React.ReactNode;
};

export function InvoiceProvider({ children }: InvoiceProviderProps) {
    const [state, dispatch] = useReducer(invoiceReducer, initialInvoiceState);

    const value = useMemo<InvoiceContextValue>(
        () => ({ state, dispatch }),
        [state],
    );

    return (
        <InvoiceContext.Provider value={value}>
            {children}
        </InvoiceContext.Provider>
    );
}

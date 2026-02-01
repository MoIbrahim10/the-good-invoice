import { useMemo } from 'react';
import { getFieldErrors } from '@/lib/invoiceSchema';
import { useInvoiceState } from './use-invoice-state';

export function useInvoiceValidation(): {
    fieldErrors: Record<string, string>;
    isValid: boolean;
} {
    const { state } = useInvoiceState();

    return useMemo(() => {
        const fieldErrors = getFieldErrors(state.data);
        const isValid = Object.keys(fieldErrors).length === 0;
        return { fieldErrors, isValid };
    }, [state.data]);
}

import { createContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { SESSION_STORAGE_PREFIX } from '../../hooks/use-session-state';
import {
    initialInvoiceState,
    invoiceReducer,
} from '../../store/invoiceReducer';
import type { InvoiceContextValue } from '../../types/state';

export const InvoiceContext = createContext<InvoiceContextValue | null>(null);

const DISPLAY_COLOR_KEY = `${SESSION_STORAGE_PREFIX}display:color`;
const DISPLAY_STYLE_KEY = `${SESSION_STORAGE_PREFIX}display:style`;

const VALID_DISPLAY_COLORS = ['gray', 'cream', 'blue', 'green'];
const VALID_DISPLAY_STYLES = ['solid', 'accent'];

type InvoiceProviderProps = {
    children: React.ReactNode;
};

export function InvoiceProvider({ children }: InvoiceProviderProps) {
    const [state, dispatch] = useReducer(invoiceReducer, initialInvoiceState);
    const hasHydratedDisplay = useRef(false);

    useEffect(() => {
        if (hasHydratedDisplay.current || typeof window === 'undefined') {
            return;
        }
        hasHydratedDisplay.current = true;
        const storedColor = sessionStorage.getItem(DISPLAY_COLOR_KEY);
        const storedStyle = sessionStorage.getItem(DISPLAY_STYLE_KEY);
        const color =
            storedColor && VALID_DISPLAY_COLORS.includes(storedColor)
                ? (storedColor as 'gray' | 'cream' | 'blue' | 'green')
                : null;
        const style =
            storedStyle && VALID_DISPLAY_STYLES.includes(storedStyle)
                ? (storedStyle as 'solid' | 'accent')
                : null;
        if (color !== null || style !== null) {
            dispatch({
                type: 'HYDRATE_DISPLAY',
                payload: {
                    ...(color !== null && { color }),
                    ...(style !== null && { style }),
                },
            });
        }
    }, []);

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

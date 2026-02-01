import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

type TouchedFields = Record<string, boolean>;

type InvoiceTouchedContextValue = {
    touchedFields: TouchedFields;
    touchField: (path: string) => void;
    isTouched: (path: string) => boolean;
};

const InvoiceTouchedContext = createContext<InvoiceTouchedContextValue | null>(
    null,
);

type InvoiceTouchedProviderProps = {
    children: React.ReactNode;
};

export function InvoiceTouchedProvider({
    children,
}: InvoiceTouchedProviderProps) {
    const [touchedFields, setTouchedFields] = useState<TouchedFields>({});

    const touchField = useCallback((path: string) => {
        setTouchedFields((prev) =>
            prev[path] ? prev : { ...prev, [path]: true },
        );
    }, []);

    const isTouched = useCallback(
        (path: string) => Boolean(touchedFields[path]),
        [touchedFields],
    );

    const value = useMemo(
        () => ({ touchedFields, touchField, isTouched }),
        [touchedFields, touchField, isTouched],
    );

    return (
        <InvoiceTouchedContext.Provider value={value}>
            {children}
        </InvoiceTouchedContext.Provider>
    );
}

export function useInvoiceTouched(): InvoiceTouchedContextValue {
    const context = useContext(InvoiceTouchedContext);
    if (!context) {
        throw new Error(
            'useInvoiceTouched must be used within InvoiceTouchedProvider',
        );
    }
    return context;
}

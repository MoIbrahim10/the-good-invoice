import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

type TouchedFields = Record<string, boolean>;
type DirtyFields = Record<string, boolean>;

type InvoiceTouchedContextValue = {
    touchedFields: TouchedFields;
    touchField: (path: string) => void;
    clearTouched: (path: string) => void;
    isTouched: (path: string) => boolean;
    markDirty: (path: string) => void;
    isDirty: (path: string) => boolean;
};

const InvoiceTouchedContext = createContext<InvoiceTouchedContextValue | null>(
    null,
);

type InvoiceTouchedProviderProps = {
    children: React.ReactNode;
};

/**
 * Errors are shown only after the user leaves a field (blur), not while typing.
 * Dirty + touched are required so errors do not appear on initial visit.
 */
export function InvoiceTouchedProvider({
    children,
}: InvoiceTouchedProviderProps) {
    const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
    const [dirtyFields, setDirtyFields] = useState<DirtyFields>({});

    const touchField = useCallback((path: string) => {
        setTouchedFields((prev) =>
            prev[path] ? prev : { ...prev, [path]: true },
        );
    }, []);

    const clearTouched = useCallback((path: string) => {
        setTouchedFields((prev) => {
            if (!prev[path]) return prev;
            const next = { ...prev };
            delete next[path];
            return next;
        });
    }, []);

    const isTouched = useCallback(
        (path: string) => Boolean(touchedFields[path]),
        [touchedFields],
    );

    const markDirty = useCallback((path: string) => {
        setDirtyFields((prev) =>
            prev[path] ? prev : { ...prev, [path]: true },
        );
    }, []);

    const isDirty = useCallback(
        (path: string) => Boolean(dirtyFields[path]),
        [dirtyFields],
    );

    const value = useMemo(
        () => ({
            touchedFields,
            touchField,
            clearTouched,
            isTouched,
            markDirty,
            isDirty,
        }),
        [
            touchedFields,
            touchField,
            clearTouched,
            isTouched,
            markDirty,
            isDirty,
        ],
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

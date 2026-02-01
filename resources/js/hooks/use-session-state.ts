import { useCallback, useState } from 'react';

export const SESSION_STORAGE_PREFIX = 'invoice:';
const STORAGE_PREFIX = SESSION_STORAGE_PREFIX;

type UseSessionStateOptions<T> = {
    defaultValue: T;
    parse?: (raw: string) => T;
    serialize?: (value: T) => string;
};

function getStoredValue<T>(
    key: string,
    defaultValue: T,
    parse: (raw: string) => T,
): T {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    try {
        const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
        if (raw === null) {
            return defaultValue;
        }
        return parse(raw);
    } catch {
        return defaultValue;
    }
}

export function useSessionState<T>(
    key: string,
    options: UseSessionStateOptions<T>,
): [T, (value: T | ((prev: T) => T)) => void] {
    const {
        defaultValue,
        parse = (x) => x as T,
        serialize = (x) => String(x),
    } = options;

    const [state, setState] = useState<T>(() =>
        getStoredValue(key, defaultValue, parse),
    );

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            setState((prev) => {
                const next =
                    typeof value === 'function'
                        ? (value as (prev: T) => T)(prev)
                        : value;
                try {
                    sessionStorage.setItem(
                        STORAGE_PREFIX + key,
                        serialize(next),
                    );
                } catch {
                    // ignore storage errors
                }
                return next;
            });
        },
        [key, serialize],
    );

    return [state, setValue];
}

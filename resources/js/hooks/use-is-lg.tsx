import { useSyncExternalStore } from 'react';

const LG_BREAKPOINT = 1024;

const mql =
    typeof window === 'undefined'
        ? undefined
        : window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);

function subscribe(callback: (event: MediaQueryListEvent) => void) {
    if (!mql) {
        return () => {};
    }
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
}

function getSnapshot(): boolean {
    return mql?.matches ?? false;
}

function getServerSnapshot(): boolean {
    return false;
}

export function useIsLg(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

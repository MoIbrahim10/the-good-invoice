import { useCallback, useMemo, useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'light';

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') return 'system';

    return (localStorage.getItem('appearance') as Appearance) || 'light';
};

const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

const getStoredPalette = (): 'cool' | 'warm' => {
    if (typeof window === 'undefined') return 'cool';

    const saved = localStorage.getItem('palette');

    return saved === 'warm' || saved === 'cool' ? saved : 'cool';
};

const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') return;

    const isDark = isDarkMode(appearance);
    const palette = getStoredPalette();
    const resolved = isDark ? 'dark' : 'light';
    const dataTheme = `${palette}-${resolved}`;

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', dataTheme);
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void =>
    listeners.forEach((listener) => {
        listener();
    });

const THEME_SWITCHING_ATTR = 'data-theme-switching';

export function disableTransitionsForThemeSwitch(): void {
    if (typeof document === 'undefined') return;

    document.documentElement.setAttribute(THEME_SWITCHING_ATTR, '');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.documentElement.removeAttribute(THEME_SWITCHING_ATTR);
        });
    });
}

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') return null;

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = (): void => {
    applyTheme(currentAppearance);
    notify();
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem('appearance')) {
        localStorage.setItem('appearance', 'light');
        setCookie('appearance', 'light');
    }

    currentAppearance = getStoredAppearance();
    applyTheme(currentAppearance);

    // Set up system theme change listener
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'light',
    );

    const resolvedAppearance: ResolvedAppearance = useMemo(
        () => (isDarkMode(appearance) ? 'dark' : 'light'),
        [appearance],
    );

    const updateAppearance = useCallback((mode: Appearance): void => {
        currentAppearance = mode;

        // Store in localStorage for client-side persistence...
        localStorage.setItem('appearance', mode);

        // Store in cookie for SSR...
        setCookie('appearance', mode);

        disableTransitionsForThemeSwitch();
        applyTheme(mode);
        requestAnimationFrame(() => notify());
    }, []);

    return { appearance, resolvedAppearance, updateAppearance } as const;
}

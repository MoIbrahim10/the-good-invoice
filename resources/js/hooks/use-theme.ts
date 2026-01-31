import { useEffect, useState } from 'react';

export type Theme = 'cool-light' | 'warm-light' | 'cool-dark' | 'warm-dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (
            savedTheme &&
            ['cool-light', 'warm-light', 'cool-dark', 'warm-dark'].includes(
                savedTheme,
            )
        ) {
            return savedTheme;
        }
        // Default to cool-light
        return 'cool-light';
    });

    useEffect(() => {
        // Apply theme to document root
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return { theme, setTheme };
}

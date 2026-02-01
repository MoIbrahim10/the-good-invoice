import { useLayoutEffect, useState } from 'react';
import { useAppearance } from './use-appearance';

export type Palette = 'cool' | 'warm';
export type Theme = `${Palette}-light` | `${Palette}-dark`;

export function useTheme() {
    const { resolvedAppearance } = useAppearance();
    const [palette, setPalette] = useState<Palette>(() => {
        const savedPalette = localStorage.getItem('palette') as Palette | null;
        if (savedPalette && ['cool', 'warm'].includes(savedPalette)) {
            return savedPalette;
        }
        return 'cool';
    });

    const theme: Theme = `${palette}-${resolvedAppearance}`;

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('palette', palette);
    }, [theme, palette]);

    return { theme, palette, setPalette };
}

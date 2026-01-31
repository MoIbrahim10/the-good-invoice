import { AccentStyleIcon } from '@/components/icons/AccentStyleIcon';
import { SolidStyleIcon } from '@/components/icons/SolidStyleIcon';
import type { DisplayColor, DisplayTheme } from '@/types/display';

export const displayThemes: DisplayTheme[] = [
    {
        name: 'Accent',
        description: 'With accent color backgrounds.',
        value: 'accent',
        icon: <AccentStyleIcon />,
    },
    {
        name: 'Solid',
        description: 'With a solid color background.',
        value: 'solid',
        icon: <SolidStyleIcon />,
    },
];

export const displayColors: DisplayColor[] = [
    {
        name: 'Grey',
        value: 'gray',
        hex: '#9CA3AF',
        bgColor: 'bg-gray-500',
    },
    {
        name: 'Cream',
        value: 'cream',
        hex: '#C1A290',
        bgColor: undefined,
    },
    {
        name: 'Blue',
        value: 'blue',
        hex: '#728AA6',
        bgColor: undefined,
    },
    {
        name: 'Green',
        value: 'green',
        hex: '#84A978',
        bgColor: undefined,
    },
];

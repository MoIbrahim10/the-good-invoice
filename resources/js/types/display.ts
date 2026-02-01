import type { DisplayColorValue, DisplayStyle } from './invoice';

export interface DisplayTheme {
    name: string;
    description: string;
    value: DisplayStyle;
    icon: React.ReactNode;
}

export interface DisplayColor {
    name: string;
    value: DisplayColorValue;
    hex?: string;
    bgColor?: string;
}

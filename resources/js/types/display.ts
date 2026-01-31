export interface DisplayTheme {
    name: string;
    description: string;
    value: string;
    icon: React.ReactNode;
}

export type DisplayStyle = 'solid' | 'accent';

export interface DisplayColor {
    name: string;
    value: string;
    hex?: string;
    bgColor?: string;
}

export type DisplayOptions = {
    style: DisplayStyle;
    color: DisplayColor;
};

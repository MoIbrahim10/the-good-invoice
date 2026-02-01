declare module 'culori' {
    type Color = Record<string, number | undefined>;
    export function parse(color: string): Color | undefined;
    export function formatHex(color: Color): string;
}

import { useEffect, useRef } from 'react';
import { displayColors, displayThemes } from '@/data/display';
import { useInvoiceActions } from '@/hooks/use-invoice-actions';
import { useInvoiceSelector } from '@/hooks/use-invoice-state';
import { SESSION_STORAGE_PREFIX } from '@/hooks/use-session-state';

const DISPLAY_COLOR_KEY = `${SESSION_STORAGE_PREFIX}display:color`;
const DISPLAY_STYLE_KEY = `${SESSION_STORAGE_PREFIX}display:style`;

const VALID_COLORS = ['gray', 'cream', 'blue', 'green'];
const VALID_STYLES = ['solid', 'accent'];

export function DisplayTab() {
    const { updateDisplay } = useInvoiceActions();
    const selectedColor = useInvoiceSelector(
        (state) => state.data.display.color,
    );
    const selectedStyle = useInvoiceSelector(
        (state) => state.data.display.style,
    );

    const hasHydrated = useRef(false);
    useEffect(() => {
        if (hasHydrated.current) {
            return;
        }
        hasHydrated.current = true;
        const storedColor = sessionStorage.getItem(DISPLAY_COLOR_KEY);
        const storedStyle = sessionStorage.getItem(DISPLAY_STYLE_KEY);
        const color =
            storedColor && VALID_COLORS.includes(storedColor)
                ? (storedColor as 'gray' | 'cream' | 'blue' | 'green')
                : null;
        const style =
            storedStyle && VALID_STYLES.includes(storedStyle)
                ? (storedStyle as 'solid' | 'accent')
                : null;
        if (color !== null || style !== null) {
            updateDisplay({
                ...(color !== null && { color }),
                ...(style !== null && { style }),
            });
        }
    }, [updateDisplay]);

    useEffect(() => {
        sessionStorage.setItem(DISPLAY_COLOR_KEY, selectedColor);
    }, [selectedColor]);

    useEffect(() => {
        sessionStorage.setItem(DISPLAY_STYLE_KEY, selectedStyle);
    }, [selectedStyle]);

    const handleColorChange = (colorValue: string) => {
        const color = colorValue as 'gray' | 'cream' | 'blue' | 'green';
        updateDisplay({ color });
    };

    const handleStyleChange = (styleValue: string) => {
        const style = styleValue as 'solid' | 'accent';
        updateDisplay({ style });
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2 p-3">
                <p>Theme</p>
                <div className="flex flex-wrap gap-2">
                    {displayThemes.map((theme) => (
                        <label
                            key={theme.value}
                            htmlFor={`display-style-${theme.value}`}
                            className={`flex flex-1 cursor-default items-center gap-2 rounded-md p-1.5 transition-colors ${
                                selectedStyle === theme.value
                                    ? 'bg-bg-strong'
                                    : 'bg-transparent hover:bg-bg-strong'
                            }`}
                        >
                            <input
                                id={`display-style-${theme.value}`}
                                type="radio"
                                name="display-style"
                                value={theme.value}
                                checked={selectedStyle === theme.value}
                                onChange={() => handleStyleChange(theme.value)}
                                className="sr-only"
                            />
                            {theme.icon}
                            <div className="flex flex-1 flex-col items-start justify-center">
                                <span className="text-[14px] font-normal text-text-default">
                                    {theme.name}
                                </span>
                                <span className="text-[14px] font-normal text-text-weak">
                                    {theme.description}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-2 p-3 border-b-layered border-t-layered">
                {displayColors.map((color) => (
                    <label
                        key={color.value}
                        htmlFor={`display-color-${color.value}`}
                        className={`flex flex-1 cursor-default items-center gap-2 rounded-md p-1.5 transition-colors ${
                            selectedColor === color.value
                                ? 'bg-bg-strong'
                                : 'bg-transparent hover:bg-bg-strong'
                        }`}
                    >
                        <input
                            id={`display-color-${color.value}`}
                            type="radio"
                            name="display-color"
                            value={color.value}
                            checked={selectedColor === color.value}
                            onChange={() => handleColorChange(color.value)}
                            className="sr-only"
                        />
                        <div className="flex aspect-square h-[20px] w-[20px] items-center justify-center rounded border border-stroke-default bg-bg-weak p-1">
                            <div
                                className="h-full w-full rounded-[2px]"
                                style={
                                    color.hex
                                        ? { background: color.hex }
                                        : undefined
                                }
                            />
                        </div>
                        <span className="text-[14px] font-normal text-text-default">
                            {color.name}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

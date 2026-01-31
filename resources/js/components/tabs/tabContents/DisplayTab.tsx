import { useQueryState } from 'nuqs';
import { useEffect, useRef } from 'react';
import { displayColors, displayThemes } from '@/data/display';
import { useInvoiceActions } from '@/hooks/use-invoice-actions';
import { useInvoiceSelector } from '@/hooks/use-invoice-state';

export function DisplayTab() {
    const { updateDisplay } = useInvoiceActions();
    const selectedColor = useInvoiceSelector(
        (state) => state.data.display.color,
    );
    const selectedStyle = useInvoiceSelector(
        (state) => state.data.display.style,
    );

    const isInitialMount = useRef(true);

    const [urlColor, setUrlColor] = useQueryState('color', {
        defaultValue: selectedColor,
        parse: (value) => {
            const validColors = ['gray', 'cream', 'blue', 'green'];
            return validColors.includes(value)
                ? (value as 'gray' | 'cream' | 'blue' | 'green')
                : selectedColor;
        },
        serialize: (value) => value,
        shallow: true,
    });

    const [urlStyle, setUrlStyle] = useQueryState('style', {
        defaultValue: selectedStyle,
        parse: (value) => {
            const validStyles = ['solid', 'accent'];
            return validStyles.includes(value)
                ? (value as 'solid' | 'accent')
                : selectedStyle;
        },
        serialize: (value) => value,
        shallow: true,
    });

    // On initial mount, sync URL to store if URL has values
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            if (urlColor !== selectedColor) {
                updateDisplay({ color: urlColor });
            }
            if (urlStyle !== selectedStyle) {
                updateDisplay({ style: urlStyle });
            }
        }
    }, [urlColor, selectedColor, updateDisplay, urlStyle, selectedStyle]);

    // Sync URL to store when URL changes externally (e.g., browser back/forward)
    useEffect(() => {
        if (!isInitialMount.current && urlColor !== selectedColor) {
            updateDisplay({ color: urlColor });
        }
    }, [urlColor,  selectedColor,  updateDisplay]);

    useEffect(() => {
        if (!isInitialMount.current && urlStyle !== selectedStyle) {
            updateDisplay({ style: urlStyle });
        }
    }, [ urlStyle, selectedStyle, updateDisplay]);

    // Sync store to URL when store changes (but not on initial mount)
    useEffect(() => {
        if (!isInitialMount.current && selectedColor !== urlColor) {
            setUrlColor(selectedColor);
        }
    }, [selectedColor, setUrlColor, urlColor]);

    useEffect(() => {
        if (!isInitialMount.current && selectedStyle !== urlStyle) {
            setUrlStyle(selectedStyle);
        }
    }, [selectedStyle, setUrlStyle, urlStyle]);

    const handleColorChange = (colorValue: string) => {
        const color = colorValue as 'gray' | 'cream' | 'blue' | 'green';
        updateDisplay({ color });
        setUrlColor(color);
    };

    const handleStyleChange = (styleValue: string) => {
        const style = styleValue as 'solid' | 'accent';
        updateDisplay({ style });
        setUrlStyle(style);
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2 p-3">
                <p>Theme</p>
                <div className="flex gap-2">
                    {displayThemes.map((theme) => (
                        <label
                            key={theme.value}
                            className={`flex flex-1 cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors ${
                                selectedStyle === theme.value
                                    ? 'bg-bg-strong'
                                    : 'bg-transparent hover:bg-bg-strong'
                            }`}
                        >
                            <input
                                type="radio"
                                name="display-style"
                                value={theme.value}
                                checked={selectedStyle === theme.value}
                                onChange={() => handleStyleChange(theme.value)}
                                className="sr-only"
                            />
                            {theme.icon}
                            <div className="flex flex-1 flex-col items-start justify-center">
                                <span className="text-sm leading-normal font-normal text-text-default">
                                    {theme.name}
                                </span>
                                <span className="text-sm leading-normal font-normal text-text-weak">
                                    {theme.description}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 p-3 border-b-layered border-t-layered">
                {displayColors.map((color) => (
                    <label
                        key={color.value}
                        className={`flex flex-1 cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors ${
                            selectedColor === color.value
                                ? 'bg-bg-strong'
                                : 'bg-transparent hover:bg-bg-strong'
                        }`}
                    >
                        <input
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
                        <span className="text-sm leading-normal font-normal text-text-default">
                            {color.name}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export function PreviewText({
    value,
    placeholder,
    className = '',
    suppressPlaceholderOpacity = false,
}: {
    value: string | number;
    placeholder: string;
    className?: string;
    /** When true, do not apply opacity-50 for placeholder; parent controls opacity. */
    suppressPlaceholderOpacity?: boolean;
}) {
    const isEmpty =
        value === '' ||
        value === 0 ||
        (typeof value === 'string' && value.trim() === '');
    const displayValue = isEmpty ? placeholder : String(value);
    const opacityClass =
        !suppressPlaceholderOpacity && isEmpty ? 'opacity-50' : '';
    return (
        <span
            className={[opacityClass, className].filter(Boolean).join(' ')}
            title={displayValue}
        >
            {displayValue}
        </span>
    );
}

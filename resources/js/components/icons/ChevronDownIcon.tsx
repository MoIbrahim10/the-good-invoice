type ChevronDownIconProps = {
    className?: string;
    size?: number;
};

export function ChevronDownIcon({
    className = '',
    size = 18,
}: ChevronDownIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Chevron Down Icon"
            role="img"
        >
            <path
                d="M6 7.5L8.7348 10.2348C8.88128 10.3813 9.11872 10.3813 9.2652 10.2348L12 7.5"
                stroke="var(--icon-default)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

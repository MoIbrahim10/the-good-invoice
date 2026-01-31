type ExternalLinkIconProps = {
    className?: string;
    size?: number;
};

export function ExternalLinkIcon({
    className = '',
    size = 14,
}: ExternalLinkIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="External Link"
            role="img"
        >
            <path
                d="M10.7917 9.04159V3.20825M10.7917 3.20825H4.95833M10.7917 3.20825L3.5 10.4999"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

type DollarIconProps = {
    className?: string;
    size?: number;
};

export function DollarIcon({ className = '', size = 14 }: DollarIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            role="img"
            aria-label="Dollar Symbol"
        >
            <path
                d="M3.35449 10.2885C4.74338 12.9113 10.6462 12.6666 10.6462 9.72251C10.6462 6.2931 3.65831 8.05861 3.65831 4.26008C3.65831 1.58915 8.35465 1.1406 10.2087 3.12199"
                stroke="currentColor"
                strokeLinecap="round"
            />
            <path
                d="M7 13.4166V0.583313"
                stroke="currentColor"
                strokeLinecap="round"
            />
        </svg>
    );
}

type DeleteIconProps = {
    className?: string;
    size?: number;
};

export function DeleteIcon({ className = '', size = 18 }: DeleteIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Delete Icon"
            role="img"
        >
            <path
                d="M3.375 4.5L4.07973 15.4233C4.10519 15.8179 4.4327 16.125 4.82817 16.125H13.1718C13.5673 16.125 13.8948 15.8179 13.9203 15.4233L14.625 4.5"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.125 7.875V12.375"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.875 7.875V12.375"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.25 4.125H15.75"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.41113 4.06282C6.61928 2.82116 7.69908 1.875 8.99988 1.875C10.3007 1.875 11.3805 2.82116 11.5887 4.06282"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

type ExportIconProps = {
    className?: string;
    size?: number;
};

export function ExportIcon({ className = '', size = 18 }: ExportIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Export Icon"
            role="img"
        >
            <path
                d="M6.375 16.125H4.125C3.71079 16.125 3.375 15.7892 3.375 15.375V2.625C3.375 2.21078 3.71079 1.875 4.125 1.875H9.43935C9.63825 1.875 9.82905 1.95402 9.96968 2.09467L14.4053 6.53033C14.5459 6.67098 14.625 6.86175 14.625 7.06066V15.375C14.625 15.7892 14.2892 16.125 13.875 16.125H11.625"
                stroke="var(--icon-default)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.75 2.25V6C9.75 6.41421 10.0858 6.75 10.5 6.75H14.25"
                stroke="var(--icon-default)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 10.125V15.1875L10.875 13.3125"
                stroke="var(--icon-default)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 15.1875L7.125 13.3125"
                stroke="var(--icon-default)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

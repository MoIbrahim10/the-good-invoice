type RubleIconProps = {
    className?: string;
    size?: number;
};

export function RubleIcon({ className = '', size = 14 }: RubleIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            role="img"
            aria-label="Ruble Symbol"
        >
            <path
                d="M11.8125 6.27081H2.1875"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.8125 3.9375H2.1875"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.9375 12.3959V1.60419H7.2359C9.16632 1.60419 10.7322 3.16715 10.7359 5.09756C10.7396 7.03315 9.17152 8.60419 7.2359 8.60419H4.25569"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

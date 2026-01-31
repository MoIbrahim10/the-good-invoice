type PlusIconProps = {
    className?: string;
    size?: number;
};

export function PlusIcon({ className = '', size = 18 }: PlusIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Plus Icon"
            role="img"
        >
            <path
                d="M9 2.625V9M9 9V15.375M9 9H2.625M9 9H15.375"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

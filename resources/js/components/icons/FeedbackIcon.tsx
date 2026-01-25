type FeedbackIconProps = {
    className?: string;
    size?: number;
};

export function FeedbackIcon({ className = '', size = 18 }: FeedbackIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M11.625 6.75H6.375M11.625 9.75H6.375M6.97066 14.0503L8.51947 15.3485C8.7969 15.5811 9.20092 15.5822 9.47977 15.3513L11.0535 14.0475C11.188 13.936 11.3573 13.875 11.5319 13.875H14.625C15.0392 13.875 15.375 13.5392 15.375 13.125V3.37502C15.375 2.96081 15.0392 2.62502 14.625 2.62502L3.375 2.625C2.96079 2.625 2.625 2.96078 2.625 3.375V13.125C2.625 13.5392 2.96078 13.875 3.375 13.875H6.48887C6.66506 13.875 6.83563 13.937 6.97066 14.0503Z"
                stroke="var(--icon-default)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

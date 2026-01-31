type ThemeIconProps = {
    className?: string;
    size?: number;
};

export function ThemeIcon({ className = '', size = 18 }: ThemeIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Theme Icon"
            role="img"
        >
            <path
                d="M8.99865 2.46812V1.32568M4.37989 13.6189L3.57207 14.4268M8.99865 16.6745V15.532M14.4251 3.57351L13.6172 4.38134M15.5303 9.00007H16.6727M13.6172 13.6189L14.4251 14.4268M1.32422 9.00007H2.46666M3.57201 3.57346L4.37983 4.3813M11.7828 6.21586C13.3205 7.75357 13.3205 10.2466 11.7828 11.7843C10.2451 13.322 7.752 13.322 6.21431 11.7843C4.67661 10.2466 4.67661 7.75357 6.21431 6.21586C7.752 4.67817 10.2451 4.67817 11.7828 6.21586Z"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

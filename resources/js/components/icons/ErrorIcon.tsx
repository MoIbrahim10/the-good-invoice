import React from 'react';

type ErrorIconProps = {
    className?: string;
    size?: number;
};

export function ErrorIcon({ className = '', size = 14 }: ErrorIconProps) {
    const clipId0 = React.useId();
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Error Icon"
            role="img"
        >
            <g clipPath={`url(#${clipId0})`}>
                <path
                    d="M10.9182 3.08137C9.91541 2.07852 8.52999 1.45825 6.99967 1.45825C3.93909 1.45825 1.45801 3.93934 1.45801 6.99992C1.45801 8.53024 2.07828 9.91565 3.08113 10.9185M10.9182 3.08137C11.9211 4.08421 12.5413 5.46963 12.5413 6.99992C12.5413 10.0605 10.0602 12.5416 6.99967 12.5416C5.46939 12.5416 4.08397 11.9213 3.08113 10.9185M10.9182 3.08137L3.08113 10.9185"
                    stroke="#EE0000"
                    strokeLinecap="round"
                />
            </g>
            <defs>
                <clipPath id={clipId0}>
                    <rect width="14" height="14" fill="transparent" />
                </clipPath>
            </defs>
        </svg>
    );
}

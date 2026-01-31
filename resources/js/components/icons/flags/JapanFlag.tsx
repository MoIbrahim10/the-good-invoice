import * as React from 'react';

type JapanFlagProps = {
    className?: string;
    size?: number | { width: number; height: number };
};

export function JapanFlag({
    className = '',
    size = { width: 16, height: 12 },
}: JapanFlagProps) {
    const clipId = React.useId();
    const maskId = React.useId();

    const width = typeof size === 'number' ? size : size.width;
    const height = typeof size === 'number' ? (size * 12) / 16 : size.height;

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            role="img"
            aria-label="Japan Flag"
        >
            <g clipPath={`url(#${clipId})`}>
                <rect width="16" height="12" fill="white" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0V12H16V0H0Z"
                    fill="#F7FCFF"
                />
                <mask
                    id={maskId}
                    style={{ maskType: 'luminance' }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="16"
                    height="12"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 0V12H16V0H0Z"
                        fill="white"
                    />
                </mask>
                <g mask={`url(#${maskId})`}>
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 9.75C10.0711 9.75 11.75 8.07107 11.75 6C11.75 3.92893 10.0711 2.25 8 2.25C5.92893 2.25 4.25 3.92893 4.25 6C4.25 8.07107 5.92893 9.75 8 9.75Z"
                        fill="#E31D1C"
                    />
                </g>
            </g>
            <rect
                x="0.5"
                y="0.5"
                width="15"
                height="11"
                rx="0.5"
                stroke="black"
                strokeOpacity={0.1}
                style={{ mixBlendMode: 'multiply' }}
            />
            <defs>
                <clipPath id={clipId}>
                    <rect width="16" height="12" rx="1" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

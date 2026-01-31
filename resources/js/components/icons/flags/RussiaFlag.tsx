import * as React from 'react';

type RussiaFlagProps = {
    className?: string;
    size?: number | { width: number; height: number };
};

export function RussiaFlag({
    className = '',
    size = { width: 16, height: 12 },
}: RussiaFlagProps) {
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
            aria-label="Russia Flag"
        >
            <g clipPath={`url(#${clipId})`}>
                <rect width="16" height="12" fill="white" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0V12H16V0H0Z"
                    fill="#3D58DB"
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
                        d="M0 0V4H16V0H0Z"
                        fill="#F7FCFF"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 8V12H16V8H0Z"
                        fill="#C51918"
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

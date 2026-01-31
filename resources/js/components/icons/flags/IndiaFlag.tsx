import * as React from 'react';

type IndiaFlagProps = {
    className?: string;
    size?: number | { width: number; height: number };
};

export function IndiaFlag({
    className = '',
    size = { width: 16, height: 12 },
}: IndiaFlagProps) {
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
            aria-label="India Flag"
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
                        d="M0 0V4H16V0H0Z"
                        fill="#FF8C1A"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 8V12H16V8H0Z"
                        fill="#5EAA22"
                    />
                    <path
                        d="M8 4C9.10457 4 10 4.89543 10 6C10 7.10457 9.10457 8 8 8C6.89543 8 6 7.10457 6 6C6 4.89543 6.89543 4 8 4ZM8 4.5C7.17157 4.5 6.5 5.17157 6.5 6C6.5 6.82843 7.17157 7.5 8 7.5C8.82843 7.5 9.5 6.82843 9.5 6C9.5 5.17157 8.82843 4.5 8 4.5Z"
                        fill="#3D58DB"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99747 6.43035L7.58049 7.96722L7.82467 6.39363L6.81865 7.62803L7.68176 6.28979L6.26063 7.00829L7.59343 6.1368L6.00293 6.21516L7.57496 5.96112L6.0901 5.38578L7.62955 5.79311L6.50707 4.66357L7.74776 5.66183L7.18175 4.17339L7.90914 5.58998L7.99747 4L8.08579 5.58998L8.81319 4.17339L8.24718 5.66183L9.48786 4.66357L8.36538 5.79311L9.90483 5.38578L8.41997 5.96112L9.992 6.21516L8.4015 6.1368L9.7343 7.00829L8.31318 6.28979L9.17628 7.62803L8.17026 6.39363L8.41444 7.96722L7.99747 6.43035Z"
                        fill="#3D58DB"
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

import * as React from 'react';

type GBFlagProps = {
    className?: string;
    size?: number | { width: number; height: number };
};

export function GBFlag({
    className = '',
    size = { width: 16, height: 12 },
}: GBFlagProps) {
    const clipId = React.useId();
    const maskId1 = React.useId();
    const maskId2 = React.useId();

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
            aria-label="Great Britain Flag"
        >
            <g clipPath={`url(#${clipId})`}>
                <rect width="16" height="12" fill="white" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0V12H16V0H0Z"
                    fill="#2E42A5"
                />
                <mask
                    id={maskId1}
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
                <g mask={`url(#${maskId1})`}>
                    <path
                        d="M-1.78223 11.1427L1.73862 12.6317L16.0792 1.6189L17.9364 -0.593837L14.1714 -1.09151L8.32217 3.65422L3.61417 6.85174L-1.78223 11.1427Z"
                        fill="white"
                    />
                    <path
                        d="M-1.2998 12.1859L0.493903 13.05L17.2699 -0.799421H14.7513L-1.2998 12.1859Z"
                        fill="#F50100"
                    />
                    <path
                        d="M17.7812 11.1427L14.2604 12.6317L-0.0802135 1.6189L-1.93738 -0.593837L1.82766 -1.09151L7.67685 3.65422L12.3849 6.85174L17.7812 11.1427Z"
                        fill="white"
                    />
                    <path
                        d="M17.6611 11.8914L15.8674 12.7556L8.72402 6.82588L6.60616 6.16337L-2.11606 -0.586231H0.402514L9.11983 6.00316L11.4353 6.79758L17.6611 11.8914Z"
                        fill="#F50100"
                    />
                    <mask id={maskId2} fill="white">
                        <path d="M9.88867 4H17.0137V8H9.88867V13H6.11133V8H-0.986328V4H6.11133V-1H9.88867V4Z" />
                    </mask>
                    <path
                        d="M9.88867 4H17.0137V8H9.88867V13H6.11133V8H-0.986328V4H6.11133V-1H9.88867V4Z"
                        fill="#F50100"
                    />
                    <path
                        d="M9.88867 4H8.88867V5H9.88867V4ZM17.0137 4H18.0137V3H17.0137V4ZM17.0137 8V9H18.0137V8H17.0137ZM9.88867 8V7H8.88867V8H9.88867ZM9.88867 13V14H10.8887V13H9.88867ZM6.11133 13H5.11133V14H6.11133V13ZM6.11133 8H7.11133V7H6.11133V8ZM-0.986328 8H-1.98633V9H-0.986328V8ZM-0.986328 4V3H-1.98633V4H-0.986328ZM6.11133 4V5H7.11133V4H6.11133ZM6.11133 -1V-2H5.11133V-1H6.11133ZM9.88867 -1H10.8887V-2H9.88867V-1ZM9.88867 4V5H17.0137V4V3H9.88867V4ZM17.0137 4H16.0137V8H17.0137H18.0137V4H17.0137ZM17.0137 8V7H9.88867V8V9H17.0137V8ZM9.88867 8H8.88867V13H9.88867H10.8887V8H9.88867ZM9.88867 13V12H6.11133V13V14H9.88867V13ZM6.11133 13H7.11133V8H6.11133H5.11133V13H6.11133ZM6.11133 8V7H-0.986328V8V9H6.11133V8ZM-0.986328 8H0.0136719V4H-0.986328H-1.98633V8H-0.986328ZM-0.986328 4V5H6.11133V4V3H-0.986328V4ZM6.11133 4H7.11133V-1H6.11133H5.11133V4H6.11133ZM6.11133 -1V0H9.88867V-1V-2H6.11133V-1ZM9.88867 -1H8.88867V4H9.88867H10.8887V-1H9.88867Z"
                        fill="white"
                        mask={`url(#${maskId2})`}
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

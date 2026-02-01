import React from 'react';

type AccentStyleIconProps = {
    className?: string;
    size?: number;
};

export function AccentStyleIcon({
    className = '',
    size = 60,
}: AccentStyleIconProps) {
    const clipId0 = React.useId();
    const clipId1 = React.useId();
    const maskId1 = React.useId();
    const maskId2 = React.useId();
    const maskId3 = React.useId();
    const maskId4 = React.useId();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Accent Style Icon"
            role="img"
        >
            <g clipPath={`url(#${clipId0})`}>
                <rect width="60" height="60" rx="6" fill="var(--bg-weak)" />
                <g clipPath={`url(#${clipId1})`}>
                    <rect
                        x="11"
                        y="11"
                        width="117"
                        height="69.8311"
                        rx="4"
                        fill="var(--bg-weak)"
                    />
                    <mask id={maskId1} fill="var(--bg-weak)">
                        <path d="M11 11H128V28.9189H11V11Z" />
                    </mask>
                    <path
                        d="M11 11H128V28.9189H11V11Z"
                        fill="var(--bg-strongest)"
                    />
                    <path
                        d="M128 28.9189V28.4189H11V28.9189V29.4189H128V28.9189Z"
                        fill="var(--stroke-default)"
                        mask="url(#${maskId1})"
                    />
                    <rect
                        x="15.2168"
                        y="15.2163"
                        width="9.48649"
                        height="9.48649"
                        rx="1.58108"
                        fill="var(--bg-weak)"
                    />
                    <rect
                        x="27.3379"
                        y="16.665"
                        width="10.277"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-weak)"
                    />
                    <rect
                        x="38.6699"
                        y="16.665"
                        width="14.4932"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-weak)"
                    />
                    <rect
                        x="27.3379"
                        y="21.0134"
                        width="30.5676"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-weak)"
                    />
                    <mask id={maskId2} fill="white">
                        <path d="M11 28.9187H128V50.2633H11V28.9187Z" />
                    </mask>
                    <path
                        d="M128 50.2633V49.7633H11V50.2633V50.7633H128V50.2633Z"
                        fill="var(--stroke-default)"
                        mask="url(#${maskId2})"
                    />
                    <rect
                        x="15.2168"
                        y="33.9258"
                        width="12.9122"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-strongest)"
                    />
                    <rect
                        x="15.2168"
                        y="38.4058"
                        width="10.277"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-strongest)"
                    />
                    <rect
                        x="26.5488"
                        y="38.406"
                        width="14.4932"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-strongest)"
                    />
                    <rect
                        x="15.2168"
                        y="42.8855"
                        width="19.2365"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-strongest)"
                    />
                    <rect
                        x="35.5078"
                        y="42.8855"
                        width="8.69595"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-strongest)"
                    />
                    <rect
                        x="45.2578"
                        y="42.8855"
                        width="14.4932"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-strongest)"
                    />
                    <mask id={maskId3} fill="var(--bg-weak)">
                        <path d="M11 50.2634H128V58.4323H11V50.2634Z" />
                    </mask>
                    <path
                        d="M11 50.2634H128V58.4323H11V50.2634Z"
                        fill="var(--bg-strongest)"
                    />
                    <path
                        d="M128 58.4323V57.9323H11V58.4323V58.9323H128V58.4323Z"
                        fill="var(--stroke-default)"
                        mask="url(#${maskId3})"
                    />
                    <rect
                        x="15.2168"
                        y="53.1626"
                        width="22.3986"
                        height="2.37162"
                        rx="1.05405"
                        fill="var(--bg-weak)"
                    />
                    <mask id={maskId4} fill="var(--bg-weak)">
                        <path d="M11 58.4324H128V80.831H11V58.4324Z" />
                    </mask>
                    <path
                        d="M128 80.831V80.1262H11V80.831V81.5358H128V80.831Z"
                        fill="var(--stroke-default)"
                        mask="url(#${maskId4})"
                    />
                </g>
                <rect
                    x="11.4"
                    y="10.4"
                    width="116.2"
                    height="69.0311"
                    rx="3.6"
                    stroke="var(--stroke-default)"
                    strokeWidth="0.8"
                />
            </g>
            <rect
                x="0.5"
                y="0.5"
                width="59"
                height="59"
                rx="5.5"
                stroke="var(--stroke-default)"
            />
            <defs>
                <clipPath id={clipId0}>
                    <rect width="60" height="60" rx="6" fill="var(--bg-weak)" />
                </clipPath>
                <clipPath id={clipId1}>
                    <rect
                        x="11"
                        y="11"
                        width="117"
                        height="69.8311"
                        rx="4"
                        fill="var(--bg-weak)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}





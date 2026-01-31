import { motion } from 'motion/react';

type ThemeIconProps = {
    className?: string;
    size?: number;
    isWarm?: boolean;
};

const RAYS = [
    'M8.99865 2.46812V1.32568', // Top
    'M4.37989 13.6189L3.57207 14.4268', // Bottom Left
    'M8.99865 15.532V16.6745', // Bottom
    'M13.6172 4.38134L14.4251 3.57351', // Top Right
    'M15.5303 9.00007H16.6727', // Right
    'M13.6172 13.6189L14.4251 14.4268', // Bottom Right
    'M2.46666 9.00007H1.32422', // Left
    'M4.37983 4.3813L3.57201 3.57346', // Top Left
];

export function ThemeIcon({
    className = '',
    size = 18,
    isWarm = false,
}: ThemeIconProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Theme Icon"
            role="img"
            animate={{
                rotate: isWarm ? 45 : 0,
                scale: isWarm ? 1.1 : 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
            {/* Sun Rays - individual paths for length animation */}
            {RAYS.map((d) => (
                <motion.path
                    key={d}
                    d={d}
                    stroke="var(--icon-strong)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{
                        pathLength: isWarm ? 0.1 : 1,
                        opacity: isWarm ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
            ))}

            {/* Central Circle with Animated Fill */}
            <motion.path
                d="M11.7828 6.21586C13.3205 7.75357 13.3205 10.2466 11.7828 11.7843C10.2451 13.322 7.752 13.322 6.21431 11.7843C4.67661 10.2466 4.67661 7.75357 6.21431 6.21586C7.752 4.67817 10.2451 4.67817 11.7828 6.21586Z"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                    fill: isWarm ? 'var(--icon-strong)' : 'transparent',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
        </motion.svg>
    );
}

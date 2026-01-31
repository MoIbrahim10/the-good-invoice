import { motion } from 'motion/react';

type LightDarkIconProps = {
    className?: string;
    size?: number;
    isDark?: boolean;
};

export function LightDarkIcon({
    className = '',
    size = 18,
    isDark = false,
}: LightDarkIconProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Light/Dark Icon"
            role="img"
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            {/* Background fill for the left half */}
            <motion.path
                d="M9 2.0625C5.16853 2.0625 2.0625 5.16853 2.0625 9C2.0625 12.8315 5.16853 15.9375 9 15.9375V2.0625Z"
                animate={{
                    fill: isDark ? 'var(--icon-strong)' : 'transparent',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            />

            {/* Main outer circle stroke */}
            <path
                d="M15.9375 9C15.9375 12.8315 12.8315 15.9375 9 15.9375C5.16853 15.9375 2.0625 12.8315 2.0625 9C2.0625 5.16853 5.16853 2.0625 9 2.0625C12.8315 2.0625 15.9375 5.16853 15.9375 9Z"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Vertical bars with staggered animation */}
            <motion.path
                d="M9 2.25V15.75"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                    stroke: isDark ? 'var(--icon-strong)' : 'var(--icon-strong)',
                }}
                transition={{ delay: 0.1, duration: 0.3 }}
            />
            <motion.path
                d="M11.25 2.625V15.375"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                    stroke: isDark ? 'var(--icon-strong)' : 'var(--icon-strong)',
                }}
                transition={{ delay: 0.15, duration: 0.3 }}
            />
            <motion.path
                d="M13.5 3.75V14.25"
                stroke="var(--icon-strong)"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                    stroke: isDark ? 'var(--icon-strong)' : 'var(--icon-strong)',
                }}
                transition={{ delay: 0.2, duration: 0.3 }}
            />
        </motion.svg>
    );
}

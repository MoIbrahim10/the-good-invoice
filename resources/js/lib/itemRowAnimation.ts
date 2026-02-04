/**
 * Shared animation config for invoice item rows in ItemsTab and PreviewPanel.
 * Use with motion.tr and AnimatePresence; key must be item.id for correct exit tracking.
 * AnimatePresence mode="sync" keeps remaining rows visible while the exiting row blurs in place.
 */
export const itemRowAnimation = {
    initial: {
        opacity: 0,
        y: 8,
        filter: 'blur(4px)',
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
    },
    exit: {
        opacity: 0,
        y: 0,
        filter: 'blur(3px)',
        transition: {
            duration: 0.45,
            ease: [0.4, 0, 0.2, 1] as const,
            opacity: { duration: 0.3, delay: 0.15 },
            filter: { duration: 0.35 },
        },
    },
    transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 28,
        mass: 0.6,
    },
} as const;

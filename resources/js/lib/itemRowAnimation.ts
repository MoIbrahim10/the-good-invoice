/**
 * Shared animation config for invoice item rows in ItemsTab and PreviewPanel.
 * Use with motion.tr and AnimatePresence; key must be item.id for correct exit tracking.
 * AnimatePresence mode="popLayout" lets the exiting row pop out so layout reflows smoothly.
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
        filter: 'blur(4px)',
        transition: {
            duration: 0.25,
            ease: [0.32, 0.72, 0, 1] as const,
        },
    },
    transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 28,
        mass: 0.6,
    },
} as const;

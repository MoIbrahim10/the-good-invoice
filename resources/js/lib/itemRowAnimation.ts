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
        y: -8,
        filter: 'blur(3px)',
        transition: {
            duration: .2,
            ease: [0.4, 0, 0.2, 1] as const,
            opacity: { duration: 0.2, delay: 0.05 },
            filter: { duration: 0.2 },
        },
    },
    transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 28,
        mass: 0.6,
        layout: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const },
    },
} as const;

/**
 * Same as itemRowAnimation but for block elements (e.g. summary discount/tax lines).
 * Use with motion.div and AnimatePresence for consistent show/hide with item rows.
 */
export const summaryLineAnimation = {
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
        y: -8,
        filter: 'blur(3px)',
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] as const,
            opacity: { duration: 0.2, delay: 0.05 },
            filter: { duration: 0.2 },
        },
    },
    transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 28,
        mass: 0.6,
    },
} as const;

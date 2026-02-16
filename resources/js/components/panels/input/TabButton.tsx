import { motion } from 'motion/react';
import { cn } from '../../../lib/utils';
import type { TabState } from '../../../types/tabs';

type TabButtonProps = {
    tab: TabState;
    onClick: () => void;
    isEnabled: boolean;
    tabsAnimation: boolean;
};

const joinTransition = {
    duration: 0.5,
    ease: 'easeInOut' as const,
};

export function TabButton({
    tab,
    onClick,
    isEnabled,
    tabsAnimation,
}: TabButtonProps) {
    const baseClasses =
        'px-[9px] py-[6px] text-[14px] font-normal whitespace-nowrap relative rounded-[6px]';

    const isUnvisited = !tab.isVisited;

    const roundedClasses = 'rounded-[6px]';

    const disabledClasses =
        !isEnabled && !tab.isActive
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-default hover:opacity-90';

    const handleClick = () => {
        if (isEnabled || tab.isActive || tab.isVisited) {
            onClick();
        }
    };

    const borderColor = isUnvisited ? 'var(--stroke-strong)' : 'transparent';
    const backgroundColor =
        tabsAnimation && tab.isActive
            ? 'transparent'
            : isUnvisited
              ? 'var(--bg-default)'
              : 'var(--bg-strong)';

    const labelClasses = cn(
        'relative z-30',
        // In tabsAnimation mode, labels are rendered in a separate overlay layer
        // (so they never get occluded by the moving bubble). Keep this text in the
        // DOM for sizing + accessibility, but hide it visually.
        tabsAnimation && 'opacity-0',
        tab.isActive && 'text-text-strong',
        !tab.isActive && tab.isVisited && 'text-text-default',
        isUnvisited && 'text-text-default',
    );

    const commonButtonProps = {
        type: 'button' as const,
        onClick: handleClick,
        disabled: !isEnabled && !tab.isActive && !tab.isVisited,
        className: cn(
            baseClasses,
            'border border-dashed outline-none focus-visible:ring-1 focus-visible:ring-stroke-strong focus-visible:ring-offset-0',
            roundedClasses,
            disabledClasses,
            tabsAnimation && 'z-10',
        ),
        'aria-current': tab.isActive ? ('page' as const) : undefined,
        style: {
            WebkitTapHighlightColor: 'transparent',
        } as React.CSSProperties,
    };

    if (!tabsAnimation) {
        return (
            <button
                {...commonButtonProps}
                style={{
                    ...commonButtonProps.style,
                    borderColor,
                    backgroundColor,
                }}
            >
                {tab.isActive && (
                    <span
                        className="absolute inset-0 z-20 rounded-[6px] bg-bg-stronger"
                        aria-hidden
                    />
                )}
                <span className={labelClasses}>{tab.label}</span>
            </button>
        );
    }

    return (
        <motion.button
            {...commonButtonProps}
            layout="position"
            initial={false}
            animate={{
                borderColor,
                backgroundColor,
            }}
            transition={joinTransition}
        >
            <span className={labelClasses}>{tab.label}</span>
        </motion.button>
    );
}

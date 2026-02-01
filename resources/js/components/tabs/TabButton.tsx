import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import type { TabState } from '../../types/tabs';
import type { GroupSegment } from './TabNavigation';

type TabButtonProps = {
    tab: TabState;
    onClick: () => void;
    isEnabled: boolean;
    groupSegment: GroupSegment;
    tabsAnimation: boolean;
    /** Used when tabsAnimation: register button element for shared bubble positioning. */
    buttonRef?: (el: HTMLButtonElement | null) => void;
};

const joinTransition = {
    duration: 0.5,
    ease: 'easeInOut' as const,
};

export function TabButton({
    tab,
    onClick,
    isEnabled,
    groupSegment,
    tabsAnimation,
    buttonRef,
}: TabButtonProps) {
    const baseClasses =
        'px-[10px] py-[6px] text-[14px] font-normal whitespace-nowrap relative rounded-[6px]';

    const isUnvisited = !tab.isVisited;

    const roundedClasses =
        groupSegment === 'first'
            ? 'rounded-l-[6px] rounded-r-none'
            : groupSegment === 'last'
              ? 'rounded-r-[6px] rounded-l-none'
              : groupSegment === 'middle'
                ? 'rounded-none'
                : 'rounded-[6px]';

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
        tabsAnimation && 'invisible',
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
            'border border-dashed',
            roundedClasses,
            disabledClasses,
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
                ref={buttonRef}
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
            ref={buttonRef}
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

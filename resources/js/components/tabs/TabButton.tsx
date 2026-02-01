import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import type { TabState } from '../../types/tabs';
import type { GroupSegment } from './TabNavigation';

type TabButtonProps = {
    tab: TabState;
    onClick: () => void;
    isEnabled: boolean;
    groupSegment: GroupSegment;
};

const springTransition = {
    type: 'spring',
    bounce: 0.2,
    duration: 0.5,
} as const;

const joinTransition = {
    duration: 1,
    ease: 'easeInOut' as const,
};

export function TabButton({
    tab,
    onClick,
    isEnabled,
    groupSegment,
}: TabButtonProps) {
    const baseClasses =
        'px-[10px] py-[6px] text-[14px] font-normal leading-none whitespace-nowrap relative rounded-[6px]';

    const isUnvisited = !tab.isVisited;

    const roundedClasses =
        groupSegment === 'first'
            ? 'rounded-l-[6px] rounded-r-none'
            : groupSegment === 'last'
              ? 'rounded-r-[6px] rounded-l-none'
              : groupSegment === 'middle'
                ? 'rounded-none'
                : 'rounded-[6px]';

    const pullLeftClass =
        groupSegment === 'middle' || groupSegment === 'last' ? '-ml-1.5' : '';

    const disabledClasses =
        !isEnabled && !tab.isActive
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:opacity-90';

    const handleClick = () => {
        if (isEnabled || tab.isActive || tab.isVisited) {
            onClick();
        }
    };

    const borderColor = isUnvisited ? 'var(--stroke-strong)' : 'transparent';
    const backgroundColor = isUnvisited
        ? 'var(--bg-default)'
        : 'var(--bg-strong)';

    return (
        <motion.button
            type="button"
            onClick={handleClick}
            disabled={!isEnabled && !tab.isActive && !tab.isVisited}
            className={cn(
                baseClasses,
                'border border-dashed',
                roundedClasses,
                pullLeftClass,
                disabledClasses,
            )}
            aria-current={tab.isActive ? 'page' : undefined}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            initial={false}
            animate={{
                borderColor,
                backgroundColor,
            }}
            transition={joinTransition}
        >
            {tab.isActive && (
                <motion.span
                    layoutId="tab-bubble"
                    className="absolute inset-0 z-0 bg-bg-stronger  rounded-[6px]"
                    transition={springTransition}
                />
            )}
            <span
                className={cn(
                    'relative z-10',
                    tab.isActive && 'text-text-strong',
                    !tab.isActive && tab.isVisited && 'text-text-default',
                    isUnvisited && 'text-text-default',
                )}
            >
                {tab.label}
            </span>
        </motion.button>
    );
}

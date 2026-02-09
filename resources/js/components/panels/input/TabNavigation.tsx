import { usePage } from '@inertiajs/react';
import { LayoutGroup, motion } from 'motion/react';
import { cn } from '../../../lib/utils';
import type { SharedData } from '../../../types';
import type { TabState } from '../../../types/tabs';
import { PanelSection } from '../../layout/PanelSection';
import { useTabNavigation } from '../../providers/TabNavigationProvider';
import { TabButton } from './TabButton';

const springTransition = {
    type: 'spring',
    bounce: 0,
    duration: 0.2,
} as const;

const bubbleTransition = {
    type: 'tween' as const,
    duration: 0.2,
    ease: 'easeInOut' as const,
};

/** Consecutive visited tabs = one segment; each unvisited tab = its own segment. */
function getSegments(tabs: TabState[]): number[][] {
    const segments: number[][] = [];
    let i = 0;
    while (i < tabs.length) {
        if (tabs[i].isVisited) {
            const run: number[] = [i];
            i++;
            while (i < tabs.length && tabs[i].isVisited) {
                run.push(i);
                i++;
            }
            segments.push(run);
        } else {
            segments.push([i]);
            i++;
        }
    }
    return segments;
}

export function TabNavigation() {
    const { tabs, navigateToTab } = useTabNavigation();
    const tabsAnimation = usePage<SharedData>().props.tabsAnimation;

    return (
        <PanelSection>
            {tabsAnimation ? (
                <LayoutGroup>
                    <motion.div
                        className="relative flex w-full gap-1.5"
                        layout
                        transition={springTransition}
                        initial={false}
                    >
                        {getSegments(tabs).map((indices) => {
                            const segmentKey =
                                indices.length === 1
                                    ? tabs[indices[0]].id
                                    : indices
                                          .map((i) => tabs[i].id)
                                          .join('-');

                            const segmentClassName =
                                indices.length === 1
                                    ? 'inline-block'
                                    : 'inline-flex gap-1.5 rounded-[6px] bg-bg-strong';

                            return (
                                <motion.div
                                    key={segmentKey}
                                    className={segmentClassName}
                                    layout
                                    transition={springTransition}
                                    initial={false}
                                >
                                    {indices.map((index) => {
                                        const tab = tabs[index];
                                        return (
                                            <div
                                                key={tab.id}
                                                className="relative inline-block"
                                            >
                                                {tab.isActive && (
                                                    <motion.span
                                                        layoutId="tab-active-bubble"
                                                        className="pointer-events-none absolute inset-0 z-20 rounded-[6px] bg-bg-stronger"
                                                        transition={
                                                            bubbleTransition
                                                        }
                                                        initial={false}
                                                        aria-hidden
                                                    />
                                                )}
                                                <TabButton
                                                    tab={tab}
                                                    onClick={() =>
                                                        navigateToTab(tab.id)
                                                    }
                                                    isEnabled
                                                    tabsAnimation
                                                />
                                                <span
                                                    className={cn(
                                                        'pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-[9px] py-[6px] text-[14px] font-normal whitespace-nowrap',
                                                        tab.isActive
                                                            ? 'text-text-strong'
                                                            : 'text-text-default',
                                                    )}
                                                    aria-hidden
                                                >
                                                    {tab.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </LayoutGroup>
            ) : (
                <div className="flex gap-1.5">
                    {getSegments(tabs).map((indices) => {
                        const segmentKey =
                            indices.length === 1
                                ? tabs[indices[0]].id
                                : indices.map((i) => tabs[i].id).join('-');
                        const wrapperClassName =
                            indices.length === 1
                                ? 'inline-block'
                                : 'inline-flex gap-1.5 rounded-[6px] bg-bg-strong';
                        return (
                            <div key={segmentKey} className={wrapperClassName}>
                                {indices.map((index) => {
                                    const tab = tabs[index];
                                    return (
                                        <TabButton
                                            key={tab.id}
                                            tab={tab}
                                            onClick={() =>
                                                navigateToTab(tab.id)
                                            }
                                            isEnabled
                                            tabsAnimation={false}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            )}
        </PanelSection>
    );
}

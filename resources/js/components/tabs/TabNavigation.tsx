import { usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import type { SharedData } from '../../types';
import type { TabState } from '../../types/tabs';
import { PanelSection } from '../layout/PanelSection';
import { useTabNavigation } from '../providers/TabNavigationProvider';
import { TabButton } from './TabButton';

const springTransition = {
    type: 'spring',
    bounce: 0.25,
    duration: 0.55,
} as const;

export type GroupSegment = 'first' | 'middle' | 'last' | 'alone' | null;

function getGroupSegment(
    tabs: TabState[],
    index: number,
): GroupSegment {
    const tab = tabs[index];
    if (!tab.isVisited) {
        return null;
    }
    let runStart = index;
    while (runStart > 0 && tabs[runStart - 1].isVisited) {
        runStart--;
    }
    let runEnd = index;
    while (runEnd < tabs.length - 1 && tabs[runEnd + 1].isVisited) {
        runEnd++;
    }
    const runLength = runEnd - runStart + 1;
    if (runLength === 1) {
        return 'alone';
    }
    if (index === runStart) {
        return 'first';
    }
    if (index === runEnd) {
        return 'last';
    }
    return 'middle';
}

export function TabNavigation() {
    const { tabs, navigateToTab, canNavigateToTab } = useTabNavigation();
    const tabsAnimation = usePage<SharedData>().props.tabsAnimation;

    const content = tabs.map((tab, index) => {
        const isEnabled = canNavigateToTab(tab.id);
        const groupSegment = getGroupSegment(tabs, index);
        return (
            <TabButton
                key={tab.id}
                tab={tab}
                onClick={() => navigateToTab(tab.id)}
                isEnabled={isEnabled}
                groupSegment={groupSegment}
                tabsAnimation={tabsAnimation}
            />
        );
    });

    return (
        <PanelSection>
            {tabsAnimation ? (
                <motion.div
                    className="flex gap-1.5"
                    layout
                    transition={springTransition}
                    initial={false}
                >
                    {content}
                </motion.div>
            ) : (
                <div className="flex gap-1.5">{content}</div>
            )}
        </PanelSection>
    );
}

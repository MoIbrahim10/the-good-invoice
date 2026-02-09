import { usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import type { SharedData } from '../../../types';
import type { TabId, TabState } from '../../../types/tabs';
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

type BubbleStyle = { left: number; top: number; width: number; height: number };

export type GroupSegment = 'first' | 'middle' | 'last' | 'alone' | null;

function getGroupSegment(tabs: TabState[], index: number): GroupSegment {
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
    const segments = getSegments(tabs);
    const activeTabId = tabs.find((t) => t.isActive)?.id ?? tabs[0].id;

    const containerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>(
        {},
    );
    const previousActiveIdRef = useRef<TabId>(activeTabId);

    const [bubbleStyle, setBubbleStyle] = useState<BubbleStyle | null>(null);
    const [labelRects, setLabelRects] = useState<
        Partial<Record<TabId, BubbleStyle>>
    >({});

    useLayoutEffect(() => {
        if (!tabsAnimation || !containerRef.current) return;

        const container = containerRef.current;
        const getRect = (tabId: TabId): BubbleStyle | null => {
            const el = tabRefs.current[tabId];
            if (!el) return null;
            const cr = container.getBoundingClientRect();
            const br = el.getBoundingClientRect();
            return {
                left: br.left - cr.left,
                top: br.top - cr.top,
                width: br.width,
                height: br.height,
            };
        };

        const currentRect = getRect(activeTabId);
        if (!currentRect) return;

        const previousId = previousActiveIdRef.current;
        if (previousId !== activeTabId) {
            const previousRect = getRect(previousId);
            if (previousRect) {
                setBubbleStyle(previousRect);
                requestAnimationFrame(() => {
                    setBubbleStyle(currentRect);
                });
            } else {
                setBubbleStyle(currentRect);
            }
        } else {
            setBubbleStyle(currentRect);
        }
        previousActiveIdRef.current = activeTabId;

        const rects: Partial<Record<TabId, BubbleStyle>> = {};
        for (const tab of tabs) {
            const rect = getRect(tab.id);
            if (rect) rects[tab.id] = rect;
        }
        setLabelRects(rects);
    }, [activeTabId, tabsAnimation, tabs]);

    const registerButtonRef =
        (tabId: TabId) => (el: HTMLButtonElement | null) => {
            tabRefs.current[tabId] = el;
        };

    const content = segments.map((indices) => {
        const segmentKey =
            indices.length === 1
                ? tabs[indices[0]].id
                : indices.map((i) => tabs[i].id).join('-');
        const wrapperClassName =
            indices.length === 1
                ? 'inline-block'
                : 'inline-flex gap-1.5 rounded-[6px] bg-bg-strong';
        const tabButtons = indices.map((index) => {
            const tab = tabs[index];
            return (
                <TabButton
                    key={tab.id}
                    tab={tab}
                    onClick={() => navigateToTab(tab.id)}
                    isEnabled
                    groupSegment={getGroupSegment(tabs, index)}
                    tabsAnimation={tabsAnimation}
                    buttonRef={
                        tabsAnimation ? registerButtonRef(tab.id) : undefined
                    }
                />
            );
        });
        return tabsAnimation ? (
            <motion.div
                key={segmentKey}
                className={wrapperClassName}
                layout
                transition={springTransition}
                initial={false}
            >
                {tabButtons}
            </motion.div>
        ) : (
            <div key={segmentKey} className={wrapperClassName}>
                {tabButtons}
            </div>
        );
    });

    return (
        <PanelSection>
            {tabsAnimation ? (
                <motion.div
                    ref={containerRef}
                    className="relative flex gap-1.5 w-full"
                    layout
                    transition={springTransition}
                    initial={false}
                >
                    {content}
                    {bubbleStyle && (
                        <motion.span
                            className="pointer-events-none absolute z-30 rounded-[6px] bg-bg-stronger"
                            initial={false}
                            animate={{
                                left: bubbleStyle.left,
                                top: bubbleStyle.top,
                                width: bubbleStyle.width,
                                height: bubbleStyle.height,
                            }}
                            transition={bubbleTransition}
                            aria-hidden
                        />
                    )}
                    {tabsAnimation && (
                        <div
                            className="pointer-events-none absolute inset-0 z-40 flex items-stretch"
                            aria-hidden
                        >
                            {tabs.map((tab) => {
                                const rect = labelRects[tab.id];
                                if (!rect) return null;
                                const isUnvisited = !tab.isVisited;
                                const labelClasses = cn(
                                    'flex items-center justify-center px-[9px] py-[6px] text-[14px] font-normal whitespace-nowrap',
                                    tab.isActive && 'text-text-strong',
                                    (!tab.isActive && tab.isVisited) ||
                                        isUnvisited
                                        ? 'text-text-default'
                                        : '',
                                );
                                return (
                                    <span
                                        key={tab.id}
                                        className={labelClasses}
                                        style={{
                                            position: 'absolute',
                                            left: rect.left,
                                            top: rect.top,
                                            width: rect.width,
                                            height: rect.height,
                                            lineHeight: 'auto',
                                        }}
                                    >
                                        {tab.label}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            ) : (
                <div className="flex gap-1.5">{content}</div>
            )}
        </PanelSection>
    );
}

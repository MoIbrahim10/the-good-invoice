import { useState, useCallback, useEffect } from 'react';
import type { TabId, TabState } from '../types/tabs';

const TAB_ORDER: TabId[] = [
    'issued-by',
    'bill-to',
    'details',
    'items',
    'notes',
    'display',
];

const INITIAL_TABS: TabState[] = TAB_ORDER.map((id, index) => ({
    id,
    label: getTabLabel(id),
    isActive: index === 0,
    isVisited: index === 0,
    isCompleted: false,
}));

function getTabLabel(id: TabId): string {
    const labels: Record<TabId, string> = {
        'issued-by': 'Issued by',
        'bill-to': 'Bill to',
        details: 'Details',
        items: 'Items',
        notes: 'Notes',
        display: 'Display',
    };
    return labels[id];
}

export function useTabNavigation() {
    const [tabs, setTabs] = useState<TabState[]>(INITIAL_TABS);
    const [activeTabId, setActiveTabId] = useState<TabId>('issued-by');

    const getActiveTabIndex = useCallback(() => {
        return TAB_ORDER.indexOf(activeTabId);
    }, [activeTabId]);

    const canNavigateToTab = useCallback(
        (targetTabId: TabId) => {
            const targetIndex = TAB_ORDER.indexOf(targetTabId);
            const activeIndex = getActiveTabIndex();

            // Can always navigate to already visited tabs (backward)
            const targetTab = tabs.find((t) => t.id === targetTabId);
            if (targetTab?.isVisited) {
                return true;
            }

            // Can navigate to next tab if current tab is visited
            if (
                targetIndex === activeIndex + 1 &&
                tabs[activeIndex]?.isVisited
            ) {
                return true;
            }

            // Cannot skip to unvisited tabs
            return false;
        },
        [tabs, getActiveTabIndex],
    );

    const navigateToTab = useCallback(
        (tabId: TabId) => {
            if (!canNavigateToTab(tabId)) {
                return;
            }

            setTabs((prevTabs) =>
                prevTabs.map((tab) => ({
                    ...tab,
                    isActive: tab.id === tabId,
                    isVisited: tab.id === tabId ? true : tab.isVisited,
                })),
            );
            setActiveTabId(tabId);
        },
        [canNavigateToTab],
    );

    const navigateToPreviousTab = useCallback(() => {
        const activeIndex = getActiveTabIndex();
        if (activeIndex > 0) {
            const previousTabId = TAB_ORDER[activeIndex - 1];
            if (tabs[activeIndex - 1]?.isVisited) {
                navigateToTab(previousTabId);
            }
        }
    }, [getActiveTabIndex, tabs, navigateToTab]);

    const navigateToNextTab = useCallback(() => {
        const activeIndex = getActiveTabIndex();
        if (activeIndex < TAB_ORDER.length - 1) {
            const currentTab = tabs[activeIndex];
            if (currentTab?.isVisited) {
                const nextTabId = TAB_ORDER[activeIndex + 1];
                navigateToTab(nextTabId);
            }
        }
    }, [getActiveTabIndex, tabs, navigateToTab]);

    const markTabCompleted = useCallback((tabId: TabId) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.id === tabId ? { ...tab, isCompleted: true } : tab,
            ),
        );
    }, []);

    const handleKeyboardNavigation = useCallback(
        (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const modifierKey = isMac ? e.metaKey : e.ctrlKey;

            if (modifierKey && e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateToPreviousTab();
            } else if (modifierKey && e.key === 'ArrowRight') {
                e.preventDefault();
                navigateToNextTab();
            }
        },
        [navigateToPreviousTab, navigateToNextTab],
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardNavigation);
        return () => {
            window.removeEventListener('keydown', handleKeyboardNavigation);
        };
    }, [handleKeyboardNavigation]);

    const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

    return {
        tabs,
        activeTabId,
        activeTab,
        navigateToTab,
        navigateToPreviousTab,
        navigateToNextTab,
        markTabCompleted,
        canNavigateToTab,
    };
}

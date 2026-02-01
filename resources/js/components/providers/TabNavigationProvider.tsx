import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import type { TabId, TabState } from '../../types/tabs';

const TAB_ORDER: TabId[] = [
    'issued-by',
    'bill-to',
    'details',
    'items',
    'notes',
    'display',
];

const VALID_TAB_IDS = new Set<string>(TAB_ORDER);

function parseTabFromUrl(): TabId {
    if (typeof window === 'undefined') {
        return 'issued-by';
    }
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    return tab && VALID_TAB_IDS.has(tab) ? (tab as TabId) : 'issued-by';
}

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

type TabNavigationContextValue = {
    tabs: TabState[];
    activeTabId: TabId;
    activeTab: TabState;
    navigateToTab: (tabId: TabId) => void;
    navigateToPreviousTab: () => void;
    navigateToNextTab: () => void;
    markTabCompleted: (tabId: TabId) => void;
    canNavigateToTab: (tabId: TabId) => boolean;
};

const TabNavigationContext = createContext<TabNavigationContextValue | null>(
    null,
);

type TabNavigationProviderProps = {
    children: React.ReactNode;
};

export function TabNavigationProvider({
    children,
}: TabNavigationProviderProps) {
    const [activeTabId, setActiveTabIdState] = useState<TabId>(parseTabFromUrl);

    const setActiveTabId = useCallback((tabId: TabId) => {
        setActiveTabIdState(tabId);
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tabId);
        window.history.replaceState(null, '', url.pathname + url.search);
    }, []);

    const hasSyncedUrl = useRef(false);
    useEffect(() => {
        if (hasSyncedUrl.current) {
            return;
        }
        hasSyncedUrl.current = true;
        const params = new URLSearchParams(window.location.search);
        if (!params.has('tab')) {
            const url = new URL(window.location.href);
            url.searchParams.set('tab', activeTabId);
            window.history.replaceState(null, '', url.pathname + url.search);
        }
    }, [activeTabId]);

    useEffect(() => {
        const onPopState = () => {
            setActiveTabIdState(parseTabFromUrl());
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    // Initialize tabs state based on activeTabId from URL
    const [tabs, setTabs] = useState<TabState[]>(() => {
        const activeIndex = TAB_ORDER.indexOf(activeTabId);
        return TAB_ORDER.map((id, index) => ({
            id,
            label: getTabLabel(id),
            isActive: id === activeTabId,
            isVisited: index <= activeIndex,
            isCompleted: false,
        }));
    });

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
        [canNavigateToTab, setActiveTabId],
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

    // Sync URL tab to local state when URL changes (e.g., browser back/forward)
    useEffect(() => {
        setTabs((prevTabs) => {
            const tabFromUrl = prevTabs.find((t) => t.id === activeTabId);
            if (tabFromUrl && !tabFromUrl.isActive) {
                return prevTabs.map((tab) => ({
                    ...tab,
                    isActive: tab.id === activeTabId,
                    isVisited: tab.id === activeTabId ? true : tab.isVisited,
                }));
            }
            return prevTabs;
        });
    }, [activeTabId]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardNavigation);
        return () => {
            window.removeEventListener('keydown', handleKeyboardNavigation);
        };
    }, [handleKeyboardNavigation]);

    const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

    const value = useMemo<TabNavigationContextValue>(
        () => ({
            tabs,
            activeTabId,
            activeTab,
            navigateToTab,
            navigateToPreviousTab,
            navigateToNextTab,
            markTabCompleted,
            canNavigateToTab,
        }),
        [
            tabs,
            activeTabId,
            activeTab,
            navigateToTab,
            navigateToPreviousTab,
            navigateToNextTab,
            markTabCompleted,
            canNavigateToTab,
        ],
    );

    return (
        <TabNavigationContext.Provider value={value}>
            {children}
        </TabNavigationContext.Provider>
    );
}

export function useTabNavigation() {
    const context = useContext(TabNavigationContext);
    if (!context) {
        throw new Error(
            'useTabNavigation must be used within TabNavigationProvider',
        );
    }
    return context;
}

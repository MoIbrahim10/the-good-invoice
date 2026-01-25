import { TabButton } from './TabButton';
import { useTabNavigation } from '../providers/TabNavigationProvider';
import { PanelSection } from '../layout/PanelSection';
import type { TabState } from '../../types/tabs';

export function TabNavigation() {
    const { tabs, navigateToTab, canNavigateToTab } = useTabNavigation();

    // Group consecutive visited tabs together
    const renderTabs = () => {
        const groups: Array<{ tabs: TabState[]; isConnected: boolean }> = [];
        let currentGroup: TabState[] = [];
        let currentGroupIsVisited = false;

        tabs.forEach((tab) => {
            if (tab.isVisited) {
                // If this tab is visited, add to current group
                if (!currentGroupIsVisited) {
                    // Start new visited group
                    if (currentGroup.length > 0) {
                        groups.push({
                            tabs: [...currentGroup],
                            isConnected: false,
                        });
                        currentGroup = [];
                    }
                    currentGroupIsVisited = true;
                }
                currentGroup.push(tab);
            } else {
                // If this tab is not visited, close current group if it was visited
                if (currentGroupIsVisited && currentGroup.length > 0) {
                    groups.push({ tabs: [...currentGroup], isConnected: true });
                    currentGroup = [];
                    currentGroupIsVisited = false;
                }
                // Add non-visited tab as its own group
                groups.push({ tabs: [tab], isConnected: false });
            }
        });

        // Add remaining group
        if (currentGroup.length > 0) {
            groups.push({
                tabs: [...currentGroup],
                isConnected: currentGroupIsVisited,
            });
        }

        return groups;
    };

    const groups = renderTabs();

    return (
        <PanelSection>
            <div className="flex gap-1.5 transition-all duration-300 ease-in-out">
                {groups.map((group, groupIndex) => {
                    if (group.isConnected) {
                        // Render connected group with shared background
                        const groupBgClass = 'bg-bg-strong';
                        const groupBorderRadius = 'rounded-md overflow-hidden';

                        return (
                            <div
                                key={`group-${groupIndex}`}
                                className={`flex gap-1.5 ${groupBgClass} ${groupBorderRadius} transition-all duration-300 ease-in-out`}
                            >
                                {group.tabs.map((tab) => {
                                    const isEnabled = canNavigateToTab(tab.id);

                                    return (
                                        <TabButton
                                            key={tab.id}
                                            tab={tab}
                                            onClick={() =>
                                                navigateToTab(tab.id)
                                            }
                                            isEnabled={isEnabled}
                                            position="middle"
                                            roundedClasses="rounded-md"
                                        />
                                    );
                                })}
                            </div>
                        );
                    } else {
                        // Render non-visited tab with gap
                        return group.tabs.map((tab) => {
                            const isEnabled = canNavigateToTab(tab.id);
                            return (
                                <div
                                    key={tab.id}
                                    className="transition-all duration-300 ease-in-out"
                                >
                                    <TabButton
                                        tab={tab}
                                        onClick={() => navigateToTab(tab.id)}
                                        isEnabled={isEnabled}
                                        position="middle"
                                        roundedClasses="rounded-md"
                                    />
                                </div>
                            );
                        });
                    }
                })}
            </div>
        </PanelSection>
    );
}

export type TabId = 'issued-by' | 'bill-to' | 'details' | 'items' | 'notes' | 'display';

export type TabState = {
  id: TabId;
  label: string;
  isActive: boolean;
  isVisited: boolean;
  isCompleted: boolean;
};

export type TabNavigationState = {
  tabs: TabState[];
  activeTabId: TabId;
};

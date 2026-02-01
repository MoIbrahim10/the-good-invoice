import { PanelFooter } from '../layout/PanelFooter';
import { PanelHeader } from '../layout/PanelHeader';
import { useTabNavigation } from '../providers/TabNavigationProvider';
import { TabNavigation } from '../tabs/TabNavigation';
import { BillToTab } from '../tabs/tabContents/BillToTab';
import { DetailsTab } from '../tabs/tabContents/DetailsTab';
import { DisplayTab } from '../tabs/tabContents/DisplayTab';
import { IssuedByTab } from '../tabs/tabContents/IssuedByTab';
import { ItemsTab } from '../tabs/tabContents/ItemsTab';
import { NotesTab } from '../tabs/tabContents/NotesTab';

export function InputPanel() {
    const { activeTabId } = useTabNavigation();

    return (
        <div className="flex h-full max-w-[454px] shrink-0 flex-col justify-center overflow-hidden max-h-[626px]">
            <div className="flex h-full flex-col">
                {/* Header  */}
                <PanelHeader />

                {/* Tab Navigation */}
                <TabNavigation />

                {/* Tab Content Area - Scrollable, constrained to remaining height */}
                <div className="flex-1 overflow-y-auto">
                    {activeTabId === 'issued-by' && <IssuedByTab />}
                    {activeTabId === 'bill-to' && <BillToTab />}
                    {activeTabId === 'details' && <DetailsTab />}
                    {activeTabId === 'items' && <ItemsTab />}
                    {activeTabId === 'notes' && <NotesTab />}
                    {activeTabId === 'display' && <DisplayTab />}
                </div>

                {/* Footer */}
                <PanelFooter />
            </div>
        </div>
    );
}

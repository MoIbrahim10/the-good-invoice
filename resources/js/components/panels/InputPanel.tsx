import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import type { SharedData } from '../../types';
import type { TabId } from '../../types/tabs';
import { useIsLg } from '../../hooks/use-is-lg';
import { PanelFooter } from '../layout/PanelFooter';
import { PanelHeader } from '../layout/PanelHeader';
import { useTabNavigation } from '../providers/TabNavigationProvider';
import { TabNavigation } from './input/TabNavigation';
import { DetailsTab } from './input/tabContents/DetailsTab';
import { DisplayTab } from './input/tabContents/DisplayTab';

import { ItemsTab } from './input/tabContents/ItemsTab';
import { NotesTab } from './input/tabContents/NotesTab';
import { IssuedByTab } from './input/tabContents/IssuedByTab';
import { BillToTab } from './input/tabContents/BillToTab';

const SLIDE_PX = 18;
const BLUR_PX = 3;
const EASE_OUT_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

const contentEnter = {
    type: 'tween' as const,
    duration: 0.3,
    ease: EASE_OUT_SMOOTH,
};

const contentExit = {
    type: 'tween' as const,
    duration: 0.2,
    ease: EASE_OUT_SMOOTH,
};

function TabContentPanelAnimated({ tabId }: { tabId: TabId }) {
    const slideIn = SLIDE_PX;
    const slideOut = -SLIDE_PX;

    return (
        <motion.div
            key={tabId}
            initial={{
                opacity: 0,
                x: slideIn,
                filter: `blur(${BLUR_PX}px)`,
            }}
            animate={{
                opacity: 1,
                x: 0,
                filter: 'blur(0px)',
            }}
            exit={{
                opacity: 0,
                x: slideOut,
                filter: `blur(${BLUR_PX}px)`,
                transition: contentExit,
            }}
            transition={contentEnter}
            className="h-full"
        >
            {tabId === 'issued-by' && <IssuedByTab />}
            {tabId === 'bill-to' && <BillToTab />}
            {tabId === 'details' && <DetailsTab />}
            {tabId === 'items' && <ItemsTab />}
            {tabId === 'notes' && <NotesTab />}
            {tabId === 'display' && <DisplayTab />}
        </motion.div>
    );
}

function TabContentPanelStatic({ tabId }: { tabId: TabId }) {
    return (
        <div key={tabId} className="h-full">
            {tabId === 'issued-by' && <IssuedByTab />}
            {tabId === 'bill-to' && <BillToTab />}
            {tabId === 'details' && <DetailsTab />}
            {tabId === 'items' && <ItemsTab />}
            {tabId === 'notes' && <NotesTab />}
            {tabId === 'display' && <DisplayTab />}
        </div>
    );
}

export function InputPanel() {
    const { activeTabId } = useTabNavigation();
    const tabsContentAnimation =
        usePage<SharedData>().props.tabsContentAnimation;
    const isLg = useIsLg();

    return (
        <div className="mx-auto flex min-h-0 w-full max-w-[446px] shrink-0 flex-col overflow-hidden max-lg:flex-none max-lg:overflow-visible lg:mx-0 lg:h-full lg:max-h-[626px] lg:max-w-none lg:min-w-[446px] lg:py-2">
            <div className="flex min-h-0 flex-1 flex-col max-lg:min-h-0">
                <PanelHeader />
                <TabNavigation />
                <div className="relative flex-1 overflow-x-hidden overflow-y-auto max-lg:min-h-[40vh]">
                    {tabsContentAnimation ? (
                        <AnimatePresence mode="wait" initial={false}>
                            <TabContentPanelAnimated
                                key={activeTabId}
                                tabId={activeTabId}
                            />
                        </AnimatePresence>
                    ) : (
                        <TabContentPanelStatic tabId={activeTabId} />
                    )}
                </div>
                {isLg && <PanelFooter />}
            </div>
        </div>
    );
}

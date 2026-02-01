import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { TabId } from '../../types/tabs';
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

const TAB_ORDER: TabId[] = [
    'issued-by',
    'bill-to',
    'details',
    'items',
    'notes',
    'display',
];

const SLIDE_PX = 18;
const BLUR_PX = 3;
const EASE_OUT_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

const contentEnter = {
    type: 'tween' as const,
    duration: 0.4,
    ease: EASE_OUT_SMOOTH,
};

const contentExit = {
    type: 'tween' as const,
    duration: 0.25,
    ease: EASE_OUT_SMOOTH,
};

function TabContentPanel({
    tabId,
    direction,
}: {
    tabId: TabId;
    direction: number;
}) {
    const fromRight = direction > 0;
    const slideIn = fromRight ? SLIDE_PX : -SLIDE_PX;
    const slideOut = fromRight ? -SLIDE_PX : SLIDE_PX;

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

export function InputPanel() {
    const { activeTabId } = useTabNavigation();
    const activeIndex = TAB_ORDER.indexOf(activeTabId);
    const prevIndexRef = useRef(activeIndex);

    const direction =
        activeIndex > prevIndexRef.current
            ? 1
            : activeIndex < prevIndexRef.current
              ? -1
              : 0;

    useEffect(() => {
        prevIndexRef.current = activeIndex;
    }, [activeIndex]);

    return (
        <div className="mx-auto flex min-h-0 w-full max-w-[446px] shrink-0 flex-col overflow-hidden max-lg:min-h-0 max-lg:flex-1 lg:mx-0 lg:h-full lg:max-h-[626px] lg:min-w-[446px] lg:max-w-none">
            <div className="flex min-h-0 flex-1 flex-col">
                <PanelHeader />
                <TabNavigation />
                <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
                    <AnimatePresence
                        mode="wait"
                        initial={false}
                    >
                        <TabContentPanel
                            key={activeTabId}
                            tabId={activeTabId}
                            direction={direction}
                        />
                    </AnimatePresence>
                </div>
                <PanelFooter />
            </div>
        </div>
    );
}

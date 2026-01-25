import { Head } from '@inertiajs/react';

import { InvoiceProvider } from '../components/providers/InvoiceProvider';
import { TabNavigationProvider } from '../components/providers/TabNavigationProvider';
import { ViewportContainer } from '../components/layout/ViewportContainer';
import { InvoiceLayout } from '../components/layout/InvoiceLayout';
import { InputPanel } from '../components/panels/InputPanel';
import { PreviewPanel } from '../components/panels/PreviewPanel';

export default function Invoice() {
    return (
        <>
            <Head title="Invoice" />

            <InvoiceProvider>
                <TabNavigationProvider>
                    <ViewportContainer>
                        <InvoiceLayout>
                            <InputPanel />
                            <PreviewPanel />
                        </InvoiceLayout>
                    </ViewportContainer>
                </TabNavigationProvider>
            </InvoiceProvider>
        </>
    );
}

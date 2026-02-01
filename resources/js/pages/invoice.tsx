import { Head } from '@inertiajs/react';

import { InvoiceProvider } from '../components/providers/InvoiceProvider';
import { InvoiceTouchedProvider } from '../components/providers/InvoiceTouchedProvider';
import { TabNavigationProvider } from '../components/providers/TabNavigationProvider';
import { ExportProvider } from '../components/providers/ExportProvider';
import { ViewportContainer } from '../components/layout/ViewportContainer';
import { InvoiceLayout } from '../components/layout/InvoiceLayout';
import { InputPanel } from '../components/panels/InputPanel';
import { PreviewPanel } from '../components/panels/PreviewPanel';

export default function Invoice() {
    return (
        <>
            <Head title="Invoice" />

            <InvoiceProvider>
                <InvoiceTouchedProvider>
                    <ExportProvider>
                        <TabNavigationProvider>
                            <ViewportContainer>
                                <InvoiceLayout>
                                    <InputPanel />
                                    <PreviewPanel />
                                </InvoiceLayout>
                            </ViewportContainer>
                        </TabNavigationProvider>
                    </ExportProvider>
                </InvoiceTouchedProvider>
            </InvoiceProvider>
        </>
    );
}

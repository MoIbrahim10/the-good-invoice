import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from '@react-pdf/renderer';
import { format } from 'date-fns';
import { currencies } from '@/data/currencies';
import {
    formatCurrencyForDisplay,
    formatNumberForDisplay,
} from '@/lib/utils';
import type { InvoiceData, InvoiceItem } from '@/types/invoice';
import type { InvoicePlaceholders } from '@/types/invoice';

const colors = {
    border: '#e5e7eb',
    textStrong: '#111827',
    textDefault: '#374151',
    textWeak: '#6b7280',
    textWeaker: '#9ca3af',
    bg: '#ffffff',
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: colors.bg,
        fontSize: 10,
        padding: 28,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        marginBottom: 12,
    },
    logoBox: {
        width: 28,
        height: 28,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 24,
        height: 24,
    },
    headerText: {
        flex: 1,
        flexDirection: 'column',
        gap: 2,
    },
    title: {
        fontSize: 11,
        fontWeight: 600,
        color: colors.textStrong,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dueDate: {
        fontSize: 10,
        color: colors.textWeak,
    },
    invoiceNumber: {
        fontSize: 10,
        color: colors.textWeaker,
    },
    addresses: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 12,
    },
    addressCol: {
        flex: 1,
        flexDirection: 'column',
        gap: 4,
    },
    addressTitle: {
        fontSize: 10,
        color: colors.textDefault,
        marginBottom: 2,
    },
    addressText: {
        fontSize: 10,
        color: colors.textStrong,
    },
    addressPlaceholder: {
        color: colors.textWeaker,
    },
    table: {
        marginBottom: 12,
    },
    tableHeader: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 10,
        color: colors.textWeak,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderBottomWidth: 0,
        fontSize: 10,
        color: colors.textStrong,
    },
    colItem: { width: '54%' },
    colQty: { width: '15%' },
    colRate: { width: '15%' },
    colAmount: { width: '16%', textAlign: 'right' },
    tableHeaderAmount: { textAlign: 'right' },
    summary: {
        alignSelf: 'flex-end',
        width: 160,
        flexDirection: 'column',
        gap: 6,
        marginBottom: 12,
        fontSize: 10,
        color: colors.textWeak,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryAmount: {
        color: colors.textDefault,
    },
    summaryTotal: {
        fontWeight: 600,
        color: colors.textStrong,
    },
    notesTitle: {
        fontSize: 9,
        color: colors.textWeak,
        marginBottom: 4,
    },
    notesText: {
        fontSize: 9,
        color: colors.textDefault,
    },
});

function previewText(
    value: string | number,
    placeholder: string,
): { text: string; placeholder: boolean } {
    const isEmpty =
        value === '' ||
        value === 0 ||
        (typeof value === 'string' && value.trim() === '');
    return {
        text: isEmpty ? placeholder : String(value),
        placeholder: isEmpty,
    };
}

export type InvoicePdfDocumentProps = {
    data: InvoiceData;
    placeholders: InvoicePlaceholders;
};

export function InvoicePdfDocument({
    data,
    placeholders,
}: InvoicePdfDocumentProps) {
    const {
        issuer,
        billTo,
        details,
        items,
        tax,
        taxType,
        discount,
        discountType,
        notes,
    } = data;

    const currency =
        currencies.find((c) => c.code === details.currency) || currencies[0];
    const formatAmount = (amount: number) =>
        formatCurrencyForDisplay(amount, currency.symbol);

    const subtotal = items.reduce(
        (sum: number, item: InvoiceItem) => sum + item.quantity * item.rate,
        0,
    );
    const discountAmount =
        discountType === 'percentage' ? (subtotal * discount) / 100 : discount;
    const taxAmount =
        taxType === 'percentage'
            ? ((subtotal - discountAmount) * tax) / 100
            : tax;
    const total = subtotal - discountAmount + taxAmount;

    const dueDateText =
        details.dueDateInput?.trim() ||
        (details.dueDate
            ? format(
                  details.dueDate instanceof Date
                      ? details.dueDate
                      : new Date(details.dueDate),
                  'dd/MM/yyyy',
              )
            : placeholders.details.dueDate);

    const issuerName = previewText(issuer.name, placeholders.issuer.name);
    const invoiceNo = previewText(
        details.invoiceNumber,
        placeholders.details.invoiceNumber,
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    {issuer.includeLogo !== false && (
                        <View style={styles.logoBox}>
                            {issuer.logo ? (
                                <Image
                                    src={issuer.logo}
                                    style={styles.logo}
                                />
                            ) : (
                                <Text style={styles.addressText}>—</Text>
                            )}
                        </View>
                    )}
                    <View style={styles.headerText}>
                        <Text style={styles.title}>
                            Invoice from {issuerName.text}
                        </Text>
                        <View style={styles.headerRow}>
                            <Text style={styles.dueDate}>Due {dueDateText}</Text>
                            <Text
                                style={[
                                    styles.invoiceNumber,
                                    invoiceNo.placeholder && styles.addressPlaceholder,
                                ]}
                            >
                                {invoiceNo.text}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Addresses */}
                <View style={styles.addresses}>
                    <View style={styles.addressCol}>
                        <Text style={styles.addressTitle}>Bill from</Text>
                        <Text style={styles.addressText}>
                            {previewText(issuer.name, placeholders.issuer.name).text}
                        </Text>
                        <Text
                            style={[
                                styles.addressText,
                                previewText(issuer.address, placeholders.issuer.address)
                                    .placeholder && styles.addressPlaceholder,
                            ]}
                        >
                            {previewText(issuer.address, placeholders.issuer.address).text}
                        </Text>
                        <Text
                            style={[
                                styles.addressText,
                                previewText(issuer.email, placeholders.issuer.email)
                                    .placeholder && styles.addressPlaceholder,
                            ]}
                        >
                            {previewText(issuer.email, placeholders.issuer.email).text}
                        </Text>
                    </View>
                    <View style={styles.addressCol}>
                        <Text style={styles.addressTitle}>Bill to</Text>
                        <Text
                            style={[
                                styles.addressText,
                                previewText(billTo.address, placeholders.billTo.address)
                                    .placeholder && styles.addressPlaceholder,
                            ]}
                        >
                            {previewText(billTo.address, placeholders.billTo.address).text}
                        </Text>
                        <Text
                            style={[
                                styles.addressText,
                                previewText(billTo.email, placeholders.billTo.email)
                                    .placeholder && styles.addressPlaceholder,
                            ]}
                        >
                            {previewText(billTo.email, placeholders.billTo.email).text}
                        </Text>
                    </View>
                </View>

                {/* Items Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colItem}>Item</Text>
                        <Text style={styles.colQty}>QTY</Text>
                        <Text style={styles.colRate}>Rate</Text>
                        <Text
                            style={[styles.colAmount, styles.tableHeaderAmount]}
                        >
                            Amount
                        </Text>
                    </View>
                    {items.length > 0 ? (
                        items.map((item: InvoiceItem) => (
                            <View key={item.id} style={styles.tableRow}>
                                <Text style={styles.colItem}>
                                    {previewText(
                                        item.description,
                                        placeholders.items.description,
                                    ).text}
                                </Text>
                                <Text style={styles.colQty}>
                                    {item.quantity === 0
                                        ? placeholders.items.quantity
                                        : formatNumberForDisplay(item.quantity)}
                                </Text>
                                <Text style={styles.colRate}>
                                    {item.rate === 0
                                        ? formatAmount(0)
                                        : formatAmount(item.rate)}
                                </Text>
                                <Text style={styles.colAmount}>
                                    {item.quantity * item.rate === 0
                                        ? formatAmount(0)
                                        : formatAmount(
                                              item.quantity * item.rate,
                                          )}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <View style={styles.tableRow}>
                            <Text style={styles.colItem}>
                                No items added yet...
                            </Text>
                            <Text style={styles.colQty}>-</Text>
                            <Text style={styles.colRate}>-</Text>
                            <Text style={styles.colAmount}>-</Text>
                        </View>
                    )}
                </View>

                {/* Summary */}
                <View style={styles.summary}>
                    <View style={styles.summaryRow}>
                        <Text>Subtotal</Text>
                        <Text style={styles.summaryAmount}>
                            {formatAmount(subtotal)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text>
                            Discount
                            {discountType === 'percentage' &&
                                ` (${discount}%)`}
                        </Text>
                        <Text style={styles.summaryAmount}>
                            {formatAmount(-discountAmount)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text>
                            Tax
                            {taxType === 'percentage' && ` (${tax}%)`}
                        </Text>
                        <Text style={styles.summaryAmount}>
                            {formatAmount(taxAmount)}
                        </Text>
                    </View>
                    <View style={[styles.summaryRow, styles.summaryTotal]}>
                        <Text>Total</Text>
                        <Text>{formatAmount(total)}</Text>
                    </View>
                </View>

                {/* Notes */}
                <View>
                    <Text style={styles.notesTitle}>Notes</Text>
                    <Text style={styles.notesText}>
                        {previewText(notes, placeholders.notes).text}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

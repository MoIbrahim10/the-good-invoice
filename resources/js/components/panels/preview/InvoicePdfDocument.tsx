import {
    Document,
    Font,
    Image,
    Page,
    Path,
    StyleSheet,
    Svg,
    Text,
    View,
} from '@react-pdf/renderer';
import { format } from 'date-fns';
import { currencies } from '@/data/currencies';
import { formatCurrencyForDisplay, formatNumberForDisplay } from '@/lib/utils';
import type { Currency } from '@/types/currency';

/* Inter – main PDF font */
Font.register({
    family: 'Inter',
    fonts: [
        { src: 'https://fonts.bunny.net/inter/files/inter-latin-400-normal.woff' },
        { src: 'https://fonts.bunny.net/inter/files/inter-latin-ext-400-normal.woff' },
        { src: 'https://fonts.bunny.net/inter/files/inter-latin-500-normal.woff', fontWeight: 500 },
        { src: 'https://fonts.bunny.net/inter/files/inter-latin-ext-500-normal.woff', fontWeight: 500 },
    ],
});

/* Noto Sans – fallback for ₹ ₽ only (devanagari + latin-ext have these glyphs) */
Font.register({
    family: 'PdfCurrency',
    fonts: [
        { src: 'https://fonts.bunny.net/noto-sans/files/noto-sans-devanagari-400-normal.woff' },
        { src: 'https://fonts.bunny.net/noto-sans/files/noto-sans-latin-ext-400-normal.woff' },
    ],
});

/** Use symbol for all currencies; RUB/INR amounts use PdfCurrency font for ₹ ₽ */
function formatCurrencyForPdf(amount: number, currency: Currency): string {
    return formatCurrencyForDisplay(amount, currency.symbol);
}

import type {
    DisplayColorValue,
    DisplayStyle,
    InvoiceData,
    InvoiceItem,
    InvoicePlaceholders,
} from '@/types/invoice';

/** Preview palettes – hex values from app.css/colors.css (preview-0, 25, 200, 350, 400, 500, 700) */
const PREVIEW_PALETTES: Record<
    DisplayColorValue,
    {
        0: string;
        25: string;
        200: string;
        350: string;
        400: string;
        500: string;
        700: string;
    }
> = {
    gray: {
        0: '#ffffff',
        25: '#fafbfc',
        200: '#e5e7eb',
        350: '#bdc2ca',
        400: '#9ca3af',
        500: '#6b7280',
        700: '#374151',
    },
    cream: {
        0: '#ffffff',
        25: '#fdfdfc',
        200: '#e7e5e4',
        350: '#c6c3c0',
        400: '#a8a29e',
        500: '#78716c',
        700: '#44403c',
    },
    blue: {
        0: '#ffffff',
        25: '#F9FBFE',
        200: '#E7F0FB',
        350: '#B4C9E0',
        400: '#7E90A6',
        500: '#3B5682',
        700: '#1A2D61',
    },
    green: {
        0: '#ffffff',
        25: '#FAFBF8',
        200: '#E9EEDC',
        350: '#CADBAB',
        400: '#AABD8A',
        500: '#859C5D',
        700: '#2E4116',
    },
};

type PdfPalette = {
    contentBg: string /* page/main area: always preview-0 */;
    styleBg: string /* header/table header: preview-0 or preview-25 when accent */;
    logoBoxBg: string;
    border: string;
    textStrong: string;
    textDefault: string;
    textWeak: string;
    textWeaker: string;
    iconWeak: string;
};

function getPdfPalette(
    color: DisplayColorValue = 'gray',
    style: DisplayStyle = 'solid',
): PdfPalette {
    const p = PREVIEW_PALETTES[color];
    return {
        contentBg: p[0] /* main content area always white (preview-0) */,
        styleBg: style === 'solid' ? p[0] : p[25],
        logoBoxBg: p[0],
        border: p[200],
        textStrong: p[700],
        textDefault: p[500],
        textWeak: p[400],
        textWeaker: p[350],
        iconWeak: p[350],
    };
}

/** Preview content size: 444×626 px; PDF scaled to A4 using same ratio. */
const PREVIEW_WIDTH = 444;
/** A4 width in pt (210mm at 72pt/in). */
const A4_WIDTH_PT = (210 * 72) / 25.4;
/** Scale from preview px to PDF pt so layout matches preview at A4 proportions. */
const PDF_SCALE = A4_WIDTH_PT / PREVIEW_WIDTH;

/** Scale a preview px value to PDF pt; rounded to 2 decimals for exact padding/gap/font match. */
function scale(v: number): number {
    return Math.round(v * PDF_SCALE * 100) / 100;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        fontSize: scale(10),
        fontFamily: 'Inter',
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    notesSpacer: {
        flexGrow: 1,
        minHeight: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
        paddingVertical: scale(16),
        paddingHorizontal: scale(16),
        borderBottomWidth: scale(1),
    },
    logoBox: {
        width: scale(28),
        height: scale(28),
        borderWidth: scale(1),
        borderStyle: 'dashed',
        borderRadius: scale(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: scale(28),
        height: scale(28),
    },
    headerText: {
        flex: 1,
        flexDirection: 'column',
        gap: scale(4),
    },
    title: { fontSize: scale(10), fontWeight: 600 },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dueDate: { fontSize: scale(10) },
    invoiceNumber: { fontSize: scale(10) },
    addresses: {
        flexDirection: 'row',
        gap: scale(10),
        paddingVertical: scale(16),
        paddingHorizontal: scale(16),
    },
    addressCol: {
        flex: 1,
        flexDirection: 'column',
        gap: scale(4),
    },
    addressTitle: { fontSize: scale(10) },
    addressText: { fontSize: scale(10) },
    table: {
        width: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        borderTopWidth: scale(1),
        borderBottomWidth: scale(1),
        paddingVertical: scale(8),
        paddingHorizontal: 0,
        fontSize: scale(10),
    },
    tableRow: {
        flexDirection: 'row',
        paddingHorizontal: 0,
        borderBottomWidth: 0,
        fontSize: scale(10),
    },
    tableRowFirst: {
        paddingTop: scale(12),
        paddingBottom: scale(8),
    },
    tableRowMiddle: {
        paddingVertical: scale(8),
    },
    tableRowLast: {
        paddingTop: scale(8),
        paddingBottom: scale(12),
    },
    tableRowEmpty: {
        paddingVertical: scale(12),
    },
    colItem: { width: '54.2%', paddingLeft: scale(16) },
    colQty: { width: '15.3%' },
    colRate: { width: '15.3%' },
    colAmount: { width: '15.2%', textAlign: 'right', paddingRight: scale(16) },
    tableHeaderAmount: { textAlign: 'right' },
    summary: {
        alignSelf: 'flex-end',
        width: scale(220),
        flexDirection: 'column',
        gap: scale(8),
        paddingVertical: scale(12),
        paddingRight: scale(16),
        fontSize: scale(10),
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: scale(8),
    },
    summaryAmount: {},
    summaryTotal: { fontWeight: 600 },
    notesContainer: {
        paddingHorizontal: scale(16),
        paddingBottom: scale(12),
    },
    notesTitle: { fontSize: scale(10), marginBottom: scale(4) },
    notesText: { fontSize: scale(10) },
});

/** LogoIcon SVG placeholder – matches preview when no logo is set */
function PdfLogoPlaceholder({ fill }: { fill: string }) {
    const size = scale(12);
    return (
        <Svg width={size} height={size} viewBox="0 0 18 18">
            <Path
                d="M9.79537 1.76505C9.35602 1.32571 8.64375 1.32571 8.2044 1.76505L6.26505 3.70439C5.82571 4.14373 5.82571 4.85604 6.26505 5.29538L8.2044 7.23472C8.64375 7.67407 9.35602 7.67407 9.79537 7.23472L11.7347 5.29538C12.1741 4.85604 12.1741 4.14373 11.7347 3.70439L9.79537 1.76505Z"
                fill={fill}
            />
            <Path
                d="M5.29538 6.26505C4.85604 5.82571 4.14373 5.82571 3.70439 6.26505L1.76505 8.2044C1.32571 8.64375 1.32571 9.35602 1.76505 9.79537L3.70439 11.7347C4.14373 12.1741 4.85604 12.1741 5.29538 11.7347L7.23472 9.79537C7.67407 9.35602 7.67407 8.64375 7.23472 8.2044L5.29538 6.26505Z"
                fill={fill}
            />
            <Path
                d="M14.2954 6.26505C13.856 5.82571 13.1438 5.82571 12.7044 6.26505L10.7651 8.2044C10.3257 8.64375 10.3257 9.35602 10.7651 9.79537L12.7044 11.7347C13.1438 12.1741 13.856 12.1741 14.2954 11.7347L16.2347 9.79537C16.6741 9.35602 16.6741 8.64375 16.2347 8.2044L14.2954 6.26505Z"
                fill={fill}
            />
            <Path
                d="M9.79537 10.7651C9.35602 10.3257 8.64375 10.3257 8.2044 10.7651L6.26505 12.7044C5.82571 13.1438 5.82571 13.856 6.26505 14.2954L8.2044 16.2347C8.64375 16.6741 9.35602 16.6741 9.79537 16.2347L11.7347 14.2954C12.1741 13.856 12.1741 13.1438 11.7347 12.7044L9.79537 10.7651Z"
                fill={fill}
            />
        </Svg>
    );
}

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
        display,
    } = data;

    const palette = getPdfPalette(
        display?.color ?? 'gray',
        display?.style ?? 'solid',
    );

    const currency =
        currencies.find((c) => c.code === details.currency) || currencies[0];
    const formatAmount = (amount: number) =>
        formatCurrencyForPdf(amount, currency);
    const currencyAmountFont =
        currency.code === 'INR' || currency.code === 'RUB'
            ? { fontFamily: 'PdfCurrency' as const }
            : {};

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
            <Page
                size="A4"
                style={[styles.page, { backgroundColor: palette.contentBg }]}
            >
                <View
                    style={[
                        styles.contentWrapper,
                        { backgroundColor: palette.contentBg },
                    ]}
                >
                    {/* Header */}
                    <View
                        style={[
                            styles.header,
                            {
                                backgroundColor: palette.styleBg,
                                borderBottomColor: palette.border,
                            },
                        ]}
                    >
                        {issuer.includeLogo !== false && (
                            <View
                                style={[
                                    styles.logoBox,
                                    {
                                        backgroundColor: palette.logoBoxBg,
                                        borderColor: palette.border,
                                    },
                                ]}
                            >
                                {issuer.logo ? (
                                    <Image
                                        src={issuer.logo}
                                        style={styles.logo}
                                    />
                                ) : (
                                    <PdfLogoPlaceholder
                                        fill={palette.iconWeak}
                                    />
                                )}
                            </View>
                        )}
                        <View style={styles.headerText}>
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: palette.textStrong,
                                        ...(issuerName.placeholder
                                            ? { opacity: 0.5 }
                                            : {}),
                                    },
                                ]}
                            >
                                Invoice from {issuerName.text}
                            </Text>
                            <View style={styles.headerRow}>
                                <Text
                                    style={[
                                        styles.dueDate,
                                        { color: palette.textWeak },
                                    ]}
                                >
                                    Due {dueDateText}
                                </Text>
                                <Text
                                    style={[
                                        styles.invoiceNumber,
                                        {
                                            color: palette.textWeaker,
                                            ...(invoiceNo.placeholder
                                                ? { opacity: 0.5 }
                                                : {}),
                                        },
                                    ]}
                                >
                                    {invoiceNo.text}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Addresses */}
                    <View
                        style={[
                            styles.addresses,
                            { backgroundColor: palette.contentBg },
                        ]}
                    >
                        <View style={styles.addressCol}>
                            <Text
                                style={[
                                    styles.addressTitle,
                                    { color: palette.textDefault },
                                ]}
                            >
                                Bill from
                            </Text>
                            <Text
                                style={[
                                    styles.addressText,
                                    {
                                        color: palette.textStrong,
                                        ...(previewText(
                                            issuer.name,
                                            placeholders.issuer.name,
                                        ).placeholder
                                            ? { opacity: 0.5 }
                                            : {}),
                                    },
                                ]}
                            >
                                {
                                    previewText(
                                        issuer.name,
                                        placeholders.issuer.name,
                                    ).text
                                }
                            </Text>
                            <Text
                                style={[
                                    styles.addressText,
                                    {
                                        color: palette.textStrong,
                                        ...(previewText(
                                            issuer.address,
                                            placeholders.issuer.address,
                                        ).placeholder
                                            ? { opacity: 0.5 }
                                            : {}),
                                    },
                                ]}
                            >
                                {
                                    previewText(
                                        issuer.address,
                                        placeholders.issuer.address,
                                    ).text
                                }
                            </Text>
                            <Text
                                style={[
                                    styles.addressText,
                                    {
                                        color: palette.textStrong,
                                        ...(previewText(
                                            issuer.email,
                                            placeholders.issuer.email,
                                        ).placeholder
                                            ? { opacity: 0.5 }
                                            : {}),
                                    },
                                ]}
                            >
                                {
                                    previewText(
                                        issuer.email,
                                        placeholders.issuer.email,
                                    ).text
                                }
                            </Text>
                        </View>
                        <View style={styles.addressCol}>
                            <Text
                                style={[
                                    styles.addressTitle,
                                    { color: palette.textDefault },
                                ]}
                            >
                                Bill to
                            </Text>
                            <Text
                                style={[
                                    styles.addressText,
                                    {
                                        color: palette.textStrong,
                                        ...(previewText(
                                            billTo.name,
                                            placeholders.billTo.name,
                                        ).placeholder
                                            ? { opacity: 0.5 }
                                            : {}),
                                    },
                                ]}
                            >
                                {
                                    previewText(
                                        billTo.name,
                                        placeholders.billTo.name,
                                    ).text
                                }
                            </Text>
                            <Text
                                style={[
                                    styles.addressText,
                                    {
                                        color: palette.textStrong,
                                        ...(previewText(
                                            billTo.address,
                                            placeholders.billTo.address,
                                        ).placeholder
                                            ? { opacity: 0.5 }
                                            : {}),
                                    },
                                ]}
                            >
                                {
                                    previewText(
                                        billTo.address,
                                        placeholders.billTo.address,
                                    ).text
                                }
                            </Text>
                        </View>
                    </View>

                    {/* Items Table */}
                    <View
                        style={[
                            styles.table,
                            { backgroundColor: palette.contentBg },
                        ]}
                    >
                        <View
                            style={[
                                styles.tableHeader,
                                {
                                    backgroundColor: palette.styleBg,
                                    borderColor: palette.border,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.colItem,
                                    { color: palette.textWeak },
                                ]}
                            >
                                Item
                            </Text>
                            <Text
                                style={[
                                    styles.colQty,
                                    { color: palette.textWeak },
                                ]}
                            >
                                QTY
                            </Text>
                            <Text
                                style={[
                                    styles.colRate,
                                    { color: palette.textWeak },
                                ]}
                            >
                                Rate
                            </Text>
                            <Text
                                style={[
                                    styles.colAmount,
                                    styles.tableHeaderAmount,
                                    { color: palette.textWeak },
                                ]}
                            >
                                Amount
                            </Text>
                        </View>
                        {items.length > 0 ? (
                            items.map((item: InvoiceItem, index: number) => {
                                const descEmpty =
                                    !item.description?.trim() ||
                                    item.description?.trim() ===
                                        placeholders.items.description;
                                const rowPaddingStyle =
                                    index === 0
                                        ? styles.tableRowFirst
                                        : index === items.length - 1
                                          ? styles.tableRowLast
                                          : styles.tableRowMiddle;
                                return (
                                    <View
                                        key={item.id}
                                        style={[
                                            styles.tableRow,
                                            rowPaddingStyle,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.colItem,
                                                {
                                                    color: palette.textStrong,
                                                    ...(descEmpty
                                                        ? { opacity: 0.5 }
                                                        : {}),
                                                },
                                            ]}
                                        >
                                            {
                                                previewText(
                                                    item.description,
                                                    placeholders.items
                                                        .description,
                                                ).text
                                            }
                                        </Text>
                                        <Text
                                            style={[
                                                styles.colQty,
                                                {
                                                    color: palette.textStrong,
                                                    ...(item.quantity === 0
                                                        ? { opacity: 0.5 }
                                                        : {}),
                                                },
                                            ]}
                                        >
                                            {item.quantity === 0
                                                ? placeholders.items.quantity
                                                : formatNumberForDisplay(
                                                      item.quantity,
                                                  )}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.colRate,
                                                {
                                                    ...currencyAmountFont,
                                                    color: palette.textStrong,
                                                    ...(item.rate === 0
                                                        ? { opacity: 0.5 }
                                                        : {}),
                                                },
                                            ]}
                                        >
                                            {item.rate === 0
                                                ? formatAmount(0)
                                                : formatAmount(item.rate)}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.colAmount,
                                                {
                                                    ...currencyAmountFont,
                                                    color: palette.textStrong,
                                                    ...(item.quantity *
                                                        item.rate ===
                                                    0
                                                        ? { opacity: 0.5 }
                                                        : {}),
                                                },
                                            ]}
                                        >
                                            {item.quantity * item.rate === 0
                                                ? formatAmount(0)
                                                : formatAmount(
                                                      item.quantity * item.rate,
                                                  )}
                                        </Text>
                                    </View>
                                );
                            })
                        ) : (
                            <View
                                style={[
                                    styles.tableRow,
                                    styles.tableRowEmpty,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.colItem,
                                        {
                                            color: palette.textStrong,
                                            opacity: 0.5,
                                        },
                                    ]}
                                >
                                    No items added yet...
                                </Text>
                                <Text
                                    style={[
                                        styles.colQty,
                                        {
                                            color: palette.textStrong,
                                            opacity: 0.5,
                                        },
                                    ]}
                                >
                                    -
                                </Text>
                                <Text
                                    style={[
                                        styles.colRate,
                                        {
                                            color: palette.textStrong,
                                            opacity: 0.5,
                                        },
                                    ]}
                                >
                                    -
                                </Text>
                                <Text
                                    style={[
                                        styles.colAmount,
                                        {
                                            color: palette.textStrong,
                                            opacity: 0.5,
                                        },
                                    ]}
                                >
                                    -
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Summary */}
                    {(() => {
                        const summaryAllZero =
                            subtotal === 0 &&
                            discountAmount === 0 &&
                            taxAmount === 0;
                        return (
                            <View
                                style={[
                                    styles.summary,
                                    {
                                        backgroundColor: palette.contentBg,
                                        color: palette.textWeak,
                                        ...(summaryAllZero
                                            ? { opacity: 0.5 }
                                            : {}),
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.summaryRow,
                                        subtotal === 0 && !summaryAllZero
                                            ? { opacity: 0.5 }
                                            : {},
                                    ]}
                                >
                                    <Text>Subtotal</Text>
                                    <Text
                                        style={[
                                            styles.summaryAmount,
                                            {
                                                ...currencyAmountFont,
                                                color: palette.textDefault,
                                            },
                                        ]}
                                    >
                                        {formatAmount(subtotal)}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.summaryRow,
                                        discountAmount === 0 && !summaryAllZero
                                            ? { opacity: 0.5 }
                                            : {},
                                    ]}
                                >
                                    <Text>
                                        Discount
                                        {discountType === 'percentage' &&
                                            ` (${discount}%)`}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.summaryAmount,
                                            {
                                                ...currencyAmountFont,
                                                color: palette.textDefault,
                                            },
                                        ]}
                                    >
                                        {formatAmount(-discountAmount)}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.summaryRow,
                                        taxAmount === 0 && !summaryAllZero
                                            ? { opacity: 0.5 }
                                            : {},
                                    ]}
                                >
                                    <Text>
                                        Tax
                                        {taxType === 'percentage' &&
                                            ` (${tax}%)`}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.summaryAmount,
                                            {
                                                ...currencyAmountFont,
                                                color: palette.textDefault,
                                            },
                                        ]}
                                    >
                                        {formatAmount(taxAmount)}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.summaryRow,
                                        styles.summaryTotal,
                                        {
                                            color: palette.textStrong,
                                            ...(total === 0 && !summaryAllZero
                                                ? { opacity: 0.5 }
                                                : {}),
                                        },
                                    ]}
                                >
                                    <Text>Total</Text>
                                    <Text
                                        style={[
                                            styles.summaryTotal,
                                            currencyAmountFont,
                                        ]}
                                    >
                                        {formatAmount(total)}
                                    </Text>
                                </View>
                            </View>
                        );
                    })()}

                    {/* Spacer – pushes notes to bottom like preview mt-auto */}
                    <View
                        style={[
                            styles.notesSpacer,
                            { backgroundColor: palette.contentBg },
                        ]}
                    />

                    {/* Notes – preserves newlines like preview whitespace-pre-wrap */}
                    <View
                        style={[
                            styles.notesContainer,
                            {
                                backgroundColor: palette.contentBg,
                                ...(!notes?.trim() ? { opacity: 0.5 } : {}),
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.notesTitle,
                                { color: palette.textWeak },
                            ]}
                        >
                            Notes
                        </Text>
                        <Text
                            style={[
                                styles.notesText,
                                { color: palette.textDefault },
                            ]}
                        >
                            {previewText(notes, placeholders.notes)
                                .text.split('\n')
                                .flatMap((line, i) =>
                                    i > 0 ? ['\n', line] : [line],
                                )}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

import { z } from 'zod';
import {
    DUE_DATE_YEAR_RANGE,
    getDueDateValidationError,
} from '@/components/ui/datepicker';
import {
    ADDRESS_MAX_LENGTH,
    DUE_DATE_INPUT_LENGTH,
    INVOICE_NUMBER_MAX_LENGTH,
    ITEM_DESCRIPTION_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NOTES_MAX_LENGTH,
    QUANTITY_MAX,
    RATE_MAX,
    TAX_DISCOUNT_MAX,
} from '@/lib/invoiceLimits';
import type { InvoiceData } from '@/types/invoice';

const currencyCodeSchema = z.enum(['USD', 'EUR', 'GBP', 'JPY', 'INR', 'RUB']);

function isDueDateYearInRange(date: Date): boolean {
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    return (
        year >= currentYear - DUE_DATE_YEAR_RANGE &&
        year <= currentYear + DUE_DATE_YEAR_RANGE
    );
}

const issuerSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required.')
        .max(
            NAME_MAX_LENGTH,
            `Name must be at most ${NAME_MAX_LENGTH} characters.`,
        ),
    email: z.email('Enter a valid email.'),
    address: z
        .string()
        .min(1, 'Address is required.')
        .max(
            ADDRESS_MAX_LENGTH,
            `Address must be at most ${ADDRESS_MAX_LENGTH} characters.`,
        ),
});

const billToSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required.')
        .max(
            NAME_MAX_LENGTH,
            `Name must be at most ${NAME_MAX_LENGTH} characters.`,
        ),
    address: z
        .string()
        .min(1, 'Address is required.')
        .max(
            ADDRESS_MAX_LENGTH,
            `Address must be at most ${ADDRESS_MAX_LENGTH} characters.`,
        ),
});

const dueDateSchema = z.union([
    z.date().refine(isDueDateYearInRange, 'Enter a valid date.'),
    z.null(),
]);

const detailsSchema = z.object({
    invoiceNumber: z
        .string()
        .min(1, 'Invoice number is required.')
        .max(
            INVOICE_NUMBER_MAX_LENGTH,
            `Invoice number must be at most ${INVOICE_NUMBER_MAX_LENGTH} characters.`,
        ),
    dueDate: dueDateSchema,
    currency: currencyCodeSchema,
});

const invoiceItemSchema = z.object({
    id: z.string(),
    description: z
        .string()
        .min(1, 'Description is required.')
        .max(
            ITEM_DESCRIPTION_MAX_LENGTH,
            `Description must be at most ${ITEM_DESCRIPTION_MAX_LENGTH} characters.`,
        ),
    quantity: z
        .number()
        .min(0, 'Quantity must be 0 or greater.')
        .max(QUANTITY_MAX, 'Quantity is too large.'),
    rate: z
        .number()
        .min(0, 'Rate must be 0 or greater.')
        .max(RATE_MAX, 'Rate is too large.'),
});

const displaySchema = z.object({
    style: z.enum(['solid', 'accent']),
    color: z.enum(['gray', 'cream', 'blue', 'green']),
});

export const invoiceDataSchema = z
    .object({
        issuer: issuerSchema,
        billTo: billToSchema,
        details: detailsSchema,
        items: z
            .array(invoiceItemSchema)
            .min(1, 'At least one item is required.')
            .max(100, 'Too many items.'),
        tax: z.number().min(0).max(TAX_DISCOUNT_MAX),
        taxType: z.enum(['percentage', 'currency']),
        discount: z.number().min(0).max(TAX_DISCOUNT_MAX),
        discountType: z.enum(['percentage', 'currency']),
        notes: z
            .string()
            .max(
                NOTES_MAX_LENGTH,
                `Notes must be at most ${NOTES_MAX_LENGTH} characters.`,
            ),
        display: displaySchema,
    })
    .superRefine((data, ctx) => {
        const subtotal = data.items.reduce(
            (sum, item) => sum + item.quantity * item.rate,
            0,
        );

        if (
            data.discountType === 'currency' &&
            data.discount > subtotal
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Discount cannot exceed subtotal.',
                path: ['discount'],
            });
        }
        if (data.taxType === 'currency' && data.tax > subtotal) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Tax cannot exceed subtotal.',
                path: ['tax'],
            });
        }
    });

const ITEMS_PATH_PREFIX = 'items.';

function isItemFieldPath(path: string): boolean {
    const match = path.match(/^items\.(\d+)\./);
    return Boolean(match);
}

function toItemIdPath(path: string, items: InvoiceData['items']): string {
    const match = path.match(/^items\.(\d+)\.(.+)$/);
    if (!match) return path;
    const index = Number.parseInt(match[1], 10);
    const field = match[2];
    const item = items[index];
    if (!item) return path;
    return `${ITEMS_PATH_PREFIX}${item.id}.${field}`;
}

export function getFieldErrors(data: InvoiceData): Record<string, string> {
    const parsed = invoiceDataSchema.safeParse(data);

    const errors: Record<string, string> = {};
    if (!parsed.success) {
        for (const issue of parsed.error.issues) {
            const rawPath =
                issue.path.length > 0
                    ? (issue.path as (string | number)[]).join('.')
                    : 'root';
            const path = isItemFieldPath(rawPath)
                ? toItemIdPath(rawPath, data.items)
                : rawPath;
            if (!errors[path]) {
                errors[path] = issue.message;
            }
        }
    }

    const dueDateInput = data.details.dueDateInput ?? '';
    if (dueDateInput.length === DUE_DATE_INPUT_LENGTH) {
        const dueDateError = getDueDateValidationError(
            dueDateInput,
            'DD/MM/YYYY',
            DUE_DATE_YEAR_RANGE,
        );
        if (dueDateError) {
            errors['details.dueDate'] = dueDateError;
        }
    }

    return errors;
}

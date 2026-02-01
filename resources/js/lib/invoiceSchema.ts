import { z } from 'zod';
import {
    DUE_DATE_YEAR_RANGE,
    getDueDateValidationError,
} from '@/components/ui/datepicker';
import type { InvoiceData } from '@/types/invoice';
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
        .min(1, 'Name is required')
        .max(NAME_MAX_LENGTH, `Name must be at most ${NAME_MAX_LENGTH} characters`),
    email: z.email('Enter a valid email'),
    address: z
        .string()
        .min(1, 'Address is required')
        .max(ADDRESS_MAX_LENGTH, `Address must be at most ${ADDRESS_MAX_LENGTH} characters`),
});

const billToSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(NAME_MAX_LENGTH, `Name must be at most ${NAME_MAX_LENGTH} characters`),
    address: z
        .string()
        .min(1, 'Address is required')
        .max(ADDRESS_MAX_LENGTH, `Address must be at most ${ADDRESS_MAX_LENGTH} characters`),
});

const dueDateSchema = z.union([
    z
        .date()
        .refine(
            isDueDateYearInRange,
            `Due date must be within ±${DUE_DATE_YEAR_RANGE} years of current year`,
        ),
    z.null(),
]);

const detailsSchema = z.object({
    invoiceNumber: z
        .string()
        .min(1, 'Invoice number is required')
        .max(INVOICE_NUMBER_MAX_LENGTH, `Invoice number must be at most ${INVOICE_NUMBER_MAX_LENGTH} characters`),
    dueDate: dueDateSchema,
    currency: currencyCodeSchema,
});

const invoiceItemSchema = z.object({
    id: z.string(),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(ITEM_DESCRIPTION_MAX_LENGTH, `Description must be at most ${ITEM_DESCRIPTION_MAX_LENGTH} characters`),
    quantity: z
        .number()
        .min(0, 'Quantity must be 0 or greater')
        .max(QUANTITY_MAX, 'Quantity is too large'),
    rate: z
        .number()
        .min(0, 'Rate must be 0 or greater')
        .max(RATE_MAX, 'Rate is too large'),
});

const displaySchema = z.object({
    style: z.enum(['solid', 'accent']),
    color: z.enum(['gray', 'cream', 'blue', 'green']),
});

export const invoiceDataSchema = z.object({
    issuer: issuerSchema,
    billTo: billToSchema,
    details: detailsSchema,
    items: z
        .array(invoiceItemSchema)
        .min(1, 'At least one item is required')
        .max(100, 'Too many items'),
    tax: z.number().min(0).max(TAX_DISCOUNT_MAX),
    taxType: z.enum(['percentage', 'currency']),
    discount: z.number().min(0).max(TAX_DISCOUNT_MAX),
    discountType: z.enum(['percentage', 'currency']),
    notes: z.string().max(NOTES_MAX_LENGTH, `Notes must be at most ${NOTES_MAX_LENGTH} characters`),
    display: displaySchema,
});

export function getFieldErrors(data: InvoiceData): Record<string, string> {
    const parsed = invoiceDataSchema.safeParse(data);

    const errors: Record<string, string> = {};
    if (!parsed.success) {
        for (const issue of parsed.error.issues) {
            const path =
                issue.path.length > 0
                    ? (issue.path as (string | number)[]).join('.')
                    : 'root';
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

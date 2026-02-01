import { z } from 'zod';
import {
    DUE_DATE_YEAR_RANGE,
    getDueDateValidationError,
} from '@/components/ui/datepicker';
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
        .min(1, 'Name is required')
        .max(200, 'Name must be at most 200 characters'),
    email: z.email('Enter a valid email'),
    address: z
        .string()
        .min(1, 'Address is required')
        .max(500, 'Address must be at most 500 characters'),
});

const billToSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(200, 'Name must be at most 200 characters'),
    address: z
        .string()
        .min(1, 'Address is required')
        .max(500, 'Address must be at most 500 characters'),
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
        .max(50, 'Invoice number must be at most 50 characters'),
    dueDate: dueDateSchema,
    currency: currencyCodeSchema,
});

const invoiceItemSchema = z.object({
    id: z.string(),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(500, 'Description must be at most 500 characters'),
    quantity: z
        .number()
        .min(0, 'Quantity must be 0 or greater')
        .max(999_999, 'Quantity is too large'),
    rate: z
        .number()
        .min(0, 'Rate must be 0 or greater')
        .max(999_999_999, 'Rate is too large'),
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
    tax: z.number().min(0).max(999_999_999),
    taxType: z.enum(['percentage', 'currency']),
    discount: z.number().min(0).max(999_999_999),
    discountType: z.enum(['percentage', 'currency']),
    notes: z.string().max(2000, 'Notes must be at most 2000 characters'),
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
    if (dueDateInput.length === 10) {
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

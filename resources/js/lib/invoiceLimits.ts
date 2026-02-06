/**
 * Shared limits for invoice data. Used by Zod validation and input maxLength
 * so schema and UI stay in sync.
 */
export const NAME_MAX_LENGTH = 50;
export const ADDRESS_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 30;
export const INVOICE_NUMBER_MAX_LENGTH = 25;
export const ITEM_DESCRIPTION_MAX_LENGTH = 50;
export const NOTES_MAX_LENGTH = 250;
export const DUE_DATE_INPUT_LENGTH = 10;

export const QUANTITY_MAX = 999_999;
export const QUANTITY_INPUT_MAX_LENGTH = 7;
export const RATE_MAX = 999_999_999;
export const RATE_INPUT_MAX_LENGTH = 12;
export const TAX_DISCOUNT_MAX = 999_999_999;

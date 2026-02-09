import type { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

const COMPACT_THRESHOLD = 1_000_000_000;
const MAX_SAFE_DISPLAY = 1e15;

/**
 * Formats a plain number for display (e.g. quantity). Uses compact notation
 * (e.g. 10M, 1.2B) only for values >= 10M; otherwise shows full number with
 * locale grouping (e.g. 3,500).
 */
export function formatNumberForDisplay(value: number): string {
    const abs = Math.abs(value);
    const sign = value < 0 ? '-' : '';
    if (abs >= COMPACT_THRESHOLD || abs > MAX_SAFE_DISPLAY) {
        const formatted = new Intl.NumberFormat(undefined, {
            notation: 'compact',
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
        }).format(abs);
        return `${sign}${formatted}`;
    }
    return `${sign}${abs.toLocaleString(undefined, {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    })}`;
}

/**
 * Formats a number as currency for display. Uses compact notation (e.g. 10M, 1.2B)
 * only for amounts >= 10M; otherwise shows full amount with locale grouping (e.g. 3,500).
 */
export function formatCurrencyForDisplay(
    amount: number,
    symbol: string,
): string {
    const abs = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';

    if (abs > MAX_SAFE_DISPLAY) {
        const formatted = new Intl.NumberFormat(undefined, {
            notation: 'compact',
            maximumFractionDigits: 1,
            minimumFractionDigits: 0,
        }).format(abs);
        return `${sign}${symbol}${formatted}`;
    }

    if (abs >= COMPACT_THRESHOLD) {
        const formatted = new Intl.NumberFormat(undefined, {
            notation: 'compact',
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
        }).format(abs);
        return `${sign}${symbol}${formatted}`;
    }

    const formatted = abs.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    return `${sign}${symbol}${formatted}`;
}

/**
 * Formats a number as currency using full form only (no compact notation).
 * Use for summary/totals where the full amount (e.g. 1,234,567.89) should always be shown.
 */
export function formatCurrencyFull(amount: number, symbol: string): string {
    const abs = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';
    const formatted = abs.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    return `${sign}${symbol}${formatted}`;
}

/**
 * Normalises line endings and ensures a string contains at most two lines.
 * Useful for textarea fields where we want to preserve a single manual line
 * break but avoid unbounded growth.
 */
export function limitToTwoLines(value: string | null | undefined): string {
    if (!value) {
        return '';
    }

    const normalised = value.replace(/\r\n/g, '\n');
    const parts = normalised.split('\n');

    if (parts.length <= 2) {
        return normalised;
    }

    return `${parts[0]}\n${parts[1]}`;
}

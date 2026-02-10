import { useSyncExternalStore } from 'react';

const BASE_WIDTH = 436;
const BASE_HEIGHT = 618;
const LARGE_MIN_WIDTH = 1754;
const LARGE_MIN_HEIGHT = 900;
const SMALL_MAX_WIDTH = 500;
const LARGE_SCALE_MAX = 1.5;
const SMALL_SCALE_MIN = 0.5;
const LARGE_PADDING_X = 200;
const LARGE_PADDING_Y = 100;
const SMALL_PADDING_X = 32;

function computeScale(width: number, height: number): number {
    if (width < SMALL_MAX_WIDTH) {
        const scale = (width - SMALL_PADDING_X) / BASE_WIDTH;
        return Math.max(SMALL_SCALE_MIN, Math.min(1, scale));
    }
    if (width >= LARGE_MIN_WIDTH && height >= LARGE_MIN_HEIGHT) {
        const scaleByWidth = (width - LARGE_PADDING_X) / BASE_WIDTH;
        const scaleByHeight = (height - LARGE_PADDING_Y) / BASE_HEIGHT;
        const scale = Math.min(scaleByWidth, scaleByHeight);
        return Math.max(1, Math.min(LARGE_SCALE_MAX, scale));
    }
    return 1;
}

function getSnapshot(): number {
    if (typeof window === 'undefined') {
        return 1;
    }
    return computeScale(window.innerWidth, window.innerHeight);
}

function getServerSnapshot(): number {
    return 1;
}

function subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') {
        return () => {};
    }
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
}

export function usePreviewScale(): number {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

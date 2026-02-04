import { cn } from '@/lib/utils';

type ExportButtonIconProps = {
    className?: string;
    size?: number;
    isExporting?: boolean;
    exportSuccess?: boolean;
};

/** Download icon path in 18x18 viewBox (matches ExportIcon). */
const downloadPaths = (
    <>
        <path
            d="M6.375 16.125H4.125C3.71079 16.125 3.375 15.7892 3.375 15.375V2.625C3.375 2.21078 3.71079 1.875 4.125 1.875H9.43935C9.63825 1.875 9.82905 1.95402 9.96968 2.09467L14.4053 6.53033C14.5459 6.67098 14.625 6.86175 14.625 7.06066V15.375C14.625 15.7892 14.2892 16.125 13.875 16.125H11.625"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9.75 2.25V6C9.75 6.41421 10.0858 6.75 10.5 6.75H14.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9 10.125V15.1875L10.875 13.3125"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9 15.1875L7.125 13.3125"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </>
);

/** Wavy "downloading" path in 18x18 — smooth curve. */
const wavyPathD =
    'M3 9.5 Q6 5.5 9 9.5 T15 9.5';

/** Checkmark path in 18x18. */
const checkPathD = 'M5 9.5 L8 12.5 L13 7';

export function ExportButtonIcon({
    className = '',
    size = 18,
    isExporting = false,
    exportSuccess = false,
}: ExportButtonIconProps) {
    const loading = isExporting && !exportSuccess;
    const success = exportSuccess;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('overflow-visible', className)}
            aria-label={
                success
                    ? 'Downloaded'
                    : loading
                      ? 'Preparing PDF…'
                      : 'Export'
            }
            role="img"
        >
            {/* Idle: download icon */}
            <g
                className={cn(
                    'transition-opacity duration-200',
                    (loading || success) && 'pointer-events-none opacity-0',
                )}
            >
                {downloadPaths}
            </g>

            {/* Loading: wavy line with stroke-dashoffset animation */}
            <g
                className={cn(
                    'pointer-events-none transition-opacity duration-200',
                    !loading && 'opacity-0',
                )}
                aria-hidden
            >
                <path
                    d={wavyPathD}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="export-icon-loading-path"
                />
            </g>

            {/* Success: checkmark that draws in via CSS keyframes */}
            <g
                className={cn(
                    'pointer-events-none transition-opacity duration-200',
                    !success && 'opacity-0',
                )}
                aria-hidden
            >
                <path
                    d={checkPathD}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className={cn(
                        'export-icon-success-path',
                        success && 'export-icon-success-path-visible',
                    )}
                />
            </g>
        </svg>
    );
}

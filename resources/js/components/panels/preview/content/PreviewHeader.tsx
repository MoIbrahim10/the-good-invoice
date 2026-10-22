import { format } from 'date-fns';
import { AnimatePresence, motion } from 'motion/react';
import type { InvoiceDetails, IssuerData } from '@/types/invoice';
import { PreviewText } from './PreviewText';

type Placeholders = {
    issuer: { name: string };
    details: { dueDate: string; invoiceNumber: string };
};

type PreviewHeaderProps = {
    issuer: IssuerData;
    details: InvoiceDetails;
    placeholders: Placeholders;
    logoBox: React.ReactNode;
};

export function PreviewHeader({
    issuer,
    details,
    placeholders,
    logoBox,
}: PreviewHeaderProps) {
    return (
        <div className="flex h-[68px] items-center rounded-t-[6px] border-b border-preview-200 bg-preview-style-bg p-4 transition-colors duration-150 ease-in-out">
            <AnimatePresence initial={false}>
                {issuer.includeLogo !== false && (
                    <motion.div
                        key="preview-logo-slot"
                        initial={{
                            width: 0,
                            opacity: 0,
                        }}
                        animate={{
                            width: 46,
                            opacity: 1,
                        }}
                        exit={{
                            width: 0,
                            opacity: 0,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 26,
                        }}
                        className="flex shrink-0 items-center gap-2.5 overflow-hidden"
                    >
                        <motion.div
                            initial={{
                                width: 0,
                                opacity: 0,
                                filter: 'blur(8px)',
                                scale: 0.85,
                            }}
                            animate={{
                                width: 46,
                                opacity: 1,
                                filter: 'blur(0px)',
                                scale: 1,
                            }}
                            exit={{
                                width: 0,
                                opacity: 0,
                                filter: 'blur(6px)',
                                scale: 0.9,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 26,
                            }}
                            className="shrink-0 overflow-hidden"
                        >
                            {logoBox}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex w-full min-w-0 flex-col justify-center gap-[4px]">
                <h1
                    className={`min-w-0 font-semibold wrap-break-word text-preview-700 ${!issuer.name?.trim() ? 'opacity-50' : ''}`}
                >
                    Invoice from{' '}
                    <PreviewText
                        value={issuer.name}
                        placeholder={placeholders.issuer.name}
                        suppressPlaceholderOpacity
                    />
                </h1>
                <div className="flex items-center justify-between">
                    <p className="text-preview-400">
                        Due{' '}
                        {details.dueDateInput?.trim() ? (
                            <span className="opacity-100">
                                {details.dueDateInput}
                            </span>
                        ) : details.dueDate ? (
                            <span className="opacity-100">
                                {format(
                                    details.dueDate instanceof Date
                                        ? details.dueDate
                                        : new Date(details.dueDate),
                                    'dd/MM/yyyy',
                                )}
                            </span>
                        ) : (
                            <span className="opacity-50">
                                {placeholders.details.dueDate}
                            </span>
                        )}
                    </p>
                    <p
                        className={`text-preview-400 ${!details.invoiceNumber?.trim() ? 'opacity-50' : ''}`}
                    >
                        <PreviewText
                            value={details.invoiceNumber}
                            placeholder={placeholders.details.invoiceNumber}
                            suppressPlaceholderOpacity
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}

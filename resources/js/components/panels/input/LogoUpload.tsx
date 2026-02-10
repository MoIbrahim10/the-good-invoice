import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useId, useRef, useState } from 'react';
import { CustomButton } from '@/components/custom/button';
import { RectangularSwitch } from '@/components/custom/rectangular-switch';
import { Field, FieldLabel } from '@/components/ui/field';
import { ErrorIconWithTooltip } from '../../icons/ErrorIconWithTooltip';
import { LogoIcon } from '../../icons/LogoIcon';

type LogoUploadProps = {
    logo: string | null;
    includeLogo: boolean;
    onUpload: (logo: string) => void;
    onIncludeLogoChange: (include: boolean) => void;
};

export function LogoUpload({
    logo,
    includeLogo,
    onUpload,
    onIncludeLogoChange,
}: LogoUploadProps) {
    const switchId = useId();
    const logoUploadId = useId();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    useEffect(() => {
        if (!includeLogo) {
            setUploadError(null);
        }
    }, [includeLogo]);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            const img = new Image();
            img.onload = () => {
                const { naturalWidth: w, naturalHeight: h } = img;
                const isSquare =
                    w > 0 && h > 0 && w === h;
                if (isSquare) {
                    setUploadError(null);
                    onUpload(result);
                } else {
                    setUploadError(
                        '1:1 ratio required',
                    );
                    if (fileInputRef.current) fileInputRef.current.value = '';
                }
            };
            img.onerror = () => setUploadError('Failed to load image.');
            img.src = result;
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col p-3 border-b-layered">
            {/* use logo section */}
            <div className="flex justify-between">
                <Field orientation="horizontal">
                    <FieldLabel
                        htmlFor={switchId}
                        className="text-[14px] font-normal whitespace-nowrap text-text-default"
                    >
                        Include logo on invoice
                    </FieldLabel>
                    <RectangularSwitch
                        id={switchId}
                        size="default"
                        checked={includeLogo}
                        onCheckedChange={onIncludeLogoChange}
                    />
                </Field>
            </div>

            <AnimatePresence initial={false}>
                {includeLogo && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="flex w-full items-stretch gap-2.5 pt-3">
                            {/* Logo Placeholder */}
                                {uploadError ? (
                                    <div className="flex aspect-square size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#FFEFEF] dark:bg-[#401B1D]">
                                        <ErrorIconWithTooltip
                                            message={uploadError}
                                            id={`${logoUploadId}-error`}
                                        />
                                    </div>
                                ) : logo ? (
                                    <div className="flex aspect-square size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-bg-strong">
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-full w-full rounded-sm object-contain"
                                    />
                                    </div>
                                ) : (
                                    <div className="flex aspect-square size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-stroke-strong bg-bg-strong p-1">
                                    <LogoIcon size={18} />
                                    </div>
                                )}

                            {/* Logo Info and Upload */}
                            <div className="flex h-fit w-full items-end justify-between gap-2.5">
                                <div className="flex flex-col gap-1">
                                    <h3 className="flex items-center text-[14px] font-normal text-text-default">
                                        Your logo
                                    </h3>
                                    <p className="flex items-center text-[14px] font-normal text-text-weak dark:text-text-weaker ">
                                        Square (1:1) format only.
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <label
                                        className="sr-only"
                                        htmlFor={logoUploadId}
                                    >
                                        Upload logo image
                                    </label>
                                    <input
                                        id={logoUploadId}
                                        name="logo-upload"
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/svg+xml,image/png,image/jpeg,image/jpg"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />
                                    {logo ? (
                                        <div className="flex items-center gap-3">
                                            <CustomButton
                                                text="Replace"
                                                size="default"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <CustomButton
                                            text="Upload"
                                            size="default"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

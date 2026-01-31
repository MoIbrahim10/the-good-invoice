import { AnimatePresence, motion } from 'motion/react';
import { useId, useRef, useState } from 'react';
import { CustomButton } from '@/components/custom/button';
import { RectangularSwitch } from '@/components/custom/rectangular-switch';
import { Field, FieldLabel } from '@/components/ui/field';
import { DeleteIcon } from '../../icons/DeleteIcon';
import { LogoIcon } from '../../icons/LogoIcon';

type LogoUploadProps = {
    logo: string | null;
    onUpload: (logo: string) => void;
};

export function LogoUpload({ logo, onUpload }: LogoUploadProps) {
    const switchId = useId();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [checked, setChecked] = useState<boolean>(true);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                onUpload(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        onUpload('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col border-b-layered p-3">
            {/* use logo section */}
            <div className="flex justify-between">
                <Field orientation="horizontal">
                    <FieldLabel htmlFor={switchId}>
                        Include logo on invoice
                    </FieldLabel>
                    <RectangularSwitch
                        id={switchId}
                        size="default"
                        checked={checked}
                        onCheckedChange={setChecked}
                    />
                </Field>
            </div>

            <AnimatePresence initial={false}>
                {checked && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="flex w-full items-stretch gap-2.5 pt-3">
                            {/* Logo Placeholder */}
                            <div className="flex aspect-square size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-stroke-strong bg-bg-strong p-1">
                                {logo ? (
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="h-full w-full rounded-sm object-contain"
                                    />
                                ) : (
                                    <LogoIcon size={18} />
                                )}
                            </div>

                            {/* Logo Info and Upload */}
                            <div className="flex h-fit w-full items-end justify-between gap-2.5">
                                <div className="flex flex-col gap-1">
                                    <h3 className="flex items-center text-sm leading-[17px] font-normal text-text-default">
                                        Your logo
                                    </h3>
                                    <p className="flex items-center text-sm leading-[17px] font-normal text-text-weaker">
                                        Square (1:1) format only.
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/svg+xml,image/png,image/jpeg,image/jpg"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />
                                    {logo ? (
                                        <div className="flex items-center gap-3">
                                            <CustomButton
                                                icon={<DeleteIcon />}
                                                ariaLabel="Remove logo"
                                                size="default"
                                                onClick={handleRemoveLogo}
                                                tooltips={{
                                                    default: {
                                                        content: 'Remove logo',
                                                    },
                                                }}
                                            />
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

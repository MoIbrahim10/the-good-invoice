import { useId } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { LogoIcon } from '../../icons/LogoIcon';
import { Button } from '../../layout/Button';

type LogoUploadProps = {
    logo: string | null;
    onUpload: (logo: string) => void;
};

export function LogoUpload({ logo, onUpload }: LogoUploadProps) {
    const switchId = useId();
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

    return (
        <div className='flex flex-col gap-3 p-3 border-b border-stroke-default'>
            { /* use logo section */}
            <div className='flex justify-between '>
<Field orientation="horizontal">
        <FieldLabel htmlFor={switchId}>Include logo on invoice</FieldLabel>
        <Switch id={switchId} size="default" />
      </Field>
            </div>
        <div className="w-full flex items-stretch gap-2.5">
            {/* Logo Placeholder */}
            <div
                className="flex aspect-square w-[38px] flex-row items-center justify-center self-stretch rounded-md border border-dashed border-stroke-strong bg-bg-strong px-3 py-2"
            >
                <div>
                    {logo ? (
                        <img
                            src={logo}
                            alt="Logo"
                            className="rounded-md object-contain"
                        />
                    ) : (
                        <LogoIcon size={18} />
                    )}
                </div>
            </div>

            {/* Logo Info and Upload */}
            <div className="w-full flex h-fit items-end justify-between gap-2.5">
                <div className="flex flex-col gap-1">
                    <h3 className="flex items-center text-sm leading-[17px] font-normal text-text-default">
                        Your logo
                    </h3>
                    <p className="flex items-center text-sm leading-[17px] font-normal text-text-weaker">
                        Square (1:1) format only.
                    </p>
                </div>

                <label className="shrink-0 cursor-pointer">
                    <input
                        type="file"
                        accept="image/svg+xml,image/png,image/jpeg,image/jpg"
                        onChange={handleLogoUpload}
                        className="hidden"
                    />
                    <Button>Upload</Button>
                </label>
            </div>
        </div>
        <div>
            <div className="flex flex-row justify-end items-center p-2 w-fit bg-bg-weak border border-stroke-default rounded-[4px]">

            <div className="flex flex-col items-end p-0 w-[12px] h-[16px] bg-text-default rounded-[2px]"></div>

            </div>
        </div>
        </div>
    );
}

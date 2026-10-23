import { CommandIcon } from '../icons/CommandIcon';

export function PanelHeader() {
    return (
        <div className="flex shrink-0 flex-col gap-2 px-3 pb-[30px]">
            {/* First line */}
            <h1 className="text-[14px] font-normal text-text-strong">
                Build an invoice
            </h1>

            {/* Second line */}
            <p className="text-[14px] font-normal text-text-default">
                Fill in the details. Everything updates as you type.
            </p>

            {/* Third line */}
            <p className="flex items-center gap-1.5 text-[14px] font-normal text-text-weak md:hidden">
                Choose a tab to continue
            </p>
            <p className="hidden items-center gap-1.5 text-[14px] font-normal text-text-weak md:flex">
                <span>Choose a tab or use</span>
                <CommandIcon size={14} />
                <span>and arrows.</span>
            </p>
        </div>
    );
}

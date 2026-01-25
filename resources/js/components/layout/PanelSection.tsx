type PanelSectionProps = {
    children: React.ReactNode;
    className?: string;
};

export function PanelSection({ children, className = '' }: PanelSectionProps) {
    return (
        <div
            className={`flex overflow-x-auto border-t border-b border-stroke-default px-3 py-2.5 ${className}`}
        >
            {children}
        </div>
    );
}

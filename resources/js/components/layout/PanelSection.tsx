type PanelSectionProps = {
    children: React.ReactNode;
    className?: string;
};

export function PanelSection({ children, className = '' }: PanelSectionProps) {
    return (
        <div
            className={`scrollbar-none flex shrink-0 overflow-x-auto px-3 py-2.5 border-y-layered ${className}`}
        >
            {children}
        </div>
    );
}

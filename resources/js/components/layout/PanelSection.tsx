type PanelSectionProps = {
    children: React.ReactNode;
    className?: string;
};

export function PanelSection({ children, className = '' }: PanelSectionProps) {
    return (
        <div
            className={`scrollbar-none flex overflow-x-auto px-3 py-2.5 border-b-layered border-t-layered ${className}`}
        >
            {children}
        </div>
    );
}

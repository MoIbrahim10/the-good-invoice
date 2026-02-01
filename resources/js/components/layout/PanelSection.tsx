type PanelSectionProps = {
    children: React.ReactNode;
    className?: string;
};

export function PanelSection({ children, className = '' }: PanelSectionProps) {
    return (
        <div
            className={`flex overflow-x-auto scrollbar-none px-3 py-2.5 border-b-layered border-t-layered ${className}`}
        >
            {children}
        </div>
    );
}

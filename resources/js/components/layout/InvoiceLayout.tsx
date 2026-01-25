type InvoiceLayoutProps = {
    children: React.ReactNode;
};

export function InvoiceLayout({ children }: InvoiceLayoutProps) {
    return (
        <div className="grid h-[730px] max-h-[730px] w-[1280px] grid-cols-[512px_1fr] gap-6 overflow-hidden">
            {children}
        </div>
    );
}

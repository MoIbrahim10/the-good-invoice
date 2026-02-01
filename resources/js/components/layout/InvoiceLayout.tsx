type InvoiceLayoutProps = {
    children: React.ReactNode;
};

export function InvoiceLayout({ children }: InvoiceLayoutProps) {
    return (
        <div className="grid max-h-[650px] w-full grid-cols-[512px_1fr] gap-6 overflow-hidden items-center justify-items-center px-6 md:px-12 lg:px-16 xl:px-20">
            {children}
        </div>
    );
}

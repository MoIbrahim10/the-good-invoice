type ViewportContainerProps = {
    children: React.ReactNode;
};

export function ViewportContainer({ children }: ViewportContainerProps) {
    return (
        <div className="lg:scrollbar-none h-dvh max-h-dvh w-screen max-w-7xl overflow-x-hidden overflow-y-auto">
            <div className="flex min-h-full w-full flex-col items-center justify-center max-lg:items-stretch lg:py-8">
                {children}
            </div>
        </div>
    );
}

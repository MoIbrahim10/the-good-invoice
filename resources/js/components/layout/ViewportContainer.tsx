type ViewportContainerProps = {
    children: React.ReactNode;
};

export function ViewportContainer({ children }: ViewportContainerProps) {
    return (
        <div className="h-dvh max-h-100dvh w-screen max-w-7xl overflow-x-hidden overflow-y-auto lg:scrollbar-none">
            <div className="flex min-h-full w-full flex-col items-center justify-center py-8 max-lg:items-stretch">
                {children}
            </div>
        </div>
    );
}

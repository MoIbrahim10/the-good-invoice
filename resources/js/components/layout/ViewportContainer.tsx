type ViewportContainerProps = {
    children: React.ReactNode;
};

export function ViewportContainer({ children }: ViewportContainerProps) {
    return (
        <div className="flex h-dvh max-h-dvh w-screen max-w-7xl flex-col overflow-x-hidden max-lg:overflow-hidden lg:overflow-y-auto lg:scrollbar-none">
            <div className="flex min-h-full w-full flex-1 flex-col items-center justify-center py-8 max-lg:min-h-0 max-lg:overflow-y-auto max-lg:items-stretch">
                {children}
            </div>
        </div>
    );
}

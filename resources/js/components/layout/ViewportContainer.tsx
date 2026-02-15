type ViewportContainerProps = {
    children: React.ReactNode;
};

export function ViewportContainer({ children }: ViewportContainerProps) {
    return (
        <div className="h-screen max-h-screen w-screen max-w-7xl overflow-x-hidden overflow-y-auto">
            <div className="flex min-h-full w-full flex-col items-center justify-center py-8 max-lg:items-stretch">
                {children}
            </div>
        </div>
    );
}

type ViewportContainerProps = {
    children: React.ReactNode;
};

export function ViewportContainer({ children }: ViewportContainerProps) {
    return (
        <div className="flex h-screen max-h-screen w-screen max-w-7xl items-center justify-center overflow-x-hidden overflow-y-auto max-lg:items-stretch">
            {children}
        </div>
    );
}

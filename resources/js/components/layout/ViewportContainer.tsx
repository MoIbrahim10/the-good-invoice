type ViewportContainerProps = {
    children: React.ReactNode;
};

export function ViewportContainer({ children }: ViewportContainerProps) {
    return (
        <div className="flex h-screen max-h-screen w-screen max-w-7xl items-center justify-center overflow-hidden">
            {children}
        </div>
    );
}

type ViewportContainerProps = {
  children: React.ReactNode;
};

export function ViewportContainer({ children }: ViewportContainerProps) {
  return (
    <div className="w-screen h-screen max-h-screen max-w-7xl overflow-hidden flex items-center justify-center">
      {children}
    </div>
  );
}

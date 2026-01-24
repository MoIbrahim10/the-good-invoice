type PanelSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function PanelSection({ children, className = '' }: PanelSectionProps) {
  return (
    <div className={`border-b border-t border-stroke-default py-2.5 px-3 flex overflow-x-auto ${className}`}>
      {children}
    </div>
  );
}

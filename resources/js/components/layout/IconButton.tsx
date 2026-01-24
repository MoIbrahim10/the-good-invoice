type IconButtonProps = {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
};

export function IconButton({ icon, ariaLabel, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1.5 bg-bg-strong rounded-md hover:bg-bg-stronger transition-colors cursor-pointer"
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}

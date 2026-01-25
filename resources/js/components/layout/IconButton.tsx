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
            className="cursor-pointer rounded-md bg-bg-strong p-1.5 transition-colors hover:bg-bg-stronger"
            aria-label={ariaLabel}
        >
            {icon}
        </button>
    );
}

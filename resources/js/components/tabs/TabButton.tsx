import type { TabState } from '../../types/tabs';

type TabButtonProps = {
  tab: TabState;
  onClick: () => void;
  isEnabled: boolean;
  position: 'first' | 'middle' | 'last';
  isInConnectedGroup?: boolean;
  roundedClasses?: string;
};

export function TabButton({
  tab,
  onClick,
  isEnabled,
  roundedClasses = 'rounded-md',
}: TabButtonProps) {
  const baseClasses =
    'px-[10px] py-[6px] text-[14px] font-normal leading-none whitespace-nowrap relative transition-all duration-300 ease-in-out';

  let stateClasses = '';
  if (tab.isActive) {
    // Active tab - distinct background to stand out
    stateClasses = 'bg-bg-stronger text-text-strong border border-transparent';
  } else if (!tab.isVisited) {
    stateClasses =
      'border border-dashed border-stroke-strong bg-bg-default text-text-default';
  } else {
    // Visited tab in connected group - transparent to show group bg, with transparent border to prevent layout shift
    stateClasses = 'bg-transparent text-text-default border border-transparent';
  }

  const disabledClasses =
    !isEnabled && !tab.isActive ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

  const handleClick = () => {
    if (isEnabled || tab.isActive || tab.isVisited) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!isEnabled && !tab.isActive && !tab.isVisited}
      className={`${baseClasses} ${stateClasses} ${roundedClasses} ${disabledClasses}`}
      aria-current={tab.isActive ? 'page' : undefined}
    >
      {tab.label}
    </button>
  );
}

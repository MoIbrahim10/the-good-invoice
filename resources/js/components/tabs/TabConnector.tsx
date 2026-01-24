import type { TabState } from '../../types/tabs';

type TabConnectorProps = {
  fromTab: TabState;
  toTab: TabState;
  show: boolean;
};

export function TabConnector({ show }: TabConnectorProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="h-[28px] bg-bg-strong flex items-center px-1.5">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M0 4L6 0V8L0 4Z" fill="var(--icon-default)" />
      </svg>
    </div>
  );
}

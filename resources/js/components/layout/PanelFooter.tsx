import { LightDarkIcon } from '../icons/LightDarkIcon';
import { ThemeIcon } from '../icons/ThemeIcon';
import { FeedbackIcon } from '../icons/FeedbackIcon';
import { ExportIcon } from '../icons/ExportIcon';
import { PanelSection } from './PanelSection';
import { IconButton } from './IconButton';
import { Button } from './Button';

export function PanelFooter() {
  const handleExport = () => {
    // Placeholder for export functionality
    console.log('Export clicked');
  };

  return (
    <PanelSection className="justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md bg-bg-strong">
          <IconButton icon={<LightDarkIcon size={18} />} ariaLabel="Light/Dark" />
          <IconButton icon={<ThemeIcon size={18} />} ariaLabel="Warm/Cool" />
        </div>
        <IconButton icon={<FeedbackIcon size={18} />} ariaLabel="Feedback" />
      </div>
      <Button onClick={handleExport}>
        <ExportIcon size={18} />
        <span>Export</span>
      </Button>
    </PanelSection>
  );
}

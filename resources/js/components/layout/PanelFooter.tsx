import { useContext } from 'react';
import { CustomButton } from '@/components/custom/button';
import { FeedbackPopover } from '@/components/custom/feedback-popover';
import { ExportContext } from '@/components/providers/ExportProvider';
import {
    disableTransitionsForThemeSwitch,
    useAppearance,
} from '@/hooks/use-appearance';
import { useInvoiceValidation } from '@/hooks/use-invoice-validation';
import { useTheme } from '@/hooks/use-theme';
import { ExportButtonIcon } from '../icons/ExportButtonIcon';
import { FeedbackIcon } from '../icons/FeedbackIcon';
import { LightDarkIcon } from '../icons/LightDarkIcon';
import { ThemeIcon } from '../icons/ThemeIcon';
import { PanelSection } from './PanelSection';

export function PanelFooter() {
    const { updateAppearance, resolvedAppearance } = useAppearance();
    const { palette, setPalette } = useTheme();
    const { isValid } = useInvoiceValidation();
    const exportContext = useContext(ExportContext);

    const handleExport = () => {
        exportContext?.exportPdf();
    };

    const toggleAppearance = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    const togglePalette = () => {
        const next = palette === 'warm' ? 'cool' : 'warm';
        const theme = `${next}-${resolvedAppearance}`;
        disableTransitionsForThemeSwitch();
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('palette', next);
        requestAnimationFrame(() => setPalette(next));
    };

    return (
        <PanelSection className="justify-between">
            <div className="flex items-center gap-2">
                <div className="flex items-center rounded-md bg-bg-strong">
                    <CustomButton
                        onClick={toggleAppearance}
                        icon={
                            <LightDarkIcon
                                size={18}
                                isDark={resolvedAppearance === 'dark'}
                            />
                        }
                        ariaLabel="Light/Dark"
                        className="border-none bg-transparent! shadow-none hover:bg-transparent"
                        tooltips={{
                            default: {
                                content:
                                    resolvedAppearance === 'dark'
                                        ? 'Light'
                                        : 'Dark',
                            },
                        }}
                    />
                    <CustomButton
                        onClick={togglePalette}
                        icon={
                            <ThemeIcon size={18} isWarm={palette === 'warm'} />
                        }
                        ariaLabel="Warm/Cool"
                        className="border-none bg-transparent! shadow-none hover:bg-transparent"
                        tooltips={{
                            default: {
                                content: palette === 'warm' ? 'Cool' : 'Warm',
                            },
                        }}
                    />
                </div>
                <FeedbackPopover>
                    <CustomButton
                        icon={<FeedbackIcon size={18} />}
                        ariaLabel="Feedback"
                        className="border-none bg-bg-strong p-1.5 shadow-none hover:bg-bg-strong"
                    />
                </FeedbackPopover>
            </div>
            <CustomButton
                onClick={handleExport}
                icon={
                    <ExportButtonIcon
                        size={18}
                        isExporting={exportContext?.isExporting}
                        exportSuccess={exportContext?.exportSuccess}
                    />
                }
                text="Export"
                disabled={!isValid || exportContext?.isExporting}
                tooltips={{
                    disabled: {
                        content: exportContext?.isExporting
                            ? 'Preparing PDF…'
                            : 'Fill in the required fields to export',
                    },
                }}
            />
        </PanelSection>
    );
}

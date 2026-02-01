import * as React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/custom/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

type ButtonSize = 'sm' | 'default' | 'lg';

interface TooltipConfig {
    content: string;
    /** Space between button and tooltip in pixels. Default is 6 */
    offset?: number;
}

interface StateTooltips {
    default?: TooltipConfig;
    hover?: TooltipConfig;
    disabled?: TooltipConfig;
}

interface CustomButtonProps extends Omit<
    React.ComponentProps<typeof Button>,
    'size' | 'variant'
> {
    /** Icon element to render */
    icon?: React.ReactNode;
    /** Text content */
    text?: string;
    /** Size variant */
    size?: ButtonSize;
    /** Position of icon relative to text. Default is 'left' */
    iconPosition?: 'left' | 'right';
    /** Gap between icon and text in pixels. Default is 6 */
    gap?: number;
    /** Aria label for icon-only buttons (required for accessibility) */
    ariaLabel?: string;
    /** State-based tooltips configuration */
    tooltips?: StateTooltips;
}

// ============================================================================
// Size configurations
// ============================================================================

const iconOnlySizeClasses: Record<ButtonSize, string> = {
    sm: 'h-auto w-auto p-[5px]',
    default: 'h-auto w-auto p-[7px]',
    lg: 'h-auto w-auto p-[9px]',
};

const iconSizeClasses: Record<ButtonSize, string> = {
    sm: 'w-[14px] h-[14px]',
    default: 'w-[18px] h-[18px]',
    lg: 'w-[22px] h-[22px]',
};

const textSizeClasses: Record<ButtonSize, string> = {
    sm: 'h-auto text-[12px] px-2 py-1',
    default: 'h-auto text-[14px] px-3 py-[7px]',
    lg: 'h-auto text-[16px] px-4 py-[9px]',
};

// ============================================================================
// Internal Components
// ============================================================================

interface IconWrapperProps {
    children: React.ReactNode;
    size: ButtonSize;
    disabled?: boolean;
}

/**
 * Icon wrapper with transition styles
 */
const IconWrapper = ({ children, size, disabled }: IconWrapperProps) => {
    const icon = React.isValidElement(children)
        ? React.cloneElement(
              children as React.ReactElement<{ className?: string }>,
              {
                  className: cn(
                      (children.props as { className?: string }).className,
                      'size-[inherit]',
                  ),
              },
          )
        : children;

    return (
        <span
            className={cn(
                iconSizeClasses[size],
                'transition-all duration-200 ease-in-out',
                '[&>svg]:h-full [&>svg]:w-full',
                'flex items-center justify-center',
                // Default state
                '[&>svg]:text-text-strong',
                // Disabled state
                disabled && '[&>svg]:text-text-weaker',
            )}
        >
            {icon}
        </span>
    );
};

// ============================================================================
// Custom Button Component
// ============================================================================

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
    (
        {
            icon,
            text,
            size = 'default',
            iconPosition = 'left',
            gap = 6,
            ariaLabel,
            tooltips,
            className,
            disabled,
            type = 'button',
            ...props
        },
        ref,
    ) => {
        const isIconOnly = icon && !text;
        const isTextOnly = text && !icon;
        const isTextWithIcon = text && icon;

        // Determine current tooltip based on state
        const getTooltipConfig = (): TooltipConfig | undefined => {
            if (!tooltips) return undefined;
            if (disabled && tooltips.disabled) return tooltips.disabled;
            return tooltips.default;
        };

        const tooltipConfig = getTooltipConfig();
        const hasTooltip = !!tooltipConfig?.content;

        // Custom styles to override shadcn Button defaults
        const customClasses = cn(
            // Override shadcn defaults
            'border border-stroke-default bg-bg-weak',
            'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
            'rounded-[6px]',
            'transition-all duration-200 ease-in-out',
            // Cursor
            disabled ? 'cursor-not-allowed' : 'cursor-default',
            // Hover state for icon (only when not disabled)
            !disabled && '[&:active_span]:opacity-50 [&:hover_span]:opacity-50',
            // Hover background override
            'hover:bg-bg-weak',
            // Icon only sizing
            isIconOnly && iconOnlySizeClasses[size],
            // Text sizing
            (isTextOnly || isTextWithIcon) && textSizeClasses[size],
            // Text styles
            'font-medium text-text-strong',
            // Disabled text
            disabled && 'text-text-weaker opacity-100',
            className,
        );

        const buttonContent = (
            <Button
                ref={ref}
                type={type}
                variant="outline"
                disabled={disabled}
                aria-label={isIconOnly ? ariaLabel : undefined}
                className={customClasses}
                style={isTextWithIcon ? { gap: `${gap}px` } : undefined}
                {...props}
            >
                {isIconOnly && (
                    <IconWrapper size={size} disabled={disabled}>
                        {icon}
                    </IconWrapper>
                )}
                {isTextOnly && <span>{text}</span>}
                {isTextWithIcon && iconPosition === 'left' && (
                    <>
                        <IconWrapper size={size} disabled={disabled}>
                            {icon}
                        </IconWrapper>
                        <span>{text}</span>
                    </>
                )}
                {isTextWithIcon && iconPosition === 'right' && (
                    <>
                        <span>{text}</span>
                        <IconWrapper size={size} disabled={disabled}>
                            {icon}
                        </IconWrapper>
                    </>
                )}
            </Button>
        );

        // Wrap with tooltip if configured
        if (hasTooltip) {
            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* Wrap in span to allow tooltip on disabled buttons */}
                        <span className="inline-flex">{buttonContent}</span>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={tooltipConfig?.offset ?? 6}>
                        {tooltipConfig?.content}
                    </TooltipContent>
                </Tooltip>
            );
        }

        return buttonContent;
    },
);

CustomButton.displayName = 'CustomButton';

export {
    CustomButton,
    type CustomButtonProps,
    type StateTooltips,
    type TooltipConfig,
};

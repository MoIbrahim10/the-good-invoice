import * as React from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface LabeledTextareaProps extends React.ComponentProps<"textarea"> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

const LabeledTextarea = React.forwardRef<HTMLTextAreaElement, LabeledTextareaProps>(
  ({ label, labelClassName, containerClassName, className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div
        className={cn(
          "flex flex-row items-start gap-[10px] px-3 py-2 bg-bg-weak border border-stroke-default rounded-[6px] focus-within:ring-1 focus-within:ring-stroke-strong focus-within:outline-none transition-shadow",
          containerClassName
        )}
      >
        <Label
          htmlFor={inputId}
          className={cn(
            "text-text-default font-normal text-sm leading-[17px] whitespace-nowrap pt-0.5",
            labelClassName
          )}
        >
          {label}
        </Label>
        <Textarea
          id={inputId}
          ref={ref}
          className={cn(
            "border-0 p-0 min-h-[68px] bg-transparent text-text-strong placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none resize-none field-sizing-content md:text-sm rounded-none",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
LabeledTextarea.displayName = "LabeledTextarea"

export { LabeledTextarea }

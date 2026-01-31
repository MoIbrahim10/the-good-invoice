import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface LabeledInputProps extends React.ComponentProps<"input"> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, labelClassName, containerClassName, className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div
        className={cn(
          "flex flex-row items-center gap-[10px] px-3 py-2 bg-bg-weak border border-stroke-default rounded-[6px] focus-within:ring-1 focus-within:ring-stroke-strong focus-within:outline-none transition-shadow",
          containerClassName
        )}
      >
        <Label
          htmlFor={inputId}
          className={cn(
            "text-text-default font-normal text-sm leading-[17px] whitespace-nowrap",
            labelClassName
          )}
        >
          {label}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            "border-0 p-0 h-auto bg-transparent text-text-strong placeholder:text-text-weaker focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none md:text-sm rounded-none",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
LabeledInput.displayName = "LabeledInput"

export { LabeledInput }

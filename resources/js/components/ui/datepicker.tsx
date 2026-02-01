import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

/**
 * Formats a Date object into a numerical string based on the provided format.
 */
export function formatDate(date: Date | undefined, _locale = "en-US", format: "MM/DD/YYYY" | "DD/MM/YYYY" = "MM/DD/YYYY") {
  if (!date || Number.isNaN(date.getTime())) {
    return ""
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  if (format === "DD/MM/YYYY") {
    return `${day}/${month}/${year}`;
  }
  
  return `${month}/${day}/${year}`;
}

/**
 * Validates if a Date object is valid.
 */
export function isValidDate(date: Date | undefined): date is Date {
  if (!date) {
    return false
  }
  return !Number.isNaN(date.getTime())
}

/** Default number of years before/after current year allowed for due date. */
export const DUE_DATE_YEAR_RANGE = 10;

/**
 * Performs strict validation on a date string to ensure it represents a real calendar date.
 * Year must be within current year ± yearRange (default 10).
 */
export function isDateStringValid(
  dateStr: string,
  format: "DD/MM/YYYY" | "MM/DD/YYYY",
  yearRange: number = DUE_DATE_YEAR_RANGE,
): boolean {
  // Basic pattern check: DD/MM/YYYY or MM/DD/YYYY (10 chars total)
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    return false;
  }

  const parts = dateStr.split('/');
  let day: number, month: number, year: number;

  if (format === "DD/MM/YYYY") {
    [day, month, year] = parts.map(Number);
  } else {
    [month, day, year] = parts.map(Number);
  }

  if (month < 1 || month > 12) return false;

  const currentYear = new Date().getFullYear();
  if (year < currentYear - yearRange || year > currentYear + yearRange) {
    return false;
  }

  // check if day is valid for the month and year
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return false;

  return true;
}

/**
 * Returns a specific error message for an invalid due date string, or null if valid.
 * Tells the user exactly what is wrong (day, month, year, or combination).
 */
export function getDueDateValidationError(
  dateStr: string,
  format: "DD/MM/YYYY" | "MM/DD/YYYY",
  yearRange: number = DUE_DATE_YEAR_RANGE,
): string | null {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    return "Enter a date as DD/MM/YYYY (e.g. 31/12/2025).";
  }

  const parts = dateStr.split('/').map(Number);
  let day: number, month: number, year: number;
  if (format === "DD/MM/YYYY") {
    [day, month, year] = parts;
  } else {
    [month, day, year] = parts;
  }

  const errors: string[] = [];

  if (month < 1 || month > 12) {
    errors.push("Month must be between 1 and 12.");
  }

  const currentYear = new Date().getFullYear();
  if (year < currentYear - yearRange || year > currentYear + yearRange) {
    errors.push(
      `Year must be between ${currentYear - yearRange} and ${currentYear + yearRange}.`,
    );
  }

  if (errors.length === 0) {
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      errors.push(
        `Day must be between 1 and ${daysInMonth} for this month.`,
      );
    }
  }

  return errors.length > 0 ? errors.join(" ") : null;
}

/**
 * Converts a valid date string to a Date object.
 * Uses same year range as isDateStringValid.
 */
export function parseDateString(
  dateStr: string,
  format: "DD/MM/YYYY" | "MM/DD/YYYY",
  yearRange: number = DUE_DATE_YEAR_RANGE,
): Date | null {
  if (!isDateStringValid(dateStr, format, yearRange)) return null;

  const [p1, p2, p3] = dateStr.split('/').map(Number);
  if (format === "DD/MM/YYYY") {
    return new Date(p3, p2 - 1, p1);
  }
  return new Date(p3, p1 - 1, p2);
}

type DateInputProps = React.ComponentProps<typeof Input> & {
  dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY";
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, onChange, value, dateFormat: _dateFormat = "MM/DD/YYYY", ...props }, ref) => {
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      const prevVal = String(value || "");
      
      // If the user is adding characters, apply the mask
      if (val.length > prevVal.length) {
        // Strip everything except digits
        const digits = val.replace(/\D/g, '').slice(0, 8);
        
        let masked = "";
        if (digits.length > 0) {
          masked = digits.substring(0, 2);
          if (digits.length > 2) {
            masked += "/" + digits.substring(2, 4);
            if (digits.length > 4) {
              masked += "/" + digits.substring(4, 8);
            }
          }
        }
        val = masked;
      }

      // Create a modified event to pass up
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: val
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      if (onChange) {
        onChange(syntheticEvent);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow navigation and deletion keys
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
      const isNumber = /^[0-9]$/.test(e.key);
      
      if (!allowedKeys.includes(e.key) && !isNumber && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
    };

    return (
      <Input
        ref={ref}
        type="text"
        className={cn("tabular-nums rounded-none", className)}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={value}
        {...props}
      />
    )
  }
)
DateInput.displayName = "DateInput"

export { DateInput }

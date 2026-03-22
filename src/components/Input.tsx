import React, { type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, fullWidth = true, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium text-text-muted ml-0.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rouned-xl border bg-surface/50 px-4 py-2 text-sm text-text-main ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error ? "border-red-500/50 focus-visible:ring-red-500" : "border-border/50 hover:border-border",
            "rounded-xl",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 font-medium ml-0.5 mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

import React, { type InputHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-3 cursor-pointer group">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              "peer appearance-none w-5 h-5 border-2 rounded border-border/70 bg-surface/50 checked:bg-primary-500 checked:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-1 focus:ring-offset-background transition-all duration-200 cursor-pointer",
              className
            )}
            {...props}
          />
          <svg
            className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 peer-checked:scale-100 scale-50 transition-all duration-200 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm font-medium text-text-muted group-hover:text-text-main transition-colors">
          {label}
        </span>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

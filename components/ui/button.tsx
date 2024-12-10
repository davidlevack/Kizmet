// components/ui/button.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          // Variants
          variant === 'default' && 'bg-blue-500 text-white hover:bg-blue-600',
          variant === 'outline' && 'border border-gray-300 hover:bg-gray-50',
          variant === 'ghost' && 'hover:bg-gray-100',
          // Sizes
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'lg' && 'h-12 px-6',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
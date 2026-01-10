import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({
  className,
  type,
  prefixIcon,
  ...props
}: React.ComponentProps<'input'> & {
  prefixIcon?: React.ReactNode;
}) {
  return (
    <div className={cn('relative w-full')}>
      <input
        type={type}
        data-slot='input'
        className={cn(
          'h-9 w-full border min-w-0 rounded-md bg-transparent px-3 py-1 text-sm outline-none',
          'placeholder:select-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground transition-[color] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          {
            'peer ps-9': !!prefixIcon
          },
          className
        )}
        {...props}
      />
      {prefixIcon && (
        <div
          aria-invalid={props['aria-invalid']}
          className={cn(
            'text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50',
            'aria-invalid:has-[>svg]:text-destructive'
          )}
        >
          {prefixIcon}
        </div>
      )}
    </div>
  );
}

export { Input };

import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'selection:bg-primary selection:text-white',
        'focus-visible:border-ring focus-visible:ring-ring/50 rounded-md border bg-transparent px-2.5 py-2 transition-colors focus-visible:ring-3 text-sm flex field-sizing-content min-h-16 w-full outline-none placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };

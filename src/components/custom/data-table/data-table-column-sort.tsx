import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { Column } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

interface DataTableColumnSortProps<
  TData,
  TValue
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

function DataTableColumnSort<TData, TValue>({
  column
}: DataTableColumnSortProps<TData, TValue>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer'>
          {column.getIsSorted() === 'desc' ? (
            <ChevronDown className='size-4 text-primary' />
          ) : column.getIsSorted() === 'asc' ? (
            <ChevronUp className='size-4 text-primary' />
          ) : (
            <ChevronsUpDown className='size-4' />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ChevronUp className='size-4 text-muted-foreground/70 mr-1' />
          升序
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ChevronDown className='size-4 text-muted-foreground/70 mr-1' />
          降序
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => column.clearSorting()}>
          <ChevronsUpDown className='size-4 text-muted-foreground/70 mr-1' />
          重置
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

DataTableColumnSort.displayName = 'DataTableColumnSort';

export default DataTableColumnSort;

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { SortDirection } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

interface DataTableColumnSortProps {
  /** 当前排序方向 */
  sortDirection: false | SortDirection;
  /** 设置排序 */
  onSort: (desc: boolean) => void;
  /** 清除排序 */
  onClearSort: () => void;
}

function DataTableColumnSort({
  sortDirection,
  onSort,
  onClearSort
}: DataTableColumnSortProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer'>
          {sortDirection === 'desc' ? (
            <ChevronDown className='size-4 text-primary' />
          ) : sortDirection === 'asc' ? (
            <ChevronUp className='size-4 text-primary' />
          ) : (
            <ChevronsUpDown className='size-4' />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onSort(false)}>
            <ChevronUp className='size-4' />
            升序
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort(true)}>
            <ChevronDown className='size-4' />
            降序
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onClearSort}>
            <ChevronsUpDown className='size-4' />
            重置
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

DataTableColumnSort.displayName = 'DataTableColumnSort';

export default DataTableColumnSort;

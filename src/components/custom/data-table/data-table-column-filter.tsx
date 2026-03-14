import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Check, Filter, FilterX, RotateCcw } from 'lucide-react';

interface DataTableColumnFilterProps {
  /** 各选项的计数 */
  facets: Map<string, number>;
  /** 当前已选中的筛选值 */
  filterValue: string[];
  /** 筛选选项列表 */
  options: {
    label: string;
    value: string;
  }[];
  /** 筛选值变更回调 */
  onFilterChange: (value: string[] | undefined) => void;
}

export function DataTableColumnFilter({
  facets,
  filterValue,
  options,
  onFilterChange
}: DataTableColumnFilterProps) {
  const selectedValues = new Set(filterValue);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer'>
          {selectedValues.size > 0 ? (
            <FilterX
              color='var(--primary)'
              className='size-3.5'
            />
          ) : (
            <Filter className='size-3.5' />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild>
        <ScrollArea className='max-h-56'>
          <DropdownMenuItem
            className='text-primary'
            disabled={selectedValues.size === 0}
            onClick={() => onFilterChange(undefined)}
          >
            <RotateCcw className='text-primary' />
            <span>清空筛选</span>
          </DropdownMenuItem>
          <>
            {options.map((option, index) => {
              const isSelected = selectedValues.has(option.value);
              return (
                <DropdownMenuItem
                  key={`${option.value}-${index}`}
                  onClick={() => {
                    const next = new Set(selectedValues);
                    if (isSelected) {
                      next.delete(option.value);
                    } else {
                      next.add(option.value);
                    }
                    const filterValues = Array.from(next);
                    onFilterChange(
                      filterValues.length ? filterValues : undefined
                    );
                  }}
                >
                  <div
                    className={cn({
                      '[&_svg]:invisible': !isSelected
                    })}
                  >
                    <Check className='text-foreground' />
                  </div>
                  <span>{option.label}</span>
                  {facets?.get(option.value) && (
                    <span className='ml-auto flex size-4 items-center justify-center font-mono text-xs'>
                      {facets.get(option.value)}
                    </span>
                  )}
                </DropdownMenuItem>
              );
            })}
          </>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import type { Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationConfig } from '@/components/custom/data-table/data-table';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationConfig: PaginationConfig;
  paginationInfo: {
    pageCount: number | undefined;
    canPreviousPage: boolean;
    canNextPage: boolean;
  };
  disabled?: boolean;
}

/** 生成页码列表 */
const generatePageList = (
  current: number,
  total: number
): (number | '...')[] => {
  if (total <= 6) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, 5, '...', total];
  }

  if (current >= total - 2) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, '...', current - 1, current, current + 1, '...', total];
};

function DataTablePagination<TData>({
  table,
  paginationConfig,
  paginationInfo,
  disabled = false
}: DataTablePaginationProps<TData>) {
  const { mode } = paginationConfig;
  const { canPreviousPage, canNextPage, pageCount } = paginationInfo;
  const currentPage = table.getState().pagination.pageIndex + 1;

  // hasMore模式
  if (mode === 'hasMore') {
    return (
      <div className='flex items-center'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant='icon'
                onClick={() => table.previousPage()}
                disabled={disabled || !canPreviousPage}
              >
                <ChevronLeft />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <div className='flex items-center justify-center size-9'>
                {currentPage}
              </div>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant='icon'
                onClick={() => table.nextPage()}
                disabled={disabled || !canNextPage}
              >
                <ChevronRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }

  // total 模式：显示完整分页
  if (!pageCount || pageCount <= 0) return null;

  const pageList = generatePageList(currentPage, pageCount);

  return (
    <div className='flex items-center'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant='outline'
              size='icon'
              className='size-9'
              onClick={() => table.previousPage()}
              disabled={disabled || !canPreviousPage}
            >
              <ChevronLeft className='size-4' />
            </Button>
          </PaginationItem>

          {pageList.map((page, index) => (
            <PaginationItem key={`${index}-${page}`}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  className={cn('cursor-pointer size-9', {
                    'pointer-events-none': disabled || currentPage === page
                  })}
                  onClick={() => table.setPageIndex(Number(page) - 1)}
                  isActive={currentPage === page}
                  aria-disabled={disabled}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant='outline'
              size='icon'
              className='size-9'
              onClick={() => table.nextPage()}
              disabled={disabled || !canNextPage}
            >
              <ChevronRight className='size-4' />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

DataTablePagination.displayName = 'DataTablePagination';

export default DataTablePagination;

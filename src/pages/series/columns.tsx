import type { SeriesListItem } from '@/apis';
import { formatDate } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import RowActions from '@/pages/series/row-actions';

const getColumns = (onRefresh: () => void) => {
  const columns: ColumnDef<SeriesListItem>[] = [
    {
      accessorKey: 'name',
      header: () => {
        return (
          <div className='flex items-center gap-1'>
            <span>系列名称</span>
            <Search className='size-3.5' />
          </div>
        );
      }
    },
    {
      accessorKey: 'createdAt',
      header: '创建时间',
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        return formatDate(createdAt);
      }
    },
    {
      id: 'actions',
      header: '操作',
      cell: ({ row }) => {
        return (
          <RowActions
            row={row.original}
            onRefresh={onRefresh}
          />
        );
      }
    }
  ];
  return columns;
};

export default getColumns;

import React, { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DataTable } from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/torrents/columns';
import { useTorrentsStore } from '@/store';
import { useRequest } from 'ahooks';
import { getTorrentsList } from '@/apis';
import DataTableRefresh from '@/components/custom/data-table/data-table-refresh';
import AddDialog from '@/pages/torrents/add-dialog';

const Index: React.FC = () => {
  const {
    initialized,
    setInitialized,
    data,
    setData,
    total,
    setTotal,
    sorting,
    setSorting,
    sort,
    order,
    page,
    pageSize,
    resetPagination,
    pagination,
    setPagination,
    sizes
  } = useTorrentsStore(
    useShallow(state => ({
      initialized: state.initialized,
      setInitialized: state.setInitialized,
      data: state.data,
      setData: state.setData,
      total: state.total,
      setTotal: state.setTotal,
      sorting: state.sorting,
      setSorting: state.setSorting,
      sort: state.sort,
      order: state.order,
      page: state.page,
      pageSize: state.pageSize,
      resetPagination: state.resetPagination,
      pagination: state.pagination,
      setPagination: state.setPagination,
      sizes: state.sizes
    }))
  );

  const columns = useMemo(() => getColumns(), []);

  useEffect(() => {
    return () => {
      resetPagination();
      setTotal(0);
      setInitialized(false);
      setData([]);
    };
  }, [resetPagination, setTotal, setInitialized, setData]);

  const { run, loading, refresh, error } = useRequest(getTorrentsList, {
    loadingDelay: 150,
    debounceWait: 250,
    defaultParams: [{ page, pageSize }],
    onSuccess: ({ items, total }) => {
      setData(items);
      setTotal(total);
    },
    onFinally: () => {
      setInitialized(true);
    },
    refreshDeps: [page, pageSize, sorting],
    refreshDepsAction: () => {
      run({ page, pageSize, order, sort });
    }
  });

  const isLoading = loading || !initialized;

  return (
    <DataTable
      data={data}
      columns={columns}
      loading={isLoading}
      pagination={pagination}
      paginationConfig={{ mode: 'total', total }}
      onPaginationChange={setPagination}
      sorting={sorting}
      onSortingChange={setSorting}
      sizes={sizes}
      error={!!error}
      toolbar={
        <>
          <AddDialog
            disabled={loading}
            onRefresh={refresh}
          />
          <DataTableRefresh
            onRefresh={refresh}
            disabled={isLoading}
          />
        </>
      }
    />
  );
};

export default Index;

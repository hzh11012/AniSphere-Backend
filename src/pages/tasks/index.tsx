import React, { useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DataTable } from '@/components/custom/data-table/data-table';
import getColumns from '@/pages/tasks/columns';
import { useTasksStore } from '@/store';
import { useRequest } from 'ahooks';
import { getTasksList } from '@/apis';
import DataTableSearch from '@/components/custom/data-table/data-table-search';
import DataTableRefresh from '@/components/custom/data-table/data-table-refresh';

const Index: React.FC = () => {
  const {
    initialized,
    setInitialized,
    data,
    setData,
    keyword,
    setKeyword,
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
  } = useTasksStore(
    useShallow(state => ({
      initialized: state.initialized,
      setInitialized: state.setInitialized,
      data: state.data,
      setData: state.setData,
      keyword: state.keyword,
      setKeyword: state.setKeyword,
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

  const { run, loading, refresh, error } = useRequest(getTasksList, {
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
      run({ page, pageSize, order, keyword, sort });
    }
  });

  const handleSearch = useCallback(
    (keyword: string) => {
      resetPagination();
      setKeyword(keyword);
      run({ page: 1, keyword, pageSize, sort, order });
    },
    [resetPagination, setKeyword, run, pageSize, sort, order]
  );

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
          <DataTableSearch
            onSearch={handleSearch}
            disabled={isLoading}
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
